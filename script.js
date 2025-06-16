// ...existing code...
// Typing effect for the title
const textArray = [
  "FullStack Developer",
  "Open Source Contributor",
  "UI/UX Enthusiast",
  "Problem Solver"
];
let textIndex = 0;
let charIndex = 0;
let typing = true;
const typingElement = document.getElementById('typing-effect');

function type() {
  if (typing) {
    if (charIndex < textArray[textIndex].length) {
      typingElement.textContent += textArray[textIndex][charIndex];
      charIndex++;
      setTimeout(type, 80)
    }
    else {
      typing = false;
      setTimeout(type, 1200);
    }
  }
  else {
    if (charIndex > 0) {
      typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 40);
    }
    else {
      typing = true;
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 400);
    }
  }
}

type();

// Fade-in on scroll for sections
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll('.main > div, .footer');

  function appearOnScroll(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }

  const options = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver(appearOnScroll, options);

  faders.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)";
    observer.observe(section);
  });
});

// Ripple effect for project links
document.querySelectorAll('#first ul li a').forEach(link => {
  link.addEventListener('click', function (e) {
    /*Remove any existing ripple */
    this.querySelectorAll('.ripple').forEach(r => r.remove());

    const circle = document.createElement('span');
    circle.className = 'ripple';
    this.appendChild(circle);

    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = d + 'px';
    circle.style.left = e.offsetX - d / 2 + 'px';
    circle.style.top = e.offsetY - d / 2 + 'px';

    setTimeout(() => circle.remove(), 600);
  });
});

// Floating particles background
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 0;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(69, 123, 157, ${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
});
