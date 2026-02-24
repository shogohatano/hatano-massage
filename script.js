document.addEventListener('DOMContentLoaded', function() {
    // 使う要素をつかまえる
    const header = document.querySelector('.site-header');
    const main = document.querySelector('main');
    const topBtn = document.getElementById('back-to-top');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    /**
     * ヘッダーの高さとメインコンテンツの余白を同期させる関数
     */
    function syncHeaderHeight() {
        if (!header || !main) return;

        let scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // 1. ヘッダーの縮小クラスの付け外し（50pxで統一！）
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. ★超重要★ 変化したヘッダーの「実際の高さ」を測ってmainに渡す
        const currentHeaderHeight = header.offsetHeight;
        main.style.marginTop = currentHeaderHeight + 'px';

        // 3. 上に戻るボタンの表示
        if (topBtn) {
            if (scrollY > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        }
    }

    // --- イベント登録 ---

    // スクロール、読み込み、画面サイズ変更、すべてで同期させる
    window.addEventListener('scroll', syncHeaderHeight);
    window.addEventListener('resize', syncHeaderHeight);
    // すでにDOMContentLoaded内なので直接実行
    syncHeaderHeight();

    // 上に戻るクリック
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