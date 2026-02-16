document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Кастомный Highlighter для Luau
    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        
        const keywords = /\b(local|function|if|then|else|elseif|end|return|for|in|pairs|ipairs|while|do|and|or|not|true|false|nil)\b/g;
        const strings = /(['"])(?:(?=(\\?))\2.)*?\1/g;
        const comments = /(--.*)/g;
        const functions = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g;
        const numbers = /\b(\d+)\b/g;

        codeBlocks.forEach(block => {
            let html = block.innerHTML;

            // Сначала комментарии
            html = html.replace(comments, '<span class="hl-comment">$1</span>');
            
            // Строки
            html = html.replace(strings, '<span class="hl-string">$1</span>');

            // Ключевые слова
            html = html.replace(keywords, '<span class="hl-keyword">$1</span>');

            // Числа
            html = html.replace(numbers, '<span class="hl-val">$1</span>');

            // Вызовы функций
            html = html.replace(functions, '<span class="hl-func">$1</span>');

            block.innerHTML = html;
        });
    };

    highlightCode();

    // Анимация плавного появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-block, .method-box, .m-card, .el-row').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        observer.observe(el);
    });

    window.addEventListener('scroll', () => {
        document.querySelectorAll('.visible').forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    });
});
