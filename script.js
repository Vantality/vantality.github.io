document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        const syntax = /(--.*)|((["'])(?:\\.|[^\\])*?\3)|\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()|\b(local|function|if|then|else|elseif|end|return|for|in|pairs|ipairs|while|do|and|or|not|true|false|nil)\b|\b(game|workspace|Color3|Vector3|Enum|CFrame|Instance|math|task|string|table|RBXScriptSignal|RBXScriptConnection|Drawing)\b|\b(\d+)\b/g;

        codeBlocks.forEach(block => {
            let text = block.textContent;
            text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            let html = text.replace(syntax, (match, comment, str, quote, func, keyword, global, number) => {
                if (comment) return `<span class="hl-comment">${comment}</span>`;
                if (str)     return `<span class="hl-string">${str}</span>`; 
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
