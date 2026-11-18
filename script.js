/**
 * Samsung.com Single-Page Replica — Complete Interactive Logic
 * Includes:
 * 1. Global Mega-Menu Flyout, Mobile Drawer, Search Overlay & Live Shopping Cart
 * 2. Hero Showcase Carousel with Segmented Progress Bars & Play/Pause
 * 3. "This Week's Highlights" Tabbed Bento Grid
 * 4. Full-Bleed Category Showcases (Mobile, TV & Audio, Home Appliances)
 * 5. "Recommended For You" Swatch-Interactive Carousel
 * 6. Explore #DoWhatYouCant Interactive Accordion
 * 7. Responsive Footer Accordions & Quick Product Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigationAndCart();
  initHeroCarousel();
  initHighlightsBento();
  initCategoryShowcases();
  initRecommendedCarousel();
  initEditorialSection();
  initFooterAccordions();
});

/* ==========================================================================
   1. GLOBAL MEGA MENU, SEARCH OVERLAY & LIVE SHOPPING CART
   ========================================================================== */
function initNavigationAndCart() {
  const header = document.getElementById('samsung-header');
  const megaMenu = document.getElementById('samsung-mega-menu');
  const megaMenuBody = document.getElementById('mega-menu-body');
  const backdrop = document.getElementById('samsung-backdrop');
  const navItems = document.querySelectorAll('.nav-item[data-mega]');

  const mobileTrigger = document.getElementById('nav-mobile-trigger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-drawer-close');

  const searchTrigger = document.getElementById('nav-search-trigger');
  const bottomSearchTrigger = document.getElementById('bottom-search-trigger');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-overlay-close');
  const overlaySearchInput = document.getElementById('overlay-search-input');

  const cartTrigger = document.getElementById('nav-cart-trigger');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-drawer-close');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartBadge = document.getElementById('cart-badge');
  const cartTotalPrice = document.getElementById('cart-total-price');

  const megaData = {
    shop: {
      tiles: [
        { name: 'Galaxy S26 Ultra', badge: 'NEW', price: 1299.99, href: '#mobile-showcase' },
        { name: 'Neo QLED 8K QN900F', badge: 'HOT', price: 3499.99, href: '#tv-showcase' },
        { name: 'Bespoke AI Laundry Combo™', badge: 'SAVE $800', price: 2199.99, href: '#appliances-showcase' },
        { name: 'Galaxy Watch8 Classic', badge: 'NEW', price: 399.99, href: '#mobile-showcase' }
      ],
      links: ['All Offers', 'Samsung Rewards', 'Trade-In Program', 'Education Offers', 'Military & First Responders']
    },
    mobile: {
      tiles: [
        { name: 'Galaxy S26 Ultra', badge: 'GALAXY AI', price: 1299.99, href: '#mobile-showcase' },
        { name: 'Galaxy Z Fold7', badge: 'NEW', price: 1799.99, href: '#mobile-showcase' },
        { name: 'Galaxy Tab S11 Ultra', badge: 'NEW', price: 1199.99, href: '#mobile-showcase' },
        { name: 'Galaxy Ring', badge: 'NEW', price: 399.99, href: '#mobile-showcase' }
      ],
      links: ['Smartphones', 'Tablets', 'Watches', 'Galaxy Buds', 'Galaxy Ring', 'Compare Smartphones']
    },
    tv: {
      tiles: [
        { name: 'Neo QLED 8K', badge: '2026 MODEL', price: 3499.99, href: '#tv-showcase' },
        { name: 'OLED S95F', badge: 'GLARE-FREE', price: 2599.99, href: '#tv-showcase' },
        { name: 'The Frame', badge: 'ART MODE', price: 1499.99, href: '#tv-showcase' },
        { name: 'Q-Series Soundbar', badge: 'DOLBY ATMOS', price: 999.99, href: '#tv-showcase' }
      ],
      links: ['Neo QLED TVs', 'OLED TVs', 'The Frame', 'Micro LED', 'Soundbars', 'Projectors']
    },
    appliances: {
      tiles: [
        { name: 'Bespoke AI Laundry Combo™', badge: 'ALL-IN-ONE', price: 2199.99, href: '#appliances-showcase' },
        { name: 'Bespoke 4-Door Flex™', badge: 'AI FAMILY HUB+', price: 2899.99, href: '#appliances-showcase' },
        { name: 'Jet Bot Combo™ AI', badge: 'STEAM WASH', price: 1199.99, href: '#appliances-showcase' },
        { name: 'Bespoke Slide-in Range', badge: 'AI PRO COOKING', price: 1899.99, href: '#appliances-showcase' }
      ],
      links: ['Refrigerators', 'Washers & Dryers', 'Ranges & Wall Ovens', 'Vacuums', 'Dishwashers', 'Air Purifiers']
    },
    computing: {
      tiles: [
        { name: 'Galaxy Book5 Pro 360', badge: 'COPILOT+ PC', price: 1699.99, href: '#recommended' },
        { name: 'Odyssey OLED G9', badge: '49" CURVED', price: 1599.99, href: '#recommended' },
        { name: 'Smart Monitor M8', badge: '4K UHD', price: 649.99, href: '#recommended' },
        { name: '990 PRO SSD 4TB', badge: 'PCIE 4.0', price: 319.99, href: '#recommended' }
      ],
      links: ['Galaxy Books', 'Gaming Monitors', 'Smart Monitors', 'High-Res Monitors', 'Internal SSDs', 'Portable SSDs']
    },
    accessories: {
      tiles: [
        { name: 'Galaxy Buds3 Pro', badge: 'HI-FI AUDIO', price: 249.99, href: '#recommended' },
        { name: 'S Pen Pro', badge: 'PRECISION', price: 99.99, href: '#recommended' },
        { name: '45W Power Adapter', badge: 'SUPER FAST', price: 49.99, href: '#recommended' },
        { name: 'SmartTag2 4-Pack', badge: 'UWB FIND', price: 99.99, href: '#recommended' }
      ],
      links: ['Phone Cases', 'Watch Bands', 'Chargers & Power', 'TV Wall Mounts', 'Appliance Filters']
    }
  };

  function closeAllOverlays() {
    megaMenu.classList.remove('open');
    mobileDrawer.classList.remove('open');
    cartDrawer.classList.remove('open');
    searchOverlay.classList.remove('open');
    backdrop.classList.remove('active');
    navItems.forEach((i) => i.classList.remove('active'));
  }

  navItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const key = item.getAttribute('data-mega');
      const data = megaData[key];
      if (!data) return;

      navItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');

      const tilesHtml = data.tiles
        .map(
          (t) => `
          <div class="col-6 col-md-3">
            <a href="${t.href}" class="mega-product-tile mega-close-link">
              <span class="mega-badge">${t.badge}</span>
              <div class="my-2 fw-bold" style="font-size:15px;">${t.name}</div>
              <span class="text-primary fw-semibold" style="font-size:13px;">Explore &rsaquo;</span>
            </a>
          </div>
        `
        )
        .join('');

      const linksHtml = data.links
        .map((l) => `<li class="mb-2"><a href="#highlights" class="mega-close-link fw-semibold" style="font-size:13px;">${l}</a></li>`)
        .join('');

      megaMenuBody.innerHTML = `
        <div class="row g-4 align-items-start">
          <div class="col-lg-9">
            <div class="row g-3">${tilesHtml}</div>
          </div>
          <div class="col-lg-3 border-start ps-4">
            <p class="text-uppercase text-muted fw-bold mb-3" style="font-size:11px;letter-spacing:0.08em;">Featured Categories</p>
            <ul class="list-unstyled mb-0">${linksHtml}</ul>
          </div>
        </div>
      `;

      megaMenu.classList.add('open');
      backdrop.classList.add('active');
    });
  });

  header.addEventListener('mouseleave', () => {
    megaMenu.classList.remove('open');
    backdrop.classList.remove('active');
    navItems.forEach((i) => i.classList.remove('active'));
  });

  megaMenuBody.addEventListener('click', (e) => {
    if (e.target.closest('.mega-close-link')) closeAllOverlays();
  });

  // Mobile Drawer
  mobileTrigger.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    backdrop.classList.add('active');
  });
  mobileClose.addEventListener('click', closeAllOverlays);

  // Search Overlay
  function openSearch(prefill = '') {
    closeAllOverlays();
    searchOverlay.classList.add('open');
    overlaySearchInput.value = prefill;
    setTimeout(() => overlaySearchInput.focus(), 50);
  }
  searchTrigger.addEventListener('click', () => openSearch());
  bottomSearchTrigger.addEventListener('click', () => openSearch());
  searchClose.addEventListener('click', closeAllOverlays);

  document.querySelectorAll('.search-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      openSearch(chip.getAttribute('data-query'));
    });
  });

  // Live Shopping Cart State
  let cart = [];

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    cartBadge.textContent = totalCount;
    cartTotalPrice.textContent = `$${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="text-muted text-center my-5">Your Samsung cart is currently empty.</p>`;
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
          <div>
            <div class="fw-bold" style="font-size:14px;">${item.name}</div>
            <div class="text-muted" style="font-size:12px;">${item.color || 'Standard'} &times; ${item.qty}</div>
            <div class="fw-semibold mt-1">$${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <button class="btn btn-sm btn-outline-secondary rounded-pill remove-cart-item" data-index="${index}">Remove</button>
        </div>
      `
      )
      .join('');
  }

  cartItemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.remove-cart-item');
    if (!btn) return;
    const idx = Number(btn.getAttribute('data-index'));
    cart.splice(idx, 1);
    renderCart();
  });

  window.addToSamsungCart = (product) => {
    const existing = cart.find((i) => i.name === product.name && i.color === product.color);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    renderCart();
    cartDrawer.classList.add('open');
    backdrop.classList.add('active');
  };

  cartTrigger.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    backdrop.classList.add('active');
  });
  cartClose.addEventListener('click', closeAllOverlays);
  backdrop.addEventListener('click', closeAllOverlays);

  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;
    alert('Thank you for shopping at Samsung.com! Proceeding to secure checkout.');
  });
}

/* ==========================================================================
   2. HERO SHOWCASE CAROUSEL WITH SEGMENTED PROGRESS BARS
   ========================================================================== */
function initHeroCarousel() {
  const track = document.getElementById('hero-slider-track');
  const indicators = document.getElementById('hero-indicators');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const pauseBtn = document.getElementById('hero-play-pause');
  const iconPause = document.getElementById('hero-icon-pause');
  const iconPlay = document.getElementById('hero-icon-play');

  const slides = [
    {
      badge: 'Galaxy AI ✨',
      title: 'Galaxy S26 Ultra',
      subtitle: 'Get up to $750 instant trade-in credit and double the storage on us.',
      theme: 'dark',
      bg: 'linear-gradient(125deg, #090d16 0%, #1428a0 60%, #1e3c72 100%)',
      visual: `<div class="hw-phone-ultra"><div class="hw-phone-cam"><span class="hw-lens"></span><span class="hw-lens"></span><span class="hw-lens"></span></div></div>`,
      productName: 'Galaxy S26 Ultra (512GB)',
      price: 1299.99
    },
    {
      badge: '2026 Neo QLED 8K',
      title: 'See every detail in 8K AI Upscaling Pro',
      subtitle: 'Save up to $1,500 on the ultra-slim Neo QLED 8K QN900F Smart TV.',
      theme: 'dark',
      bg: 'linear-gradient(125deg, #000000 0%, #1c1c24 55%, #3a1c71 100%)',
      visual: `<div class="hw-tv-frame"><div class="hw-tv-screen"></div></div>`,
      productName: '85" Neo QLED 8K QN900F',
      price: 3499.99
    },
    {
      badge: 'Bespoke AI Home',
      title: 'Wash and dry in one machine. No transfer.',
      subtitle: 'Save $800 on the Bespoke AI Laundry Combo™ All-in-One Ventless Washer/Dryer.',
      theme: 'light',
      bg: 'linear-gradient(125deg, #f5f2ed 0%, #e5dfd5 100%)',
      visual: `<div class="hw-bespoke-appliance"><div class="hw-washer-drum"></div></div>`,
      productName: 'Bespoke AI Laundry Combo™',
      price: 2199.99
    }
  ];

  let current = 0;
  let isPlaying = true;
  let progress = 0;
  const SLIDE_DURATION = 5000;
  const TICK_MS = 50;

  track.innerHTML = slides
    .map((s) => {
      const isDark = s.theme === 'dark';
      const textClass = isDark ? 'text-white' : 'text-dark';
      const btnClass = isDark ? 'btn-samsung-white' : 'btn-samsung-primary';
      return `
        <div class="hero-slide ${textClass}" style="background: ${s.bg};">
          <div class="hero-slide-content">
            <span class="galaxy-ai-pill">${s.badge}</span>
            <h1 class="hero-headline">${s.title}</h1>
            <p class="hero-subcopy">${s.subtitle}</p>
            <div class="d-flex flex-wrap gap-2">
              <button class="btn-samsung ${btnClass} hero-buy-btn" data-name="${s.productName}" data-price="${s.price}">Buy now</button>
              <a href="#highlights" class="btn-samsung btn-samsung-link">Learn more</a>
            </div>
          </div>
          <div class="hero-device-stage">${s.visual}</div>
        </div>
      `;
    })
    .join('');

  indicators.innerHTML = slides
    .map(
      (_, i) => `
      <button class="hero-segment" data-index="${i}" aria-label="Slide ${i + 1}">
        <span class="hero-segment-fill"></span>
      </button>
    `
    )
    .join('');

  const segments = Array.from(indicators.querySelectorAll('.hero-segment'));
  const fills = Array.from(indicators.querySelectorAll('.hero-segment-fill'));

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    progress = 0;
    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
    segments.forEach((seg, idx) => {
      seg.classList.toggle('completed', idx < current);
      fills[idx].style.width = idx < current ? '100%' : '0%';
    });
  }

  setInterval(() => {
    if (!isPlaying) return;
    progress += TICK_MS;
    const pct = Math.min(100, (progress / SLIDE_DURATION) * 100);
    fills[current].style.width = `${pct}%`;
    if (progress >= SLIDE_DURATION) {
      goToSlide(current + 1);
    }
  }, TICK_MS);

  prevBtn.addEventListener('click', () => goToSlide(current - 1));
  nextBtn.addEventListener('click', () => goToSlide(current + 1));

  segments.forEach((seg) => {
    seg.addEventListener('click', () => {
      goToSlide(Number(seg.getAttribute('data-index')));
    });
  });

  pauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    iconPause.classList.toggle('d-none', !isPlaying);
    iconPlay.classList.toggle('d-none', isPlaying);
  });

  track.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero-buy-btn');
    if (!btn) return;
    window.addToSamsungCart({
      name: btn.getAttribute('data-name'),
      price: Number(btn.getAttribute('data-price')),
      color: 'Titanium'
    });
  });

  goToSlide(0);
}

/* ==========================================================================
   3. "THIS WEEK'S HIGHLIGHTS" INTERACTIVE BENTO GRID
   ========================================================================== */
function initHighlightsBento() {
  const tabs = document.querySelectorAll('#highlights-tabs .samsung-tab');
  const grid = document.getElementById('highlights-bento-grid');

  const bentoCatalog = {
    featured: {
      large: { title: 'Galaxy S26 Ultra', desc: 'Save up to $750 with eligible trade-in.', price: 1299.99, badge: 'NEW' },
      small: [
        { title: 'Galaxy Z Fold7', desc: 'Unfold an expansive 8.0" Dynamic AMOLED display.', price: 1799.99 },
        { title: '85" Neo QLED 8K', desc: 'Save $1,500 on our flagship AI-powered 8K screen.', price: 3499.99 },
        { title: 'Bespoke AI Laundry Combo™', desc: 'Save $800 on all-in-one wash & dry.', price: 2199.99 },
        { title: 'Galaxy Watch8', desc: 'Personalized Wellness Tips with Galaxy AI.', price: 349.99 }
      ]
    },
    mobile: {
      large: { title: 'Galaxy Z Flip7', desc: 'Pocket-sized perfection with FlexWindow AI.', price: 1099.99, badge: 'TRENDING' },
      small: [
        { title: 'Galaxy S26+', desc: 'Save up to $600 with instant trade-in.', price: 999.99 },
        { title: 'Galaxy Tab S11 Ultra', desc: '14.6" anti-reflective display + S Pen included.', price: 1199.99 },
        { title: 'Galaxy Buds3 Pro', desc: 'Ultra High Quality 24-bit Hi-Fi sound.', price: 249.99 },
        { title: 'Galaxy Ring', desc: '24/7 sleep & readiness tracking in titanium.', price: 399.99 }
      ]
    },
    tv: {
      large: { title: '77" OLED S95F 4K TV', desc: 'OLED Glare-Free technology with deep blacks.', price: 2999.99, badge: 'EDITOR’S CHOICE' },
      small: [
        { title: '65" The Frame', desc: 'TV when it’s on. Art when it’s off.', price: 1799.99 },
        { title: 'Q990F 11.1.4ch Soundbar', desc: 'True Dolby Atmos wireless surround.', price: 1399.99 },
        { title: 'The Freestyle 2nd Gen', desc: 'Portable smart theater anywhere.', price: 599.99 },
        { title: 'Music Frame', desc: 'Customizable wireless smart speaker.', price: 399.99 }
      ]
    },
    appliances: {
      large: { title: 'Bespoke 4-Door Flex™ Refrigerator', desc: 'With AI Family Hub™+ & AI Vision Inside™.', price: 2899.99, badge: 'SAVE $1,100' },
      small: [
        { title: 'Bespoke Jet Bot Combo™ AI', desc: 'Robot vacuum & steam mop with auto-wash.', price: 1199.99 },
        { title: 'Bespoke Slide-in Induction Range', desc: '7" AI Home LCD display & Air Sous Vide.', price: 2199.99 },
        { title: 'Bespoke AI Ventless Dryer', desc: 'Heat pump technology saves energy.', price: 1199.99 },
        { title: 'Bespoke Smart Dishwasher', desc: '38 dBA whisper-quiet StormWash+™.', price: 899.99 }
      ]
    },
    ecosystem: {
      large: { title: 'SmartThings Energy & AI Home', desc: 'Connect and automate every room from Galaxy.', price: 299.99, badge: 'CONNECTED' },
      small: [
        { title: 'Galaxy Book5 Pro 360', desc: 'Seamless Multi Control with Galaxy Tab & Phone.', price: 1699.99 },
        { title: 'Odyssey OLED G9', desc: '49" 240Hz curved gaming immersion.', price: 1599.99 },
        { title: 'Smart Monitor M8', desc: 'Work and stream without a PC.', price: 649.99 },
        { title: 'Galaxy SmartTag2', desc: 'Keep track of keys, luggage & pets.', price: 29.99 }
      ]
    }
  };

  function renderBento(catKey) {
    const data = bentoCatalog[catKey];
    if (!data) return;

    const smallCardsHtml = data.small
      .map(
        (item) => `
        <div class="col-12 col-sm-6">
          <div class="bento-card bento-card-small">
            <div>
              <h4 class="fw-bold mb-1" style="font-size:19px;">${item.title}</h4>
              <p class="text-muted mb-2" style="font-size:13px;">${item.desc}</p>
            </div>
            <div class="bento-visual my-2">
              <div style="width:96px;height:96px;border-radius:24px;background:linear-gradient(135deg,#1428a0,#2189ff);opacity:0.9;"></div>
            </div>
            <div class="bento-cta-reveal">
              <button class="btn-samsung btn-samsung-primary btn-sm bento-buy-btn" data-name="${item.title}" data-price="${item.price}">Buy now</button>
            </div>
          </div>
        </div>
      `
      )
      .join('');

    grid.innerHTML = `
      <div class="col-12 col-lg-6">
        <div class="bento-card bento-card-large">
          <div>
            <span class="mega-badge">${data.large.badge}</span>
            <h3 class="fw-bold mt-2 mb-2" style="font-size:28px;">${data.large.title}</h3>
            <p class="text-muted" style="font-size:15px;">${data.large.desc}</p>
          </div>
          <div class="bento-visual my-4">
            <div class="hw-phone-ultra"><div class="hw-phone-cam"><span class="hw-lens"></span><span class="hw-lens"></span><span class="hw-lens"></span></div></div>
          </div>
          <div class="bento-cta-reveal">
            <button class="btn-samsung btn-samsung-primary bento-buy-btn" data-name="${data.large.title}" data-price="${data.large.price}">Buy now</button>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row g-3 g-lg-4">${smallCardsHtml}</div>
      </div>
    `;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderBento(tab.getAttribute('data-category'));
    });
  });

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.bento-buy-btn');
    if (!btn) return;
    window.addToSamsungCart({
      name: btn.getAttribute('data-name'),
      price: Number(btn.getAttribute('data-price')),
      color: 'Default'
    });
  });

  renderBento('featured');
}

/* ==========================================================================
   4. FULL-BLEED CATEGORY SHOWCASE SECTIONS (Mobile, TV, Appliances)
   ========================================================================== */
function initCategoryShowcases() {
  const configs = [
    {
      tabsId: 'mobile-showcase-tabs',
      stageId: 'mobile-showcase-stage',
      isDark: false,
      items: [
        { title: 'Galaxy S26 Ultra', desc: 'Get up to $750 instant trade-in credit and free storage upgrade.', price: 1299.99, visual: '<div class="hw-phone-ultra"><div class="hw-phone-cam"><span class="hw-lens"></span><span class="hw-lens"></span><span class="hw-lens"></span></div></div>' },
        { title: 'Galaxy Z Fold7', desc: 'Thinnest, lightest Fold yet with dual-screen Galaxy AI.', price: 1799.99, visual: '<div class="hw-phone-ultra" style="width:260px;"></div>' },
        { title: 'Galaxy Tab S11 Ultra', desc: 'Ultra-wide 14.6" Dynamic AMOLED 2X display built for creators.', price: 1199.99, visual: '<div class="hw-tv-frame" style="width:320px;height:210px;"><div class="hw-tv-screen"></div></div>' },
        { title: 'Galaxy Watch8', desc: 'Start your day with your personalized Energy Score.', price: 349.99, visual: '<div style="width:180px;height:180px;border-radius:50%;background:#1c1c1e;border:8px solid #adb5bd;"></div>' },
        { title: 'Galaxy Ring', desc: 'Lightweight titanium health tracking that lasts up to 7 days.', price: 399.99, visual: '<div style="width:140px;height:140px;border-radius:50%;border:18px solid #d4af37;box-shadow:0 20px 40px rgba(0,0,0,0.2);"></div>' }
      ]
    },
    {
      tabsId: 'tv-showcase-tabs',
      stageId: 'tv-showcase-stage',
      isDark: true,
      items: [
        { title: 'Neo QLED 8K QN900F', desc: 'NQ8 AI Gen3 Processor transforms everything you watch into crisp 8K.', price: 3499.99, visual: '<div class="hw-tv-frame"><div class="hw-tv-screen"></div></div>' },
        { title: 'OLED S95F 4K Smart TV', desc: 'Pure blacks, vibrant colors, and certified OLED Glare-Free screen.', price: 2599.99, visual: '<div class="hw-tv-frame"><div class="hw-tv-screen" style="background:linear-gradient(135deg,#ff0080,#7928ca,#000);"></div></div>' },
        { title: 'The Frame', desc: 'Showcase world-renowned galleries in your living room with Matte Display.', price: 1499.99, visual: '<div class="hw-tv-frame" style="border:12px solid #c19a6b;"><div class="hw-tv-screen" style="background:linear-gradient(135deg,#f6d365,#fda085);"></div></div>' },
        { title: 'Q-Series 11.1.4ch Soundbar', desc: 'Q-Symphony syncs your TV and soundbar speakers in harmony.', price: 1399.99, visual: '<div style="width:420px;max-width:90%;height:36px;background:#222;border-radius:8px;box-shadow:0 16px 32px rgba(0,0,0,0.6);"></div>' }
      ]
    },
    {
      tabsId: 'appliances-showcase-tabs',
      stageId: 'appliances-showcase-stage',
      isDark: false,
      items: [
        { title: 'Bespoke AI Laundry Combo™', desc: 'Wash and dry a full load in 98 minutes with Super Speed.', price: 2199.99, visual: '<div class="hw-bespoke-appliance"><div class="hw-washer-drum"></div></div>' },
        { title: 'Bespoke 4-Door Flex™ Refrigerator', desc: 'Customize door panels and manage groceries with AI Vision Inside™.', price: 2899.99, visual: '<div class="hw-bespoke-appliance" style="width:220px;"><div style="width:80%;height:42%;background:#fff;border-radius:8px;"></div></div>' },
        { title: 'Bespoke Jet Bot Combo™ AI', desc: 'AI Object Recognition maps your home and steam-sanitizes mop pads.', price: 1199.99, visual: '<div style="width:210px;height:210px;border-radius:50%;background:#e9ecef;border:6px solid #adb5bd;"></div>' },
        { title: 'Bespoke Slide-in Induction Range', desc: 'Precision induction cooking with an integrated 7" AI Home screen.', price: 2199.99, visual: '<div class="hw-bespoke-appliance"><div style="width:140px;height:110px;background:#1c1c1e;border-radius:8px;"></div></div>' }
      ]
    }
  ];

  configs.forEach((cfg) => {
    const tabBtns = document.querySelectorAll(`#${cfg.tabsId} .samsung-tab`);
    const stage = document.getElementById(cfg.stageId);

    function renderStage(idx) {
      const item = cfg.items[idx];
      const btnStyle = cfg.isDark ? 'btn-samsung-white' : 'btn-samsung-primary';
      stage.innerHTML = `
        <div class="showcase-visual-frame">${item.visual}</div>
        <h3 class="samsung-section-title mb-2" style="font-size:34px;">${item.title}</h3>
        <p class="mb-4 mx-auto" style="max-width:560px;font-size:17px;opacity:0.88;">${item.desc}</p>
        <div class="d-flex justify-content-center gap-3">
          <button class="btn-samsung ${btnStyle} stage-buy-btn" data-name="${item.title}" data-price="${item.price}">Buy now</button>
          <a href="#recommended" class="btn-samsung btn-samsung-link">Learn more</a>
        </div>
      `;
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderStage(Number(btn.getAttribute('data-idx')));
      });
    });

    stage.addEventListener('click', (e) => {
      const btn = e.target.closest('.stage-buy-btn');
      if (!btn) return;
      window.addToSamsungCart({
        name: btn.getAttribute('data-name'),
        price: Number(btn.getAttribute('data-price')),
        color: 'Signature'
      });
    });

    renderStage(0);
  });
}

/* ==========================================================================
   5. "RECOMMENDED FOR YOU" SWATCH-INTERACTIVE PRODUCT CAROUSEL
   ========================================================================== */
function initRecommendedCarousel() {
  const track = document.getElementById('recommended-track');
  const prevBtn = document.getElementById('rec-prev');
  const nextBtn = document.getElementById('rec-next');

  const products = [
    {
      name: 'Galaxy S26 Ultra, 512GB',
      rating: '4.9 (1,420)',
      price: 1299.99,
      monthly: '$54.17/mo for 24 mos',
      colors: [
        { name: 'Titanium Black', hex: '#232325' },
        { name: 'Titanium Gray', hex: '#8e8e93' },
        { name: 'Titanium Silverblue', hex: '#7fa1c3' }
      ]
    },
    {
      name: 'Galaxy Book5 Pro 360 (16")',
      rating: '4.8 (615)',
      price: 1699.99,
      monthly: '$70.83/mo for 24 mos',
      colors: [
        { name: 'Moonstone Gray', hex: '#5c6068' },
        { name: 'Platinum Silver', hex: '#d1d5db' }
      ]
    },
    {
      name: 'Galaxy Watch8 Classic (46mm)',
      rating: '4.9 (890)',
      price: 399.99,
      monthly: '$16.67/mo for 24 mos',
      colors: [
        { name: 'Obsidian Black', hex: '#1c1c1e' },
        { name: 'Starlight Silver', hex: '#e5e7eb' }
      ]
    },
    {
      name: 'Odyssey OLED G9 49" Monitor',
      rating: '4.7 (512)',
      price: 1599.99,
      monthly: '$66.67/mo for 24 mos',
      colors: [{ name: 'Sleek Silver', hex: '#cbd5e1' }]
    },
    {
      name: 'Galaxy Buds3 Pro',
      rating: '4.8 (1,105)',
      price: 249.99,
      monthly: '$10.42/mo for 24 mos',
      colors: [
        { name: 'Silver', hex: '#9ca3af' },
        { name: 'White', hex: '#f9fafb' }
      ]
    }
  ];

  track.innerHTML = products
    .map(
      (p, pIdx) => `
      <div class="rec-card" data-product-idx="${pIdx}">
        <div>
          <div class="rec-preview mx-auto mb-3" style="width:130px;height:130px;border-radius:24px;background:${p.colors[0].hex};transition:background 0.25s ease;box-shadow:0 12px 24px rgba(0,0,0,0.12);"></div>
          <h4 class="fw-bold mb-1" style="font-size:18px;">${p.name}</h4>
          <div class="swatch-group">
            ${p.colors
              .map(
                (c, cIdx) =>
                  `<button class="swatch-dot ${cIdx === 0 ? 'active' : ''}" data-color="${c.name}" data-hex="${c.hex}" style="background:${c.hex};" aria-label="${c.name}"></button>`
              )
              .join('')}
          </div>
          <div class="selected-color-label text-muted mb-2" style="font-size:12px;">Color: ${p.colors[0].name}</div>
          <div class="text-warning fw-semibold mb-3" style="font-size:13px;">&#9733;&#9733;&#9733;&#9733;&#9733; <span class="text-muted">${p.rating}</span></div>
        </div>
        <div>
          <div class="fw-bold" style="font-size:20px;">$${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div class="text-muted mb-3" style="font-size:12px;">or ${p.monthly}</div>
          <button class="btn-samsung btn-samsung-primary w-100 rec-add-btn">Add to Cart</button>
        </div>
      </div>
    `
    )
    .join('');

  track.addEventListener('click', (e) => {
    const swatch = e.target.closest('.swatch-dot');
    if (swatch) {
      const card = swatch.closest('.rec-card');
      card.querySelectorAll('.swatch-dot').forEach((s) => s.classList.remove('active'));
      swatch.classList.add('active');
      card.querySelector('.rec-preview').style.background = swatch.getAttribute('data-hex');
      card.querySelector('.selected-color-label').textContent = `Color: ${swatch.getAttribute('data-color')}`;
      return;
    }

    const addBtn = e.target.closest('.rec-add-btn');
    if (addBtn) {
      const card = addBtn.closest('.rec-card');
      const idx = Number(card.getAttribute('data-product-idx'));
      const activeSwatch = card.querySelector('.swatch-dot.active');
      window.addToSamsungCart({
        name: products[idx].name,
        price: products[idx].price,
        color: activeSwatch ? activeSwatch.getAttribute('data-color') : 'Standard'
      });
    }
  });

  prevBtn.addEventListener('click', () => track.scrollBy({ left: -350, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: 350, behavior: 'smooth' }));
}

/* ==========================================================================
   6. EXPLORE #DOWHATYOUCANT INTERACTIVE ACCORDION
   ========================================================================== */
function initEditorialSection() {
  const listEl = document.getElementById('editorial-list');
  const visualEl = document.getElementById('editorial-visual');

  const stories = [
    {
      num: '01',
      title: 'How Galaxy AI breaks down language barriers in real time',
      summary: 'Live Translate and Interpreter empower travelers and creators to converse effortlessly across 20+ languages.',
      bg: 'linear-gradient(135deg, #1428a0 0%, #2189ff 100%)'
    },
    {
      num: '02',
      title: 'Designing a more sustainable future with ocean-bound plastics',
      summary: 'From Galaxy S26 components to SolarCell Remotes, discover how Samsung is scaling circular materials.',
      bg: 'linear-gradient(135deg, #0f5132 0%, #20c997 100%)'
    },
    {
      num: '03',
      title: '3 ways SmartThings AI Energy Mode lowers your monthly bill',
      summary: 'Monitor real-time appliance consumption and automatically optimize cooling and wash cycles.',
      bg: 'linear-gradient(135deg, #2b2d42 0%, #8d99ae 100%)'
    },
    {
      num: '04',
      title: 'Turn your living room into a world-class museum with The Frame',
      summary: 'Explore over 2,500 curated artworks from the Louvre, Prado, and Tate in stunning 4K QLED.',
      bg: 'linear-gradient(135deg, #5f0f40 0%, #fb8b24 100%)'
    }
  ];

  function activateStory(idx) {
    const s = stories[idx];
    visualEl.style.background = s.bg;
    visualEl.innerHTML = `
      <div>
        <span class="badge bg-white text-dark rounded-pill px-3 py-2 mb-3 fw-bold">#DoWhatYouCant</span>
        <h3 class="samsung-section-title text-white mb-3" style="font-size:32px;">${s.title}</h3>
        <p class="mb-0" style="font-size:16px;opacity:0.92;">${s.summary}</p>
      </div>
    `;

    document.querySelectorAll('.editorial-row').forEach((row, rIdx) => {
      row.classList.toggle('active', rIdx === idx);
    });
  }

  listEl.innerHTML = stories
    .map(
      (s, i) => `
      <div class="editorial-row ${i === 0 ? 'active' : ''}" data-story="${i}">
        <div>
          <span class="editorial-number">${s.num}</span>
          <span class="editorial-title">${s.title}</span>
        </div>
        <div class="editorial-details">
          <p class="text-muted mb-2" style="font-size:14px;">${s.summary}</p>
          <a href="#highlights" class="fw-bold text-decoration-underline" style="font-size:14px;">Learn more</a>
        </div>
      </div>
    `
    )
    .join('');

  listEl.addEventListener('click', (e) => {
    const row = e.target.closest('.editorial-row');
    if (!row) return;
    activateStory(Number(row.getAttribute('data-story')));
  });

  activateStory(0);
}

/* ==========================================================================
   7. MOBILE FOOTER ACCORDIONS
   ========================================================================== */
function initFooterAccordions() {
  document.querySelectorAll('.footer-col-title').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.innerWidth > 991) return;
      const col = btn.parentElement;
      const isOpen = col.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}