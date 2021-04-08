window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu_wrapper'),
          openMenu = document.querySelector('.header__menu'),
          closeMenu = menu.querySelector('.header__nav button'),
          overlay = document.querySelector('.overlay');

    openMenu.addEventListener('click', () =>  {
        menu.classList.add('activeMenu');
        overlay.classList.add('overlayActive');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () =>  {
        menu.classList.remove('activeMenu');
        overlay.classList.remove('overlayActive');
        document.body.style.overflow = 'visible';
    });

    overlay.addEventListener('click', () => {
        menu.classList.remove('activeMenu');
        overlay.classList.remove('overlayActive');
        document.body.style.overflow = 'visible';
    });

    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 150) {
            header.classList.add('headerFixed');
        } else {
            header.classList.remove('headerFixed');
        }
    });

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,

                start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

    // Slider

    let offset = 0;
    let slideIndex = 1;
    
    const slides = document.querySelectorAll('.reviews__item'),
          slider = document.querySelector('.reviews'),
          prev = document.querySelector('.reviews__prev'),
          next = document.querySelector('.reviews__next'),
          slidesWrapper = document.querySelector('.reviews__wrapper'),
          slidesField = document.querySelector('.reviews__inner'),
          width = window.getComputedStyle(slidesWrapper).width;


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          arrDots = [];

    dots.classList.add('slider-dots');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 15px;
            height: 15px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: var(--main-color);
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .2;
            transition: opacity .6s ease;
            border-radius: 100%;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        arrDots.push(dot);
    }

    next.addEventListener('click', function() {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        arrDots.forEach(dot => dot.style.opacity = '.5');
        arrDots[slideIndex - 1].style.opacity = 1; 
    });

    prev.addEventListener('click', function() {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        arrDots.forEach(dot => dot.style.opacity = '.5');
        arrDots[slideIndex - 1].style.opacity = 1; 
    });

    arrDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            arrDots.forEach(dot => dot.style.opacity = '.5');
            arrDots[slideIndex - 1].style.opacity = 1;
        });
    });

    // Footer

    document.querySelector('.footer span').innerHTML = `&copy; Khalid for Elektriker ${new Date().getFullYear()}`;
});