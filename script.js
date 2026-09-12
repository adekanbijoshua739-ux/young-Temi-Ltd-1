const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.textContent = '☰';
  });
});

const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value
    };

    formResponse.textContent = 'Sending...';

    try {
      const response = await fetch('https://young-temi-ltd.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        formResponse.textContent = 'Message sent successfully!';
        contactForm.reset();
      } else {
        formResponse.textContent = result.error || 'Failed to send message.';
      }
    } catch (error) {
      console.error('Error:', error);
      formResponse.textContent = 'Cannot connect to the server. Make sure localhost:5001 is running.';
    }
  });
}