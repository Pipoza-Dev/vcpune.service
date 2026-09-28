/* ==========================================================================
   VC CONTRACTOR (VC PUNE) - MAIN SCRIPT
   Minimalist, Ultra-Fast, Mobile Optimized
   Multilingual Engine (English, Hindi, Marathi)
   Device Default Auto-Theme
   Contact: +91 91759 21246 | WhatsApp: +91 91759 21246 | vcpune.info@gmail.com
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. MULTILINGUAL TRANSLATION ENGINE (EN, HI, MR) ---
  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem('vc_contractor_lang') || localStorage.getItem('vp_contractor_lang') || localStorage.getItem('vp_construction_lang') || DEFAULT_LANG;

  function applyLanguage(lang) {
    if (typeof translations === 'undefined' || !translations[lang]) {
      return;
    }

    currentLang = lang;
    localStorage.setItem('vc_contractor_lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Apply Devanagari typography helper for Hindi and Marathi
    if (lang === 'hi' || lang === 'mr') {
      document.body.classList.add('lang-devanagari');
    } else {
      document.body.classList.remove('lang-devanagari');
    }

    // Update all text elements with data-i18n
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Refresh mobile card limiter labels if present
    const indexMoreBtn = document.getElementById('indexGalleryMoreBtn');
    if (indexMoreBtn && indexMoreBtn._refresh) indexMoreBtn._refresh();
    const projMoreBtn = document.getElementById('projectsGalleryMoreBtn');
    if (projMoreBtn && projMoreBtn._refresh) projMoreBtn._refresh();

    // Refresh autoplay buttons labels
    if (typeof updateAutoplayUI === 'function') {
      updateAutoplayUI(autoplayEnabled);
    }

    // Update buttons active state across desktop and mobile drawer
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  // Bind click event to all language buttons
  function initLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = btn.getAttribute('data-lang');
        if (lang) {
          applyLanguage(lang);
        }
      });
    });

    // Initial language application
    applyLanguage(currentLang);
  }

  // --- 2. DEVICE DEFAULT THEME (CHANGES AUTOMATICALLY WITH DEVICE SETTINGS) ---
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getEffectiveTheme() {
    const saved = localStorage.getItem('vc_contractor_theme') || localStorage.getItem('vp_contractor_theme') || localStorage.getItem('vp_construction_theme');
    // If explicitly set by user, honor it
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Default is the device/OS preference!
    return mediaQueryDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(mode) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  // Initialize theme
  applyTheme(getEffectiveTheme());

  // Automatically adapt if user changes their phone/computer system theme!
  if (mediaQueryDark.addEventListener) {
    mediaQueryDark.addEventListener('change', (e) => {
      const saved = localStorage.getItem('vc_contractor_theme') || localStorage.getItem('vp_contractor_theme') || localStorage.getItem('vp_construction_theme');
      // If user hasn't explicitly locked light/dark, change with device
      if (!saved) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Manual theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('vc_contractor_theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // --- 3. MOBILE NAVIGATION DRAWER & BACKDROP ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    // Dynamic backdrop overlay creation
    let navBackdrop = document.querySelector('.nav-backdrop');
    if (!navBackdrop) {
      navBackdrop = document.createElement('div');
      navBackdrop.className = 'nav-backdrop';
      document.body.appendChild(navBackdrop);
    }

    function toggleMobileMenu(forceState) {
      const isOpen = (typeof forceState === 'boolean') ? forceState : !mobileDrawer.classList.contains('is-open');
      mobileDrawer.classList.toggle('is-open', isOpen);
      navBackdrop.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('nav-drawer-open', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    navBackdrop.addEventListener('click', () => {
      toggleMobileMenu(false);
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('is-open') && !mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        toggleMobileMenu(false);
      }
    });

    // Close when clicking any nav link inside drawer
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });
  }

  // --- 4. CLEAN EXTENSIONLESS URL ROUTING (NO .HTML IN URL FOR GITHUB PAGES) ---
  function initCleanUrls() {
    const isFileProtocol = window.location.protocol === 'file:';

    // On live HTTP/HTTPS (GitHub Pages): strip .html from address bar
    if (!isFileProtocol && window.location.pathname.endsWith('.html')) {
      const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      const newUrl = cleanPath + window.location.search + window.location.hash;
      window.history.replaceState(null, '', newUrl);
    }

    // Intercept clicks on internal navigation links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      // Skip external links, anchors, protocols
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }

      // In local file:// environment: ensure extensionless links resolve to .html files
      if (isFileProtocol) {
        if (href === './' || href === '/') {
          e.preventDefault();
          window.location.href = 'index.html';
          return;
        }
        if (!href.endsWith('.html') && !href.includes('#')) {
          e.preventDefault();
          const clean = href.replace(/^\.\//, '').replace(/\/$/, '');
          const targetFile = (clean === '' || clean === 'index') ? 'index.html' : `${clean}.html`;
          window.location.href = targetFile;
        }
      } else {
        // On GitHub Pages (HTTP/HTTPS): ensure URL navigated to is clean without .html
        if (href.endsWith('.html')) {
          e.preventDefault();
          const cleanTarget = href === 'index.html' ? './' : href.replace(/\.html$/, '');
          window.location.href = cleanTarget;
        }
      }
    });
  }

  initCleanUrls();

  // --- 5. ACTIVE NAVIGATION LINK HIGHLIGHTER ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links .nav-link, .mobile-nav-drawer .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/^\.\//, '').replace(/\.html$/, '');
    
    if (
      (currentPath.endsWith('/') || currentPath.endsWith('index') || currentPath.endsWith('index.html')) &&
      (cleanHref === '' || cleanHref === '.' || cleanHref === 'index')
    ) {
      link.classList.add('active');
    } else if (cleanHref !== '' && cleanHref !== '.' && currentPath.includes(cleanHref)) {
      link.classList.add('active');
    }
  });

  // --- 5. INLINE VIDEO AUTOPLAY ON SCROLL CONTROLLER (MUTED, SINGLE-ACTIVE, USER CLICK-TO-STOP) ---
  let autoplayEnabled = true;
  const savedAutoplay = localStorage.getItem('vc_contractor_autoplay') || localStorage.getItem('vp_contractor_autoplay');
  const isDataSaver = Boolean(navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === 'slow-2g'));

  if (savedAutoplay !== null) {
    autoplayEnabled = (savedAutoplay === 'true');
  } else if (isDataSaver) {
    // If mobile user has Data Saver enabled, respect their bandwidth by default
    autoplayEnabled = false;
  }

  let currentlyPlayingCard = null;
  let scrollCheckTimer = null;
  let cardObserver = null;
  const cardVisibilityMap = new Map();

  function showToast(customText) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
    toast.textContent = customText || (dict && dict['toast_link_copied'] ? dict['toast_link_copied'] : 'Link copied to clipboard!');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function updateAutoplayUI(enabled) {
    const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
    const title = enabled ? 
      (dict && dict['nav_autoplay_btn_title_on'] ? dict['nav_autoplay_btn_title_on'] : 'Auto-Play Videos: ON (Click to Stop)') :
      (dict && dict['nav_autoplay_btn_title_off'] ? dict['nav_autoplay_btn_title_off'] : 'Auto-Play Videos: OFF (Click to Start)');
    const label = enabled ?
      (dict && dict['autoplay_on'] ? dict['autoplay_on'] : 'Auto-Play ON') :
      (dict && dict['autoplay_off'] ? dict['autoplay_off'] : 'Auto-Play OFF');

    // Header buttons (desktop & mobile)
    document.querySelectorAll('.autoplay-nav-btn').forEach(btn => {
      btn.setAttribute('title', title);
      btn.setAttribute('aria-label', title);
      const icon = btn.querySelector('i');
      const text = btn.querySelector('.nav-autoplay-text');

      if (enabled) {
        btn.classList.add('active');
        btn.classList.remove('is-off');
        if (icon) icon.className = 'fa-solid fa-play';
        if (text) text.textContent = label;
      } else {
        btn.classList.remove('active');
        btn.classList.add('is-off');
        if (icon) icon.className = 'fa-solid fa-pause';
        if (text) text.textContent = label;
      }
    });

    // Mobile drawer buttons
    document.querySelectorAll('.mobile-autoplay-btn').forEach(btn => {
      const icon = btn.querySelector('i');
      const labelEl = btn.querySelector('.mobile-autoplay-label');
      const pillBadge = btn.querySelector('.mobile-autoplay-pill-badge');
      const pillText = (dict && dict['btn_toggle_pill']) ? dict['btn_toggle_pill'] : 'Tap to Toggle';

      if (pillBadge) {
        pillBadge.textContent = pillText;
      }

      if (enabled) {
        btn.classList.add('active');
        btn.classList.remove('is-off');
        if (icon) icon.className = 'fa-solid fa-circle-play';
        if (labelEl) labelEl.textContent = label;
      } else {
        btn.classList.remove('active');
        btn.classList.add('is-off');
        if (icon) icon.className = 'fa-solid fa-circle-pause';
        if (labelEl) labelEl.textContent = label;
      }
    });
  }

  function setAutoplay(enabled, showFeedback = true) {
    autoplayEnabled = enabled;
    localStorage.setItem('vc_contractor_autoplay', enabled ? 'true' : 'false');
    updateAutoplayUI(enabled);

    if (!enabled) {
      if (currentlyPlayingCard) {
        pauseCardVideo(currentlyPlayingCard);
      }
      if (showFeedback) {
        const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
        showToast(dict && dict['autoplay_toast_off'] ? dict['autoplay_toast_off'] : 'Video Auto-Play Stopped');
      }
    } else {
      if (showFeedback) {
        const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
        showToast(dict && dict['autoplay_toast_on'] ? dict['autoplay_toast_on'] : 'Video Auto-Play Enabled');
      }
      checkViewportVideos();
    }
  }

  function toggleAutoplay() {
    setAutoplay(!autoplayEnabled, true);
  }

  function playCardVideo(card) {
    if (!card) return;
    const isModalActive = document.querySelector('.media-modal.is-active');
    if (isModalActive) return;

    if (currentlyPlayingCard && currentlyPlayingCard !== card) {
      pauseCardVideo(currentlyPlayingCard);
    }

    let videoEl = card.querySelector('video.gallery-card-video');
    if (!videoEl) {
      const src = card.getAttribute('data-src');
      if (!src) return;
      const wrap = card.querySelector('.gallery-thumb-wrap');
      if (!wrap) return;
      videoEl = document.createElement('video');
      videoEl.className = 'gallery-card-video';
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('muted', '');
      videoEl.setAttribute('loop', '');
      videoEl.setAttribute('preload', 'none');
      videoEl.muted = true;
      videoEl.src = src;
      wrap.appendChild(videoEl);
    }

    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        card.classList.add('is-video-playing');
        currentlyPlayingCard = card;
      }).catch(() => {
        // Autoplay policy prevented playback
      });
    }
  }

  function pauseCardVideo(card) {
    if (!card) return;
    const videoEl = card.querySelector('video.gallery-card-video');
    if (videoEl) {
      videoEl.pause();
    }
    card.classList.remove('is-video-playing');
    if (currentlyPlayingCard === card) {
      currentlyPlayingCard = null;
    }
  }

  function checkViewportVideos() {
    if (!autoplayEnabled) {
      if (currentlyPlayingCard) pauseCardVideo(currentlyPlayingCard);
      return;
    }
    const isModalActive = document.querySelector('.media-modal.is-active');
    if (isModalActive) {
      if (currentlyPlayingCard) pauseCardVideo(currentlyPlayingCard);
      return;
    }

    let bestCard = null;
    let maxRatio = 0;

    cardVisibilityMap.forEach((ratio, card) => {
      if (card.style.display !== 'none' && !card.classList.contains('is-hidden-mobile')) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestCard = card;
        }
      }
    });

    if (bestCard && maxRatio >= 0.5) {
      if (!bestCard._userStopped) {
        if (currentlyPlayingCard !== bestCard) {
          playCardVideo(bestCard);
        }
      }
    } else if (maxRatio < 0.25) {
      if (currentlyPlayingCard) {
        pauseCardVideo(currentlyPlayingCard);
      }
    }
  }

  function initCardAutoplayEngine() {
    const videoCards = document.querySelectorAll('.gallery-card[data-type="video"]');

    // Ensure all video cards have a video element, expand button, and status pill
    videoCards.forEach(card => {
      const wrap = card.querySelector('.gallery-thumb-wrap');
      if (wrap) {
        if (!wrap.querySelector('video.gallery-card-video')) {
          const src = card.getAttribute('data-src');
          if (src) {
            const v = document.createElement('video');
            v.className = 'gallery-card-video';
            v.setAttribute('playsinline', '');
            v.setAttribute('muted', '');
            v.setAttribute('loop', '');
            v.setAttribute('preload', 'none');
            v.muted = true;
            v.src = src;
            wrap.appendChild(v);
          }
        }

        if (!wrap.querySelector('.gallery-expand-btn')) {
          const expandBtn = document.createElement('button');
          expandBtn.type = 'button';
          expandBtn.className = 'gallery-expand-btn';
          expandBtn.setAttribute('title', 'Open Fullscreen');
          expandBtn.setAttribute('aria-label', 'Open Fullscreen');
          expandBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
          wrap.appendChild(expandBtn);
        }

        if (!wrap.querySelector('.gallery-video-status-pill')) {
          const pill = document.createElement('div');
          pill.className = 'gallery-video-status-pill';
          pill.innerHTML = '<i class="fa-solid fa-pause"></i> <span data-i18n="btn_tap_to_stop">Tap to pause</span>';
          wrap.appendChild(pill);
        }
      }
    });

    if (videoCards.length && 'IntersectionObserver' in window) {
      cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          cardVisibilityMap.set(entry.target, entry.intersectionRatio);
          if (entry.intersectionRatio <= 0.1) {
            entry.target._userStopped = false;
            if (currentlyPlayingCard === entry.target) {
              pauseCardVideo(entry.target);
            }
          }
        });

        clearTimeout(scrollCheckTimer);
        scrollCheckTimer = setTimeout(checkViewportVideos, 150);
      }, {
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      });

      videoCards.forEach(card => cardObserver.observe(card));
    }

    // Attach click events on toggle buttons in nav and drawer
    document.querySelectorAll('.autoplay-nav-btn, .mobile-autoplay-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAutoplay();
      });
    });

    updateAutoplayUI(autoplayEnabled);
  }

  // --- 6. MEDIA LIGHTBOX MODAL & CUSTOM VIDEO CONTROLS ---
  function initMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (!modal) return;

    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalShareBtn = document.getElementById('modalShareBtn');
    const modalPrevBtn = document.getElementById('modalPrevBtn');
    const modalNextBtn = document.getElementById('modalNextBtn');

    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalWaBtn = document.getElementById('modalWaBtn');

    const modalImageWrap = document.getElementById('modalImageWrap');
    const modalImg = document.getElementById('modalImg');

    const modalVideoWrap = document.getElementById('modalVideoWrap');
    const modalVideo = document.getElementById('modalVideo');
    const customCenterPlay = document.getElementById('customCenterPlay');
    const videoMutePill = document.getElementById('videoMutePill');
    const vPlayPauseBtn = document.getElementById('vPlayPauseBtn');
    const vProgressContainer = document.getElementById('vProgressContainer');
    const vProgressBar = document.getElementById('vProgressBar');
    const vTimeDisplay = document.getElementById('vTimeDisplay');
    const vMuteBtn = document.getElementById('vMuteBtn');
    const vFullscreenBtn = document.getElementById('vFullscreenBtn');

    let mediaItems = [];
    let currentIndex = 0;

    function refreshMediaItems() {
      mediaItems = [];
      const cards = document.querySelectorAll('.gallery-card[data-src]');
      cards.forEach((card) => {
        // Include item if not filtered out by category tab (style.display !== 'none')
        if (card.style.display !== 'none') {
          const imgEl = card.querySelector('img');
          const thumb = imgEl ? (imgEl.getAttribute('src') || '') : '';
          mediaItems.push({
            el: card,
            type: card.getAttribute('data-type') || 'image',
            src: card.getAttribute('data-src'),
            thumb: thumb,
            title: card.getAttribute('data-title') || '',
            sub: card.getAttribute('data-sub') || '',
            badge: card.getAttribute('data-badge') || (card.getAttribute('data-type') === 'video' ? 'Video' : 'Photo'),
            inquire: card.getAttribute('data-inquire') || card.getAttribute('data-title') || ''
          });
        }
      });
    }

    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateMuteState(isMuted) {
      if (!modalVideo) return;
      modalVideo.muted = isMuted;

      if (vMuteBtn) {
        const muteIcon = vMuteBtn.querySelector('i');
        if (muteIcon) {
          muteIcon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
        }
      }

      if (videoMutePill) {
        const pillIcon = videoMutePill.querySelector('i');
        const pillText = videoMutePill.querySelector('span');
        if (pillIcon) {
          pillIcon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
        }
        if (pillText) {
          const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
          if (dict) {
            pillText.textContent = isMuted ? (dict['muted_text'] || 'Muted (Tap to unmute)') : (dict['unmuted_text'] || 'Unmuted');
          } else {
            pillText.textContent = isMuted ? 'Muted (Tap to unmute)' : 'Unmuted';
          }
        }
      }
    }

    function updatePlayPauseState(isPlaying) {
      if (customCenterPlay) {
        if (isPlaying) {
          customCenterPlay.classList.add('is-playing');
        } else {
          customCenterPlay.classList.remove('is-playing');
          const centerIcon = customCenterPlay.querySelector('i');
          if (centerIcon) centerIcon.className = 'fa-solid fa-play';
        }
      }

      if (vPlayPauseBtn) {
        const playIcon = vPlayPauseBtn.querySelector('i');
        if (playIcon) {
          playIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }
      }
    }

    function openItem(index) {
      refreshMediaItems();
      if (!mediaItems.length) return;

      currentIndex = (index + mediaItems.length) % mediaItems.length;
      const item = mediaItems[currentIndex];

      if (modalBadge) modalBadge.textContent = item.badge;
      if (modalTitle) modalTitle.textContent = item.title;
      if (modalSubtitle) modalSubtitle.textContent = item.sub;

      if (modalWaBtn) {
        const query = encodeURIComponent(`Hi VC Contractor, I saw your work: "${item.title}" and want an estimate/quote.`);
        modalWaBtn.href = `https://wa.me/919175921246?text=${query}`;
      }

      if (item.type === 'video') {
        if (modalImageWrap) modalImageWrap.style.display = 'none';
        if (modalVideoWrap) modalVideoWrap.style.display = 'flex';

        if (modalVideo) {
          modalVideo.src = item.src;
          modalVideo.currentTime = 0;
          // As explicitly requested by the user: default muted!
          updateMuteState(true);
          updatePlayPauseState(false);

          modalVideo.play().then(() => {
            updatePlayPauseState(true);
          }).catch(() => {
            updatePlayPauseState(false);
          });
        }
      } else {
        // Image
        if (modalVideoWrap) {
          modalVideoWrap.style.display = 'none';
          if (modalVideo) {
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.load();
          }
        }
        if (modalImageWrap) modalImageWrap.style.display = 'flex';
        if (modalImg) {
          modalImg.src = item.src;
          modalImg.alt = item.title;
        }
      }

      // Ambient colorful blurry backdrop behind videos & photos
      const modalAmbientImg = document.getElementById('modalAmbientImg');
      if (modalAmbientImg) {
        modalAmbientImg.src = item.thumb || item.src;
      }

      // Pause any inline playing card video when opening modal
      if (typeof pauseCardVideo === 'function' && currentlyPlayingCard) {
        pauseCardVideo(currentlyPlayingCard);
      }

      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        updatePlayPauseState(false);
      }
      const modalAmbientImg = document.getElementById('modalAmbientImg');
      if (modalAmbientImg) {
        modalAmbientImg.src = '';
      }
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Re-evaluate viewport autoplay after closing modal
      if (autoplayEnabled && typeof checkViewportVideos === 'function') {
        setTimeout(checkViewportVideos, 300);
      }
    }

    // Attach card clicks
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card[data-src]');
      if (card) {
        // If clicking a direct external link (like WhatsApp button on card), let it navigate
        if (e.target.closest('a[href^="https://wa.me"]') || e.target.closest('a[href^="tel:"]')) {
          return;
        }

        const isVideoCard = card.getAttribute('data-type') === 'video';
        const clickedExpand = e.target.closest('.gallery-expand-btn');
        const clickedThumb = e.target.closest('.gallery-thumb-wrap');

        // If clicking on the video or thumb area of a video card (and NOT the expand button)
        if (isVideoCard && clickedThumb && !clickedExpand) {
          e.preventDefault();
          // The User can stop by just Clicking the Video
          if (card.classList.contains('is-video-playing')) {
            pauseCardVideo(card);
            card._userStopped = true;
          } else {
            card._userStopped = false;
            playCardVideo(card);
          }
          return;
        }

        // For expand button, card text, or photo cards: open full modal
        e.preventDefault();
        refreshMediaItems();
        const clickedIndex = mediaItems.findIndex(m => m.el === card);
        if (clickedIndex !== -1) {
          openItem(clickedIndex);
        }
      }
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    if (modalPrevBtn) {
      modalPrevBtn.addEventListener('click', () => {
        openItem(currentIndex - 1);
      });
    }

    if (modalNextBtn) {
      modalNextBtn.addEventListener('click', () => {
        openItem(currentIndex + 1);
      });
    }

    // Video Player Interactions
    if (modalVideo) {
      modalVideo.addEventListener('click', () => {
        if (modalVideo.paused) {
          modalVideo.play();
          updatePlayPauseState(true);
        } else {
          modalVideo.pause();
          updatePlayPauseState(false);
        }
      });

      if (customCenterPlay) {
        customCenterPlay.addEventListener('click', () => {
          if (modalVideo.paused) {
            modalVideo.play();
            updatePlayPauseState(true);
          } else {
            modalVideo.pause();
            updatePlayPauseState(false);
          }
        });
      }

      if (vPlayPauseBtn) {
        vPlayPauseBtn.addEventListener('click', () => {
          if (modalVideo.paused) {
            modalVideo.play();
            updatePlayPauseState(true);
          } else {
            modalVideo.pause();
            updatePlayPauseState(false);
          }
        });
      }

      // Mute / Unmute Toggles (Default Muted)
      if (videoMutePill) {
        videoMutePill.addEventListener('click', () => {
          updateMuteState(!modalVideo.muted);
        });
      }

      if (vMuteBtn) {
        vMuteBtn.addEventListener('click', () => {
          updateMuteState(!modalVideo.muted);
        });
      }

      // Progress bar & time
      modalVideo.addEventListener('timeupdate', () => {
        if (!isNaN(modalVideo.duration) && modalVideo.duration > 0) {
          const percent = (modalVideo.currentTime / modalVideo.duration) * 100;
          if (vProgressBar) vProgressBar.style.width = `${percent}%`;
          if (vTimeDisplay) {
            vTimeDisplay.textContent = `${formatTime(modalVideo.currentTime)} / ${formatTime(modalVideo.duration)}`;
          }
        }
      });

      modalVideo.addEventListener('ended', () => {
        updatePlayPauseState(false);
        if (vProgressBar) vProgressBar.style.width = '0%';
      });

      // Seeking
      if (vProgressContainer) {
        vProgressContainer.addEventListener('click', (e) => {
          const rect = vProgressContainer.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(1, clickX / rect.width));
          if (!isNaN(modalVideo.duration)) {
            modalVideo.currentTime = pct * modalVideo.duration;
          }
        });
      }

      // Fullscreen
      if (vFullscreenBtn) {
        vFullscreenBtn.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            if (modalVideoWrap.requestFullscreen) {
              modalVideoWrap.requestFullscreen();
            } else if (modalVideo.requestFullscreen) {
              modalVideo.requestFullscreen();
            }
          } else {
            if (document.exitFullscreen) document.exitFullscreen();
          }
        });
      }
    }

    // Share Button Implementation
    if (modalShareBtn) {
      modalShareBtn.addEventListener('click', async () => {
        const item = mediaItems[currentIndex];
        const shareTitle = item ? item.title : 'VC Contractor Pune Work';
        const shareText = `Check out this renovation & waterproofing work by VC Contractor: ${shareTitle}`;
        const shareUrl = window.location.href;

        if (navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl
            });
            return;
          } catch (err) {
            // Cancelled or unsupported fallback to clipboard
          }
        }

        // Fallback: Copy link & show toast
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
            showToast();
          }).catch(() => {
            showToast();
          });
        } else {
          showToast();
        }
      });
    }

    function showToast() {
      let toast = document.querySelector('.toast-notice');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
      }
      const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
      toast.textContent = (dict && dict['toast_link_copied']) ? dict['toast_link_copied'] : 'Link copied to clipboard!';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // Keyboard navigation (Esc to close, Left/Right arrows)
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-active')) return;
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        openItem(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        openItem(currentIndex + 1);
      }
    });
  }

  // --- 7. PORTFOLIO FILTER TABS (ALL, VIDEOS, PHOTOS, WATERPROOFING, BATHROOM) ---
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
    const cards = document.querySelectorAll('.gallery-grid .gallery-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        cards.forEach(card => {
          const type = card.getAttribute('data-type');
          const category = card.getAttribute('data-category');

          if (filter === 'all') {
            card.style.display = '';
          } else if (filter === 'video') {
            card.style.display = type === 'video' ? '' : 'none';
          } else if (filter === 'image') {
            card.style.display = type === 'image' ? '' : 'none';
          } else if (filter === 'waterproofing') {
            card.style.display = (category === 'waterproofing') ? '' : 'none';
          } else if (filter === 'bathroom') {
            card.style.display = (category === 'bathroom' || category === 'plumbing') ? '' : 'none';
          } else {
            card.style.display = '';
          }
        });
      });
    });
  }

  // --- 8. CARD LIMITER FOR SMALLER DEVICES (SHOW 2-3 MAX WITH SHOW MORE / REDIRECT) ---
  function initMobileCardLimiter() {
    const isMobile = () => window.innerWidth <= 768;

    // Helper: update button label with active translation and count
    function updateBtnLabel(btn, isExpanded, remainingCount) {
      if (!btn) return;
      const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : null;
      const icon = btn.querySelector('i');
      const textEl = btn.querySelector('.btn-more-text');

      if (isExpanded) {
        if (icon) icon.className = 'fa-solid fa-chevron-up';
        const label = (dict && dict['btn_show_less_works']) ? dict['btn_show_less_works'] : 'Show Less';
        if (textEl) textEl.textContent = label;
      } else {
        if (icon) icon.className = 'fa-solid fa-chevron-down';
        const base = (dict && dict['btn_show_more_works']) ? dict['btn_show_more_works'] : 'Show More Works';
        const countStr = remainingCount > 0 ? ` (+${remainingCount})` : '';
        if (textEl) textEl.textContent = `${base}${countStr}`;
      }
    }

    // 1. Setup on Home (index.html)
    const indexMoreBtn = document.getElementById('indexGalleryMoreBtn');
    const indexGrid = document.querySelector('#gallery .gallery-grid');
    if (indexGrid && indexMoreBtn) {
      const cards = Array.from(indexGrid.querySelectorAll('.gallery-card'));
      let isExpanded = false;

      function renderIndexCards() {
        if (isMobile()) {
          const maxVisible = 3;
          const remaining = Math.max(0, cards.length - maxVisible);

          cards.forEach((card, idx) => {
            if (!isExpanded && idx >= maxVisible) {
              card.classList.add('is-hidden-mobile');
            } else {
              card.classList.remove('is-hidden-mobile');
            }
          });

          if (cards.length > maxVisible) {
            indexMoreBtn.style.display = 'inline-flex';
            updateBtnLabel(indexMoreBtn, isExpanded, remaining);
          } else {
            indexMoreBtn.style.display = 'none';
          }
        } else {
          // Desktop: all visible, button hidden
          cards.forEach(card => card.classList.remove('is-hidden-mobile'));
          indexMoreBtn.style.display = 'none';
        }
      }

      indexMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        renderIndexCards();
        if (!isExpanded) {
          const gallerySec = document.getElementById('gallery');
          if (gallerySec) gallerySec.scrollIntoView({ behavior: 'smooth' });
        }
      });

      renderIndexCards();
      window.addEventListener('resize', renderIndexCards);
      indexMoreBtn._refresh = renderIndexCards;
    }

    // 2. Setup on Projects (projects.html)
    const projMoreBtn = document.getElementById('projectsGalleryMoreBtn');
    const projGrid = document.getElementById('galleryGrid');
    if (projGrid && projMoreBtn) {
      let isExpanded = false;

      function renderProjectCards() {
        const cards = Array.from(projGrid.querySelectorAll('.gallery-card'));
        const visibleInFilter = cards.filter(c => c.style.display !== 'none');

        if (isMobile()) {
          const maxVisible = 3;
          if (visibleInFilter.length > maxVisible) {
            projMoreBtn.style.display = 'inline-flex';
            const remaining = visibleInFilter.length - maxVisible;

            visibleInFilter.forEach((card, idx) => {
              if (!isExpanded && idx >= maxVisible) {
                card.classList.add('is-hidden-mobile');
              } else {
                card.classList.remove('is-hidden-mobile');
              }
            });

            updateBtnLabel(projMoreBtn, isExpanded, remaining);
          } else {
            visibleInFilter.forEach(card => card.classList.remove('is-hidden-mobile'));
            projMoreBtn.style.display = 'none';
          }
        } else {
          cards.forEach(card => card.classList.remove('is-hidden-mobile'));
          projMoreBtn.style.display = 'none';
        }
      }

      projMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        renderProjectCards();
        if (!isExpanded) {
          const gallerySec = document.getElementById('gallery');
          if (gallerySec) gallerySec.scrollIntoView({ behavior: 'smooth' });
        }
      });

      // Hook filter tab clicks to reset expanded state
      const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          isExpanded = false;
          setTimeout(renderProjectCards, 20);
        });
      });

      renderProjectCards();
      window.addEventListener('resize', renderProjectCards);
      projMoreBtn._refresh = renderProjectCards;
    }
  }

  // Run initialization once DOM is fully ready
  function initApp() {
    initLanguageSwitcher();
    initMediaModal();
    initCardAutoplayEngine();
    initPortfolioFilters();
    initMobileCardLimiter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
