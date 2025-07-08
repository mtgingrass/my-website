// Dark Mode Toggle Functionality
(function() {
  'use strict';
  
  // Initialize theme
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    updateToggleIcon();
  }
  
  // Create dark mode toggle button
  function createToggleButton() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.setAttribute('title', 'Toggle dark mode');
    
    const sunIcon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    
    const moonIcon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    
    toggle.innerHTML = sunIcon;
    toggle.dataset.sunIcon = sunIcon;
    toggle.dataset.moonIcon = moonIcon;
    
    toggle.addEventListener('click', toggleTheme);
    
    // Add keyboard navigation
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
    
    return toggle;
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateToggleIcon();
    
    // Announce theme change for screen readers
    announceThemeChange(newTheme);
  }
  
  // Update toggle icon
  function updateToggleIcon() {
    const toggle = document.querySelector('.dark-mode-toggle');
    if (!toggle) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isLight = currentTheme === 'light';
    
    toggle.innerHTML = isLight ? toggle.dataset.moonIcon : toggle.dataset.sunIcon;
    toggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    toggle.setAttribute('title', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  }
  
  // Announce theme change for accessibility
  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = `Switched to ${theme} mode`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  // Listen for system theme changes
  function listenForSystemThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        updateToggleIcon();
      }
    });
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Create and insert toggle button
    const toggle = createToggleButton();
    document.body.appendChild(toggle);
    
    // Listen for system theme changes
    listenForSystemThemeChanges();
    
    // Add smooth transition class after initial load
    setTimeout(() => {
      document.body.classList.add('theme-transitions');
    }, 100);
  });
  
  // Initialize immediately for faster theme application
  initializeTheme();
})();

// Enhanced Accessibility Features
(function() {
  'use strict';
  
  // Skip to main content link
  function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    const style = document.createElement('style');
    style.textContent = `
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        z-index: 1000;
        text-decoration: none;
        border-radius: 4px;
        font-size: 14px;
        transition: top 0.3s ease;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Add main content ID
  function addMainContentId() {
    const main = document.querySelector('main') || document.querySelector('.container');
    if (main) {
      main.id = 'main-content';
    }
  }
  
  // Enhance focus management
  function enhanceFocusManagement() {
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
      .focus-visible {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
      }
      
      .focus-visible:not(:focus-visible) {
        outline: none;
      }
    `;
    document.head.appendChild(style);
    
    // Add focus-visible class to interactive elements
    document.addEventListener('focus', function(e) {
      if (e.target.matches('a, button, input, textarea, select, [tabindex]')) {
        e.target.classList.add('focus-visible');
      }
    }, true);
    
    document.addEventListener('blur', function(e) {
      e.target.classList.remove('focus-visible');
    }, true);
  }
  
  // Improve keyboard navigation
  function improveKeyboardNavigation() {
    // Add keyboard navigation for app cards
    document.addEventListener('keydown', function(e) {
      if (e.target.matches('.app-card') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const link = e.target.querySelector('a');
        if (link) {
          link.click();
        }
      }
    });
    
    // Make app cards focusable
    document.querySelectorAll('.app-card').forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'View app details');
    });
  }
  
  // Add reduced motion support
  function addReducedMotionSupport() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      
      const style = document.createElement('style');
      style.textContent = `
        .reduced-motion *,
        .reduced-motion *::before,
        .reduced-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Initialize accessibility features
  document.addEventListener('DOMContentLoaded', function() {
    addSkipLink();
    addMainContentId();
    enhanceFocusManagement();
    improveKeyboardNavigation();
    addReducedMotionSupport();
  });
})();

// Performance Optimizations
(function() {
  'use strict';
  
  // Lazy load images
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Optimize font loading
  function optimizeFontLoading() {
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('400 16px Inter'),
        document.fonts.load('600 16px Inter'),
        document.fonts.load('700 16px Inter')
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }
  
  // Preload critical resources
  function preloadCriticalResources() {
    const criticalResources = [
      { href: '/images/markandollie1.webp', as: 'image' },
      { href: '/apps/iwndwytoday/images/IWNDWY_icon.png', as: 'image' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }
  
  // Initialize performance optimizations
  document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
    optimizeFontLoading();
    preloadCriticalResources();
  });
})();