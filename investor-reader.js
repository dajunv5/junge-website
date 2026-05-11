/* investor-reader.js - 聪明的投资者阅读器逻辑 */

// 当前章节
let currentChapter = 0;
let fontSize = 16;
let isNightMode = false;
let isTranslationOpen = false;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取章节参数
    const urlParams = new URLSearchParams(window.location.search);
    const chapterParam = urlParams.get('chapter');
    if (chapterParam) {
        currentChapter = parseInt(chapterParam) || 0;
    }

    // 加载章节
    loadChapter(currentChapter);

    // 恢复保存的设置
    restoreSettings();

    // 保存阅读进度
    saveProgress();
});

// 加载章节
function loadChapter(chapterId) {
    if (chapterId < 0 || chapterId >= INVESTOR_DATA.length) {
        return;
    }

    currentChapter = chapterId;
    const chapter = INVESTOR_DATA[chapterId];

    // 更新标题
    document.getElementById('chapterTitle').textContent = 
        `第${chapterId + 1}章 - ${chapter.title}`;
    document.getElementById('chapterSubtitle').textContent = chapter.subtitle;
    document.getElementById('chapterIndicator').textContent = 
        `${chapterId + 1} / ${INVESTOR_DATA.length}`;

    // 更新内容
    const contentDiv = document.getElementById('chapterContent');
    contentDiv.innerHTML = `
        <div class="content-english">
            <h3><i class="fas fa-globe-americas"></i> 英文原文</h3>
            <p>${chapter.content}</p>
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 2px solid var(--accent, #2997ff);">
        <div class="content-chinese">
            <h3><i class="fas fa-language"></i> 中文翻译</h3>
            <p>${chapter.translation}</p>
        </div>
    `;

    // 更新翻译面板
    document.getElementById('translationContent').innerHTML = `
        <h3>AI 辅助翻译</h3>
        <p><strong>${chapter.title}</strong></p>
        <p>${chapter.translation}</p>
        <hr>
        <p><em>注：这是AI辅助翻译的版本，仅供参考。建议购买正版书籍获得完整准确的翻译。</em></p>
    `;

    // 保存进度
    saveProgress();

    // 更新URL
    window.history.replaceState(null, '', `?chapter=${chapterId}`);
}

// 上一章
function prevChapter() {
    if (currentChapter > 0) {
        loadChapter(currentChapter - 1);
    }
}

// 下一章
function nextChapter() {
    if (currentChapter < INVESTOR_DATA.length - 1) {
        loadChapter(currentChapter + 1);
    }
}

// 字体大小调整
function changeFontSize(delta) {
    fontSize = Math.max(12, Math.min(24, fontSize + delta));
    document.getElementById('fontSizeDisplay').textContent = `${fontSize}px`;
    document.querySelector('.chapter-content').style.fontSize = `${fontSize}px`;
    
    // 保存设置
    localStorage.setItem('investor-font-size', fontSize);
}

// 夜间模式
function toggleNightMode() {
    isNightMode = !isNightMode;
    if (isNightMode) {
        document.body.classList.add('night-mode');
    } else {
        document.body.classList.remove('night-mode');
    }
    
    // 保存设置
    localStorage.setItem('investor-night-mode', isNightMode);
}

// 翻译面板
function toggleTranslation() {
    isTranslationOpen = !isTranslationOpen;
    const panel = document.getElementById('translationPanel');
    if (isTranslationOpen) {
        panel.classList.add('active');
    } else {
        panel.classList.remove('active');
    }
}

// 保存进度
function saveProgress() {
    const progress = {
        bookId: 'investor',
        chapterId: currentChapter,
        totalChapters: INVESTOR_DATA.length,
        timestamp: Date.now()
    };
    localStorage.setItem('investor-progress', JSON.stringify(progress));
}

// 恢复设置
function restoreSettings() {
    // 字体大小
    const savedFontSize = localStorage.getItem('investor-font-size');
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        document.getElementById('fontSizeDisplay').textContent = `${fontSize}px`;
        document.querySelector('.chapter-content').style.fontSize = `${fontSize}px`;
    }

    // 夜间模式
    const savedNightMode = localStorage.getItem('investor-night-mode');
    if (savedNightMode === 'true') {
        isNightMode = true;
        document.body.classList.add('night-mode');
    }
}

// 键盘导航
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevChapter();
    } else if (e.key === 'ArrowRight') {
        nextChapter();
    } else if (e.key === 't' || e.key === 'T') {
        toggleTranslation();
    }
});

// 触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 左滑 - 下一章
            nextChapter();
        } else {
            // 右滑 - 上一章
            prevChapter();
        }
    }
}
