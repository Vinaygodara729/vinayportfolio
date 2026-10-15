/**
 * ============================================================================
 * VINAY GODARA - PORTFOLIO JAVASCRIPT
 * Interactive Behaviors, Animations, Canvas Particles, & Theme Management
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. PRELOADER
  // --------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  
  const dismissPreloader = () => {
    if (!preloader) return;
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 650);
  };

  // Dismiss on full window load or fallback timer
  window.addEventListener('load', () => {
    setTimeout(dismissPreloader, 400);
  });
  setTimeout(dismissPreloader, 2000); // Safety fallback

  // --------------------------------------------------------------------------
  // 2. THEME CONTROLLER (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or fallback to user system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('vg_portfolio_theme');
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return userPrefersLight ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('vg_portfolio_theme', theme);
  };

  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 3. TOAST NOTIFICATIONS
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  const showToast = (message, duration = 3200) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  // --------------------------------------------------------------------------
  // 4. COPY EMAIL TO CLIPBOARD
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-address-text');
  const copyBtnIcon = document.getElementById('copy-btn-icon');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard!');
        
        // Provide visual feedback on the button
        if (copyBtnIcon) copyBtnIcon.className = 'fa-solid fa-check';
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        
        setTimeout(() => {
          if (copyBtnIcon) copyBtnIcon.className = 'fa-regular fa-copy';
          if (copyBtnText) copyBtnText.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        // Fallback for browsers that restrict clipboard permissions
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast('Email copied to clipboard!');
        } catch (e) {
          showToast('Failed to copy. Please manually copy the email.');
        }
        document.body.removeChild(textarea);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. TYPING EFFECT IN HERO
  // --------------------------------------------------------------------------
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const roles = [
      'B.Tech CSE Student',
      'C & Python Learner',
      'Future Software Developer',
      'Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deleteSpeed = 45;
    const holdDelay = 1800;
    const pauseBeforeType = 400;

    const typeLoop = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typedTarget.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        typedTarget.textContent = currentRole.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing word, wait before deleting
        setTimeout(() => {
          isDeleting = true;
          typeLoop();
        }, holdDelay);
        return;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting word, move to next
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, pauseBeforeType);
        return;
      }

      const currentSpeed = isDeleting ? deleteSpeed : typingSpeed;
      setTimeout(typeLoop, currentSpeed);
    };

    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 6. HERO INTERACTIVE PARTICLE CANVAS
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('hero-canvas');
  if (canvas && window.innerWidth > 480) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId = null;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent.offsetWidth;
      height = canvas.height = parent.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.45)' : 'rgba(6, 182, 212, 0.45)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(Math.min(width * 0.04, 55));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      render();
    }
  }

  // --------------------------------------------------------------------------
  // 7. SCROLL PROGRESS BAR & STICKY NAVBAR
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollPos / docHeight) * 100;
      scrollProgressBar.style.width = `${scrollPercent}%`;
      scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
    }

    // Sticky navbar shadow
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. MOBILE NAVIGATION MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.classList.toggle('open', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. ACTIVE SECTION SCROLLSPY
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy, { passive: true });

  // --------------------------------------------------------------------------
  // 10. SCROLL-REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 11. ANIMATED PROGRESS BARS & STAT COUNTERS
  // --------------------------------------------------------------------------
  // Skill progress bars
  const skillSection = document.getElementById('skills');
  let skillsAnimated = false;

  const animateSkills = () => {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-progress') || '50%';
      fill.style.width = targetWidth;
    });
  };

  if (skillSection && 'IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        animateSkills();
      }
    }, { threshold: 0.25 });

    skillObserver.observe(skillSection);
  } else {
    animateSkills();
  }

  // Number counters
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 0;
      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quadratic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);

        counter.textContent = currentCount;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    }, { threshold: 0.25 });

    counterObserver.observe(achievementsSection);
  } else {
    animateCounters();
  }

  // --------------------------------------------------------------------------
  // 12. CUSTOM DESKTOP CURSOR GLOW
  // --------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursor-glow');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (cursorGlow && !isTouchDevice && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    const updateCursor = () => {
      // Smooth lerp (linear interpolation)
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(updateCursor);
    };

    requestAnimationFrame(updateCursor);

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // --------------------------------------------------------------------------
  // 13. CONTACT FORM VALIDATION & MAILTO SENDER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const groupName = document.getElementById('group-name');
    const groupEmail = document.getElementById('group-email');
    const groupMessage = document.getElementById('group-message');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        groupName.classList.add('has-error');
        isValid = false;
      } else {
        groupName.classList.remove('has-error');
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        groupEmail.classList.add('has-error');
        isValid = false;
      } else {
        groupEmail.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        groupMessage.classList.add('has-error');
        isValid = false;
      } else {
        groupMessage.classList.remove('has-error');
      }

      if (!isValid) {
        showToast('Please fill in the required fields correctly.');
        return;
      }

      // Construct mailto link
      const recipient = 'vinaygodara729@gmail.com';
      const senderName = encodeURIComponent(nameInput.value.trim());
      const senderEmail = encodeURIComponent(emailInput.value.trim());
      const userSubject = subjectInput.value.trim() || `Portfolio Contact from ${nameInput.value.trim()}`;
      const subject = encodeURIComponent(userSubject);
      
      const bodyContent = `Hello Vinay,\n\n${messageInput.value.trim()}\n\n---\nSent by: ${nameInput.value.trim()} (${emailInput.value.trim()})`;
      const body = encodeURIComponent(bodyContent);

      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      showToast('Opening your email client to send message...');
      
      // Delay slightly for toast visibility
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 700);
    });

    // Real-time error clearance on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('has-error');
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 14. LOG WELCOME MESSAGE IN CONSOLE
  // --------------------------------------------------------------------------
  console.log(
    `%c🚀 Vinay Godara's Portfolio %c\nB.Tech CSE @ JECRC University, Jaipur\nLooking to collaborate? Reach out at vinaygodara729@gmail.com`,
    'background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #fff; padding: 6px 12px; border-radius: 4px; font-weight: bold;',
    'color: #94a3b8; font-size: 12px;'
  );
});
