document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        
        const luauGlobals = /\b(Color3|Vector2|Vector3|CFrame|UDim2|UDim|Enum|task|math|string|table|coroutine|game|workspace|script|shared|_G|getgenv|getrawmetatable|Drawing|Instance|typeof|type|tonumber|tostring|warn|print|pcall|xpcall)\b/g;
        const keywords = /\b(local|function|if|then|else|elseif|end|return|for|in|pairs|ipairs|while|do|and|or|not|true|false|nil)\b/g;
        const numbers = /\b(\d+(?:\.\d+)?)\b/g;
        const functions = /\b(*)(?=\s*\()/g;

        codeBlocks.forEach(block => {
            // Используем textContent чтобы не повредить случайно HTML сущности
            let text = block.textContent; 
            
            let tokens =[];
            let tokenIndex = 0;

            // 1. Изолируем комментарии
            text = text.replace(/(--*)/g, (match) => {
                tokens = `<span class="hl-comment">${match}</span>`;
                return `__TOK${tokenIndex++}__`;
            });

            // 2. Изолируем строки (одинарные и двойные кавычки)
            text = text.replace(/()(?:(?=(\\?))\2.)*?\1/g, (match) => {
                tokens = `<span class="hl-string">${match}</span>`;
                return `__TOK${tokenIndex++}__`;
            });

            // 3. Безопасно применяем остальные регулярки
            text = text.replace(keywords, '<span class="hl-keyword">$1</span>');
            text = text.replace(luauGlobals, '<span class="hl-luau">$1</span>');
            text = text.replace(functions, '<span class="hl-func">$1</span>');
            text = text.replace(numbers, '<span class="hl-val">$1</span>');

            // 4. Возвращаем строки и комменты на место
            for (let i = 0; i < tokenIndex; i++) {
                text = text.replace(`__TOK${i}__`, tokens);
            }

            block.innerHTML = text;
        });
    };

    highlightCode();

    // Создание IDE-хедеров и кнопок копирования
    document.querySelectorAll('.code-window').forEach(window => {
        let header = window.querySelector('.ide-header');
        
        // Если хедера нет (например, в таблице элементов API), создаем его
        if (!header) {
            header = document.createElement('div');
            header.className = 'ide-header';
            
            // Пытаемся взять логичное название блока для заголовка
            let titleText = 'Luau Snippet';
            
            const elRow = window.closest('.el-row');
            if (elRow) {
                const h4 = elRow.querySelector('.el-info h4');
                if (h4) titleText = h4.innerText + ' Example';
            } else {
                const mBox = window.closest('.method-box');
                if (mBox) {
                    const mName = mBox.querySelector('.method-name');
                    if (mName) titleText = mName.innerText;
                }
            }

            // Заворачиваем текст в span чтобы не затереть его кнопкой
            const titleSpan = document.createElement('span');
            titleSpan.className = 'ide-title';
            titleSpan.innerText = titleText;
            
            header.appendChild(titleSpan);
            window.insertBefore(header, window.firstChild);
        } else {
            // Если хедер уже был в HTML, оборачиваем его текстовое содержимое
            const textContent = header.innerText;
            header.innerHTML = ''; // Очищаем
            const titleSpan = document.createElement('span');
            titleSpan.className = 'ide-title';
            titleSpan.innerText = textContent;
            header.appendChild(titleSpan);
        }

        // Создаем саму кнопку
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerHTML = '<i data-lucide="copy"></i>';
        btn.title = "Скопировать код";
        
        header.appendChild(btn);

        // Логика копирования
        btn.addEventListener('click', () => {
            const codeText = window.querySelector('code').textContent;
            
            navigator.clipboard.writeText(codeText).then(() => {
                btn.innerHTML = '<i data-lucide="check"></i>';
                btn.style.color = '#ff6a85'; // Розовый цвет при успехе
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="copy"></i>';
                    btn.style.color = '';
                    lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
            });
        });
    });
    
    // Инициализируем иконки в кнопках, которые мы только что создали
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
