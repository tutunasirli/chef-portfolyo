/* Chef Portfolyo — Ortak JavaScript */
document.documentElement.classList.add('js');


const SITE = {
  brand: 'Chef Sarıkaya',
  owner: 'Emirhan Çağrı Sarıkaya',
  whatsapp: '905441370607',
  whatsappMessage: 'Merhaba, web sitenizden ulaşıyorum.',
  pages: [
    { href: 'index.html',    label: 'Ana Sayfa' },
    { href: 'hakkimda.html', label: 'Hakkımda' },
    { href: 'galeri.html',   label: 'Galeri' },
    { href: 'iletisim.html', label: 'İletişim' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/cagris07' },
  ],
};

/* hakkimda*/
const pageName = path => path.split('/').pop().replace(/\.html$/, '') || 'index';

function renderNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const current = pageName(location.pathname);
  const links = SITE.pages.map(({ href, label }) => {
    const isActive = pageName(href) === current;
    const attrs = isActive ? ' class="active" aria-current="page"' : '';
    return `<li><a href="${href}"${attrs}>${label}</a></li>`;
  }).join('');

  nav.innerHTML = `
    <a class="nav-logo" href="index.html">${SITE.brand}</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu">Menü</button>
    <ul class="nav-links" id="menu">${links}</ul>`;
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const socials = SITE.socials
    .map(({ label, href }) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`)
    .join('');

  footer.innerHTML = `
    <div class="footer-copy">© ${new Date().getFullYear()} ${SITE.owner}</div>
    <div class="footer-socials">${socials}</div>`;
}

/* ── WhatsApp FAB ── */
function renderWhatsAppButton() {
  if (!SITE.whatsapp) return;
 
  const text = encodeURIComponent(SITE.whatsappMessage);
  const button = document.createElement('a');
  button.className = 'whatsapp-fab';
  button.href = `https://wa.me/${SITE.whatsapp}?text=${text}`;
  button.target = '_blank';
  button.rel = 'noopener';
  button.title = 'WhatsApp ile yaz';
  button.setAttribute('aria-label', 'WhatsApp ile yaz');
  button.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>`;
  document.body.appendChild(button);
}

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  const setOpen = open => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}

function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();        /* önce nav basılır, */
  renderFooter();
  renderWhatsAppButton();
  initMobileMenu();   /* sonra menü olayları bağlanır (sıra önemli) */
  initScrollReveal();
});