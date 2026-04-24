/* ===== 私人订制书窗 - 主逻辑 ===== */

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
