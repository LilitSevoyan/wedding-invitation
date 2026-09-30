// section 1
function setAppHeight() {
    document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
    )
}
setAppHeight()
window.addEventListener("orientationchange", () => {
    setTimeout(setAppHeight, 300)
})
// section 3 car
const section = document.querySelector(".car-scroll-section")
const car = document.querySelector(".car")
let ticking = false
let currentY = -1000
let targetY = -1000
/* =========================
   CALCULATE TARGET
========================= */
function updateTarget() {
    const rect = section.getBoundingClientRect()
    const sectionHeight = section.offsetHeight
    const viewportHeight = window.innerHeight
    let startPoint
    if (window.innerWidth <= 768) {
        // MOBILE — քո նախկին տարբերակը
        startPoint = viewportHeight * 0.5
    } else {
        // DESKTOP — սկսում է հենց section-ին հասնելուց
        startPoint = 0
    }
    let progress =(startPoint - rect.top) / (sectionHeight - startPoint)

    progress = Math.max(0, Math.min(1, progress))
    /*
     * CAR MOVEMENT
     */
    let startY
    let endY
    if (window.innerWidth <= 768) {
        // MOBILE — գործող տարբերակը
        startY = -1000
        endY = 1400
    } else {
        // DESKTOP / WEB
        startY = -1300
        endY = 4700
    }
    targetY = startY + (endY - startY) * progress
    ticking = false
}
/* =========================
   SMOOTH CAR
========================= */
function animateCar() {
    currentY += (targetY - currentY) * 0.10
    if (Math.abs(targetY - currentY) < 0.1) {
        currentY = targetY;
    }
    car.style.transform = `translate3d(-50%, calc(-50% + ${currentY}px), 0)`
    requestAnimationFrame(animateCar)
}
/* =========================
   SCROLL
========================= */
function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(updateTarget)
      ticking = true
    }
}
/* =========================
   INITIAL
========================= */
window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
)
window.addEventListener(
    "resize",
    updateTarget
)
updateTarget()
animateCar()
// section 4
const weddingDate = new Date("November 15, 2026 00:00:00").getTime()
function updateCountdown() {
    const now = new Date().getTime()
    const distance = weddingDate - now

    if (distance <= 0) {
        document.getElementById("days").textContent = "00"
        document.getElementById("hours").textContent = "00"
        document.getElementById("minutes").textContent = "00"
        document.getElementById("seconds").textContent = "00"
        return
    }
  
    const days = Math.floor( distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) /(1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
    document.getElementById("days").textContent = String(days).padStart(2, "0")
    document.getElementById("hours").textContent = String(hours).padStart(2, "0")
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0")
}

updateCountdown()
setInterval(updateCountdown, 1000)
//animation
const elements = document.querySelectorAll('.animate-on-scroll')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
        }
    })
}, {
    threshold: 0.2
})
elements.forEach((element) => {
    observer.observe(element)
})

// music
const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

// Երաժշտությունը միացնելու ֆունկցիա
function startMusic() {
    music.play()
        .then(() => {
            musicButton.classList.add("playing");
        })
        .catch(() => {
            console.log("Autoplay blocked");
        });
}

// Էջը բացվելիս փորձել միացնել
window.addEventListener("load", () => {
    startMusic();
});

// Եթե browser-ը արգելել է autoplay-ը,
// առաջին interaction-ից հետո միացնել
function enableMusic() {
    if (music.paused) {
        music.currentTime = 45;
        startMusic();
    }
}

document.addEventListener("click", enableMusic, { once: true });
document.addEventListener("touchstart", enableMusic, { once: true });
document.addEventListener("scroll", enableMusic, { once: true });

// Կոճակով անջատել / միացնել
musicButton.addEventListener("click", (e) => {
    e.stopPropagation();

    if (music.paused) {
        music.currentTime = 45;
        startMusic();
    } else {
        music.pause();
        musicButton.classList.remove("playing");
    }
});