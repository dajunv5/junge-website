/* 西游记阅读器 - 完整版（100回，滑动翻页，字体调节） */
(function(){
'use strict';

/* ========== 全局状态 ========== */
var currentChapterIdx = 0;
var fontSize = parseInt(localStorage.getItem('xyj-font-size')) || 18;
var lineHeight = parseFloat(localStorage.getItem('xyj-line-height')) || 2;

/* 滑动状态 */
var swipeState = {
    active: false,
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    direction: null, // 'left' | 'right' | null
    locked: false     // 锁定方向后不再变
};

/* ========== 初始化 ========== */
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
    currentChapterIdx = Math.max(0, Math.min(ch, XIYOUJI_DATA.length - 1));
}

/* ========== 渲染章节 ========== */
function renderChapter() {
    var chapter = XIYOUJI_DATA[currentChapterIdx];
    if (!chapter) return;

    document.title = '第' + numToChinese(chapter.id) + '回 ' + chapter.title + ' - 西游记 - 私人订制书窗';

    // 导航标题
    var titleEl = document.getElementById('navTitle');
    if (titleEl) titleEl.textContent = '西游记 · 第' + numToChinese(chapter.id) + '回';

    // 渲染正文
    renderContent(chapter);

    // 更新UI
    updateNavState();
}

function renderContent(chapter) {
    var container = document.getElementById('chapterContent');
    if (!container) return;

    var html = '';
    html += '<div class="chapter-header">';
    html += '<div class="chapter-idx">第' + numToChinese(chapter.id) + '回</div>';
    html += '<h1 class="chapter-title">' + escapeHtml(chapter.title) + '</h1>';
    html += '</div>';

    var lines = chapter.content.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line) continue;
        // 跳过章节标题行（已在header中显示）
        if (line.indexOf('第') === 0 && line.indexOf('回') !== -1 && line.indexOf('回') < 8) {
            continue;
        }
        if (line.indexOf('且听下回分解') !== -1 || line.indexOf('毕竟') !== -1) {
            html += '<p class="chapter-end">' + escapeHtml(line) + '</p>';
        } else {
            html += '<p class="chapter-para">' + escapeHtml(line) + '</p>';
        }
    }

    container.innerHTML = html;
}

/* ========== 翻页 ========== */
function goToChapter(idx, direction) {
    if (idx < 0 || idx >= XIYOUJI_DATA.length) return;
    currentChapterIdx = idx;
    renderChapter();
    scrollToTop();
    updateURL();

    // 滑动动画方向
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
    if (nextBtn) nextBtn.disabled = (currentChapterIdx === XIYOUJI_DATA.length - 1);
    if (footerInfo) footerInfo.textContent = (currentChapterIdx + 1) + ' / ' + XIYOUJI_DATA.length;
    if (progress) {
        var pct = ((currentChapterIdx + 1) / XIYOUJI_DATA.length * 100).toFixed(1);
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

/* 翻页滑入动画 */
function animateSlide(direction) {
    var inner = document.getElementById('pageSliderInner');
    if (!inner) return;

    var offset = direction === 'left' ? '80px' : '-80px';
    inner.style.transition = 'none';
    inner.style.transform = 'translateX(' + offset + ')';
    inner.style.opacity = '0.7';

    // 强制重绘
    void inner.offsetWidth;

    inner.style.transition = 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease';
    inner.style.transform = 'translateX(0)';
    inner.style.opacity = '1';
}

/* ========== 触摸滑动翻页（跟随手指） ========== */
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

    // 确定方向：一旦水平滑动超过垂直，锁定为水平
    if (!swipeState.locked) {
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            swipeState.locked = true;
            if (Math.abs(dx) > Math.abs(dy)) {
                swipeState.direction = dx > 0 ? 'right' : 'left';
            } else {
                swipeState.direction = null; // 垂直滚动，不干预
            }
        }
    }

    // 水平滑动时跟随手指
    if (swipeState.direction) {
        e.preventDefault(); // 阻止水平滚动

        var inner = document.getElementById('pageSliderInner');
        if (!inner) return;

        // 边界阻尼：第一页不能右滑，最后一页不能左滑
        var dampDx = dx;
        if (dx > 0 && currentChapterIdx === 0) dampDx = dx * 0.3;
        if (dx < 0 && currentChapterIdx === XIYOUJI_DATA.length - 1) dampDx = dx * 0.3;

        inner.classList.add('dragging');
        inner.style.transform = 'translateX(' + dampDx + 'px)';
        inner.style.opacity = Math.max(0.6, 1 - Math.abs(dampDx) / 600);

        // 方向提示
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
    var velocity = Math.abs(dx) / elapsed; // px/ms

    hideHints();

    if (!swipeState.direction) {
        // 垂直方向，恢复
        inner.classList.remove('dragging');
        inner.style.transform = '';
        inner.style.opacity = '';
        return;
    }

    // 判断是否翻页：滑动距离>60px 或 速度快(>0.5px/ms)
    var shouldFlip = Math.abs(dx) > 60 || velocity > 0.5;

    if (shouldFlip) {
        if (dx > 0 && currentChapterIdx > 0) {
            // 向右滑 → 上一回，先滑出再跳转
            animateOutThenFlip('right', -1);
        } else if (dx < 0 && currentChapterIdx < XIYOUJI_DATA.length - 1) {
            // 向左滑 → 下一回
            animateOutThenFlip('left', 1);
        } else {
            // 边界回弹
            bounceBack(inner);
        }
    } else {
        // 距离不够，回弹
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

        // 从对面滑入
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
    if (dx < -30 && currentChapterIdx < XIYOUJI_DATA.length - 1 && hintRight) hintRight.classList.add('show');
}

function hideHints() {
    var h1 = document.getElementById('hintLeft');
    var h2 = document.getElementById('hintRight');
    if (h1) h1.classList.remove('show');
    if (h2) h2.classList.remove('show');
}

/* ========== 键盘翻页 ========== */
function initKeyboard() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevChapter(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); nextChapter(); }
        if (e.key === ' ') { e.preventDefault(); nextChapter(); }
    });
}

/* ========== 章节选择 ========== */
function initChapterSelect() {
    var sel = document.getElementById('chapterSelect');
    if (!sel) return;
    sel.innerHTML = '';
    for (var i = 0; i < XIYOUJI_DATA.length; i++) {
        var ch = XIYOUJI_DATA[i];
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = '第' + numToChinese(ch.id) + '回 ' + ch.title;
        if (i === currentChapterIdx) opt.selected = true;
        sel.appendChild(opt);
    }
    sel.addEventListener('change', function() {
        var idx = parseInt(sel.value);
        goToChapter(idx);
    });
}

/* ========== 字体调节 ========== */
function initFontPanel() {
    var fontBtn = document.getElementById('fontBtn');
    var fontPanel = document.getElementById('fontPanel');
    var fontDec = document.getElementById('fontDec');
    var fontInc = document.getElementById('fontInc');
    var fontPreview = document.getElementById('fontPreview');
    var lineSlider = document.getElementById('lineHeightSlider');

    if (!fontBtn || !fontPanel) return;

    // 切换面板
    fontBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        fontPanel.classList.toggle('show');
    });

    // 点击外部关闭
    document.addEventListener('click', function(e) {
        if (!fontPanel.contains(e.target) && e.target !== fontBtn) {
            fontPanel.classList.remove('show');
        }
    });

    // 减小字号
    if (fontDec) {
        fontDec.addEventListener('click', function() {
            fontSize = Math.max(12, fontSize - 2);
            applyFontSize();
            updateFontPreview();
        });
    }

    // 增大字号
    if (fontInc) {
        fontInc.addEventListener('click', function() {
            fontSize = Math.min(32, fontSize + 2);
            applyFontSize();
            updateFontPreview();
        });
    }

    // 行距滑块
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
    localStorage.setItem('xyj-font-size', fontSize);
    localStorage.setItem('xyj-line-height', lineHeight);
}

function updateFontPreview() {
    var preview = document.getElementById('fontPreview');
    if (preview) preview.textContent = fontSize + 'px';
}

/* ========== 底部按钮 ========== */
function initFooterButtons() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.addEventListener('click', prevChapter);
    if (nextBtn) nextBtn.addEventListener('click', nextChapter);
}

/* ========== 主题切换 ========== */
function initThemeButton() {
    var themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function applyTheme() {
    var theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'light') document.body.classList.add('light-theme');
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

/* ========== 工具函数 ========== */
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function numToChinese(num) {
    var chars = ['零','一','二','三','四','五','六','七','八','九','十'];
    if (num <= 10) return chars[num];
    if (num < 20) return '十' + (num % 10 === 0 ? '' : chars[num % 10]);
    if (num < 100) {
        return chars[Math.floor(num / 10)] + '十' + (num % 10 === 0 ? '' : chars[num % 10]);
    }
    return String(num);
}

function _initProtection() {
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].indexOf(e.key) !== -1) || (e.ctrlKey && ['u','s'].indexOf(e.key) !== -1)) {
            e.preventDefault();
        }
    });
}

/* 启动 */
document.addEventListener('DOMContentLoaded', init);
})();
