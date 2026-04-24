/* ===== 私人订制书窗 - 主逻辑 ===== */

(function() {
    'use strict';

    // ===== Source Code Protection =====
    const _pwd = 'JunGe@2026';
    let _devUnlocked = false;
    let _warningShown = false;

    function _initProtection() {
        document.addEventListener('contextmenu', function(e) {
            if (_devUnlocked) return;
            e.preventDefault();
        });
        document.addEventListener('keydown', function(e) {
            if (_devUnlocked) return;
            if (e.key === 'F12') { e.preventDefault(); return; }
            if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return; }
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); return; }
            if (e.ctrlKey && (e.key === 's' || e.key === 'S')) { e.preventDefault(); return; }
        });
        document.addEventListener('selectstart', function(e) {
            if (_devUnlocked) return;
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
            e.preventDefault();
        });
        document.addEventListener('dragstart', function(e) {
            if (_devUnlocked) return;
            e.preventDefault();
        });

        let devtoolsOpen = false;
        const threshold = 160;
        function check() {
            if (_devUnlocked) return;
            const widthDiff = window.outerWidth - window.innerWidth > threshold;
            const heightDiff = window.outerHeight - window.innerHeight > threshold;
            const el = new Image();
            Object.defineProperty(el, 'id', { get: function() { devtoolsOpen = true; } });
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
        document.querySelector('body').style.filter = 'blur(8px)';
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
                        style="width:100%;padding:10px 14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-size:16px;color:#f5f5f7;outline:none;font-family:inherit;margin-bottom:12px;">
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                        <button id="adminCancel" style="padding:10px 20px;border-radius:980px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:rgba(255,255,255,0.08);color:#a1a1a6;min-height:44px;">取消</button>
                        <button id="adminConfirm" style="padding:10px 20px;border-radius:980px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:#2997ff;color:#fff;min-height:44px;">确认</button>
                    </div>
                </div>`;
            document.body.appendChild(modal);
        }
        modal.style.display = 'flex';
        document.getElementById('adminCancel').onclick = function() {
            modal.style.display = 'none'; document.querySelector('body').style.filter = ''; _warningShown = false;
        };
        document.getElementById('adminConfirm').onclick = function() {
            if (document.getElementById('adminPwd').value === _pwd) {
                _devUnlocked = true; _warningShown = false;
                modal.style.display = 'none'; document.querySelector('body').style.filter = '';
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

    // ===== Main Logic =====
    document.addEventListener('DOMContentLoaded', () => {

        _initProtection();

        // ===== 轮播图 =====
        const track = document.getElementById('carouselTrack');
        const dotsContainer = document.getElementById('carouselDots');
        const slides = track.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        let autoPlayTimer = null;

        // 生成指示点
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${index * 100}%)`;
            dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        // 自动轮播
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, 4000);
        }
        function stopAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        }

        startAutoPlay();

        // 触摸滑动支持
        let touchStartX = 0;
        const carousel = document.getElementById('carousel');
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoPlay();
        }, { passive: true });
        carousel.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff < 0 && currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
                else if (diff > 0 && currentSlide > 0) goToSlide(currentSlide - 1);
            }
            startAutoPlay();
        }, { passive: true });

        // ===== 搜索功能 =====
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        const feedEmpty = document.getElementById('feedEmpty');
        const feedCards = document.querySelectorAll('.feed-card');
        const feedCategories = document.querySelectorAll('.feed-category');

        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            searchClear.classList.toggle('show', query.length > 0);

            if (!query) {
                // 清空搜索，显示全部
                feedCards.forEach(c => c.style.display = '');
                feedCategories.forEach(c => c.style.display = '');
                feedEmpty.style.display = 'none';
                return;
            }

            let hasResult = false;
            feedCategories.forEach(cat => {
                const cards = cat.querySelectorAll('.feed-card');
                let catHasVisible = false;
                cards.forEach(card => {
                    const title = (card.querySelector('h4')?.textContent || '').toLowerCase();
                    const titleCn = (card.querySelector('.feed-title-cn')?.textContent || '').toLowerCase();
                    const desc = (card.querySelector('.feed-desc')?.textContent || '').toLowerCase();
                    const author = (card.querySelector('.feed-meta')?.textContent || '').toLowerCase();
                    const match = title.includes(query) || titleCn.includes(query) || desc.includes(query) || author.includes(query);
                    card.style.display = match ? '' : 'none';
                    if (match) catHasVisible = true;
                });
                cat.style.display = catHasVisible ? '' : 'none';
                if (catHasVisible) hasResult = true;
            });

            feedEmpty.style.display = hasResult ? 'none' : '';
        });

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        });

        // ===== 微信弹窗 =====
        const wechatTrigger = document.getElementById('wechatTrigger');
        const wechatModal = document.getElementById('wechatModal');
        const wechatModalClose = document.getElementById('wechatModalClose');

        wechatTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            wechatModal.classList.add('show');
        });
        wechatModalClose.addEventListener('click', () => {
            wechatModal.classList.remove('show');
        });
        wechatModal.addEventListener('click', (e) => {
            if (e.target === wechatModal) wechatModal.classList.remove('show');
        });

        // ===== 底部导航栏高亮 =====
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
        const sections = [
            { id: 'top', el: null },
            { id: 'contentFeed', el: document.getElementById('contentFeed') },
            { id: 'about', el: document.getElementById('about') },
        ];

        function updateBottomNav() {
            const scrollY = window.scrollY + 100;
            let activeIdx = 0;
            sections.forEach((s, i) => {
                if (s.el && s.el.offsetTop <= scrollY) activeIdx = i;
            });
            bottomNavItems.forEach((item, i) => {
                item.classList.toggle('active', i === activeIdx);
            });
        }

        window.addEventListener('scroll', updateBottomNav, { passive: true });

        // ===== 滚动动画 =====
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

        feedCards.forEach((card, i) => {
            card.style.transitionDelay = (i % 6) * 60 + 'ms';
            observer.observe(card);
        });

    });

})();
