document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const main = document.querySelector('main');
    const topBtn = document.querySelector('#back-to-top'); // ID指定に修正
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    // --- 1. ヘッダーの高さとスクロールの制御関数 ---
    function updateHeaderHeight() {
        // 画面幅が768px以下のとき（スマホ）は、計算をストップして何もしない
        if (window.innerWidth <= 768) {
            document.body.style.paddingTop = '0'; // 余計な余白をリセット
            return; 
        }
        // --- ここからはPC（769px以上）のみ動く ---
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

    // --- 3. よくある質問（FAQ）の開閉 ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.onclick = function() {
            // 親要素の .faq-item を探して active クラスを付け外しする
            const faqItem = this.closest('.faq-item');
            faqItem.classList.toggle('active');
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

// お問い合わせフォームの制御
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector(".contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault(); // 外のサイトへ飛ぶのを止める
            
            const submitBtn = contactForm.querySelector(".submit-btn");
            const originalBtnText = submitBtn.textContent;
            
            // 送信中表示
            submitBtn.disabled = true;
            submitBtn.textContent = "送信中...";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 送信成功！ 自分で作った thanks.html へジャンプ
                    window.location.href = "thanks.html";
                } else {
                    alert("エラーが発生しました。時間を置いて再度お試しください。");
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            } catch (error) {
                alert("通信エラーが発生しました。インターネット接続を確認してください。");
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});