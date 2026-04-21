/* ══════════════════════════════════════════
   SPLENDA ELECTRICAL — JAVASCRIPT
   ══════════════════════════════════════════ */

/* ── Smooth scroll ── */
function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}


/* ── Navbar: scroll shadow + active link ── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  /* scrolled class for shadow */
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  /* active nav highlight */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});


/* ── Mobile hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const isOpen = navLinksEl.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

/* Close mobile menu when a link is clicked */
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});


/* ── Project gallery ── */
const projectData = {
  rural: {
    label: 'Rural Electrification',
    icon: '🏗️',
    images: [
      { src: 'images/rural1.jpg', caption: 'Infrastructure Installation' },
      { src: 'images/rural2.jpeg', caption: 'Cable Laying & Grid Work'   },
      { src: 'images/rural3.jpeg', caption: 'Community Connection'        },
      { src: 'images/rural4.jpeg', caption: 'Community Connection'        },
    ]
  },
  mast: {
    label: 'High Mast Lighting',
    icon: '💡',
    images: [
      { src: 'images/mast1.jpg', caption: 'Mast Erection'         },
      { src: 'images/mast2.jpeg', caption: 'Lighting Installation'  },
      { src: 'images/mast3.jpeg', caption: 'Night Commissioning'    },
      { src: 'images/mast4.jpeg', caption: 'Night Commissioning'    },
    ]
  },
  domestic: {
    label: 'Domestic Installations',
    icon: '🏠',
    images: [
      { src: 'images/domestic1.jpg', caption: 'House Wiring'            },
      { src: 'images/domestic1.jpeg', caption: 'Distribution Board'       },
      { src: 'images/domestic2.jpeg', caption: 'Compliance Certificate'   },
    ]
  },
  refrigeration: {
    label: 'Refrigeration & HVAC',
    icon: '❄️',
    images: [
      { src: 'images/ac1.jpg',     caption: 'AC Installation'            },
      { src: 'images/ac2.jpg',     caption: 'HVAC Systems'               },
      { src: 'images/fridge1.jpg', caption: 'Mobile Refrigeration'       },
    ]
  }
};

let currentProject = null;

function showProject(projectKey, btnEl) {
  /* Update tab active state */
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  /* Toggle off if same tab clicked again */
  if (currentProject === projectKey) {
    document.getElementById('project-gallery').innerHTML = '';
    currentProject = null;
    return;
  }

  currentProject = projectKey;
  const data = projectData[projectKey];
  if (!data) return;

  const gallery = document.getElementById('project-gallery');

  /* Build gallery items; fall back to styled placeholder if image missing */
  const items = data.images.map(img => `
    <div class="gallery-item">
      <img
        src="${img.src}"
        alt="${img.caption}"
        loading="lazy"
        onerror="this.parentElement.innerHTML = \`
          <div class='gallery-placeholder'>
            <span class='ph-icon'>${data.icon}</span>
            <span>${img.caption}</span>
          </div>\`"
      />
    </div>
  `).join('');

  gallery.innerHTML = `<div class="gallery">${items}</div>`;
}


/* ── Intersection Observer: fade-in sections ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

/* Add .fade-in class to animate-able elements */
document.querySelectorAll(
  '.service-card, .credential-item, .team-card, .contact-card, .pillar'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* CSS for fade-in (injected to keep JS self-contained) */
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-link.active {
    color: #fff !important;
    background: rgba(255,255,255,0.10);
    border-radius: 4px;
  }
`;
document.head.appendChild(style);
