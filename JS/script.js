/**
 * ملف جافاسكريبت محسن لبورتفوليو عمر الأحمد
 * يتضمن وظائف تفاعلية وتأثيرات حركية
 */

// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع الوظائف
    initMenuToggle();
    initScrollAnimation();
    initTypedText();
    initPortfolioFilter();
    initLightbox();
    initVideoPlayer();
    initScrollReveal();
    initStickyHeader();
});

// تهيئة زر القائمة للأجهزة المحمولة
function initMenuToggle() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على أي رابط
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
}

// تهيئة تأثيرات الظهور عند التمرير
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// تهيئة النص المكتوب تلقائياً
function initTypedText() {
    const typed = document.querySelector('.texts');
    if (typed) {
        new Typed('.texts', {
            strings: ['مسؤول إعلامي', 'مصور فوتوغرافي', 'مصمم جرافيك', 'مونتير'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }
}

// تهيئة فلترة معرض الأعمال
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الأزرار
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // إضافة الفئة النشطة للزر المنقور
                this.classList.add('active');
                
                // الحصول على فئة الفلتر
                const filterValue = this.getAttribute('data-filter');
                
                // فلترة العناصر
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }
}

// تهيئة نافذة عرض الصور المكبرة
function initLightbox() {
    const galleryViews = document.querySelectorAll('.gallery-view');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('#lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (galleryViews.length > 0 && lightbox && lightboxImg && closeLightbox) {
        galleryViews.forEach(view => {
            view.addEventListener('click', function(e) {
                e.preventDefault();
                
                const imgSrc = this.getAttribute('href');
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                
                // منع التمرير في الصفحة الخلفية
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // إغلاق النافذة عند النقر خارج الصورة
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// تهيئة مشغل الفيديو
function initVideoPlayer() {
    // تعريف دالة تشغيل/إيقاف الفيديو
    window.togglePlay = function(video) {
        if (video.paused) {
            // إيقاف جميع الفيديوهات الأخرى
            document.querySelectorAll('video').forEach(v => {
                if (v !== video) {
                    v.pause();
                    // إظهار الغطاء مرة أخرى
                    const overlay = v.parentElement.querySelector('.video-overlay');
                    if (overlay) {
                        overlay.style.opacity = '1';
                    }
                }
            });
            
            // تشغيل الفيديو المحدد
            video.play();
            
            // إخفاء الغطاء
            const overlay = video.parentElement.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        } else {
            // إيقاف الفيديو
            video.pause();
            
            // إظهار الغطاء مرة أخرى
            const overlay = video.parentElement.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        }
    };
}

// تهيئة تأثيرات الظهور عند التمرير
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            reset: true,
            distance: '80px',
            duration: 2000,
            delay: 200
        });
        
        ScrollReveal().reveal('.heading', { origin: 'top' });
        ScrollReveal().reveal('.home-img, .services-container, .portfolio-item, .gallery-item, .video-item', { origin: 'bottom' });
        ScrollReveal().reveal('.home-contect h1, .about-img', { origin: 'right' });
        ScrollReveal().reveal('.home-contect p, .about-content', { origin: 'left' });
    }
}

// تهيئة الهيدر اللاصق
function initStickyHeader() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 100);
    });
}
