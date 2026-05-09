/* The Wealth of Nations Reader */
(function(){
'use strict';

var currentChapterIdx = 0;
var fontSize = parseInt(localStorage.getItem('wealth-font-size')) || 16;
var lineHeight = parseFloat(localStorage.getItem('wealth-line-height')) || 1.8;

var swipeState = {
    active: false,
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    direction: null,
    locked: false
};

function init() {
    _initProtection();
    applyTheme();
    applyFontSize();
    parseURL();
    renderChapter();
    initChapterSelect();
    initSwipe();
    initKeyboard();
    initFontPanel();
    initFooterButtons();
    initThemeButton();
}

function parseURL() {
    var params = new URLSearchParams(location.search);
    var ch = parseInt(params.get('chapter'));
    if (isNaN(ch)) ch = 0;
    currentChapterIdx = Math.max(0, Math.min(ch, WEALTH_DATA.length - 1));
}

function renderChapter() {
    var chapter = WEALTH_DATA[currentChapterIdx];
    if (!chapter) return;

    document.title = chapter.title + ' - The Wealth of Nations';

    var titleEl = document.getElementById('navTitle');
    if (titleEl) titleEl.textContent = chapter.title;

    renderContent(chapter);
    updateNavState();
}

function renderContent(chapter) {
    var container = document.getElementById('chapterContent');
    if (!container) return;

    var html = '';
    html += '<div class="chapter-header">';
    html += '<div class="chapter-idx">' + chapter.book + '</div>';
    html += '<h1 class="chapter-title">' + escapeHtml(chapter.subtitle) + '</h1>';
    html += '</div>';

    var paras = chapter.content.split('\n');
    for (var i = 0; i < paras.length; i++) {
        var p = paras[i].trim();
        if (!p) continue;
        html += '<p class="chapter-para">' + escapeHtml(p) + '</p>';
    }

    container.innerHTML = html;
}

function goToChapter(idx, direction) {
    if (idx < 0 || idx >= WEALTH_DATA.length) return;
    currentChapterIdx = idx;
    renderChapter();
    scrollToTop();
    updateURL();

    if (direction) {
        animateSlide(direction);
    }
}

function nextChapter() {
    goToChapter(currentChapterIdx + 1, 'left');
}

function prevChapter() {
    goToChapter(currentChapterIdx - 1, 'right');
}

function updateNavState() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var footerInfo = document.getElementById('footerInfo');
    var progress = document.getElementById('progressBar');
    var sel = document.getElementById('chapterSelect');

    if (prevBtn) prevBtn.disabled = (currentChapterIdx === 0);
    if (nextBtn) nextBtn.disabled = (currentChapterIdx === WEALTH_DATA.length - 1);
    if (footerInfo) footerInfo.textContent = (currentChapterIdx + 1) + ' / ' + WEALTH_DATA.length;
    if (progress) {
        var pct = ((currentChapterIdx + 1) / WEALTH_DATA.length * 100).toFixed(1);
        progress.style.width = pct + '%';
    }
    if (sel) sel.value = currentChapterIdx;
}

function scrollToTop() {
    var el = document.getElementById('chapterContent');
    if (el) el.scrollTop = 0;
    window.scrollTo(0, 0);
}

function updateURL() {
    var newUrl = location.pathname + '?chapter=' + currentChapterIdx;
    history.replaceState(null, '', newUrl);
}

function animateSlide(direction) {
    var inner = document.getElementById('pageSliderInner');
    if (!inner) return;

    var offset = direction === 'left' ? '80px' : '-80px';
    inner.style.transition = 'none';
    inner.style.transform = 'translateX(' + offset + ')';
    inner.style.opacity = '0.7';

    void inner.offsetWidth;

    inner.style.transition = 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease';
    inner.style.transform = 'translateX(0)';
    inner.style.opacity = '1';
}

function initSwipe() {
    var slider = document.getElementById('pageSlider');
    if (!slider) return;

    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchmove', onTouchMove, { passive: false });
    slider.addEventListener('touchend', onTouchEnd, { passive: true });
}

function onTouchStart(e) {
    var touch = e.changedTouches[0];
    swipeState.active = true;
    swipeState.startX = touch.clientX;
    swipeState.startY = touch.clientY;
    swipeState.startTime = Date.now();
    swipeState.currentX = touch.clientX;
    swipeState.direction = null;
    swipeState.locked = false;
}

function onTouchMove(e) {
    if (!swipeState.active) return;

    var touch = e.changedTouches[0];
    var dx = touch.clientX - swipeState.startX;
    var dy = touch.clientY - swipeState.startY;
    swipeState.currentX = touch.clientX;

    if (!swipeState.locked) {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            swipeState.locked = true;
            if (Math.abs(dx) > Math.abs(dy)) {
                swipeState.direction = dx > 0 ? 'right' : 'left';
            } else {
                swipeState.direction = null;
            }
        }
    }

    if (swipeState.direction) {
        e.preventDefault();

        var inner = document.getElementById('pageSliderInner');
        if (!inner) return;

        var dampDx = dx;
        if (dx > 0 && currentChapterIdx === 0) dampDx = dx * 0.3;
        if (dx < 0 && currentChapterIdx === WEALTH_DATA.length - 1) dampDx = dx * 0.3;

        inner.classList.add('dragging');
        inner.style.transform = 'translateX(' + dampDx + 'px)';
        inner.style.opacity = Math.max(0.6, 1 - Math.abs(dampDx) / 600);

        showHint(dx);
    }
}

function onTouchEnd(e) {
    if (!swipeState.active) return;
    swipeState.active = false;

    var inner = document.getElementById('pageSliderInner');
    if (!inner) return;

    var dx = swipeState.currentX - swipeState.startX;
    var elapsed = Date.now() - swipeState.startTime;
    var velocity = Math.abs(dx) / elapsed;

    hideHints();

    if (!swipeState.direction) {
        inner.classList.remove('dragging');
        inner.style.transform = '';
        inner.style.opacity = '';
        return;
    }

    var shouldFlip = Math.abs(dx) > 60 || velocity > 0.5;

    if (shouldFlip) {
        if (dx > 0 && currentChapterIdx > 0) {
            animateOutThenFlip('right', -1);
        } else if (dx < 0 && currentChapterIdx < WEALTH_DATA.length - 1) {
            animateOutThenFlip('left', 1);
        } else {
            bounceBack(inner);
        }
    } else {
        bounceBack(inner);
    }
}

function animateOutThenFlip(direction, delta) {
    var inner = document.getElementById('pageSliderInner');
    if (!inner) return;

    var targetX = direction === 'left' ? '-100%' : '100%';
    inner.classList.remove('dragging');
    inner.style.transition = 'transform 0.25s ease-in, opacity 0.25s ease-in';
    inner.style.transform = 'translateX(' + targetX + ')';
    inner.style.opacity = '0';

    setTimeout(function() {
        currentChapterIdx += delta;
        renderChapter();
        scrollToTop();
        updateURL();

        var fromX = direction === 'left' ? '80px' : '-80px';
        inner.style.transition = 'none';
        inner.style.transform = 'translateX(' + fromX + ')';
        inner.style.opacity = '0.5';

        void inner.offsetWidth;

        inner.style.transition = 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease';
        inner.style.transform = 'translateX(0)';
        inner.style.opacity = '1';
    }, 250);
}

function bounceBack(inner) {
    inner.classList.remove('dragging');
    inner.style.transition = 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease';
    inner.style.transform = 'translateX(0)';
    inner.style.opacity = '1';
}

function showHint(dx) {
    var hintLeft = document.getElementById('hintLeft');
    var hintRight = document.getElementById('hintRight');
    if (dx > 30 && currentChapterIdx > 0 && hintLeft) hintLeft.classList.add('show');
    if (dx < -30 && currentChapterIdx < WEALTH_DATA.length - 1 && hintRight) hintRight.classList.add('show');
}

function hideHints() {
    var h1 = document.getElementById('hintLeft');
    var h2 = document.getElementById('hintRight');
    if (h1) h1.classList.remove('show');
    if (h2) h2.classList.remove('show');
}

function initKeyboard() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevChapter(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); nextChapter(); }
        if (e.key === ' ') { e.preventDefault(); nextChapter(); }
    });
}

function initChapterSelect() {
    var sel = document.getElementById('chapterSelect');
    if (!sel) return;
    sel.innerHTML = '';
    for (var i = 0; i < WEALTH_DATA.length; i++) {
        var ch = WEALTH_DATA[i];
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = ch.title;
        if (i === currentChapterIdx) opt.selected = true;
        sel.appendChild(opt);
    }
    sel.addEventListener('change', function() {
        var idx = parseInt(sel.value);
        goToChapter(idx);
    });
}

function initFontPanel() {
    var fontBtn = document.getElementById('fontBtn');
    var fontPanel = document.getElementById('fontPanel');
    var fontDec = document.getElementById('fontDec');
    var fontInc = document.getElementById('fontInc');
    var fontPreview = document.getElementById('fontPreview');
    var lineSlider = document.getElementById('lineHeightSlider');

    if (!fontBtn || !fontPanel) return;

    fontBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        fontPanel.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!fontPanel.contains(e.target) && e.target !== fontBtn) {
            fontPanel.classList.remove('show');
        }
    });

    if (fontDec) {
        fontDec.addEventListener('click', function() {
            fontSize = Math.max(12, fontSize - 2);
            applyFontSize();
            updateFontPreview();
        });
    }

    if (fontInc) {
        fontInc.addEventListener('click', function() {
            fontSize = Math.min(28, fontSize + 2);
            applyFontSize();
            updateFontPreview();
        });
    }

    if (lineSlider) {
        lineSlider.value = lineHeight;
        lineSlider.addEventListener('input', function() {
            lineHeight = parseFloat(this.value);
            applyFontSize();
        });
    }

    updateFontPreview();
}

function applyFontSize() {
    document.documentElement.style.setProperty('--reader-font-size', fontSize + 'px');
    document.documentElement.style.setProperty('--reader-line-height', lineHeight);
    localStorage.setItem('wealth-font-size', fontSize);
    localStorage.setItem('wealth-line-height', lineHeight);
}

function updateFontPreview() {
    var preview = document.getElementById('fontPreview');
    if (preview) preview.textContent = fontSize + 'px';
}

function initFooterButtons() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.addEventListener('click', prevChapter);
    if (nextBtn) nextBtn.addEventListener('click', nextChapter);
}

function initThemeButton() {
    var themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function applyTheme() {
    var theme = localStorage.getItem('theme') || 'light';
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    var isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    var themeBtn = document.getElementById('themeBtn');
    if (!themeBtn) return;
    var icon = themeBtn.querySelector('i');
    if (!icon) return;
    var isLight = document.body.classList.contains('light-theme');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function _initProtection() {
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].indexOf(e.key) !== -1) || (e.ctrlKey && ['u','s'].indexOf(e.key) !== -1)) {
            e.preventDefault();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
})();