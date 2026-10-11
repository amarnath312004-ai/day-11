document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    const intro = document.getElementById("intro");
    const mainHeart = document.getElementById("mainHeart");
    const startBtn = document.getElementById("startBtn");

    const messagesSection = document.getElementById("messagesSection");
    const finalSection = document.getElementById("finalSection");

    const messageBox = document.getElementById("messageBox");
    const messageIcon = document.getElementById("messageIcon");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");

    const closeMessageBtn = document.getElementById("closeMessageBtn");
    const finalBtn = document.getElementById("finalBtn");
    const progress = document.getElementById("progress");
    const daysElement = document.getElementById("days");


    // =====================================
    // ANIMATED PARTICLES
    // =====================================

    let particles = [];

    function resizeCanvas() {

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        particles = Array.from({ length: 90 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.008 + 0.002
        }));
    }

    function animateParticles() {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particles.forEach(particle => {

            particle.alpha += particle.speed;

            if (particle.alpha > 1 || particle.alpha < 0.1) {
                particle.speed *= -1;
            }

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(255, 160, 200, ${particle.alpha})`;
            ctx.fill();

        });

        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    animateParticles();

    window.addEventListener("resize", resizeCanvas);


    // =====================================
    // HEART PARTICLE BURST
    // =====================================

    function heartBurst() {

        const symbols = ["❤️", "💗", "💕", "✨"];

        for (let i = 0; i < 25; i++) {

            const particle = document.createElement("span");

            particle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            particle.style.position = "fixed";
            particle.style.left = (35 + Math.random() * 30) + "vw";
            particle.style.top = "55vh";
            particle.style.fontSize = (12 + Math.random() * 20) + "px";
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "10";

            document.body.appendChild(particle);

            const x = (Math.random() - 0.5) * 350;
            const y = -100 - Math.random() * 300;

            const animation = particle.animate(
                [
                    {
                        transform: "translate(0, 0) scale(0.5)",
                        opacity: 1
                    },
                    {
                        transform: `translate(${x}px, ${y}px) scale(1.3)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 1500 + Math.random() * 1500,
                    easing: "ease-out"
                }
            );

            animation.onfinish = () => particle.remove();
        }
    }


    // =====================================
    // START THE SURPRISE
    // =====================================

    let started = false;

    function startSurprise() {

        if (started) return;

        started = true;

        intro.classList.add("hidden");
        messagesSection.classList.remove("hidden");

        heartBurst();

        messagesSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    mainHeart.addEventListener("click", startSurprise);
    startBtn.addEventListener("click", startSurprise);


    // =====================================
    // HEART MESSAGES
    // =====================================

    const messageData = {

        feelings: {
            icon: "❤️",
            title: "What I Feel",
            text:
                "Sometimes, words aren't enough to explain what someone means to you. I'm grateful for the moments we've shared and the memories that have become part of my story."
        },

        wishes: {
            icon: "💗",
            title: "What I Wish for You",
            text:
                "I hope you achieve every dream you carry in your heart. May your future bring you success, happiness, peace, and countless reasons to smile."
        },

        remember: {
            icon: "💖",
            title: "What I Want You to Remember",
            text:
                "No matter where life takes you, never stop believing in yourself. You deserve to grow, shine, and become everything you've dreamed of being."
        }

    };

    const discovered = new Set();

    document.querySelectorAll(".heart-card").forEach(card => {

        card.addEventListener("click", () => {

            const key = card.dataset.message;
            const message = messageData[key];

            if (!message) return;

            messageIcon.textContent = message.icon;
            messageTitle.textContent = message.title;
            messageText.textContent = message.text;

            messageBox.classList.remove("hidden");

            card.classList.add("discovered");
            card.querySelector(".card-hint").textContent = "Message discovered ✓";

            discovered.add(key);

            progress.textContent =
                `${discovered.size} of 3 hearts discovered`;

            if (discovered.size === 3) {
                finalBtn.classList.remove("hidden");
            }

            heartBurst();
        });
    });


    // =====================================
    // CLOSE MESSAGE
    // =====================================

    closeMessageBtn.addEventListener("click", () => {
        messageBox.classList.add("hidden");
    });


    // =====================================
    // FINAL SURPRISE
    // =====================================

    finalBtn.addEventListener("click", () => {

        messagesSection.classList.add("hidden");
        finalSection.classList.remove("hidden");

        heartBurst();

        finalSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });


    // =====================================
    // COUNTDOWN TO 14 OCTOBER
    // =====================================

    function updateCountdown() {

        const now = new Date();

        let birthday = new Date(
            now.getFullYear(),
            9,
            14,
            0,
            0,
            0
        );

        if (now >= birthday) {

            birthday = new Date(
                now.getFullYear() + 1,
                9,
                14,
                0,
                0,
                0
            );

        }

        const difference = birthday.getTime() - now.getTime();

        const daysLeft = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        daysElement.textContent = daysLeft;
    }

    updateCountdown();

    setInterval(updateCountdown, 60000);

});