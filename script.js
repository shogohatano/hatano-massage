document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const main = document.querySelector('main');
    const topBtn = document.querySelector('#back-to-top'); // ID指定に修正
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // --- 1. ヘッダーの高さとスクロールの制御関数 ---
    function updateHeaderHeight() {
     // スクロール位置でクラス付け替え
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (topBtn) {
            topBtn.style.display = (window.scrollY > 300) ? "block" : "none";
        }
    }

    // --- 2. スマホ用メニューの開閉処理 ---
    if (menuToggle && mainNav) {
        menuToggle.onclick = function() {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
        };

        // メニューリンクをクリックしたら閉じる
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.onclick = function() {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            };
        });
    }

    // --- 3. よくある質問（アコーディオン）の処理 ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.onclick = function() {
            const faqItem = this.closest('.faq-item');// 親要素の .faq-item を探して active クラスを付け外しする
            faqItem.classList.toggle('active'); // activeクラスを付け外し
        };
    });

    // --- 4. イベント登録（ここで正しい名前を呼びます） ---
    window.addEventListener('scroll', updateHeaderHeight);
     // 最初の読み込み時にも実行
    updateHeaderHeight();

    // トップへ戻るボタンのクリックイベント
    if (topBtn) {
        topBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
});