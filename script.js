// ===== Nav scroll state =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  nav.classList.toggle('mobile-open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    nav.classList.remove('mobile-open');
  });
});

// ===== Media tabs (Podcast / YouTube / Reels) =====
const tabs = document.querySelectorAll('.media-tab');
const panels = document.querySelectorAll('.media-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// ===== Payment modal =====
const overlay = document.getElementById('modalOverlay');
const modalEventName = document.getElementById('modalEventName');
const modalEventPrice = document.getElementById('modalEventPrice');
const modalBody = document.getElementById('modalBody');
const paySuccess = document.getElementById('paySuccess');

document.querySelectorAll('.event-pay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalEventName.textContent = btn.dataset.event;
    modalEventPrice.textContent = btn.dataset.price;
    modalBody.style.display = 'block';
    paySuccess.classList.remove('active');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Payment method switch (UPI / Card)
const payMethods = document.querySelectorAll('.pay-method');
const payPanels = document.querySelectorAll('.pay-form-panel');
payMethods.forEach(m => {
  m.addEventListener('click', () => {
    payMethods.forEach(x => x.classList.remove('active'));
    payPanels.forEach(x => x.classList.remove('active'));
    m.classList.add('active');
    document.getElementById(m.dataset.panel).classList.add('active');
  });
});

// Mock "Pay" submit
document.getElementById('payConfirmBtn').addEventListener('click', (e) => {
  e.preventDefault();
  modalBody.style.display = 'none';
  paySuccess.classList.add('active');
});

// ===== Contact form (demo) =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Message sent';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    contactForm.reset();
  }, 2400);
});
