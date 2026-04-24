/* ===== 私人订制书窗 - 主逻辑 ===== */

(function() {
    'use strict';

    // ===== Source Code Protection =====
    const _pwd = 'JunGe@2026';
    let _devUnlocked = false;
    let _warningShown = false;

    function _initProtection() {
        // Disable right-click
        document.addEventListener('contextmenu', function(e) {
            if (_devUnlocked) return;
            e.preventDefault();
        });

        // Disable keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (_devUnlocked) return;
            if (e.key === 'F12') { e.preventDefault(); return; }
            if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return; }
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); return; }
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) { e.preventDefault(); return; }
        });

        // Disable text selection
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
        let devtoolsOpen = false;
        const threshold = 160;

        function check() {
            if (_devUnlocked) return;
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;

            const el = new Image();
            Object.defineProperty(el, 'id', {
                get: function() { devtoolsOpen = true; }
            });

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

    function _onDevToolsDetected() {
        if (_devUnlocked || _warningShown) return;
        _warningShown = true;
        const root = document.querySelector('body');
        if (root) root.style.filter = 'blur(8px)';
        _showAdminModal();
    }

    function _showAdminModal() {
        let modal = document.getElementById('admin-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'admin-modal';
            modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:100000;display:flex;align-items:center;justify-content:center;';
            modal.innerHTML = `
                <div style="background:rgba(30,30,30,0.98);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px 32px;max-width:360px;width:90%;">
                    <h3 style="font-size:18px;font-weight:600;margin-bottom:6px;color:#f5f5f7;">管理员验证</h3>
                    <p style="font-size:13px;color:#a1a1a6;margin-bottom:16px;">请输入管理员密码以解除防护</p>
                    <input type="password" id="adminPwd" placeholder="请输入密码" autocomplete="off"
                        style="width:100%;padding:10px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-size:14px;color:#f5f5f7;outline:none;font-family:inherit;margin-bottom:12px;">
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                        <button id="adminCancel" style="padding:8px 20px;border-radius:980px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:rgba(255,255,255,0.08);color:#a1a1a6;">取消</button>
                        <button id="adminConfirm" style="padding:8px 20px;border-radius:980px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:#2997ff;color:#fff;">确认</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        modal.style.display = 'flex';

        document.getElementById('adminCancel').onclick = function() {
            modal.style.display = 'none';
            document.querySelector('body').style.filter = '';
            _warningShown = false;
        };
        document.getElementById('adminConfirm').onclick = function() {
            const pwd = document.getElementById('adminPwd').value;
            if (pwd === _pwd) {
                _devUnlocked = true;
                _warningShown = false;
                modal.style.display = 'none';
                document.querySelector('body').style.filter = '';
                document.getElementById('adminPwd').value = '';
            } else {
                const inp = document.getElementById('adminPwd');
                inp.style.borderColor = '#ff453a';
                setTimeout(() => { inp.style.borderColor = ''; }, 1500);
            }
        };
        document.getElementById('adminPwd').onkeydown = function(e) {
            if (e.key === 'Enter') document.getElementById('adminConfirm').click();
        };
        document.getElementById('adminPwd').focus();
    }

    // ===== Base64 Content Encoding =====
    // Key HTML content is encoded and decoded at runtime
    function _b64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    function _b64Decode(b64) {
        try { return decodeURIComponent(escape(atob(b64))); } catch { return ''; }
    }

    // Encode the main body content
    const _bodyContent = _b64Encode(document.body.innerHTML);

    // ===== Main Application Logic =====
    document.addEventListener('DOMContentLoaded', () => {

        // Init protection
        _initProtection();

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
            const outerR = 88, innerR = isMajor ? 78 : 82;
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            tick.setAttribute('x1', 100 + outerR * Math.sin(angle));
            tick.setAttribute('y1', 100 - outerR * Math.cos(angle));
            tick.setAttribute('x2', 100 + innerR * Math.sin(angle));
            tick.setAttribute('y2', 100 - innerR * Math.cos(angle));
            tick.setAttribute('class', isMajor ? 'clock-tick clock-tick-major' : 'clock-tick');
            tick.setAttribute('stroke-width', isMajor ? '2' : '1');
            ticksGroup.appendChild(tick);
        }

        // 生成数字
        [{num:'12',angle:0},{num:'3',angle:90},{num:'6',angle:180},{num:'9',angle:270}].forEach(({num,angle}) => {
            const rad = angle * Math.PI / 180, r = 70;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', 100 + r * Math.sin(rad));
            text.setAttribute('y', 100 - r * Math.cos(rad));
            text.setAttribute('class', 'clock-number');
            text.textContent = num;
            numbersGroup.appendChild(text);
        });

        function updateAnalogClock() {
            const now = new Date();
            const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds(), ms = now.getMilliseconds();
            hourHand.setAttribute('transform', `rotate(${(h + m/60) * 30}, 100, 100)`);
            minuteHand.setAttribute('transform', `rotate(${(m + s/60) * 6}, 100, 100)`);
            secondHand.setAttribute('transform', `rotate(${(s + ms/1000) * 6}, 100, 100)`);
            const month = now.getMonth() + 1, day = now.getDate();
            const weekday = ['日','一','二','三','四','五','六'][now.getDay()];
            floatingClockDate.textContent = `${month}月${day}日 周${weekday}`;
        }
        updateAnalogClock();
        setInterval(updateAnalogClock, 50);

        // ===== 导航栏滚动效果 =====
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.style.background = window.scrollY > 100 ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.72)';
        }, { passive: true });

        // ===== 移动端菜单 =====
        const navToggle = document.getElementById('navToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileClose = document.getElementById('mobileClose');
        const overlay = document.getElementById('overlay');
        const mobileToolboxTrigger = document.querySelector('.mobile-toolbox-trigger');
        const mobileSubmenu = document.querySelector('.mobile-submenu');

        navToggle.addEventListener('click', () => { mobileMenu.classList.add('open'); overlay.classList.add('active'); });
        function closeMobile() { mobileMenu.classList.remove('open'); overlay.classList.remove('active'); }
        mobileClose.addEventListener('click', closeMobile);
        overlay.addEventListener('click', closeMobile);
        mobileToolboxTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            mobileSubmenu.classList.toggle('open');
            mobileToolboxTrigger.querySelector('i').style.transform = mobileSubmenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
        });
        mobileMenu.querySelectorAll('a').forEach(a => { if (!a.classList.contains('mobile-toolbox-trigger')) a.addEventListener('click', closeMobile); });

        // ===== 滚动动画 =====
        const fadeEls = document.querySelectorAll('.book-card, .feature-card, .contact-card');
        fadeEls.forEach(el => el.classList.add('fade-in'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), index * 60); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        fadeEls.forEach(el => observer.observe(el));

    });

})();
