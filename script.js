// Custom Cursor
document.addEventListener('DOMContentLoaded', function() {
    // Import SweetAlert
    const Swal = window.Swal;

    // Import Bootstrap
    const bootstrap = window.bootstrap;

    // Import AOS
    const AOS = window.AOS;

    // Import Lightbox
    const lightbox = window.lightbox;

    // Import jQuery
    const $ = window.jQuery;

    // Check if elements exist before manipulating them
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    
    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursor.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
            
            // Smooth follow with delay
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 80);
        });
        
        document.addEventListener('mouseout', function() {
            cursor.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        // Cursor effects on hover
        const links = document.querySelectorAll('a, button, .btn, .nav-link, .property-card, .service-card');
        
        links.forEach(link => {
            link.addEventListener('mouseover', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'transparent';
                cursor.style.backgroundColor = 'var(--secondary-color)';
            });
            
            link.addEventListener('mouseout', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--secondary-color)';
                cursor.style.backgroundColor = 'var(--secondary-color)';
            });
        });
    }
    
    // Preloader
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                    
                    // Animate hero elements after preloader
                    animateHeroElements();
                }, 500);
            }, 2000);
        });
    }
    
    // Text reveal animation for hero section
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.style.opacity = '1';
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }
        if (heroDescription) {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
        if (heroButtons) {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }
    }
    
    // Initialize AOS Animation Library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: 'mobile'
        });
    }
    
    // Initialize Lightbox
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'showImageNumberLabel': false,
            'fadeDuration': 300
        });
    }
    
    // Initialize Slick Sliders
    if (typeof $ !== 'undefined') {
        $('.featured-properties-carousel').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        
        $('.testimonials-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        
        // Initialize Tilt.js for 3D hover effect
        if (typeof $.fn.tilt !== 'undefined') {
            $('.property-card, .service-card, .testimonial-card').tilt({
                maxTilt: 5,
                scale: 1.02,
                transition: true,
                easing: "cubic-bezier(.03,.98,.52,.99)",
                perspective: 1000,
                speed: 800
            });
        }
    }
    
    // Properties Filter
    const filterButtons = document.querySelectorAll('.properties-filter li');
    const propertyItems = document.querySelectorAll('.property-item');
    
    if (filterButtons.length > 0 && propertyItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                propertyItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const speed = 200;
        
        const animateCounter = () => {
            counters.forEach(counter => {
                const target = +counter.innerText;
                const count = +counter.getAttribute('data-count') || 0;
                const increment = target / speed;
                
                if (count < target) {
                    counter.setAttribute('data-count', Math.ceil(count + increment));
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        // Start counter animation when elements are in viewport
        const counterSection = document.querySelector('.about-stats');
        if (counterSection) {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        counters.forEach(counter => {
                            counter.setAttribute('data-count', 0);
                        });
                        animateCounter();
                        observer.unobserve(counterSection);
                    }
                }, { threshold: 0.5 });
                
                observer.observe(counterSection);
            } else {
                // Fallback for browsers that don't support IntersectionObserver
                window.addEventListener('scroll', function() {
                    const sectionTop = counterSection.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (sectionTop < windowHeight * 0.75) {
                        counters.forEach(counter => {
                            counter.setAttribute('data-count', 0);
                        });
                        animateCounter();
                        window.removeEventListener('scroll', this);
                    }
                });
            }
        }
    }
    
    // Parallax Effect for Testimonials Section
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form Validation with enhanced feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const formElements = this.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                    
                    // Add shake animation for invalid fields
                    formElements[i].classList.add('shake');
                    setTimeout(() => {
                        formElements[i].classList.remove('shake');
                    }, 600);
                } else if (formElements[i].hasAttribute('required')) {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Show success message (in a real application, you would send the form data to a server)
                const formData = new FormData(this);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log('Form submitted successfully:', formValues);
                
                // Reset form
                this.reset();
                
                // Show success alert
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Mensagem Enviada',
                        text: 'Entraremos em contato em breve.',
                        icon: 'success',
                        confirmButtonColor: 'var(--secondary-color)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdrop: 'rgba(0, 0, 0, 0.4)',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        }
                    });
                } else {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                }
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Por favor, preencha todos os campos obrigatórios.',
                        icon: 'warning',
                        confirmButtonColor: 'var(--secondary-color)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdrop: 'rgba(0, 0, 0, 0.4)',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        }
                    });
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            }
        });
    }
    
    // Appointment Modal
    const appointmentLinks = document.querySelectorAll('.nav-cta');
    if (appointmentLinks.length > 0) {
        appointmentLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (typeof bootstrap !== 'undefined') {
                    const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
                    appointmentModal.show();
                } else {
                    const appointmentModal = document.getElementById('appointmentModal');
                    if (appointmentModal) {
                        appointmentModal.style.display = 'block';
                    }
                }
            });
        });
    }
    
    const submitAppointment = document.getElementById('submitAppointment');
    if (submitAppointment) {
        submitAppointment.addEventListener('click', function() {
            const appointmentForm = document.getElementById('appointmentForm');
            let isValid = true;
            const formElements = appointmentForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                    
                    // Add shake animation for invalid fields
                    formElements[i].classList.add('shake');
                    setTimeout(() => {
                        formElements[i].classList.remove('shake');
                    }, 600);
                } else if (formElements[i].hasAttribute('required')) {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // Process form data
                const formData = new FormData(appointmentForm);
                let appointmentData = {};
                
                for (let [key, value] of formData.entries()) {
                    appointmentData[key] = value;
                }
                
                console.log('Appointment scheduled:', appointmentData);
                
                // Close modal
                if (typeof bootstrap !== 'undefined') {
                    const appointmentModal = bootstrap.Modal.getInstance(document.getElementById('appointmentModal'));
                    appointmentModal.hide();
                } else {
                    const appointmentModal = document.getElementById('appointmentModal');
                    if (appointmentModal) {
                        appointmentModal.style.display = 'none';
                    }
                }
                
                // Reset form
                appointmentForm.reset();
                
                // Show success message
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Visita Agendada',
                        text: 'Sua visita foi agendada com sucesso. Confirmaremos em breve.',
                        icon: 'success',
                        confirmButtonColor: 'var(--secondary-color)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdrop: 'rgba(0, 0, 0, 0.4)',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        }
                    });
                } else {
                    alert('Visita agendada com sucesso! Confirmaremos em breve.');
                }
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Por favor, preencha todos os campos obrigatórios.',
                        icon: 'warning',
                        confirmButtonColor: 'var(--secondary-color)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdrop: 'rgba(0, 0, 0, 0.4)',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        }
                    });
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                console.log('Newsletter subscription:', emailInput.value);
                
                // Reset form
                this.reset();
                
                // Show success message
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Inscrição Realizada',
                        text: 'Você receberá nossas novidades em primeira mão.',
                        icon: 'success',
                        confirmButtonColor: 'var(--secondary-color)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdrop: 'rgba(0, 0, 0, 0.4)',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        }
                    });
                } else {
                    alert('Inscrição realizada com sucesso! Você receberá nossas novidades em primeira mão.');
                }
            } else if (emailInput) {
                emailInput.classList.add('is-invalid');
                
                // Add shake animation for invalid fields
                emailInput.classList.add('shake');
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 600);
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Atenção',
                        text: 'Por favor, insira um email válido.',
                        icon: 'warning',
                        confirmButtonColor: 'var(--secondary-color)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdrop: 'rgba(0, 0, 0, 0.4)',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        }
                    });
                } else {
                    alert('Por favor, insira um email válido.');
                }
            }
        });
    }
    
    // Immersive Experience Play Button
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Experiência Imersiva',
                    html: '<iframe width="100%" height="500" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                    width: 800,
                    padding: '0',
                    background: '#000',
                    showCloseButton: true,
                    showConfirmButton: false,
                    customClass: {
                        container: 'immersive-modal'
                    }
                });
            } else {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            }
        });
    }
    
    // Virtual Tour Buttons
    const virtualTourButtons = document.querySelectorAll('.virtual-tour');
    if (virtualTourButtons.length > 0) {
        virtualTourButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyCard = this.closest('.property-card');
                const propertyTitle = propertyCard ? propertyCard.querySelector('.property-title').textContent : 'Propriedade';
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: `Tour Virtual - ${propertyTitle}`,
                        html: '<iframe width="100%" height="500" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                        width: 800,
                        padding: '0',
                        background: '#000',
                        showCloseButton: true,
                        showConfirmButton: false
                    });
                } else {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                }
            });
        });
    }
    
    // Video Tour Buttons
    const videoTourButtons = document.querySelectorAll('.video-tour');
    if (videoTourButtons.length > 0) {
        videoTourButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyCard = this.closest('.property-card');
                const propertyTitle = propertyCard ? propertyCard.querySelector('.property-title').textContent : 'Propriedade';
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: `Tour em Vídeo - ${propertyTitle}`,
                        html: '<iframe width="100%" height="500" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                        width: 800,
                        padding: '0',
                        background: '#000',
                        showCloseButton: true,
                        showConfirmButton: false
                    });
                } else {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                }
            });
        });
    }
    
    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add CSS for dark mode toggle
    const style = document.createElement('style');
    style.textContent = `
        .dark-mode-toggle {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--secondary-color);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            z-index: 99;
            border: none;
            cursor: none;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: var(--transition);
        }
        
        .dark-mode-toggle:hover {
            background-color: var(--accent-color);
            transform: translateY(-5px);
        }
        
        .shake {
            animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Add Animate.css if not already included
    if (!document.querySelector('link[href*="animate.css"]')) {
        const animateCss = document.createElement('link');
        animateCss.rel = 'stylesheet';
        animateCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
        document.head.appendChild(animateCss);
    }
    
    // Add SweetAlert2 if not already included
    if (typeof Swal === 'undefined') {
        const sweetAlertScript = document.createElement('script');
        sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        document.body.appendChild(sweetAlertScript);
    }
});