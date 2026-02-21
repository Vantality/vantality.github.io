document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    lucide.createIcons();

    // 2. Новая, надежная подсветка синтаксиса
    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        
        // Одна мощная регулярка, которая ищет совпадения по группам.
        // Строго соблюдает приоритет (сначала комментарии, потом строки, функции и т.д.)
        const syntax = /(--.*)|((["'])(?:\\.|[^\\])*?\3)|\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()|\b(local|function|if|then|else|elseif|end|return|for|in|pairs|ipairs|while|do|and|or|not|true|false|nil)\b|\b(game|workspace|Color3|Vector3|Enum|CFrame|Instance|math|task|string|table|RBXScriptSignal|RBXScriptConnection|Drawing)\b|\b(\d+)\b/g;

        codeBlocks.forEach(block => {
            // Берем чистый текст, чтобы случайно не сломать HTML разметку
            let text = block.textContent;
            
            // Экранируем HTML символы (<, >), чтобы они не воспринимались как реальные теги
            text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            // Заменяем всё за один проход
            let html = text.replace(syntax, (match, comment, str, quote, func, keyword, global, number) => {
                if (comment) return `<span class="hl-comment">${comment}</span>`;
                if (str)     return `<span class="hl-string">${str}</span>`; // Теперь строки не пропадают!
                if (func)    return `<span class="hl-func">${func}</span>`;
                if (keyword) return `<span class="hl-keyword">${keyword}</span>`;
                if (global)  return `<span class="hl-global">${global}</span>`;
                if (number)  return `<span class="hl-val">${number}</span>`;
                return match;
            });

            block.innerHTML = html;
        });
    };

    highlightCode();

    // 3. Анимация появления элементов при скролле
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

    // 4. Логика кнопки "Copy"
    const copyBtn = document.getElementById('copy-example-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            // Ищем тег pre в блоке full-example (textContent берет чистый текст без span тегов)
            const codeBlock = document.querySelector('#full-example pre');
            
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    // Визуальный фидбек успеха
                    const originalHTML = '<i data-lucide="copy"></i> Copy';
                    copyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
                    copyBtn.classList.add('success');
                    
                    // Обновляем иконки Lucide, так как мы изменили DOM
                    lucide.createIcons();

                    // Возвращаем как было через 2 секунды
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                        copyBtn.classList.remove('success');
                        lucide.createIcons();
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy code: ', err);
                });
            }
        });
    }
});
