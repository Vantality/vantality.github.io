document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        
        // Базовые ключевые слова Luau
        const keywords = /\b(local|function|if|then|else|elseif|end|return|for|in|pairs|ipairs|while|do|and|or|not|true|false|nil)\b/g;
        // Глобальные классы и функции Роблокса/Luau (VSCode Blue style)
        const luauGlobals = /\b(Color3|Vector2|Vector3|CFrame|UDim2|UDim|Enum|task|math|string|table|coroutine|game|workspace|script|shared|_G|getgenv|getrawmetatable|Drawing|Instance|typeof|type|tonumber|tostring|warn|print|pcall|xpcall)\b/g;
        
        // ИСПРАВЛЕННЫЙ баг со строками. Ищем содержимое в кавычках (одинарных или двойных).
        const strings = /()(?:(?=(\\?))\2.)*?\1/g; 
        
        const comments = /(--.*)/g;
        const functions = /\b(*)(?=\s*\()/g;
        const numbers = /\b(\d+)\b/g;

        codeBlocks.forEach(block => {
            let html = block.innerHTML;

            html = html.replace(comments, '<span class="hl-comment">$1</span>');
            
            // $& означает "заменить на всю совпавшую строку целиком" (не ломает внутренность кавычек)
            html = html.replace(strings, '<span class="hl-string">$&</span>');

            html = html.replace(keywords, '<span class="hl-keyword">$1</span>');
            
            html = html.replace(luauGlobals, '<span class="hl-luau">$1</span>');

            html = html.replace(numbers, '<span class="hl-val">$1</span>');

            html = html.replace(functions, '<span class="hl-func">$1</span>');

            block.innerHTML = html;
        });
    };

    highlightCode();

    // Добавление кнопки Копирования для всех блоков кода
    document.querySelectorAll('.code-window').forEach(window => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerHTML = '<i data-lucide="copy"></i>';
        
        window.appendChild(btn);

        btn.addEventListener('click', () => {
            // Берем чистый текст кода без span-тегов
            const codeText = window.querySelector('code').textContent;
            
            navigator.clipboard.writeText(codeText).then(() => {
                // Успешное копирование: меняем иконку на галочку
                btn.innerHTML = '<i data-lucide="check"></i>';
                lucide.createIcons();
                
                // Возвращаем иконку копирования через 2 секунды
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="copy"></i>';
                    lucide.createIcons();
                }, 2000);
            });
        });
    });
    
    // Инициируем заново иконки для только что созданных кнопок
    lucide.createIcons();

    // Анимации при скролле
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
