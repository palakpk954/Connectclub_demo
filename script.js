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

// ===== Live Razorpay Checkout =====
document.getElementById('payConfirmBtn').addEventListener('click', (e) => {
  e.preventDefault();
  
  // Extracting the price from the modal (removing the ₹ symbol for the calculation)
  const priceText = modalEventPrice.textContent.replace('₹', '');
  const amountInPaise = parseInt(priceText) * 100; 

  const options = {
    "key": "YOUR_TEST_KEY_HERE", // Replace with your Razorpay Test Key from your dashboard
    "amount": amountInPaise, 
    "currency": "INR",
    "name": "Connect Club",
    "description": modalEventName.textContent,
    "theme": {
        "color": "#C68A30" // Your brand's Golden Brown
    },
    "handler": function (response){
        // Triggers when payment is successful
        console.log("Payment ID: ", response.razorpay_payment_id);
        modalBody.style.display = 'none';
        paySuccess.classList.add('active');
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
});

// ===== Live Contact Form Fetch =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Gather the data from the form
  const payload = {
    name: document.getElementById('fname').value,
    email: document.getElementById('femail').value,
    reason: document.getElementById('freason').value,
    message: document.getElementById('fmsg').value
  };

  try {
    // Replace this URL with your actual endpoint (e.g., AWS API Gateway / Lambda / Formspree)
    const response = await fetch('https://your-api-endpoint.execute-api.region.amazonaws.com/prod/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      btn.textContent = 'Message sent';
      contactForm.reset();
    } else {
      btn.textContent = 'Failed to send';
    }
  } catch (error) {
    console.error('Submission error:', error);
    btn.textContent = 'Error. Try again.';
  } finally {
    // Reset the button text and state after 3 seconds
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 3000);
  }
});
