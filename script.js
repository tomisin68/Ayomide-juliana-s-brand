// Enhanced Dhemhi Brand Controller with Content Visibility Fix
class DhemhiBrand {
    constructor() {
      // First make sure all content is visible
      this.ensureContentVisibility();
      
      // Then initialize all functionality
      this.initSmoothScrolling();
      this.initMobileMenu();
      this.initScrollAnimations();
      this.initInteractiveElements();
      this.initFormValidation();
      this.initDynamicCursor();
      this.initMicroInteractions();
      
      console.log("%c Dhemhi Brand %c Ready for Success ", 
        "background: #A0009E; color: white; font-size: 16px; font-weight: bold; padding: 5px 10px;", 
        "background: #FF9F1C; color: #1A132F; font-size: 16px; font-weight: bold; padding: 5px 10px;");
    }
  
    // 0. First ensure all content is visible
    ensureContentVisibility() {
      // Remove any hiding styles that might have been set
      document.querySelectorAll('body, .section, .feature-card, .testimonial-card, .freebie-card')
        .forEach(el => {
          el.style.opacity = '';
          el.style.transform = '';
          el.style.transition = '';
        });
    }
  
    // 1. Safe Smooth Scrolling
    initSmoothScrolling() {
      // Only apply smooth scrolling to anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  
    // 2. Mobile Menu with Visibility Check
    initMobileMenu() {
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      if (!menuToggle) return;
  
      const mainNav = document.querySelector('.main-nav');
      const navLinks = document.querySelectorAll('.main-nav a');
      
      let isOpen = false;
      
      menuToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        mainNav.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        // Animate each link with stagger
        navLinks.forEach((link, index) => {
          if (isOpen) {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            link.style.transition = `all 0.3s ease ${index * 0.1}s`;
            setTimeout(() => {
              link.style.opacity = '1';
              link.style.transform = 'translateY(0)';
            }, 50);
          } else {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
          }
        });
        
        menuToggle.innerHTML = isOpen ? 
          '<i class="fas fa-times"></i>' : 
          '<i class="fas fa-bars"></i>';
      });
    }
  
    // 3. Safe Scroll Animations
    initScrollAnimations() {
      const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Only animate if not already visible
            if (entry.target.style.opacity === '0') {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          }
        });
      };
  
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
  
      const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
      // Only observe elements that should animate
      document.querySelectorAll('.feature-card, .testimonial-card, .freebie-card').forEach(el => {
        // Set initial state only if not already visible
        if (window.getComputedStyle(el).opacity !== '0') {
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.observe(el);
        }
      });
    }
  
    // 4. Interactive Elements (safe version)
    initInteractiveElements() {
      // Button ripple effect
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const x = e.clientX - e.target.getBoundingClientRect().left;
          const y = e.clientY - e.target.getBoundingClientRect().top;
          
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
  
      // Card hover effect (desktop only)
      if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.feature-card, .testimonial-card, .freebie-card');
        cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
          });
  
          card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
          });
  
          card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
          });
        });
      }
    }
  
    // 5. Form Validation
    initFormValidation() {
      const form = document.querySelector('.freebie-form');
      if (!form) return;
  
      const inputs = form.querySelectorAll('input');
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
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
  
        inputs.forEach(input => {
          if (input.hasAttribute('required') && input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
          }
        });
  
        if (isValid) {
          form.innerHTML = `
            <div class="form-success">
              <i class="fas fa-check-circle"></i>
              <h3>Success!</h3>
              <p>Your free resources are on their way to your email!</p>
            </div>
          `;
        }
      });
    }
  
    // 6. Dynamic Custom Cursor (desktop only)
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
        cursorFollower.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      });
  
      const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
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
  
    // 7. Micro-interactions
    initMicroInteractions() {
      // Scroll progress indicator
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
      
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = `${progress}%`;
      });
  
      // Header scroll effect
      window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  }
  
  // Initialize when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // First make sure all content is visible immediately
    document.querySelectorAll('.section, .feature-card, .testimonial-card, .freebie-card')
      .forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    
    // Then initialize the controller
    new DhemhiBrand();
  });