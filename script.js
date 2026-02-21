document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        
        const keywords = /\b(local|function|if|then|else|elseif|end|return|for|in|pairs|ipairs|while|do|and|or|not|true|false|nil)\b/g;
        const strings = /(['"])(?:(?=(\\?))\2.)*?\1/g;
        const comments = /(--.*)/g;
        const functions = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g;
        const numbers = /\b(\d+)\b/g;
        const globals = /\b(game|workspace|Color3|Vector3|Enum|CFrame|Instance|math|task|string|table|RBXScriptSignal|RBXScriptConnection|Drawing)\b/g;

        codeBlocks.forEach(block => {
            let html = block.innerHTML;

            html = html.replace(comments, '<span class="hl-comment">$1</span>');
            html = html.replace(strings, '<span class="hl-string">$1</span>');
            html = html.replace(keywords, '<span class="hl-keyword">$1</span>');
            html = html.replace(globals, '<span class="hl-global">$1</span>');
            html = html.replace(numbers, '<span class="hl-val">$1</span>');
            html = html.replace(functions, '<span class="hl-func">$1</span>');

            block.innerHTML = html;
        });
    };

    highlightCode();

    // Анимация при скролле
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

    // Логика кнопки "Copy"
    const copyBtn = document.getElementById('copy-example-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const codeBlock = document.querySelector('#full-example pre');
            
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    const originalHTML = '<i data-lucide="copy"></i> Copy';
                    copyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
                    copyBtn.classList.add('success');
                    
                    lucide.createIcons();

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
