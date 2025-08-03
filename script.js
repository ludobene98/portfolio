const typewriterElement = document.getElementById("typewriter");

const intro = "Hi, my name is Ludovica.";
const phrases = [
  "Creative Developer",
  "Science Enthusiast",
  "Sketch & Design Lover"
];

let introFinished = false;
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeIntro() {
  if (charIndex < intro.length) {
    typewriterElement.innerHTML += intro.charAt(charIndex);
    charIndex++;
    setTimeout(typeIntro, 70);
  } else {
    introFinished = true;
    charIndex = 0;
    setTimeout(typePhrases, 1000);
  }
}

function typePhrases() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting && charIndex < currentPhrase.length) {
    typewriterElement.innerHTML = intro + "<br><span class='fade-in'>" +
      currentPhrase.substring(0, charIndex + 1) + "</span>";
    charIndex++;
    setTimeout(typePhrases, 80);
  } else if (isDeleting && charIndex > 0) {
    typewriterElement.innerHTML = intro + "<br><span class='fade-in'>" +
      currentPhrase.substring(0, charIndex - 1) + "</span>";
    charIndex--;
    setTimeout(typePhrases, 40);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typePhrases, 1000);
  }
}

window.onload = () => {
  typeIntro();
};



  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // quando almeno il 60% della sezione è visibile
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

/*classe reveal elements*/ 
const revealElements = document.querySelectorAll('.reveal, .entry');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));



/* toggle */
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Leggi preferenza salvata (se presente)
const savedTheme = localStorage.getItem('theme');

// Se c'è una preferenza salvata, applicala
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeSwitch.checked = true;
  themeIcon.textContent = '🌙';
} else {
  // Tema di default = chiaro
  body.classList.remove('dark');
  themeSwitch.checked = false;
  themeIcon.textContent = '☀️';
}

// Gestisci toggle click
themeSwitch.addEventListener('change', () => {
  const isDark = themeSwitch.checked;
  body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '🌙' : '☀️';
});


// animazione particelle
tsParticles.load("particles-js", {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: { value: 60 },
    color: { value: "#ffffff" },
    size: { value: { min: 1, max: 3 } },
    move: { enable: true, speed: 1 },
    opacity: { value: 0.5 },
    links: {
      enable: true,
      color: "#ffffff",
      distance: 100
    }
  }
});


/*ABOUT ME SECTION ANIMATED LINE*/

const timeline = document.querySelector('.timeline');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      timeline.classList.add('visible');
      timelineObserver.unobserve(entry.target); // Solo una volta
    }
  });
}, { threshold: 0.3 });

if (timeline) {
  timelineObserver.observe(timeline);
}


/*copying the email as click in the contact section*/
const emailLink = document.getElementById("email");
const copyMsg = document.getElementById("copy-msg");

emailLink.addEventListener("click", (e) => {
  e.preventDefault(); // evita l’apertura della mail
  const email = emailLink.textContent;

  navigator.clipboard.writeText(email).then(() => {
    copyMsg.classList.add("visible");
    setTimeout(() => copyMsg.classList.remove("visible"), 2000);
  });
});
