/* ============================================================
   St. Mary's Dental Clinic — Minimalist Script
   Features:
   1. Clinic photo lightbox
   2. Smooth scroll for anchor links
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  
  /* ---- 1. PHOTO LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && lbImg && lbClose) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = item.querySelector('img');
        if (img) {
          // Swap to a higher resolution image for the lightbox view
          lbImg.src = img.src.replace('w=600', 'w=1200'); 
          lbImg.alt = img.alt;
          lightbox.classList.add('open');
          
          // Prevent the background page from scrolling while lightbox is open
          document.body.style.overflow = 'hidden'; 
          lbClose.focus();
        }
      });

      // Accessibility: Allow opening the lightbox with keyboard
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = ''; // Restore background scrolling
    }

    lbClose.addEventListener('click', closeLightbox);
    
    // Close when clicking the dark overlay background
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Close when pressing the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  /* ---- 2. SMOOTH SCROLL ---- */
  const HEADER_H = 80; // Matches the new header height to prevent text from hiding under it
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      
      // Ignore if it's just a generic '#' link
      if (targetId === '#') return; 
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate the exact scroll position, factoring in the sticky header
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - HEADER_H;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
