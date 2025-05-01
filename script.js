/**
 * The Dhemhi Brand | AJB - Main Controller
 * A comprehensive JavaScript solution for premium website interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initLoadingScreen();
  initCustomCursor();
  initMobileMenu();
  initSmoothScrolling();
  initScrollProgress();
  initBackToTop();
  initScrollAnimations();
  initTestimonialSlider();
  initMagneticButtons();
  initCounterAnimation();
  initFormValidation();
  initLazyLoading();
  initPerformanceOptimizations();
});

// ==========================================================================
// Loading Screen Controller
// ==========================================================================
function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Simulate loading (replace with actual loading logic)
  setTimeout(() => {
    loadingScreen.classList.add('loaded');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      loadingScreen.remove();
    }, 1000);
  }, 2000);
}

// ==========================================================================
// Custom Cursor Controller
// ==========================================================================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursor || !cursorFollower) return;

  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    // Main cursor (fast)
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    
    // Follower cursor (smooth)
    gsap.to(cursorFollower, {
      x: x,
      y: y,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Cursor hover effects
  const hoverElements = [
    ...document.querySelectorAll('a, button, .btn, [data-cursor-hover]')
  ];

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorFollower.classList.add('cursor-follower-active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorFollower.classList.remove('cursor-follower-active');
    });
  });
}

// ==========================================================================
// Mobile Menu Controller
// ==========================================================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// ==========================================================================
// Smooth Scrolling Controller
// ==========================================================================
function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        gsap.to(window, {
          scrollTo: {
            y: targetElement,
            offsetY: 100
          },
          duration: 1.2,
          ease: 'power2.inOut'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scrolled', 'scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Add/remove scrolled class based on position
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// Scroll Progress Controller
// ==========================================================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${progress}%`;
  });
}

// ==========================================================================
// Back to Top Controller
// ==========================================================================
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: 'power2.inOut'
    });
  });
}

// ==========================================================================
// Scroll Animations Controller
// ==========================================================================
function initScrollAnimations() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
  });

  // Custom scroll animations with GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animation
  gsap.from('.hero-title span', {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top center'
    }
  });

  // First, remove the AOS attributes from your HTML for these elements
// Then use this optimized GSAP animation code:

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP animations for feature cards
  const featureCards = gsap.utils.toArray('.feature-card');
  
  // Only animate if elements exist
  if (featureCards.length) {
    featureCards.forEach((card, i) => {
      // Set initial state (hidden)
      gsap.set(card, { 
        y: 50, 
        opacity: 0,
        transformStyle: "preserve-3d"
      });

      // Create animation
      const cardAnimation = gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
          markers: false // Set to true for debugging if needed
        }
      });

      // Add hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          scale: 1.03,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
  }

  // Process steps animation (optimized version)
  const processItems = gsap.utils.toArray('.process-item');
  
  if (processItems.length) {
    gsap.from(processItems, {
      x: -50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.process-steps',
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
  }
});
}

// ==========================================================================
// Testimonial Slider Controller
// ==========================================================================
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonial-track');
  const cards = slider.querySelectorAll('.testimonial-card');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
  
  // Set initial position
  updateSliderPosition();
  
  // Next button
  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });
  
  // Previous button
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });
  
  function updateSliderPosition() {
    const offset = -currentIndex * cardWidth;
    gsap.to(track, {
      x: offset,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - 1;
  }
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    
    if (difference > 50 && currentIndex < cards.length - 1) {
      // Swipe left
      currentIndex++;
      updateSliderPosition();
    } else if (difference < -50 && currentIndex > 0) {
      // Swipe right
      currentIndex--;
      updateSliderPosition();
    }
  }
}

// ==========================================================================
// Magnetic Buttons Controller
// ==========================================================================
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      
      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

// ==========================================================================
// Counter Animation Controller
// ==========================================================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const duration = 2000; // Animation duration in ms
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    
    let current = start;
    const element = counter;
    
    const animate = () => {
      current += increment;
      
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    // Start animation when counter is in view
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: animate,
      once: true
    });
  });
}

// ==========================================================================
// Form Validation Controller
// ==========================================================================
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        
        // Add error message animation
        gsap.from('.error', {
          x: 10,
          duration: 0.2,
          ease: 'power1.inOut',
          stagger: 0.1,
          repeat: 1,
          yoyo: true
        });
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('error');
        }
      });
    });
  });
}

// ==========================================================================
// Lazy Loading Controller
// ==========================================================================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src || image.src;
          imageObserver.unobserve(image);
          
          // Fade in effect
          gsap.from(image, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }, {
      rootMargin: '200px 0px'
    });
    
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(image => {
      image.src = image.dataset.src || image.src;
    });
  }
}

// ==========================================================================
// Performance Optimizations
// ==========================================================================
function initPerformanceOptimizations() {
  // Debounce scroll events
  const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  // Throttle resize events
  const throttle = (func, limit = 100) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };
  
  // Optimized scroll and resize handlers
  window.addEventListener('scroll', debounce(() => {
    // Any scroll-dependent functions
  }));
  
  window.addEventListener('resize', throttle(() => {
    // Any resize-dependent functions
  }));
  
  // Preload critical resources
  const preloadResources = () => {
    const resources = [
      // Add paths to critical images, fonts, etc.
    ];
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.type || 'image';
      link.href = resource.url;
      document.head.appendChild(link);
    });
  };
  
  // Load non-critical CSS after page load
  const loadNonCriticalCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'path/to/non-critical.css';
    document.head.appendChild(link);
  };
  
  window.addEventListener('load', () => {
    loadNonCriticalCSS();
  });
  
  // Initialize service worker if available
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registration successful');
      }).catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}