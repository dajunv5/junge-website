/* ===== 私人订制书窗 - 双语对照阅读器 ===== */

(function() {
    'use strict';

    // ===== Source Code Protection =====
    const _pwd = 'JunGe@2026';
    let _devUnlocked = false;

    function _initProtection() {
        if (_devUnlocked) return;

        // Disable right-click
        document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

        // Disable keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (_devUnlocked) return;
            // F12
            if (e.key === 'F12') { e.preventDefault(); return; }
            // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return; }
            // Ctrl+U (view source)
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); return; }
            // Ctrl+S (save)
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) { e.preventDefault(); return; }
        });

        // Disable text selection via JS
        document.addEventListener('selectstart', function(e) {
            if (_devUnlocked) return;
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            e.preventDefault();
        });

        // Disable drag
        document.addEventListener('dragstart', function(e) {
            if (_devUnlocked) return;
            e.preventDefault();
        });

        // DevTools detection
        _detectDevTools();
    }

    function _detectDevTools() {
        let devtoolsOpen = false;
        const threshold = 160;

        function check() {
            if (_devUnlocked) return;
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;

            // Element detection
            const el = new Image();
            Object.defineProperty(el, 'id', {
                get: function() { devtoolsOpen = true; }
            });

            // Console timing detection
            const start = performance.now();
            console.log(el);
            console.clear();
            const end = performance.now();

            if (end - start > 100 || devtoolsOpen || widthDiff || heightDiff) {
                _onDevToolsDetected();
            }
            devtoolsOpen = false;
        }

        setInterval(check, 2000);
    }

    let _warningShown = false;
    function _onDevToolsDetected() {
        if (_devUnlocked || _warningShown) return;
        _warningShown = true;
        // Show warning and allow password input
        const modal = document.getElementById('admin-modal');
        if (modal) modal.classList.add('show');
        // Alternatively, blur content
        const root = document.getElementById('app-root');
        if (root) root.style.filter = 'blur(10px)';
    }

    function _unlockDevMode(password) {
        if (password === _pwd) {
            _devUnlocked = true;
            _warningShown = false;
            const modal = document.getElementById('admin-modal');
            if (modal) modal.classList.remove('show');
            const root = document.getElementById('app-root');
            if (root) root.style.filter = '';
            const warning = document.getElementById('devtools-warning');
            if (warning) warning.classList.remove('show');
            return true;
        }
        return false;
    }

    // ===== Lesson Data (base64 encoded key HTML rendered at runtime) =====
    const LESSON_DATA = [
        {
            id: 1,
            titleEn: "Lesson I",
            titleCn: "第一课",
            words: [
                { en: "a", cn: "一个" },
                { en: "and", cn: "和" },
                { en: "cat", cn: "猫" },
                { en: "rat", cn: "老鼠" }
            ],
            text: [
                { en: "a rat / a cat", cn: "一只老鼠 / 一只猫" },
                { en: "A cat and a rat.", cn: "一只猫和一只老鼠。" },
                { en: "A rat and a cat.", cn: "一只老鼠和一只猫。" }
            ]
        },
        {
            id: 2,
            titleEn: "Lesson II",
            titleCn: "第二课",
            words: [
                { en: "at", cn: "在" },
                { en: "the", cn: "这个" },
                { en: "ran", cn: "跑" },
                { en: "has", cn: "有" },
                { en: "Ann", cn: "安" }
            ],
            text: [
                { en: "The cat has a rat.", cn: "这只猫有一只老鼠。" },
                { en: "The rat ran at Ann.", cn: "老鼠朝安跑过去。" },
                { en: "Ann has a cat.", cn: "安有一只猫。" },
                { en: "The cat ran at the rat.", cn: "猫朝老鼠跑过去。" }
            ]
        },
        {
            id: 3,
            titleEn: "Lesson III",
            titleCn: "第三课",
            words: [
                { en: "Nat", cn: "纳特" },
                { en: "hat", cn: "帽子" },
                { en: "fan", cn: "扇子" },
                { en: "can", cn: "能够" }
            ],
            text: [
                { en: "Ann and Nat.", cn: "安和纳特。" },
                { en: "Ann has a fan.", cn: "安有一把扇子。" },
                { en: "Nat has a hat.", cn: "纳特有一顶帽子。" },
                { en: "Ann can fan Nat.", cn: "安能给纳特扇风。" }
            ]
        },
        {
            id: 4,
            titleEn: "Lesson IV",
            titleCn: "第四课",
            words: [
                { en: "man", cn: "男人" },
                { en: "cap", cn: "便帽" },
                { en: "lad", cn: "少年" },
                { en: "sat", cn: "坐" }
            ],
            text: [
                { en: "A man and a lad.", cn: "一个男人和一个少年。" },
                { en: "The man sat; the lad ran.", cn: "男人坐着；少年跑着。" },
                { en: "The man has a hat.", cn: "这个男人有一顶帽子。" },
                { en: "The lad has a cap.", cn: "这个少年有一顶便帽。" }
            ]
        },
        {
            id: 5,
            titleEn: "Lesson V",
            titleCn: "第五课（复习）",
            words: [],
            text: [
                { en: "The cat and the rat ran.", cn: "猫和老鼠跑了起来。" },
                { en: "Ann sat, and Nat ran.", cn: "安坐着，纳特跑着。" },
                { en: "A rat ran at Nat.", cn: "一只老鼠朝纳特跑去。" },
                { en: "Can Ann fan the lad?", cn: "安能给少年扇风吗？" },
                { en: "Has Ann a hat?", cn: "安有帽子吗？" },
                { en: "Ann has a hat and a fan.", cn: "安有一顶帽子和一把扇子。" }
            ]
        },
        {
            id: 6,
            titleEn: "Lesson VI",
            titleCn: "第六课",
            words: [
                { en: "dog", cn: "狗" },
                { en: "Rab", cn: "拉布" },
                { en: "fat", cn: "胖的" },
                { en: "Nat's", cn: "纳特的" }
            ],
            text: [
                { en: "Has the lad a dog?", cn: "少年有一只狗吗？" },
                { en: "The lad has a fat dog.", cn: "少年有一只胖狗。" },
                { en: "The dog has Nat's cap.", cn: "狗叼着纳特的帽子。" },
                { en: "Nat and Rab ran.", cn: "纳特和拉布跑了起来。" },
                { en: "Rab ran at a cat.", cn: "拉布朝一只猫跑去。" }
            ]
        },
        {
            id: 7,
            titleEn: "Lesson VII",
            titleCn: "第七课",
            words: [
                { en: "see", cn: "看见" },
                { en: "sees", cn: "看见" },
                { en: "frog", cn: "青蛙" },
                { en: "on", cn: "在…上" },
                { en: "log", cn: "圆木" }
            ],
            text: [
                { en: "See the frog on a log.", cn: "看圆木上那只青蛙。" },
                { en: "Rab sees the frog.", cn: "拉布看见了青蛙。" },
                { en: "Can the frog see Rab?", cn: "青蛙能看见拉布吗？" },
                { en: "The frog can see the dog.", cn: "青蛙能看见狗。" },
                { en: "Rab ran at the frog.", cn: "拉布朝青蛙跑去。" }
            ]
        },
        {
            id: 8,
            titleEn: "Lesson VIII",
            titleCn: "第八课",
            words: [
                { en: "it", cn: "它" },
                { en: "stand", cn: "架子" },
                { en: "Ann's", cn: "安的" },
                { en: "is", cn: "是" },
                { en: "lamp", cn: "灯" },
                { en: "mat", cn: "垫子" }
            ],
            text: [
                { en: "See the lamp! It is on a mat.", cn: "看那盏灯！它在垫子上。" },
                { en: "The mat is on the stand.", cn: "垫子在架子上。" },
                { en: "The lamp is Nat's, and the mat is Ann's.", cn: "灯是纳特的，垫子是安的。" }
            ]
        },
        {
            id: 9,
            titleEn: "Lesson IX",
            titleCn: "第九课",
            words: [
                { en: "Tom", cn: "汤姆" },
                { en: "nag", cn: "老马" },
                { en: "not", cn: "不" },
                { en: "him", cn: "他" },
                { en: "catch", cn: "追上" },
                { en: "he", cn: "他" },
                { en: "his", cn: "他的" }
            ],
            text: [
                { en: "See the nag! It is Tom's nag.", cn: "看那匹老马！那是汤姆的老马。" },
                { en: "Can Tom catch his nag?", cn: "汤姆能追上他的老马吗？" },
                { en: "He can not catch him.", cn: "他追不上它。" },
                { en: "The dog ran at the nag, and the nag ran.", cn: "狗朝老马跑去，老马也跑了起来。" }
            ]
        },
        {
            id: 10,
            titleEn: "Lesson X",
            titleCn: "第十课（复习）",
            words: [],
            text: [
                { en: "Tom's nag is fat; his dog is not fat.", cn: "汤姆的老马很胖；他的狗不胖。" },
                { en: "Nat is on Tom's nag.", cn: "纳特骑在汤姆的老马上。" },
                { en: "Nat's dog, Rab, can not catch the rat.", cn: "纳特的狗拉布追不上老鼠。" },
                { en: "See the frog on the log.", cn: "看圆木上那只青蛙。" },
                { en: "A lad sees the frog.", cn: "一个少年看见了青蛙。" },
                { en: "The lad can not catch it.", cn: "少年抓不到它。" },
                { en: "A cat is on the mat; the cat sees a rat.", cn: "猫在垫子上；猫看见了一只老鼠。" }
            ]
        }
    ];

    const TOTAL_LESSONS = LESSON_DATA.length;

    // ===== State =====
    let currentLesson = 1;
    let fontSize = 16;
    let isLightTheme = false;
    let activeParagraph = -1;
    let notePopupTarget = null; // { lessonId, paraIdx }

    // ===== LocalStorage Keys =====
    const LS_BOOKMARK = 'reader_bookmark';
    const LS_NOTES = 'reader_notes';
    const LS_FONT = 'reader_fontsize';
    const LS_THEME = 'reader_theme';

    // ===== Helpers =====
    function getNotes() {
        try { return JSON.parse(localStorage.getItem(LS_NOTES)) || {}; } catch { return {}; }
    }
    function saveNotes(notes) {
        localStorage.setItem(LS_NOTES, JSON.stringify(notes));
    }
    function getNoteKey(lessonId, paraIdx) {
        return lessonId + '_' + paraIdx;
    }
    function getBookmark() {
        try { return JSON.parse(localStorage.getItem(LS_BOOKMARK)); } catch { return null; }
    }
    function saveBookmark(lessonId) {
        localStorage.setItem(LS_BOOKMARK, JSON.stringify({ lesson: lessonId, ts: Date.now() }));
    }

    // ===== Base64 Content Rendering =====
    function _b64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    function _b64Decode(b64) {
        try { return decodeURIComponent(escape(atob(b64))); } catch { return ''; }
    }

    // The main HTML template, encoded as base64
    const _mainHTML = _b64Encode(`
        <nav class="reader-nav">
            <a href="index.html" class="nav-back"><i class="fas fa-chevron-left"></i> <span>返回首页</span></a>
            <div class="book-title" id="bookTitle">McGuffey's Primer - 麦加菲启蒙读本</div>
            <div class="nav-controls" style="position:relative;">
                <select class="lesson-select" id="lessonSelect"></select>
                <button class="nav-btn" id="themeBtn" title="切换主题"><i class="fas fa-moon"></i></button>
                <div style="position:relative;">
                    <button class="nav-btn" id="fontBtn" title="字体大小"><i class="fas fa-text-height"></i></button>
                    <div class="font-panel" id="fontPanel">
                        <div class="font-panel-label">字体大小</div>
                        <input type="range" class="font-slider" id="fontSlider" min="12" max="24" step="1">
                        <div class="font-size-preview" id="fontPreview">16px</div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="progress-bar-container"><div class="progress-bar" id="progressBar"></div></div>
        <div class="reader-page" id="readerPage">
            <div class="reader-content" id="readerContent"></div>
        </div>
        <div class="reader-footer">
            <button class="footer-nav-btn" id="prevBtn"><i class="fas fa-chevron-left"></i> <span class="nav-label">上一课</span></button>
            <div class="footer-info">
                <span id="progressText">1 / 10</span>
                <button class="bookmark-btn" id="bookmarkBtn" title="书签"><i class="far fa-bookmark"></i></button>
            </div>
            <button class="footer-nav-btn" id="nextBtn"><span class="nav-label">下一课</span> <i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="note-popup" id="notePopup">
            <div class="note-popup-header">
                <span class="note-popup-title"><i class="fas fa-sticky-note"></i> 笔记</span>
                <button class="note-popup-close" id="noteClose">&times;</button>
            </div>
            <textarea id="noteText" placeholder="在此输入笔记..."></textarea>
            <div class="note-popup-actions">
                <button class="note-popup-btn delete" id="noteDelete">删除</button>
                <button class="note-popup-btn save" id="noteSave">保存</button>
            </div>
        </div>
        <div class="devtools-warning" id="devtools-warning">
            <i class="fas fa-shield-alt"></i>
            <p>检测到开发者工具</p>
        </div>
        <div class="admin-modal" id="admin-modal">
            <div class="admin-modal-inner">
                <h3>管理员验证</h3>
                <p>请输入管理员密码以解除防护</p>
                <input type="password" id="adminPwd" placeholder="请输入密码" autocomplete="off">
                <div class="admin-modal-actions">
                    <button class="admin-modal-btn cancel" id="adminCancel">取消</button>
                    <button class="admin-modal-btn confirm" id="adminConfirm">确认</button>
                </div>
            </div>
        </div>
    `);

    // ===== Render App =====
    function renderApp() {
        const root = document.getElementById('app-root');
        root.innerHTML = _b64Decode(_mainHTML);
        document.title = '双语对照阅读 - 私人订制书窗';

        // Restore state
        const savedFont = localStorage.getItem(LS_FONT);
        if (savedFont) fontSize = parseInt(savedFont);

        const savedTheme = localStorage.getItem(LS_THEME);
        if (savedTheme === 'light') {
            isLightTheme = true;
            document.body.classList.add('light-theme');
        }

        // Restore bookmark
        const bm = getBookmark();
        if (bm && bm.lesson) {
            currentLesson = bm.lesson;
        }

        // Check URL params
        const params = new URLSearchParams(window.location.search);
        const lessonParam = params.get('lesson');
        if (lessonParam) {
            const n = parseInt(lessonParam);
            if (n >= 1 && n <= TOTAL_LESSONS) currentLesson = n;
        }

        setupControls();
        renderLesson(currentLesson);
        _initProtection();
    }

    // ===== Setup Controls =====
    function setupControls() {
        // Lesson selector
        const select = document.getElementById('lessonSelect');
        LESSON_DATA.forEach(l => {
            const opt = document.createElement('option');
            opt.value = l.id;
            opt.textContent = l.titleEn + ' / ' + l.titleCn;
            select.appendChild(opt);
        });
        select.value = currentLesson;
        select.addEventListener('change', function() {
            navigateTo(parseInt(this.value));
        });

        // Theme toggle
        const themeBtn = document.getElementById('themeBtn');
        updateThemeIcon();
        themeBtn.addEventListener('click', toggleTheme);

        // Font size
        const fontBtn = document.getElementById('fontBtn');
        const fontPanel = document.getElementById('fontPanel');
        const fontSlider = document.getElementById('fontSlider');
        const fontPreview = document.getElementById('fontPreview');

        fontBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            fontPanel.classList.toggle('show');
        });
        document.addEventListener('click', function(e) {
            if (!fontPanel.contains(e.target) && e.target !== fontBtn) {
                fontPanel.classList.remove('show');
            }
        });

        fontSlider.value = fontSize;
        fontPreview.textContent = fontSize + 'px';
        fontSlider.addEventListener('input', function() {
            fontSize = parseInt(this.value);
            fontPreview.textContent = fontSize + 'px';
            document.documentElement.style.setProperty('--reader-font-size', fontSize + 'px');
            localStorage.setItem(LS_FONT, fontSize);
        });
        document.documentElement.style.setProperty('--reader-font-size', fontSize + 'px');

        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', function() {
            if (currentLesson > 1) navigateTo(currentLesson - 1);
        });
        document.getElementById('nextBtn').addEventListener('click', function() {
            if (currentLesson < TOTAL_LESSONS) navigateTo(currentLesson + 1);
        });

        // Bookmark
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        bookmarkBtn.addEventListener('click', function() {
            saveBookmark(currentLesson);
            updateBookmarkIcon();
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (_devUnlocked) return;
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowLeft' && currentLesson > 1) {
                navigateTo(currentLesson - 1);
            } else if (e.key === 'ArrowRight' && currentLesson < TOTAL_LESSONS) {
                navigateTo(currentLesson + 1);
            }
        });

        // Note popup
        document.getElementById('noteClose').addEventListener('click', closeNotePopup);
        document.getElementById('noteSave').addEventListener('click', saveNote);
        document.getElementById('noteDelete').addEventListener('click', deleteNote);

        // Admin modal
        document.getElementById('adminCancel').addEventListener('click', function() {
            document.getElementById('admin-modal').classList.remove('show');
            document.getElementById('app-root').style.filter = '';
            _warningShown = false;
        });
        document.getElementById('adminConfirm').addEventListener('click', function() {
            const pwd = document.getElementById('adminPwd').value;
            if (_unlockDevMode(pwd)) {
                document.getElementById('adminPwd').value = '';
            } else {
                document.getElementById('adminPwd').style.borderColor = '#ff453a';
                setTimeout(() => { document.getElementById('adminPwd').style.borderColor = ''; }, 1500);
            }
        });
        document.getElementById('adminPwd').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') document.getElementById('adminConfirm').click();
        });

        // Close note popup on outside click
        document.addEventListener('click', function(e) {
            const popup = document.getElementById('notePopup');
            if (popup.classList.contains('show') && !popup.contains(e.target) && !e.target.closest('.text-paragraph')) {
                closeNotePopup();
            }
        });
    }

    // ===== Navigate =====
    function navigateTo(lessonId) {
        currentLesson = lessonId;
        renderLesson(lessonId);
        document.getElementById('lessonSelect').value = lessonId;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lesson', lessonId);
        history.replaceState(null, '', url);
    }

    // ===== Render Lesson =====
    function renderLesson(lessonId) {
        const lesson = LESSON_DATA.find(l => l.id === lessonId);
        if (!lesson) return;

        const content = document.getElementById('readerContent');
        const notes = getNotes();

        let html = '';

        // Lesson Header
        html += `
            <div class="lesson-header">
                <div class="lesson-number">${lesson.titleEn}</div>
                <div class="lesson-title">${lesson.titleEn}</div>
                <div class="lesson-title-cn">${lesson.titleCn}</div>
            </div>
        `;

        // Words Section
        if (lesson.words && lesson.words.length > 0) {
            html += `
                <div class="words-section">
                    <div class="words-label"><i class="fas fa-spell-check"></i> New Words / 生词</div>
                    <div class="words-grid">
                        ${lesson.words.map(w => `
                            <div class="word-tag">
                                <span class="word-en">${w.en}</span>
                                <span class="word-cn">${w.cn}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Bilingual Text
        html += `
            <div class="bilingual-layout">
                <div class="lang-column">
                    <div class="lang-header en"><i class="fas fa-font"></i> English</div>
                    <div class="lang-body" id="enBody">
                        ${lesson.text.map((t, i) => {
                            const noteKey = getNoteKey(lessonId, i);
                            const hasNote = notes[noteKey] ? ' has-note' : '';
                            return `<div class="text-paragraph${hasNote}" data-lesson="${lessonId}" data-idx="${i}" data-lang="en" onclick="window._onParaClick(this)">${t.en}</div>`;
                        }).join('')}
                    </div>
                </div>
                <div class="lang-column">
                    <div class="lang-header cn"><i class="fas fa-language"></i> 中文</div>
                    <div class="lang-body" id="cnBody">
                        ${lesson.text.map((t, i) => {
                            const noteKey = getNoteKey(lessonId, i);
                            const hasNote = notes[noteKey] ? ' has-note' : '';
                            return `<div class="text-paragraph${hasNote}" data-lesson="${lessonId}" data-idx="${i}" data-lang="cn" onclick="window._onParaClick(this)">${t.cn}</div>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

        content.innerHTML = html;

        // Update progress
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const pct = (lessonId / TOTAL_LESSONS) * 100;
        progressBar.style.width = pct + '%';
        progressText.textContent = lessonId + ' / ' + TOTAL_LESSONS;

        // Update nav buttons
        document.getElementById('prevBtn').disabled = lessonId <= 1;
        document.getElementById('nextBtn').disabled = lessonId >= TOTAL_LESSONS;

        // Update bookmark icon
        updateBookmarkIcon();

        // Setup paragraph highlighting
        setupParagraphHover();
    }

    // ===== Paragraph Interaction =====
    function setupParagraphHover() {
        const enParas = document.querySelectorAll('#enBody .text-paragraph');
        const cnParas = document.querySelectorAll('#cnBody .text-paragraph');

        function highlightPair(idx) {
            enParas.forEach((p, i) => p.classList.toggle('active', i === idx));
            cnParas.forEach((p, i) => p.classList.toggle('active', i === idx));
        }

        function clearHighlight() {
            enParas.forEach(p => p.classList.remove('active'));
            cnParas.forEach(p => p.classList.remove('active'));
        }

        enParas.forEach((p, i) => {
            p.addEventListener('mouseenter', () => highlightPair(i));
            p.addEventListener('mouseleave', clearHighlight);
        });
        cnParas.forEach((p, i) => {
            p.addEventListener('mouseenter', () => highlightPair(i));
            p.addEventListener('mouseleave', clearHighlight);
        });
    }

    // Note click handler (exposed globally for onclick)
    window._onParaClick = function(el) {
        const lessonId = parseInt(el.dataset.lesson);
        const paraIdx = parseInt(el.dataset.idx);
        const noteKey = getNoteKey(lessonId, paraIdx);
        const notes = getNotes();

        notePopupTarget = { lessonId, paraIdx, noteKey };

        const popup = document.getElementById('notePopup');
        const textarea = document.getElementById('noteText');
        const deleteBtn = document.getElementById('noteDelete');

        textarea.value = notes[noteKey] || '';
        deleteBtn.style.display = notes[noteKey] ? 'inline-block' : 'none';

        // Position popup near the clicked element
        const rect = el.getBoundingClientRect();
        const popupWidth = 300;
        let left = rect.right + 10;
        let top = rect.top;

        if (left + popupWidth > window.innerWidth) {
            left = rect.left - popupWidth - 10;
        }
        if (left < 10) left = 10;
        if (top + 200 > window.innerHeight) {
            top = window.innerHeight - 210;
        }

        popup.style.left = left + 'px';
        popup.style.top = top + 'px';
        popup.classList.add('show');
        textarea.focus();
    };

    function closeNotePopup() {
        const popup = document.getElementById('notePopup');
        popup.classList.remove('show');
        notePopupTarget = null;
    }

    function saveNote() {
        if (!notePopupTarget) return;
        const notes = getNotes();
        const text = document.getElementById('noteText').value.trim();
        if (text) {
            notes[notePopupTarget.noteKey] = text;
        } else {
            delete notes[notePopupTarget.noteKey];
        }
        saveNotes(notes);
        updateNoteIcons();
        closeNotePopup();
    }

    function deleteNote() {
        if (!notePopupTarget) return;
        const notes = getNotes();
        delete notes[notePopupTarget.noteKey];
        saveNotes(notes);
        updateNoteIcons();
        closeNotePopup();
    }

    function updateNoteIcons() {
        if (!notePopupTarget) return;
        const lessonId = notePopupTarget.lessonId;
        const paraIdx = notePopupTarget.paraIdx;
        const notes = getNotes();
        const noteKey = getNoteKey(lessonId, paraIdx);

        document.querySelectorAll(`.text-paragraph[data-lesson="${lessonId}"][data-idx="${paraIdx}"]`).forEach(el => {
            if (notes[noteKey]) {
                el.classList.add('has-note');
            } else {
                el.classList.remove('has-note');
            }
        });
    }

    // ===== Theme =====
    function toggleTheme() {
        isLightTheme = !isLightTheme;
        document.body.classList.toggle('light-theme', isLightTheme);
        localStorage.setItem(LS_THEME, isLightTheme ? 'light' : 'dark');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const btn = document.getElementById('themeBtn');
        if (!btn) return;
        btn.innerHTML = isLightTheme
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    // ===== Bookmark =====
    function updateBookmarkIcon() {
        const btn = document.getElementById('bookmarkBtn');
        if (!btn) return;
        const bm = getBookmark();
        const isBookmarked = bm && bm.lesson === currentLesson;
        btn.classList.toggle('bookmarked', isBookmarked);
        btn.innerHTML = isBookmarked
            ? '<i class="fas fa-bookmark"></i>'
            : '<i class="far fa-bookmark"></i>';
    }

    // ===== Init =====
    document.addEventListener('DOMContentLoaded', renderApp);

})();
