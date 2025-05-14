document.addEventListener("DOMContentLoaded", function () {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeBtn").textContent = "Light Mode";
  }

  // Theme toggle button
  const themeBtn = document.getElementById("themeBtn");
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Save theme preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "Dark Mode";
    }
  });

  // Book Now button animation
  const bookNowBtn = document.getElementById("bookNowBtn");
  bookNowBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Create ripple effect
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    // Get click position
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    // Position ripple
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Show notification
    showNotification("Booking system coming soon!");

    // Save last clicked time
    localStorage.setItem("lastBookClick", new Date().toISOString());
  });

  // Service card animations
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector("i");
      icon.style.animation = "bounce 0.5s ease";

      setTimeout(() => {
        icon.style.animation = "";
      }, 500);
    });

    // Save favorite service on click
    card.addEventListener("click", function () {
      const service = this.getAttribute("data-service");
      localStorage.setItem("favoriteService", service);
      showNotification(`Saved ${service} as your favorite!`);
    });
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      date: new Date().toISOString(),
    };

    // Save form data to localStorage
    const savedContacts = JSON.parse(localStorage.getItem("contacts") || []);
    savedContacts.push(formData);
    localStorage.setItem("contacts", JSON.stringify(savedContacts));

    // Show success message
    showNotification("Message sent successfully! We'll get back to you soon.");

    // Reset form
    this.reset();

    // Animate form submission
    const submitBtn = this.querySelector(".submit-btn");
    submitBtn.textContent = "✓ Sent!";
    submitBtn.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
      submitBtn.textContent = "Send Message";
      submitBtn.style.backgroundColor = "";
    }, 2000);
  });

  // Logo animation
  const logo = document.getElementById("logo");
  logo.addEventListener("click", function () {
    this.style.animation = "jiggle 0.5s ease";

    setTimeout(() => {
      this.style.animation = "";
    }, 500);
  });

  // Show notification function
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // Check if user has visited before
  if (!localStorage.getItem("firstVisit")) {
    showNotification("Welcome to Luxe Nail Bar! Enjoy your visit.");
    localStorage.setItem("firstVisit", "true");
  }

  // Add keyframe animations dynamically
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
      @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
      }
      
      @keyframes jiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
      }
      
      .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
      }
      
      @keyframes ripple {
          to {
              transform: scale(4);
              opacity: 0;
          }
      }
  `;
  document.head.appendChild(styleSheet);
});
