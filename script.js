/* ══════════════════════════════════════════
   FARHAN UL HASSAN — PORTFOLIO SCRIPTS
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');

  document.addEventListener('mousemove', e => {
    const mx = e.clientX, my = e.clientY;
    cursor.style.left = (mx - 6) + 'px';
    cursor.style.top  = (my - 6) + 'px';
    setTimeout(() => {
      trail.style.left = (mx - 18) + 'px';
      trail.style.top  = (my - 18) + 'px';
    }, 80);
  });

  document.querySelectorAll('a, button, .skill-card, .project-card, .tech-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      cursor.style.opacity   = '0.6';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.opacity   = '1';
    });
  });


  /* ── SCROLL PROGRESS BAR ── */
  const prog = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = pct + '%';
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });


  /* ── ACTIVE NAV LINK ── */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--text)';
      }
    });
  }


  /* ── REVEAL ON SCROLL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(r => revealObs.observe(r));


  /* ── SKILL BARS ── */
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    barObs.observe(skillsSection);
  }


  /* ── COUNT UP ANIMATION ── */
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.count;
        let current = 0;
        const step  = target / 50;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          e.target.textContent = Math.ceil(current) + '+';
          if (current >= target) clearInterval(timer);
        }, 30);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObs.observe(c));


  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks').classList.remove('open');
      }
    });
  });


  /* ── HAMBURGER MENU ── */
  window.toggleMenu = function () {
    document.getElementById('navLinks').classList.toggle('open');
  };


  /* ── CONTACT FORM ── */
  window.handleSubmit = function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #28c840, #00e5ff)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      // Clear form
      document.querySelectorAll('.contact-form input, .contact-form textarea')
        .forEach(f => f.value = '');
    }, 3000);
  };


  /* ── TYPED SUBTITLE ── */
  const roles = [
    'Frontend Developer',
    'React.js Specialist',
    'UI/UX Enthusiast',
    'JavaScript Expert',
  ];
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    let roleIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const current = roles[roleIdx];
      if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx  = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    setTimeout(type, 800);
  }


  /* ── TILT EFFECT on project cards ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
