// script.js: Project custom scripts for Alta-invest
// - Handles navigation, animations, charts, and interactivity
// - Used by index.html (see <script src="script.js"></script>)

// Initialize AOS (Animate On Scroll)
AOS.init({
  once: true, // Only animate elements once
  duration: 700, // Default animation duration
  easing: 'ease-out-cubic' // Default easing
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMobileMenu = document.getElementById('nav-mobile-menu');
if (navToggle && navMobileMenu) {
  navToggle.onclick = () => {
    navMobileMenu.classList.toggle('hidden');
    const isExpanded = !navMobileMenu.classList.contains('hidden');
    navToggle.setAttribute('aria-expanded', isExpanded);
  };
}

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Chart.js: Market Growth Line Chart
const marketCtx = document.getElementById('marketGrowthChart');
if (marketCtx && typeof Chart !== 'undefined') {
  new Chart(marketCtx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['2022', '2023', '2024 (Est.)', '2025 (Proj.)', '2026 (Proj.)'],
      datasets: [{
        label: 'Market Size ($B)',
        data: [1.2, 1.6, 2.2, 3.0, 4.0],
        borderColor: '#008080', // Teal color
        backgroundColor: 'rgba(0,128,128,0.1)',
        tension: 0.4, // Smooth curves
        pointRadius: 5,
        pointBackgroundColor: '#008080',
        pointBorderColor: '#fff',
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `$${ctx.parsed.y}B`
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleFont: { size: 14, family: 'Inter' },
          bodyFont: { size: 12, family: 'Inter' },
          padding: 10
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Billions (USD)', font: { size: 14, weight: 'bold', family: 'Inter' } },
          ticks: { font: { family: 'Inter' } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        x: {
          title: { display: true, text: 'Year', font: { size: 14, weight: 'bold', family: 'Inter' } },
          ticks: { font: { family: 'Inter' } },
          grid: { display: false }
        }
      }
    }
  });
}

// Chart.js: Language Pie Chart
const langCtx = document.getElementById('languageChart');
if (langCtx && typeof Chart !== 'undefined') {
  new Chart(langCtx.getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Kinyarwanda', 'Other Rwandan Languages/Lingua Franca'],
      datasets: [{
        data: [85, 15], // Illustrative data
        backgroundColor: ['#FF8C00', '#FFD700'], // DarkOrange, Gold
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 12, family: 'Inter' } }
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed !== null) {
                        label += context.parsed + '%';
                    }
                    return label;
                }
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleFont: { size: 14, family: 'Inter' },
            bodyFont: { size: 12, family: 'Inter' },
            padding: 10
        }
      }
    }
  });
}

// Solution section: Animate progress bar on load
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBar.style.width = '75%'; 
        progressObserver.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.5 }); 
  progressObserver.observe(progressBar);
}

// Solution section: Particle animation on hover (cursor trail)
const solutionSection = document.getElementById('solution');
if (solutionSection) {
  solutionSection.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.92) { 
      const rect = solutionSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top + solutionSection.scrollTop; 
      createMovingParticle(x, y, solutionSection);
    }
  });
}

function createMovingParticle(x, y, parentElement) {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = '4px'; 
  particle.style.height = '4px';
  particle.style.backgroundColor = 'var(--primary-cyan)'; 
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.zIndex = '0'; 
  particle.style.animation = 'cursorTrailParticle 0.8s ease-out forwards'; 

  parentElement.appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 800); 
}

// Ensure keyframes for cursorTrailParticle are defined
(function ensureCursorTrailKeyframes() {
  if (typeof document === 'undefined' || !document.styleSheets) return;
  const styleSheet = document.styleSheets[0];
  if (!styleSheet) return;

  let found = false;
  try {
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i];
      if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'cursorTrailParticle') {
        found = true;
        break;
      }
    }
    if (!found && styleSheet.insertRule) {
      styleSheet.insertRule(`@keyframes cursorTrailParticle {
        0% { transform: scale(1.2) translateY(0px); opacity: 0.7; }
        100% { transform: scale(0) translateY(25px); opacity: 0; }
      }`, styleSheet.cssRules.length);
    }
  } catch (e) {
    // console.warn("Could not ensure cursorTrailParticle keyframes:", e);
  }
})();


// Scroll-to-top button logic
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Active navigation link highlighting on scroll
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
    const navLinks = navMenu.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    function changeNav() {
      let index = sections.length;

      while(--index && window.scrollY + 100 < sections[index].offsetTop) {} 
      
      navLinks.forEach((link) => {
        link.classList.remove('active', 'font-semibold');
        link.removeAttribute('aria-current');
      });

      if (navLinks[index]) {
        navLinks[index].classList.add('active', 'font-semibold');
        navLinks[index].setAttribute('aria-current', 'page');
      } else if (window.scrollY < sections[0].offsetTop -100 && navLinks[0]) { // Handle top of page
        navLinks[0].classList.add('active', 'font-semibold');
        navLinks[0].setAttribute('aria-current', 'page');
      }
    }

    if (navLinks.length > 0 && sections.length > 0) {
        changeNav(); 
        window.addEventListener('scroll', changeNav);
    }
}


// Contact Modal Logic
const contactModal = document.getElementById('contact-modal');
const openModalBtn = document.getElementById('openContactModalBtn');
const closeModalBtn = document.getElementById('closeContactModalBtn');

function openModal() {
    if (contactModal) {
        contactModal.classList.remove('hidden');
        contactModal.classList.add('active');
        // Trigger reflow for CSS transition
        void contactModal.offsetWidth; 
        const modalContent = contactModal.querySelector('div[class*="bg-white"]'); // More specific selector
        if (modalContent) {
           // CSS handles the .active state for transform and opacity
        }
        const firstInput = contactModal.querySelector('input, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

function closeModal() {
    if (contactModal) {
        contactModal.classList.remove('active');
        // setTimeout is not strictly necessary if CSS handles visibility on opacity:0
        // but can be kept if specific timing with 'hidden' class is desired.
        // For simplicity with current CSS, directly removing active should trigger transition.
        // If modal should be `display:none` after transition, then setTimeout is needed.
        // Current CSS uses `visibility: hidden` which pairs well with opacity transition.
    }
}

if (openModalBtn) {
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        openModal();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close modal if escape key is pressed
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
        closeModal();
    }
});

// Close modal if background is clicked
if (contactModal) {
    contactModal.addEventListener('click', (event) => {
        if (event.target === contactModal) { // Only if clicking on the backdrop itself
            closeModal();
        }
    });
}