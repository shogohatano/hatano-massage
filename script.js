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

        /**
     * ヘッダーの高さとメインコンテンツの余白を同期させる関数
     */
    function syncHeaderHeight() {
        const header = document.querySelector('.site-header');
        const main = document.querySelector('main');
        
        if (!header || !main) return;

        // スクロール量が50pxを超えたら .scrolled クラスを付け外し
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // ★ここがプロの技★
        // 変化した「今のヘッダーの高さ」を正確に測り、mainの上の余白に代入する
        const currentHeaderHeight = header.offsetHeight;
        main.style.marginTop = currentHeaderHeight + 'px';
    }

    // 1. スクロールするたびに実行
    window.addEventListener('scroll', syncHeaderHeight);

    // 2. ページを読み込んだ瞬間に実行（最初から重なるのを防ぐ）
    window.addEventListener('DOMContentLoaded', syncHeaderHeight);

    // 3. 画面サイズを変えた時も再計算（PC/スマホ切り替え対策）
    window.addEventListener('resize', syncHeaderHeight);

});