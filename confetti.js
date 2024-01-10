let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '1';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let particleSettings = {
    count: 500,
    gravity: 0.05,
    wave: 0
};

let isAnimating = false; // Initial state of animation

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function createConfetti() {
    while (particles.length < particleSettings.count) {
        particles.push(new Particle());
    }
}

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.area = randomNumber(10, 15);
    this.tilt = randomNumber(-4, 4);
    this.tiltAngle = 0;
    this.opacity = 1;
    this.red = Math.floor(randomNumber(0, 255)); 
    this.green = Math.floor(randomNumber(0, 255)); 
    this.blue = Math.floor(randomNumber(0, 255)); 
}

Particle.prototype.draw = function () {
    context.beginPath();
    context.lineWidth = this.area;
    context.strokeStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`; 
    this.x += this.tilt;
    context.moveTo(this.x + this.area / 2, this.y);
    context.lineTo(this.x, this.y + this.tilt + this.area / 2);
    context.stroke();
}

const startConfetti = () => {
    if (!isAnimating) {
        return; // Prevent multiple animation starts
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    createConfetti();

    let allOnGround = true;
    for (let i in particles) {
        particleSettings.wave += 0.4;
        particles[i].tiltAngle += randomNumber(0.01, 0.2);
        particles[i].y += (Math.sin(particleSettings.wave) + particles[i].area + particleSettings.gravity) * 0.2;
        particles[i].tilt = Math.cos(particles[i].tiltAngle) * 0.3;
        particles[i].draw();

        if (particles[i].y <= canvas.height) {
            allOnGround = false;
        }
    }

    if (!allOnGround) {
        requestAnimationFrame(startConfetti);
    }
}

const fadeOutConfetti = () => {
    let fading = false;
    for (let i in particles) {
        if (particles[i].opacity > 0) {
            particles[i].opacity -= 0.01; // Decrease opacity
            fading = true;
        }
    }
    return fading;
};

document.getElementById('gif-search-form').addEventListener('submit', () => {
    if (!isAnimating) {
        isAnimating = true; 
        particles = []; 
        startConfetti();
        setTimeout(() => {
            let fadeEffect = setInterval(() => {
                if (!fadeOutConfetti()) {
                    clearInterval(fadeEffect);
                    isAnimating = false;
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
            }, 30); // Adjust the interval to control fade speed
        }, 2500);
    }
});