document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const main = document.querySelector('main');
    const topBtn = document.querySelector('.back-to-top'); // クラス名に合わせて修正

    function syncHeight() {
        if (!header || !main) return;

        // 1. スクロールのクラス付け替え
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. ★最重要★ ヘッダーの実際の高さを測ってmainの余白にする
        // setTimeoutを少し入れることで、CSSの変化が終わった後の高さを正確に取ります
        setTimeout(() => {
            const h = header.offsetHeight;
            main.style.marginTop = h + 'px';
        }, 10);

        // 3. トップへ戻るボタン
        if (topBtn) {
            topBtn.style.display = (window.scrollY > 300) ? "block" : "none";
        }
    }

    // イベント登録
    window.addEventListener('scroll', syncHeight);
    window.addEventListener('resize', syncHeight);
    
    // 最初の読み込み時に実行
    syncHeight();
});