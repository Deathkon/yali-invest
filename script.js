// script.js: Project custom scripts for Alta-invest
// - Handles navigation, animations, charts, and interactivity
// - Used by index.html (see <script src="script.js"></script>)

// Initialize AOS (Animate On Scroll)
AOS.init({ once: true });

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMobileMenu = document.getElementById('nav-mobile-menu');
if (navToggle && navMobileMenu) {
  navToggle.onclick = () => {
    navMobileMenu.classList.toggle('hidden');
  };
}

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Chart.js: Market Growth Line Chart
const marketCtx = document.getElementById('marketGrowthChart');
if (marketCtx && marketCtx.getContext) {
  new Chart(marketCtx.getContext('2d'), {
    type: 'line',
    data: {
      labels: ['2022', '2023', '2024 (Est.)', '2025 (Proj.)', '2026 (Proj.)'],
      datasets: [{
        label: 'Market Size ($B)',
        data: [1.2, 1.6, 2.2, 3.0, 4.0],
        borderColor: '#008080',
        backgroundColor: 'rgba(0,128,128,0.1)',
        tension: 0.4,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          label: ctx => `$${ctx.parsed.y}B`
        }}
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Billions (USD)' } },
        x: { title: { display: true, text: 'Year' } }
      }
    }
  });
}

// Chart.js: Language Pie Chart
const langCtx = document.getElementById('languageChart');
if (langCtx && langCtx.getContext) {
  new Chart(langCtx.getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Kinyarwanda', 'Other'],
      datasets: [{
        data: [85, 15],
        backgroundColor: ['#FF8C00', '#FFD700'],
        borderColor: '#FFFFFF',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// Solution section: Animate progress bar on load
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  setTimeout(() => {
    progressBar.classList.add('animate-progress');
  }, 1000);
}

// Solution section: Card highlight and details toggle
window.toggleDetails = function(section) {
  const details = document.getElementById(section + '-details');
  if (details) {
    details.classList.toggle('hidden');
    if (!details.classList.contains('hidden')) {
      details.style.animation = 'bounceIn 0.5s ease-out';
    }
  }
};

window.highlightFeature = function(element) {
  document.querySelectorAll('#solution .feature-card').forEach(card => {
    card.classList.remove('ring-4', 'ring-purple-400', 'shadow-2xl');
    card.style.animation = '';
  });
  element.classList.add('ring-4', 'ring-purple-400', 'shadow-2xl');
  element.style.animation = 'pulse 0.5s ease-in-out';
  setTimeout(() => {
    if (element.classList.contains('ring-4')) {
      // Animation is short, let it finish
    }
  }, 500);
};

// Solution section: Scroll-triggered animations
const solutionObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const solutionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if(!entry.target.classList.contains('bounce-in-header')) {
        entry.target.style.animation = 'bounceIn 0.8s ease-out forwards';
      }
      solutionObserver.unobserve(entry.target);
    }
  });
}, solutionObserverOptions);
document.querySelectorAll('#solution .interactive-card, #solution .feature-card').forEach(el => {
  solutionObserver.observe(el);
});

// Solution section: Particle animation on hover
const solutionSection = document.getElementById('solution');
if (solutionSection) {
  solutionSection.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
      const rect = solutionSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top + solutionSection.scrollTop;
      createMovingParticle(x, y, solutionSection);
    }
  });
}
function createMovingParticle(x, y, parentElement) {
  const particle = document.createElement('div');
  particle.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-0';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.animation = 'cursorTrailParticle 1s ease-out forwards';
  parentElement.appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 1000);
}
// Add keyframes for cursorTrailParticle if not present
(function ensureCursorTrailKeyframes() {
  const styleSheet = document.styleSheets[0];
  let found = false;
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    if (styleSheet.cssRules[i].name === 'cursorTrailParticle') {
      found = true;
      break;
    }
  }
  if (!found) {
    styleSheet.insertRule(`@keyframes cursorTrailParticle {0% { transform: scale(1); opacity: 0.7; }100% { transform: scale(0) translateY(20px); opacity: 0; }}`, styleSheet.cssRules.length);
  }
})();

// Scroll-to-top button logic
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
