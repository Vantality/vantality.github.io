document.addEventListener('DOMContentLoaded', () => {

    const customIcons = {
        "chrome": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>',
        "codepen": '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>',
        "codesandbox": '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
        "figma": '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>',
        "framer": '<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>',
        "slack": '<path d="M14.5 16.5a2.5 2.5 0 1 1-5 0V12h5v4.5zm-5-9A2.5 2.5 0 1 1 12 5v4.5H7.5V7.5zm9 5A2.5 2.5 0 1 1 19 15h-4.5v-5h4.5zm-9-5A2.5 2.5 0 1 1 5 10h4.5V5.5H7.5z"></path>',
        "charge": '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
        "glass": '<path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"></path><path d="M6 12h12"></path>',
        "glass-2": '<path d="M8 22h8"></path><path d="M12 11v11"></path><path d="m19 3-7 8-7-8Z"></path>',
        "connection": '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
        "gift-card": '<rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><path d="M12 15h.01"></path><path d="M8 5v4"></path><path d="M16 5v4"></path>'
    };

    document.querySelectorAll('i[data-lucide]').forEach(el => {
        const iconName = el.getAttribute('data-lucide');
        
        if (customIcons[iconName]) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "2");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");
            svg.classList.add("lucide", `lucide-${iconName}`);
            svg.innerHTML = customIcons[iconName];
            
            el.parentNode.replaceChild(svg, el);
        }
    });

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

    const iconBoxes = document.querySelectorAll('.icon-box');
    iconBoxes.forEach(box => {
        box.style.cursor = 'pointer';
        
        box.addEventListener('click', () => {
            const iconName = box.getAttribute('title');
            
            if (iconName) {
                navigator.clipboard.writeText(iconName).then(() => {
                    const span = box.querySelector('span');
                    const originalText = span.textContent;
                    
                    span.textContent = 'Copied';
                    span.style.color = '#64ff64'; 
                    box.style.borderColor = '#64ff64';
                    
                    setTimeout(() => {
                        span.textContent = originalText;
                        span.style.color = '';
                        box.style.borderColor = '';
                    }, 1000);
                }).catch(err => {
                    console.error('Failed to copy icon name: ', err);
                });
            }
        });
    });
});
