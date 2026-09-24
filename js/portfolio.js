/**
 * MICHAEL PORTFOLIO CORE JAVASCRIPT
 * Handles Preloader, Navigation, Filter Tabs, Accordions, Lightbox, and Forms.
 */

// Global fetch safeguard against getter-only TypeErrors
(function() {
  try {
    var _origFetch = window.fetch;
    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
        if (protoDesc && (!protoDesc.writable || !protoDesc.set)) {
          Object.defineProperty(Window.prototype, 'fetch', {
            get: function() { return _origFetch; },
            set: function(fn) { _origFetch = fn; },
            configurable: true,
            enumerable: true
          });
        }
      } catch (err) {}
    }
    try {
      Object.defineProperty(window, 'fetch', {
        get: function() { return _origFetch; },
        set: function(fn) { _origFetch = fn; },
        configurable: true,
        enumerable: true
      });
    } catch (err) {}
  } catch (e) {}
})();

// Toast Notification Utility
function showToast(message, type = 'success') {
  let toast = document.getElementById('xpera-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'xpera-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `show ${type === 'error' ? 'toast-error' : 'toast-success'}`;
  
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  // ================= 1. PRELOADER COUNTDOWN =================
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const barFill = document.getElementById('preloader-fill');

  if (preloader && counterEl && barFill) {
    let progress = 0;
    const interval = setInterval(() => {
      // Fast, non-blocking progression
      progress += Math.floor(Math.random() * 18) + 12;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        counterEl.textContent = '100%';
        barFill.style.width = '100%';
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 250);
      } else {
        counterEl.textContent = `${progress}%`;
        barFill.style.width = `${progress}%`;
      }
    }, 35);
  }

  // ================= 2. MOBILE MENU CONTROLLER =================
  const mobileBtn = document.getElementById('mobileNavBtn');
  const mobileMenu = document.getElementById('mobileNavMenu');
  const mobileCloseBtn = document.getElementById('mobileNavClose');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMenu);
    }

    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ================= 3. SPOTLIGHT HOVER FOR GLASS CARDS =================
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ================= 4. INTERACTIVE ACCORDIONS =================
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close siblings if desired (optional: accordion behavior)
        accordionItems.forEach(sib => {
          if (sib !== item && sib.classList.contains('active')) {
            sib.classList.remove('active');
            const sibContent = sib.querySelector('.accordion-content');
            if (sibContent) sibContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // ================= 5. INTERACTIVE FILTER TABS =================
  const filterContainers = document.querySelectorAll('[data-filter-group]');
  filterContainers.forEach(container => {
    const tabs = container.querySelectorAll('.filter-tab');
    const targetSelector = container.getAttribute('data-filter-target');
    const items = document.querySelectorAll(targetSelector);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        items.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue || (itemCategory && itemCategory.includes(filterValue))) {
            item.style.display = '';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });

  // ================= 6. LIGHTBOX MODAL =================
  const lightboxModal = document.getElementById('portfolioLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal) {
    const triggerCards = document.querySelectorAll('[data-lightbox]');
    triggerCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent lightbox if clicking a direct link inside
        if (e.target.closest('a')) return;

        const title = card.getAttribute('data-title') || 'Project Showcase';
        const category = card.getAttribute('data-category-label') || 'Creative Works';
        const desc = card.getAttribute('data-desc') || '';
        const img = card.getAttribute('data-img') || '';

        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCategory) lightboxCategory.textContent = category;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        if (lightboxImage && img) {
          lightboxImage.src = img;
          lightboxImage.alt = title;
        }

        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    const hideLightbox = () => {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', hideLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) hideLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
        hideLightbox();
      }
    });
  }

  // ================= 7. CONTACT & INQUIRY FORMS =================
  const forms = document.querySelectorAll('form[data-ajax-form]');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const btnText = btn ? (btn.querySelector('.btn-text') || btn) : null;
      const originalText = btnText ? btnText.innerText : 'Submit';

      if (btn) btn.disabled = true;
      if (btnText) btnText.innerText = 'Sending...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          showToast('Thank you! Your message has been received. Michael will connect with you soon.', 'success');
          form.reset();
          if (btnText) btnText.innerText = 'Sent Successfully!';
        } else {
          showToast('Could not complete submission. Please try again.', 'error');
          if (btnText) btnText.innerText = 'Error';
        }
      } catch (err) {
        console.error('Submission error:', err);
        showToast('Network error. Please check your connection.', 'error');
        if (btnText) btnText.innerText = 'Network Error';
      } finally {
        setTimeout(() => {
          if (btn) btn.disabled = false;
          if (btnText) btnText.innerText = originalText;
        }, 3500);
      }
    });
  });
});
