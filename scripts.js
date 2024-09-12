document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.feature').forEach(section => {
        observer.observe(section);
    });

    // Intersection Observer for header
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');

    const observerHeader = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.classList.add('top');
            } else {
                header.classList.remove('top');
            }
        });
    }, { threshold: 0.1 });

    observerHeader.observe(hero);

    // Modal functionality
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    }

    window.openModal = function(slideId) {
        modal.style.display = "block";
        document.body.classList.add('modal-open');
        document.querySelectorAll('.slides').forEach(slide => {
            slide.classList.remove('active-slide');
        });
        document.getElementById(slideId + 'Slide').classList.add('active-slide');
        currentSlide = Array.from(document.querySelectorAll('.slides')).findIndex(slide => slide.classList.contains('active-slide'));
        updateIndicators();
    }

    window.changeSlide = function(n) {
        var slides = document.querySelectorAll('.slides');
        slides[currentSlide].classList.remove('active-slide');
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active-slide');
        updateIndicators();
    }

    window.goToSlide = function(n) {
        var slides = document.querySelectorAll('.slides');
        slides[currentSlide].classList.remove('active-slide');
        currentSlide = n;
        slides[currentSlide].classList.add('active-slide');
        updateIndicators();
    }

    function updateIndicators() {
        var indicators = document.querySelectorAll('.slide-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Ensure the menu is hidden by default on page load
    var menu = document.querySelector('nav ul');
    menu.classList.remove('show');

    // Close modal function
    window.closeModal = function() {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    }

    // Scroll event for blur effect
    window.addEventListener('scroll', function() {
        const features = document.querySelectorAll('.feature');
        const scrollPosition = window.scrollY;
        features.forEach(feature => {
            const featurePosition = feature.offsetTop;
            const windowHeight = window.innerHeight;
            const blurValue = Math.max(10 - (scrollPosition - featurePosition + windowHeight) / 100, 0);
            if (blurValue === 0) {
                setTimeout(() => {
                    feature.style.filter = `blur(${blurValue}px)`;
                }, 3000);
            } else {
                feature.style.filter = `blur(${blurValue}px)`;
            }
        });
    });

    // Intersection Observer for mobile menu
    const observerMenu = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                menu.classList.add('top');
            } else {
                menu.classList.remove('top');
            }
        });
    }, { threshold: 0.1 });

    observerMenu.observe(hero);
});