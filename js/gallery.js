
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.gallery-card');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lbImg');
  const lightboxTitle = document.getElementById('lbTitle');
  const lightboxCat = document.getElementById('lbCat');
  const closeButton = lightbox.querySelector('.lightbox-close');
  let lastFocused = null;

  /* ── Filtre ── */
  function applyFilter(button) {
    filterButtons.forEach(b => {
      const isActive = b === button;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });

    const filter = button.dataset.filter;
    cards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.cat !== filter;
    });
  }

  /* ── Lightbox ── */
  function openLightbox(card) {
    lastFocused = card;
    lightboxTitle.textContent = card.dataset.title;
    lightboxCat.textContent = card.dataset.catLabel;

    const photo = card.querySelector('img');
    if (photo) {
      lightboxImg.className = 'lightbox-img';
      lightboxImg.innerHTML = photo.outerHTML;
    } else {
      const background = [...card.querySelector('.card-img').classList]
        .find(name => name.startsWith('food-'));
      lightboxImg.className = `lightbox-img ${background}`;
      lightboxImg.textContent = card.querySelector('.card-emoji').textContent;
    }

    lightbox.classList.add('open');
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    if (lastFocused) lastFocused.focus();
  }

  /* ── Olaylar ── */
  filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button)));
  cards.forEach(card => card.addEventListener('click', () => openLightbox(card)));
  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
});