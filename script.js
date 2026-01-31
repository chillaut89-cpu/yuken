/* ========================================
   ハンバーガーメニューの動作
========================================= */

const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link-mobile');

// ハンバーガーメニューのクリックイベント
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMobile.classList.toggle('active');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
});

// メニュー内のリンクをクリックした時の処理
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// メニュー外をクリックした時の処理
document.addEventListener('click', function(event) {
    if (!hamburger.contains(event.target) && !navMobile.contains(event.target)) {
        if (navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

/* ========================================
   スムーズスクロール
========================================= */

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        if (this.getAttribute('href') === '#') {
            return;
        }
        
        event.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   スクロールアニメーション
========================================= */

const fadeInElements = document.querySelectorAll('.service-card, .price-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(function(element) {
    element.classList.add('fade-in');
    observer.observe(element);
});

/* ========================================
   お問い合わせフォームの送信処理
========================================= */

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // 入力チェック
    if (!name || !email || !message) {
        alert('必須項目を入力してください。');
        return;
    }
    
    // メールアドレスの簡易的なバリデーション
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // コンソールに入力内容を表示（開発用）
    console.log('フォーム送信内容:');
    console.log('お名前:', name);
    console.log('メールアドレス:', email);
    console.log('電話番号:', phone);
    console.log('お問い合わせ内容:', message);
    
    // 仮の成功メッセージ
    alert('お問い合わせを送信しました。\n（これはデモです。実際の送信は行われていません。）\n\nありがとうございます！');
    
    // フォームをリセット
    contactForm.reset();
});

/* ========================================
   ヘッダーのスクロール時の動作
========================================= */

const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollPosition > 50) {
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

/* ========================================
   ページ読み込み時の処理
========================================= */

window.addEventListener('load', function() {
    console.log('ユウケン - ページ読み込み完了');
});

/* ========================================
   Escキーでメニューを閉じる
========================================= */

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        if (navMobile.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

/* ========================================
   レスポンシブ対応の処理
========================================= */

window.addEventListener('resize', function() {
    const windowWidth = window.innerWidth;
    
    // タブレットサイズ以上の場合、モバイルメニューを閉じる
    if (windowWidth > 768) {
        hamburger.classList.remove('active');
        navMobile.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});
