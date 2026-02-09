// FBCleaner.js - Auto Generated
console.log("🔥🔥 FB CLEANER INJECTED 🔥🔥");

(function () {
    const DEBUG = false;
    // الكلمات التي نريد إخفاءها (عربي وإنجليزي)
    const KEYWORDS = [
        'Reels', 'ريلز', 'Stories', 'القصص', 
        'Suggested', 'مقترحات', 'Follow', 'متابعة', 
        'People You May Know', 'أشخاص قد تعرفهم', 'Sponsored', 'مُموَّل'
    ];

    function clean() {
        // 1. إخفاء القصص والريلز في الأعلى
        const selectors = [
            '[aria-label="Stories"]', '[aria-label="القصص"]',
            '[aria-label="Reels"]', '[aria-label="ريلز"]',
            'div[data-pagelet*="Reels"]', 'div[data-pagelet*="Stories"]'
        ];
        
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.display = 'none';
                if(DEBUG) console.log('Hidden Header:', sel);
            });
        });

        // 2. فحص المنشورات (Feed Units)
        document.querySelectorAll('div[role="article"], div[data-pagelet^="FeedUnit"]').forEach(post => {
            if (post.getAttribute('data-clean') === 'done') return;
            
            const text = (post.innerText || "").toLowerCase();
            const found = KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
            
            if (found) {
                // تأكد أنه ليس بوست عادي لصديق (فحص زر المتابعة بدقة أكبر)
                // هنا نقوم بالإخفاء المباشر للتبسيط، يمكنك تعقيد الشرط لاحقاً
                post.style.display = 'none';
                post.setAttribute('data-clean', 'done');
                if(DEBUG) console.log('Hidden Post containing keyword');
            }
        });
    }

    // تشغيل مستمر كل ثانية
    setInterval(clean, 1000);
})();
