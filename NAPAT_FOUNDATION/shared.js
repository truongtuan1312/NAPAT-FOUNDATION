// ── NAPAT Foundation · Shared Layout (nav + footer + helpers) ──
// Injected by each page via: <script src="shared.js"></script>

(function () {
  // ── Inject Google Font ──
  if (!document.getElementById('napat-font')) {
    const link = document.createElement('link');
    link.id = 'napat-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap';
    document.head.appendChild(link);
  }

  // ── Inject Base CSS ──
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --white: #FFFFFF;
      --stone-50: #F7F6F4;
      --stone-100: #EEECE8;
      --stone-200: #E0DDD8;
      --stone-300: #C8C4BE;
      --stone-400: #A8A49D;
      --stone-500: #79746D;
      --stone-600: #6B6560;
      --stone-700: #4A4540;
      --stone-800: #2D2A26;
      --stone-900: #1A1815;
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: var(--white); color: var(--stone-900);
      -webkit-font-smoothing: antialiased;
      scrollbar-width: thin; scrollbar-color: var(--stone-200) transparent;
    }
    ::selection { background: var(--stone-900); color: #fff; }
    a { text-decoration: none; color: inherit; }

    /* ── Nav ── */
    #napat-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      transition: background 0.5s, border-color 0.5s, backdrop-filter 0.5s;
      border-bottom: 1px solid transparent;
    }
    #napat-nav.scrolled {
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(12px);
      border-color: var(--stone-100);
    }
    .nav-inner {
      max-width: 1280px; margin: 0 auto; padding: 0 40px;
      height: 64px; display: flex; align-items: center;
      justify-content: space-between; gap: 32px;
    }
    .nav-logo {
      font-size: 15px; font-weight: 600; letter-spacing: -0.01em;
      color: var(--stone-900); flex-shrink: 0; transition: color 0.2s;
    }
    .nav-logo:hover { color: var(--stone-500); }
    .nav-links { display: flex; align-items: center; gap: 28px; flex: 1; justify-content: center; }
    .nav-links a { font-size: 13px; font-weight: 500; color: var(--stone-400); transition: color 0.2s; }
    .nav-links a:hover, .nav-links a.active { color: var(--stone-900); }
    .nav-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .btn-subscribe {
      font-size: 13px; font-weight: 600;
      background: var(--stone-900); color: #fff;
      padding: 8px 16px; transition: background 0.2s;
    }
    .btn-subscribe:hover { background: var(--stone-700); }
    .hamburger {
      display: none; background: none; border: none; cursor: pointer;
      font-size: 20px; color: var(--stone-700); padding: 8px;
    }
    .mobile-menu { display: none; background: white; border-bottom: 1px solid var(--stone-100); }
    .mobile-menu.open { display: block; }
    .mobile-menu-inner { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
    .mobile-menu a { font-size: 15px; font-weight: 500; color: var(--stone-500); }
    .mobile-menu a:hover { color: var(--stone-900); }
    .mobile-subscribe {
      margin-top: 8px; font-size: 14px; font-weight: 600;
      background: var(--stone-900); color: white;
      padding: 12px; text-align: center; display: block;
    }

    /* ── Footer ── */
    #napat-footer { background: var(--stone-900); color: var(--stone-400); border-top: 1px solid var(--stone-100); }
    .footer-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
    .footer-brand-name { font-size: 14px; font-weight: 600; color: var(--stone-200); margin-bottom: 12px; }
    .footer-brand-sub { font-size: 12px; color: var(--stone-600); line-height: 1.6; }
    .footer-col-title { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--stone-600); margin-bottom: 16px; }
    .footer-col a { display: block; font-size: 14px; color: var(--stone-500); margin-bottom: 8px; transition: color 0.2s; }
    .footer-col a:hover { color: var(--stone-200); }
    .footer-bottom { border-top: 1px solid var(--stone-800); padding-top: 32px; }
    .footer-copy { font-size: 12px; color: var(--stone-600); }

    /* ── Scroll-triggered fade-up ── */
    .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    /* ── Shared utilities ── */
    .container { max-width: 1280px; margin: 0 auto; padding: 0 40px; }
    .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: var(--stone-400); margin-bottom: 16px; }
    .btn-primary { background: var(--stone-900); color: white; font-size: 14px; font-weight: 600; padding: 14px 28px; border: none; cursor: pointer; transition: background 0.2s; font-family: inherit; }
    .btn-primary:hover { background: var(--stone-700); }
    .btn-outline { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--stone-900); border: 1px solid var(--stone-200); padding: 10px 20px; transition: all 0.2s; }
    .btn-outline:hover { background: var(--stone-900); color: white; border-color: var(--stone-900); }
    .field-label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--stone-400); margin-bottom: 8px; }
    .field-input {
      width: 100%; border: 1px solid var(--stone-200); padding: 12px 16px;
      font-size: 14px; font-family: inherit; color: var(--stone-900);
      outline: none; background: white; transition: border-color 0.2s;
    }
    .field-input:focus { border-color: var(--stone-900); }
    .field-input::placeholder { color: var(--stone-400); }
    textarea.field-input { resize: none; }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .nav-links, .nav-right { display: none; }
      .hamburger { display: block; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      .container { padding: 0 24px; }
      .nav-inner { padding: 0 24px; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);

  // ── All DOM injection runs after the page body is fully parsed ──
  document.addEventListener('DOMContentLoaded', function () {

    const page = window.NAPAT_PAGE || 'home';
    const navItems = [
      { label: 'About',     href: 'about.html' },
      { label: 'Library',   href: 'library.html' },
      { label: 'Community', href: 'community.html' },
      { label: 'Support',   href: 'support.html' },
      { label: 'Contact',   href: 'contact.html' },
    ];

    // ── Inject Nav HTML ──
    const nav = document.createElement('nav');
    nav.id = 'napat-nav';
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">NAPAT</a>
        <div class="nav-links">
          ${navItems.map(n => `<a href="${n.href}" class="${page === n.label.toLowerCase() ? 'active' : ''}">${n.label}</a>`).join('')}
        </div>
        <div class="nav-right">
          <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer" class="btn-subscribe">Subscribe</a>
        </div>
        <button class="hamburger" id="napat-hamburger" aria-label="Toggle menu">☰</button>
      </div>
      <div class="mobile-menu" id="napat-mobile-menu">
        <div class="mobile-menu-inner">
          ${navItems.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}
          <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer" class="mobile-subscribe">Subscribe on Substack</a>
        </div>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);

    // ── Inject Footer HTML ──
    const footer = document.createElement('footer');
    footer.id = 'napat-footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-grid">
          <div>
            <p class="footer-brand-name">NAPAT Foundation</p>
            <p class="footer-brand-sub">Neuroscience · Art · Philosophy<br>Anthropology · Technology</p>
          </div>
          <div class="footer-col">
            <p class="footer-col-title">Explore</p>
            <a href="about.html">About</a>
            <a href="library.html">Library</a>
            <a href="community.html">Community</a>
            <a href="community.html">Volunteer</a>
          </div>
          <div class="footer-col">
            <p class="footer-col-title">Support</p>
            <a href="support.html">Fund & Donate</a>
            <a href="contact.html">Contact</a>
            <a href="#">Terms</a>
          </div>
          <div class="footer-col">
            <p class="footer-col-title">Connect</p>
            <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer">Substack ↗</a>
            <a href="https://www.instagram.com/napatfoundation/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="https://x.com/napatfoundation" target="_blank" rel="noopener noreferrer">X / Twitter ↗</a>
            <a href="https://www.neuroartsresourcecenter.com/profile/napat-foundation-b4c31" target="_blank" rel="noopener noreferrer">NRC ↗</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">© ${new Date().getFullYear()} NAPAT Foundation. All rights reserved.</p>
        </div>
      </div>
    `;
    document.body.appendChild(footer);

    // ── Nav scroll effect ──
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── Hamburger ──
    const hamburger = document.getElementById('napat-hamburger');
    const mobileMenu = document.getElementById('napat-mobile-menu');
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.textContent = open ? '✕' : '☰';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });

    // ── Scroll-triggered fade-up observer ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { rootMargin: '-40px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  }); // end DOMContentLoaded
})();
