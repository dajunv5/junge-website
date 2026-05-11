/* logic-reader.js - 简明逻辑学导论阅读器逻辑 */

// 全局变量
let currentChapter = 0;
let fontSize = 16;
let isNightMode = false;
let isTranslationOpen = false;

// 章节缓存对象
let chapterCache = {};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取章节参数
    const urlParams = new URLSearchParams(window.location.search);
    const chapterParam = urlParams.get('chapter');
    if (chapterParam) {
        currentChapter = parseInt(chapterParam) || 0;
    }

    // 只加载当前章节
    loadChapter(currentChapter);
    
    // 预加载下一章和下下章
    setTimeout(() => {
        preloadAdjacentChapters(currentChapter);
    }, 500);

    // 恢复保存的设置
    restoreSettings();
});

// 获取章节数据（按需加载）
async function getChapterData(chapterId) {
    // 如果缓存中有，直接返回
    if (chapterCache[chapterId]) {
        return chapterCache[chapterId];
    }
    
    // 模拟异步加载延迟
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 从完整数据中获取
    if (chapterId >= 0 && chapterId < LOGIC_DATA.length) {
        const chapter = LOGIC_DATA[chapterId];
        // 缓存章节数据
        chapterCache[chapterId] = chapter;
        return chapter;
    }
    
    return null;
}

// 加载章节（异步）
async function loadChapter(chapterId) {
    if (chapterId < 0 || chapterId >= LOGIC_DATA.length) {
        return;
    }

    currentChapter = chapterId;
    
    // 显示加载状态
    showLoadingState(true);
    
    try {
        // 异步获取章节数据
        const chapter = await getChapterData(chapterId);
        if (!chapter) return;

        // 更新标题
        document.getElementById('chapterTitle').textContent = 
            `${chapter.book} - ${chapter.title}`;
        document.getElementById('chapterSubtitle').textContent = chapter.subtitle;
        document.getElementById('chapterIndicator').textContent = 
            `${chapterId + 1} / ${LOGIC_DATA.length}`;

        // 更新内容
        const contentDiv = document.getElementById('chapterContent');
        contentDiv.innerHTML = `
            <div class="content-english">
                <h3><i class="fas fa-globe-americas"></i> English Original</h3>
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
            <h3>AI Translation</h3>
            <p><strong>${chapter.title}</strong></p>
            <p>${chapter.translation}</p>
            <hr>
            <p><em>Note: This is AI-assisted translation for learning purposes. For academic use, please refer to official translations.</em></p>
        `;

        // 保存进度
        saveProgress();

        // 更新URL
        window.history.replaceState(null, '', `?chapter=${chapterId}`);
        
        // 预加载相邻章节
        preloadAdjacentChapters(chapterId);
        
    } catch (error) {
        console.error('Loading chapter failed:', error);
        showErrorState(chapterId);
    } finally {
        // 隐藏加载状态
        showLoadingState(false);
    }
}

// 预加载相邻章节
async function preloadAdjacentChapters(currentId) {
    const preloadIds = [currentId + 1, currentId + 2]; // 下一章和下下章
    
    for (const id of preloadIds) {
        if (id < LOGIC_DATA.length && !chapterCache[id]) {
            // 异步预加载，不阻塞主线程
            setTimeout(async () => {
                try {
                    await getChapterData(id);
                    console.log(`Preloaded Chapter ${id + 1}`);
                } catch (error) {
                    console.log(`Failed to preload Chapter ${id + 1}:`, error);
                }
            }, Math.random() * 1000); // 随机延迟，避免同时请求
        }
    }
}

// 显示/隐藏加载状态
function showLoadingState(isLoading) {
    const contentDiv = document.getElementById('chapterContent');
    if (isLoading) {
        contentDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: var(--accent);"></i>
                <p style="margin-top: 10px;">Loading...</p>
            </div>
        `;
    }
}

// 显示错误状态
function showErrorState(chapterId) {
    const contentDiv = document.getElementById('chapterContent');
    contentDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #ff453a;">
            <i class="fas fa-exclamation-triangle" style="font-size: 24px;"></i>
            <p style="margin-top: 10px;">Failed to load Chapter ${chapterId + 1}</p>
            <button onclick="loadChapter(${chapterId})" style="margin-top: 15px; padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 5px; cursor: pointer;">Retry</button>
        </div>
    `;
}

// 上一章（异步）
async function prevChapter() {
    if (currentChapter > 0) {
        await loadChapter(currentChapter - 1);
    }
}

// 下一章（异步）
async function nextChapter() {
    if (currentChapter < LOGIC_DATA.length - 1) {
        await loadChapter(currentChapter + 1);
    }
}

// 字体大小调整
function changeFontSize(delta) {
    fontSize = Math.max(12, Math.min(24, fontSize + delta));
    document.getElementById('fontSizeDisplay').textContent = `${fontSize}px`;
    document.querySelector('.chapter-content').style.fontSize = `${fontSize}px`;
    
    // 保存设置
    localStorage.setItem('logic-font-size', fontSize);
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
    localStorage.setItem('logic-night-mode', isNightMode);
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
        bookId: 'logic',
        chapterId: currentChapter,
        totalChapters: LOGIC_DATA.length,
        timestamp: Date.now()
    };
    localStorage.setItem('logic-progress', JSON.stringify(progress));
}

// 恢复设置
function restoreSettings() {
    // 字体大小
    const savedFontSize = localStorage.getItem('logic-font-size');
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        document.getElementById('fontSizeDisplay').textContent = `${fontSize}px`;
        document.querySelector('.chapter-content').style.fontSize = `${fontSize}px`;
    }

    // 夜间模式
    const savedNightMode = localStorage.getItem('logic-night-mode');
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