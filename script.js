document.addEventListener('DOMContentLoaded', () => {
    // Иконки
    lucide.createIcons();

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Скролл-шпион для сайдбара
    const sections = document.querySelectorAll('.doc-block, section[id]');
    const navLinks = document.querySelectorAll('.sidebar-section a');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                link.style.color = "#ff6a85";
                link.style.paddingLeft = "10px";
            } else {
                link.style.color = "";
                link.style.paddingLeft = "";
            }
        });
    });

    // Декоративный эффект для кода
    document.querySelectorAll('pre code').forEach(block => {
        // Тут можно добавить полноценный Prism.js, но для легкости просто добавим стилизацию строк
        const text = block.innerText;
        const coloredText = text
            .replace(/(local|function|if|then|end|return|for|in|pairs)/g, '<span style="color: #ff6a85;">$1</span>')
            .replace(/(".+?")/g, '<span style="color: #ce9178;">$1</span>')
            .replace(/(--.+)/g, '<span style="color: #6a9955;">$1</span>');
        block.innerHTML = coloredText;
    });
});
