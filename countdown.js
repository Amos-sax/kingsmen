function showCelebration() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.top = 0;
  confetti.style.left = 0;
  confetti.style.width = '100vw';
  confetti.style.height = '100vh';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = 9999;
  confetti.id = 'confetti-effect';

  for (let i = 0; i < 150; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '16px';
    particle.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 10}vh`;
    particle.style.opacity = 0.8;
    particle.style.borderRadius = '3px';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    particle.style.transition = 'top 2s cubic-bezier(.17,.67,.83,.67), opacity 2s';
    confetti.appendChild(particle);

    setTimeout(() => {
      particle.style.top = `${90 + Math.random() * 10}vh`;
      particle.style.opacity = 0;
    }, 50);
  }

  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 2200);
}

// Modify updateCountdown to trigger celebration
const originalUpdateCountdown = updateCountdown;
updateCountdown = function() {
  const now = new Date();
  let nextBirthday = new Date(birthday);
  nextBirthday.setFullYear(now.getFullYear());
  if (now > nextBirthday) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const diff = nextBirthday - now;

  if (diff <= 0 && !document.getElementById('confetti-effect')) {
    showCelebration();
    document.getElementById('countdown').textContent = "Happy Birthday!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('countdown').textContent =
    `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
};
    
    // Set your girlfriend's next birthday here (YYYY-MM-DD format)
    const birthday = new Date('2025-07-04T00:00:00'); // Change to her actual birthday

    function updateCountdown() {
      const now = new Date();
      let nextBirthday = new Date(birthday);
      nextBirthday.setFullYear(now.getFullYear());
      if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }
      const diff = nextBirthday - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById('countdown').textContent =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
    
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.height = H;

  const confettiCount = 150;
  const confettiColors = ['#ff69b4', '#ffd700', '#ffb6c1', '#fff', '#e75480'];
  const confetti = [];

  function randomColor() {
    return confettiColors[Math.floor(Math.random() * confettiColors.length)];
  }

  function Confetto() {
    this.x = Math.random() * W;
    this.y = Math.random() * H - H;
    this.r = Math.random() * 6 + 4;
    this.d = Math.random() * confettiCount;
    this.color = randomColor();
    this.tilt = Math.floor(Math.random() * 10) - 10;
    this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
    this.tiltAngle = 0;

    this.draw = function() {
      ctx.beginPath();
      ctx.lineWidth = this.r;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + (this.r / 3), this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
      ctx.stroke();
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < confetti.length; i++) {
      confetti[i].draw();
      confetti[i].y += (Math.cos(confetti[i].d) + 3 + confetti[i].r / 2) / 2;
      confetti[i].tiltAngle += confetti[i].tiltAngleIncremental;
      confetti[i].tilt = Math.sin(confetti[i].tiltAngle) * 15;

      if (confetti[i].y > H) {
        confetti[i] = new Confetto();
        confetti[i].x = Math.random() * W;
        confetti[i].y = -10;
      }
    }
    requestAnimationFrame(drawConfetti);
  }

  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto());
  }

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });

  drawConfetti();