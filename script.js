/* ===== 军哥的私人订制 - 主逻辑 ===== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 右上角圆形模拟时钟 =====
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    const floatingClockDate = document.getElementById('floatingClockDate');
    const ticksGroup = document.getElementById('clockTicks');
    const numbersGroup = document.getElementById('clockNumbers');

    // 生成表盘刻度
    for (let i = 0; i < 60; i++) {
        const angle = (i * 6) * Math.PI / 180;
        const isMajor = i % 5 === 0;
        const outerR = 88;
        const innerR = isMajor ? 78 : 82;
        const x1 = 100 + outerR * Math.sin(angle);
        const y1 = 100 - outerR * Math.cos(angle);
        const x2 = 100 + innerR * Math.sin(angle);
        const y2 = 100 - innerR * Math.cos(angle);

        const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tick.setAttribute('x1', x1);
        tick.setAttribute('y1', y1);
        tick.setAttribute('x2', x2);
        tick.setAttribute('y2', y2);
        tick.setAttribute('class', isMajor ? 'clock-tick clock-tick-major' : 'clock-tick');
        tick.setAttribute('stroke-width', isMajor ? '2' : '1');
        ticksGroup.appendChild(tick);
    }

    // 生成数字（12, 3, 6, 9）
    const numberPositions = [
        { num: '12', angle: 0 },
        { num: '3', angle: 90 },
        { num: '6', angle: 180 },
        { num: '9', angle: 270 }
    ];
    numberPositions.forEach(({ num, angle }) => {
        const rad = angle * Math.PI / 180;
        const r = 70;
        const x = 100 + r * Math.sin(rad);
        const y = 100 - r * Math.cos(rad);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('class', 'clock-number');
        text.textContent = num;
        numbersGroup.appendChild(text);
    });

    function updateAnalogClock() {
        const now = new Date();
        const h = now.getHours() % 12;
        const m = now.getMinutes();
        const s = now.getSeconds();
        const ms = now.getMilliseconds();

        // 精确角度（含平滑过渡）
        const secondAngle = (s + ms / 1000) * 6;        // 每秒6度
        const minuteAngle = (m + s / 60) * 6;            // 每分6度
        const hourAngle = (h + m / 60) * 30;             // 每小时30度

        hourHand.setAttribute('transform', `rotate(${hourAngle}, 100, 100)`);
        minuteHand.setAttribute('transform', `rotate(${minuteAngle}, 100, 100)`);
        secondHand.setAttribute('transform', `rotate(${secondAngle}, 100, 100)`);

        // 日期
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const weekday = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
        floatingClockDate.textContent = `${month}月${day}日 周${weekday}`;
    }

    updateAnalogClock();
    setInterval(updateAnalogClock, 50);

    // ===== 时区时钟 =====
    const tzBeijing = document.getElementById('tzBeijing');
    const tzNewYork = document.getElementById('tzNewYork');
    const tzLondon = document.getElementById('tzLondon');
    const tzTokyo = document.getElementById('tzTokyo');
    const miniClock = document.getElementById('miniClock');

    function updateTimezones() {
        const now = new Date();
        miniClock.textContent = now.toLocaleTimeString('zh-CN', { hour12: false });

        tzBeijing.textContent = now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false, hour: '2-digit', minute: '2-digit' });
        tzNewYork.textContent = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit' });
        tzLondon.textContent = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false, hour: '2-digit', minute: '2-digit' });
        tzTokyo.textContent = now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false, hour: '2-digit', minute: '2-digit' });
    }

    updateTimezones();
    setInterval(updateTimezones, 1000);

    // ===== 导航栏滚动效果 =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.92)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.72)';
        }
        lastScrollY = scrollY;
    }, { passive: true });

    // ===== 移动端菜单 =====
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const overlay = document.getElementById('overlay');
    const mobileToolboxTrigger = document.querySelector('.mobile-toolbox-trigger');
    const mobileSubmenu = document.querySelector('.mobile-submenu');

    navToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        overlay.classList.add('active');
    });

    function closeMobile() {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
    }

    mobileClose.addEventListener('click', closeMobile);
    overlay.addEventListener('click', closeMobile);

    mobileToolboxTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        mobileSubmenu.classList.toggle('open');
        const icon = mobileToolboxTrigger.querySelector('i');
        if (mobileSubmenu.classList.contains('open')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });

    // 移动菜单链接点击关闭
    mobileMenu.querySelectorAll('a').forEach(a => {
        if (!a.classList.contains('mobile-toolbox-trigger')) {
            a.addEventListener('click', closeMobile);
        }
    });

    // ===== 滚动动画 =====
    const fadeEls = document.querySelectorAll('.stat-card, .tool-card, .gallery-item, .contact-card');
    fadeEls.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(el => observer.observe(el));

    // ===== 数字滚动动画 =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateNumber(el, 0, target, 1500);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    function animateNumber(el, start, end, duration) {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(start + (end - start) * eased);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = end;
            }
        }
        requestAnimationFrame(update);
    }

    // ===== 速记本 =====
    const noteArea = document.getElementById('noteArea');
    const noteCount = document.getElementById('noteCount');

    // 加载本地存储
    const savedNote = localStorage.getItem('junge_note');
    if (savedNote) {
        noteArea.value = savedNote;
        noteCount.textContent = savedNote.length + ' 字';
    }

    noteArea.addEventListener('input', () => {
        noteCount.textContent = noteArea.value.length + ' 字';
    });

    // ===== 取色器 =====
    const colorPicker = document.getElementById('colorPicker');
    const colorPreview = document.getElementById('colorPreview');
    const colorHex = document.getElementById('colorHex');
    const colorRgb = document.getElementById('colorRgb');
    const colorHsl = document.getElementById('colorHsl');

    colorPicker.addEventListener('input', () => {
        const hex = colorPicker.value;
        colorPreview.style.background = hex;
        colorHex.textContent = hex;

        // 转RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        colorRgb.textContent = `${r}, ${g}, ${b}`;

        // 转HSL
        const hsl = rgbToHsl(r, g, b);
        colorHsl.textContent = `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;
    });

    // 点击复制
    [colorHex, colorRgb, colorHsl].forEach(el => {
        el.addEventListener('click', () => {
            navigator.clipboard.writeText(el.textContent).then(() => {
                const original = el.textContent;
                el.textContent = '已复制!';
                el.style.color = 'var(--accent-green)';
                setTimeout(() => {
                    el.textContent = original;
                    el.style.color = '';
                }, 1000);
            });
        });
    });

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

}); // DOMContentLoaded 结束


// ===== 计算器 =====
let calcExpression = '';
let calcDisplay = '0';
let calcJustEvaluated = false;

function calcInput(val) {
    const display = document.getElementById('calcDisplay');

    if (val === 'C') {
        calcExpression = '';
        calcDisplay = '0';
        calcJustEvaluated = false;
        display.textContent = calcDisplay;
        return;
    }

    if (val === '±') {
        if (calcDisplay !== '0') {
            if (calcDisplay.startsWith('-')) {
                calcDisplay = calcDisplay.slice(1);
            } else {
                calcDisplay = '-' + calcDisplay;
            }
            display.textContent = calcDisplay;
        }
        return;
    }

    if (val === '%') {
        calcDisplay = String(parseFloat(calcDisplay) / 100);
        display.textContent = calcDisplay;
        return;
    }

    if (val === '=') {
        try {
            let expr = calcExpression + calcDisplay;
            expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
            let result = Function('"use strict"; return (' + expr + ')')();
            if (!isFinite(result)) {
                calcDisplay = 'Error';
            } else {
                // 保留合理精度
                calcDisplay = parseFloat(result.toPrecision(12)).toString();
            }
            calcExpression = '';
            calcJustEvaluated = true;
        } catch (e) {
            calcDisplay = 'Error';
            calcExpression = '';
        }
        display.textContent = calcDisplay;
        return;
    }

    // 运算符
    if (['+', '-', '×', '÷'].includes(val)) {
        calcExpression += calcDisplay + val;
        calcDisplay = '0';
        calcJustEvaluated = false;
        display.textContent = calcExpression.replace(/×/g, '×').replace(/÷/g, '÷');
        return;
    }

    // 数字
    if (calcJustEvaluated) {
        calcDisplay = val;
        calcJustEvaluated = false;
    } else {
        if (calcDisplay === '0' && val !== '.') {
            calcDisplay = val;
        } else {
            calcDisplay += val;
        }
    }
    display.textContent = calcDisplay;
}


// ===== 速记本保存 =====
function saveNote() {
    const noteArea = document.getElementById('noteArea');
    localStorage.setItem('junge_note', noteArea.value);
    const btn = document.querySelector('.note-save');
    const originalText = btn.textContent;
    btn.textContent = '已保存 ✓';
    btn.style.background = 'var(--accent-green)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 1500);
}


// ===== Base64 编解码 =====
function b64Encode() {
    const input = document.getElementById('b64Input').value;
    const output = document.getElementById('b64Output');
    try {
        output.value = btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
        output.value = '编码错误: ' + e.message;
    }
}

function b64Decode() {
    const input = document.getElementById('b64Input').value;
    const output = document.getElementById('b64Output');
    try {
        output.value = decodeURIComponent(escape(atob(input)));
    } catch (e) {
        output.value = '解码错误: 输入不是有效的 Base64 字符串';
    }
}


// ===== JSON 格式化 =====
function jsonFormat() {
    const input = document.getElementById('jsonInput').value;
    const output = document.getElementById('jsonOutput');
    try {
        const obj = JSON.parse(input);
        output.value = JSON.stringify(obj, null, 2);
    } catch (e) {
        output.value = '格式化错误: ' + e.message;
    }
}

function jsonMinify() {
    const input = document.getElementById('jsonInput').value;
    const output = document.getElementById('jsonOutput');
    try {
        const obj = JSON.parse(input);
        output.value = JSON.stringify(obj);
    } catch (e) {
        output.value = '压缩错误: ' + e.message;
    }
}
