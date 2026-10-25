const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

// Front-end demonstration only. Real accounts need a secure server and database.
function showMessage(form, message) {
  let box = form.querySelector('.form-message');
  if (!box) { box = document.createElement('div'); box.className = 'form-message'; form.appendChild(box); }
  box.textContent = message; box.classList.add('show');
}
const signupForm = document.querySelector('#signup-form');
if (signupForm) signupForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(signupForm);
  if (data.get('password') !== data.get('confirmPassword')) return showMessage(signupForm, 'Your passwords do not match. Please check and try again.');
  showMessage(signupForm, 'Demo sign-up complete! This prototype does not create a real account. Connect a backend to enable secure registration.');
  signupForm.reset();
});
const loginForm = document.querySelector('#login-form');
if (loginForm) loginForm.addEventListener('submit', event => {
  event.preventDefault();
  showMessage(loginForm, 'This is a front-end demo, so login is not connected to an account system yet. Add a secure authentication backend to enable real login.');
});
const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  const dateInput = bookingForm.querySelector('[name="eventDate"]');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(bookingForm);
    const name = data.get('fullName');
    const eventType = data.get('eventType');
    const date = data.get('eventDate');
    const guests = data.get('guests');
    const panel = document.querySelector('#booking-success');
    panel.innerHTML = `<h3>Thanks, ${escapeHtml(name)}!</h3><p>Your ${escapeHtml(eventType)} enquiry for ${escapeHtml(date)} and ${escapeHtml(guests)} guests is ready in this demo. No real booking has been sent. Connect a backend or email service to receive enquiries.</p><a class="back-home" href="index.html">Back to home</a>`;
    panel.classList.add('show');
    panel.scrollIntoView({behavior:'smooth',block:'center'});
  });
}
function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
