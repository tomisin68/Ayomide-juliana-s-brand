// Main Controller for Dhemhi Brand Website
class DhemhiBrand {
    constructor() {
      // Store references to key elements
      this.elements = {
        body: document.body,
        html: document.documentElement,
        mainNav: document.querySelector('.main-nav'),
        menuToggle: document.querySelector('.mobile-menu-toggle'),
        hero: document.querySelector('.hero'),
        form: document.querySelector('.freebie-form'),
        header: document.querySelector('header')
      };
  
      // Initialize all functionality with error handling
      this.initCoreFeatures();
      this.initEnhancements();
      
      console.log("%c Dhemhi Brand %c Powered by AJB ", 
        "background: #A0009E; color: white; font-size: 16px; font-weight: bold; padding: 5px 10px;", 
        "background: #FF9F1C; color: #1A132F; font-size: 16px; font-weight: bold; padding: 5px 10px;");
    }
  
    initCoreFeatures() {
      // Core features that affect content visibility
      try {
        this.initScrollAnimations(); // Should run first to prevent FOUC
        this.initMobileMenu();
        this.initLazyLoading();
        this.initSmoothScrolling();
      } catch (error) {
        console.error('Error initializing core features:', error);
      }
    }
  
    initEnhancements() {
      // Progressive enhancements that can fail without breaking the site
      try {
        this.initParallaxEffects();
        this.initInteractiveElements();
        this.initFormValidation();
        this.initPageTransitions();
        this.initDynamicCursor();
        this.initMicroInteractions();
        this.initServiceWorker();
        this.initAnalytics();
        
        // Performance optimization
        this.debounceResize();
        this.rafOptimization();
      } catch (error) {
        console.error('Error initializing enhancements:', error);
      }
    }
  
    // 1. Smooth Scrolling with momentum effect (with fallback)
    initSmoothScrolling() {
      // Check if prefers-reduced-motion is enabled
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.initBasicSmoothScroll();
        return;
      }
  
      const scrollContainer = this.elements.html;
      let scrollY = window.scrollY;
      let targetY = scrollY;
      let speed = 0;
      let rafId;
      let isScrolling = false;
  
      const ease = 0.075;
      const lerp = (start, end, t) => start * (1 - t) + end * t;
  
      const smoothScroll = () => {
        const diff = targetY - scrollY;
        speed = lerp(speed, diff, ease);
        scrollY += speed;
  
        if (Math.abs(speed) < 0.05) {
          scrollY = targetY;
          isScrolling = false;
          cancelAnimationFrame(rafId);
        } else {
          scrollContainer.style.scrollBehavior = 'auto';
          window.scrollTo(0, scrollY);
          rafId = requestAnimationFrame(smoothScroll);
        }
      };
  
      window.addEventListener('scroll', () => {
        targetY = window.scrollY;
        if (!isScrolling) {
          isScrolling = true;
          rafId = requestAnimationFrame(smoothScroll);
        }
      }, { passive: true });
  
      // Smooth anchor links with fallback
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          const target = targetId === '#' ? this.elements.body : document.querySelector(targetId);
          
          if (target) {
            // Try smooth scroll first
            targetY = target.offsetTop;
            if (!isScrolling) {
              isScrolling = true;
              rafId = requestAnimationFrame(smoothScroll);
            }
            
            // Fallback after timeout
            setTimeout(() => {
              if (Math.abs(window.scrollY - targetY) > 10) {
                scrollContainer.style.scrollBehavior = 'smooth';
                window.scrollTo(0, targetY);
              }
            }, 500);
          }
        });
      });
    }
  
    initBasicSmoothScroll() {
      // Basic smooth scroll for reduced motion preference
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          const target = targetId === '#' ? this.elements.body : document.querySelector(targetId);
          
          if (target) {
            this.elements.html.style.scrollBehavior = 'smooth';
            window.scrollTo(0, target.offsetTop);
            
            // Reset after scroll
            setTimeout(() => {
              this.elements.html.style.scrollBehavior = 'auto';
            }, 1000);
          }
        });
      });
    }
  
    // 2. Mobile Menu with improved error handling
    initMobileMenu() {
      if (!this.elements.menuToggle || !this.elements.mainNav) return;
  
      const navLinks = document.querySelectorAll('.main-nav a');
      let isOpen = false;
      
      this.elements.menuToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
          this.elements.mainNav.classList.add('active');
          this.elements.body.style.overflow = 'hidden';
          
          navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = `all 0.3s ease ${index * 0.1}s`;
            setTimeout(() => {
              link.style.opacity = '1';
              link.style.transform = 'translateY(0)';
            }, 50);
          });
        } else {
          navLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
          });
          
          setTimeout(() => {
            this.elements.mainNav.classList.remove('active');
            this.elements.body.style.overflow = '';
          }, 300);
        }
        
        this.elements.menuToggle.innerHTML = isOpen ? 
          '<i class="fas fa-times"></i>' : 
          '<i class="fas fa-bars"></i>';
      });
    }
  
    // 3. Scroll Animations with FOUC prevention
    initScrollAnimations() {
      const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Special animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
              entry.target.style.transform = 'translateY(0) rotate(0deg)';
              entry.target.style.opacity = '1';
            }
            
            observer.unobserve(entry.target);
          }
        });
      };
  
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
  
      const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
      const animatableElements = document.querySelectorAll('.section, .feature-card, .testimonial-card, .freebie-card');
      
      // First make sure elements are visible if JS fails
      setTimeout(() => {
        animatableElements.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 3000); // Fallback timeout
  
      // Then set up animations
      animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
      });
    }
  
    // 4. Parallax Effects with safe checks
    initParallaxEffects() {
      if (!this.elements.hero) return;
  
      const parallax = (e) => {
        if (window.innerWidth > 768) {
          const x = (window.innerWidth - e.pageX * 2) / 100;
          const y = (window.innerHeight - e.pageY * 2) / 100;
          this.elements.hero.style.transform = `translate(${x}px, ${y}px)`;
        }
      };
  
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          if (window.innerWidth > 768 && e.gamma && e.beta) {
            const x = (e.gamma / 20);
            const y = (e.beta / 20);
            this.elements.hero.style.transform = `translate(${x}px, ${y}px)`;
          }
        }, true);
      } else {
        window.addEventListener('mousemove', parallax);
      }
    }
  
    // 5. Interactive Elements with safe checks
    initInteractiveElements() {
      // Button ripple effect
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const ripple = document.createElement('span');
          ripple.className = 'ripple';
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 1000);
        });
      });
  
      // Card tilt effect
      const cards = document.querySelectorAll('.feature-card, .testimonial-card, .freebie-card');
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          if (window.innerWidth > 768) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          }
        });
  
        card.addEventListener('mouseenter', () => {
          if (window.innerWidth > 768) {
            card.style.transition = 'none';
          }
        });
  
        card.addEventListener('mouseleave', () => {
          if (window.innerWidth > 768) {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
          }
        });
      });
    }
  
    // 6. Form Validation with improved UX
    initFormValidation() {
      if (!this.elements.form) return;
  
      const inputs = this.elements.form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          if (input.value.trim() !== '') {
            input.classList.add('filled');
            input.classList.remove('error');
          } else {
            input.classList.remove('filled');
          }
        });
      });
  
      this.elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
  
        inputs.forEach(input => {
          if (input.hasAttribute('required') && input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
          }
        });
  
        if (isValid) {
          // Show success state
          this.elements.form.innerHTML = `
            <div class="form-success">
              <i class="fas fa-check-circle"></i>
              <h3>Success!</h3>
              <p>Your free resources are on their way to your email!</p>
            </div>
          `;
          
          // Track conversion if available
          if (window.gtag) {
            try {
              gtag('event', 'conversion', {
                'send_to': 'AW-123456789/AbC-D_EFG123456789',
              });
            } catch (error) {
              console.error('Google Analytics error:', error);
            }
          }
        }
      });
    }
  
    // 7. Page Transitions with safety checks
    initPageTransitions() {
      document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
        // Skip if link doesn't point to our domain
        if (!link.href.includes(window.location.hostname)) return;
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.elements.body.classList.add('page-exit');
          
          setTimeout(() => {
            window.location.href = link.href;
          }, 500);
        });
      });
    }
  
    // 8. Dynamic Custom Cursor (desktop only)
    initDynamicCursor() {
      if (window.innerWidth < 992) return;
  
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);
  
      const cursorFollower = document.createElement('div');
      cursorFollower.className = 'cursor-follower';
      document.body.appendChild(cursorFollower);
  
      document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        setTimeout(() => {
          cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 100);
      });
  
      const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, [data-cursor-effect]');
      interactiveElements.forEach(el => {
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
  
    // 9. Micro-interactions with safe checks
    initMicroInteractions() {
      // Scroll progress indicator
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
      
      window.addEventListener('scroll', () => {
        const scrollTop = this.elements.html.scrollTop;
        const scrollHeight = this.elements.html.scrollHeight;
        const clientHeight = this.elements.html.clientHeight;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = `${progress}%`;
      });
  
      // Dynamic favicon change based on scroll
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        window.addEventListener('scroll', () => {
          const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          if (scrollPercentage > 0.5) {
            favicon.href = '/favicon-scrolled.png';
          } else {
            favicon.href = '/favicon.png';
          }
        });
      }
    }
  
    // 10. Lazy Loading with Intersection Observer
    initLazyLoading() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
        });
        return;
      }
  
      const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      };
  
      const lazyObserver = new IntersectionObserver(lazyLoad, {
        rootMargin: '200px 0px',
        threshold: 0.01
      });
  
      document.querySelectorAll('img[data-src]').forEach(img => {
        lazyObserver.observe(img);
      });
    }
  
    // 11. Service Worker with error handling
    initServiceWorker() {
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
  
    // 12. Analytics with privacy-friendly options
    initAnalytics() {
      if (this.getCookie('analytics_consent') === 'true' && window.gtag) {
        try {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
          
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          });
        } catch (error) {
          console.error('Analytics initialization error:', error);
        }
      }
    }
  
    // Helper: Get cookie value
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  
    // Performance Optimization: Debounce resize events
    debounceResize() {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.handleResize();
        }, 250);
      });
    }
  
    handleResize() {
      if (window.innerWidth >= 768 && this.elements.mainNav && this.elements.menuToggle) {
        this.elements.mainNav.classList.remove('active');
        this.elements.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        this.elements.body.style.overflow = '';
      }
    }
  
    // Performance Optimization: RAF for animations
    rafOptimization() {
      let lastScrollY = window.scrollY;
      let ticking = false;
      
      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.updateScrollDependentElements(lastScrollY);
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  
    updateScrollDependentElements(scrollY) {
      if (this.elements.header) {
        if (scrollY > 100) {
          this.elements.header.classList.add('scrolled');
        } else {
          this.elements.header.classList.remove('scrolled');
        }
      }
      
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const offset = scrollY * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new DhemhiBrand();
  });
  
  // Add some global event listeners for instant feedback
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Preload animations with fallback
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('animate');
      }, 300);
    }
  });