// Инициализация GSAP
gsap.registerPlugin(ScrollTrigger);

console.log('Script loaded successfully!');

// Проверка загрузки GSAP
console.log('GSAP version:', gsap.version);

// Анимация при загрузке
window.addEventListener('load', () => {
    // Анимация заголовка
    gsap.from('.hero h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.5
    });

    // Анимация ASCII арта
    gsap.from('.ascii-art', {
        duration: 2,
        scale: 0.8,
        opacity: 0,
        ease: 'power2.out',
        delay: 1
    });

    // Анимация навигации
    gsap.from('nav', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power2.out'
    });
});

// Анимации при скролле
document.addEventListener('DOMContentLoaded', () => {
    // Анимация секций при скролле
    gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Параллакс эффект для скриншотов
    gsap.utils.toArray('.screenshots img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });

    // Анимация кнопок социальных сетей
    gsap.utils.toArray('.social-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1
        });
    });
});

// Анимация при наведении на кнопку отправки
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('mouseenter', () => {
        gsap.to(submitBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    submitBtn.addEventListener('mouseleave', () => {
        gsap.to(submitBtn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Обработка отправки формы
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                submitButton.textContent = 'Отправлено!';
                form.reset();

                // Показываем и анимируем кота
                const thankYouCat = document.querySelector('.thank-you-cat');
                const catAscii = document.querySelector('.cat-ascii');
                
                thankYouCat.style.display = 'block';
                setTimeout(() => {
                    thankYouCat.classList.add('visible');
                    catAscii.classList.add('wiggle');
                }, 100);

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    
                    setTimeout(() => {
                        thankYouCat.classList.remove('visible');
                        setTimeout(() => {
                            thankYouCat.style.display = 'none';
                        }, 500);
                    }, 5000);
                }, 3000);
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            submitButton.textContent = 'Ошибка! Попробуйте снова';
            setTimeout(() => {
                submitButton.textContent = originalText;
            }, 3000);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('joinForm');
    
    if (joinForm) {
        joinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
                    joinForm.reset();
                } else {
                    throw new Error('Что-то пошло не так');
                }
            } catch (error) {
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
                console.error('Error:', error);
            }
        });
    }

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 