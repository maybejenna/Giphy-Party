let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// let width = window.innerWidth;
// let height = window.innerHeight;
// canvas.width = width; // Set canvas size
// canvas.height = height;
let particles = [];
let particleSettings = {
    count: 500,
    gravity: 0.05,
    wave: 0
};

window.requestAnimationFrame = 
    window.requestAnimationFrame || 
    function (call) {
        window.setTimeout(call, 1000/60); 
    };

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

function createConfetti() {
    while (particles.length < particleSettings.count) {
        let particle = new Particle();
        particle.color = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
        particles.push(particle);
    }
}

const startConfetti = () => {
    console.log("Started Confetti")
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    createConfetti();
    let allOnGround = true;
    for (let i in particles) {
        particleSettings.wave += 0.4;
        particles[i].tiltAngle += randomNumber(0.01, 0.2);
        particles[i].y += (Math.sin(particleSettings.wave) + particles[i].area + particleSettings.gravity) * 0.2;
        particles[i].tilt = Math.cos(particles[i].tiltAngle) * 0.3;
       
        particles[i].draw();
        if (particles[i].y > window.innerHeight) {
            particles[i] = new Particle();
            particles[i].color = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
        }
    }
    animationTimer = requestAnimationFrame(startConfetti); 
}; 

function Particle() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight - window.innerHeight;
    this.area = randomNumber(10, 15);
    this.tilt = randomNumber(-4, 4);
    this.tiltAngle = 0;
    this.opacity = 1;
}

Particle.prototype = {
    draw: function () {
        context.beginPath();
        context.lineWidth = this.area;
        context.strokeStyle = this.color; 
        this.x = this.x + this.tilt;
        context.moveTo(this.x + this.area / 2, this.y);
        context.lineTo(this.x, this.y + this.tilt + this.area / 2);
        context.stroke();
    }
}

setTimeout(function() {
    startFading = true;
}, 3000); 


document.getElementById('gif-search-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Reset before starting new animation
    startConfetti(); // Start the confetti animation
}); 