document.addEventListener('DOMContentLoaded', function() {
    // 使う要素を最初に全部つかまえておく
    const header = document.querySelector('.site-header');
    const topBtn = document.getElementById('back-to-top');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // --- スクロールした時の処理をまとめる ---
    window.addEventListener('scroll', function() {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // 1. ヘッダーを小さくする (150pxでON、80pxでOFF)
        if (header) {
            if (scrollY > 150) {
                header.classList.add('scrolled');
            } else if (scrollY < 80) {
                header.classList.remove('scrolled');
            }
        }

        // 2. 上に戻るボタンを出す (300px以上)
        if (topBtn) {
            if (scrollY > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        }
    });

    // --- クリックイベントをまとめる ---

    // 上に戻る
    if (topBtn) {
        topBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // ハンバーガーメニュー開閉
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
        });

        // メニュー内のリンクを押したら閉じる
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }
});