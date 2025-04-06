// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const animateElements = document.querySelectorAll('.animate-card, .animate-text, .animate-button');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, {
    threshold: 0.3
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Button hover effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.background = '#f1f1f1';
    });
    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.background = '#fff';
    });
}

// Account page tab switching
function showTab(tabId) {
    const forms = document.querySelectorAll('.account-form');
    const buttons = document.querySelectorAll('.tab-button');

    forms.forEach(form => {
        form.classList.remove('active');
    });
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Form submission handling (for demonstration)
const forms = document.querySelectorAll('.account-form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! This is a demo - actual implementation would connect to a backend.');
    });
})

document.addEventListener("DOMContentLoaded", function () {
    const signInForm = document.getElementById("signin");
    const createForm = document.getElementById("create");

    signInForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form behavior
        // Optional: validate credentials here
        window.location.href = "vaultovahome.html"; // Redirect to home page
    });

    createForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form behavior
        // Optional: validate and store account details here
        window.location.href = "vaultovahome.html"; // Redirect to home page
    });
});
  
  // Sign-In Form Submission
  document.getElementById('signin').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }), // Using email as username
      });
  
      const data = await response.json();
      document.getElementById('message').textContent = data.message;
  
      if (response.ok) {
        localStorage.setItem('username', email);
        alert(`Welcome back, ${email}!`);
        // Redirect to wallet page or update UI here
        window.location.href = 'vaultova.html'; // Example redirect
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error connecting to server';
    }
  });
  
  // Create Account Form Submission
  document.getElementById('create').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('create-email').value;
    const password = document.getElementById('create-password').value;
    const confirmPassword = document.getElementById('create-confirm-password').value;
  
    if (password !== confirmPassword) {
      document.getElementById('message').textContent = 'Passwords do not match';
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }), // Using email as username
      });
  
      const data = await response.json();
      document.getElementById('message').textContent = data.message;
  
      if (response.ok) {
        document.getElementById('create').reset(); // Clear form
        showTab('signin'); // Switch to sign-in tab
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error connecting to server';
    }
  });

  