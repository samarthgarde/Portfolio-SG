const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const dots = [];
const dotCount = 80;      // number of dots
const maxDistance = 120;  // line connection distance

// Create dots
for (let i = 0; i < dotCount; i++) {
    dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
    });
}

// Animate
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Move and draw dots
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        // Draw black dots
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.8)'; // black with slight transparency
        ctx.fill();
    });

    // Draw black connecting lines between close dots
    for (let i = 0; i < dotCount; i++) {
        for (let j = i + 1; j < dotCount; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < maxDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0,0,0,${1 - dist / maxDistance})`; // black fading lines
                ctx.lineWidth = 1;
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});