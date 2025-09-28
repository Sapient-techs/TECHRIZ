// Smooth Scroll for Nav Links & Active Nav Highlight
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(navLinks).map(link => document.getElementById(link.getAttribute('href').substring(1)));
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 80;
    sections.forEach((section, i) => {
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[i].classList.add('active');
        }
    });
});

// Typing Effect for Hero Section (improved, accessible)
// Backstory Expand/Collapse
document.addEventListener('DOMContentLoaded', function () {
    // Preloader hide logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 600);
        });
    }
    const seeMoreBtn = document.getElementById('seeMoreBackstory');
    const seeLessBtn = document.getElementById('seeLessBackstory');
    const backstoryContent = document.getElementById('backstoryContent');
    if (seeMoreBtn && backstoryContent) {
        seeMoreBtn.addEventListener('click', function () {
            backstoryContent.style.display = 'block';
            seeMoreBtn.style.display = 'none';
            backstoryContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    if (seeLessBtn && backstoryContent && seeMoreBtn) {
        seeLessBtn.addEventListener('click', function () {
            backstoryContent.style.display = 'none';
            seeMoreBtn.style.display = 'inline-block';
            seeMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});
const words = ['Precision Trader', 'Pharmacist', 'Mentor', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing');
let typingTimeout;

function type() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingTimeout = setTimeout(type, 400);
            return;
        }
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            typingTimeout = setTimeout(type, 1200);
            return;
        }
    }
    typingTimeout = setTimeout(type, isDeleting ? 60 : 90);
}
document.addEventListener('DOMContentLoaded', () => {
    type();
});

// Countdown to Jan 1, 2026 (animated, accessible)
const targetDate = new Date('2026-01-01T00:00:00').getTime();
const progressFill = document.getElementById('progressFill');
const countdownText = document.getElementById('countdownText');
function animateProgressBar(progress) {
    if (progressFill) {
        progressFill.style.transition = 'width 0.6s cubic-bezier(.4,2,.2,1)';
        progressFill.style.width = progress + '%';
    }
}
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    const totalMs = targetDate - new Date('2025-09-27T00:00:00').getTime();
    const progress = Math.max(0, Math.min(100, ((totalMs - timeLeft) / totalMs) * 100));
    animateProgressBar(progress);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    if (countdownText) {
        countdownText.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        countdownText.setAttribute('aria-live', 'polite');
        // Pulse effect
        countdownText.style.transform = 'scale(1.08)';
        setTimeout(() => { countdownText.style.transform = 'scale(1)'; }, 200);
        // Confetti on every new minute
        if (seconds === 0) {
            launchConfetti();
        }
    }
}

// Confetti effect for countdown
function launchConfetti() {
    const container = document.querySelector('.countdown-container');
    if (!container) return;
    for (let i = 0; i < 12; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 90 + 5 + '%';
        confetti.style.background = `hsl(${Math.random() * 360},80%,70%)`;
        confetti.style.animationDelay = (Math.random() * 0.7) + 's';
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();
