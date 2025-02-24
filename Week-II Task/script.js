let index = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateSlider() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function moveToSlide(n) {
    index = (n + totalSlides) % totalSlides;
    updateSlider();
}

function nextSlide() { moveToSlide(index + 1); }
function prevSlide() { moveToSlide(index - 1); }

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

slides.addEventListener('touchstart', handleTouchStart, false);
slides.addEventListener('touchmove', handleTouchMove, false);
let startX = 0;
function handleTouchStart(event) { startX = event.touches[0].clientX; }
function handleTouchMove(event) {
    let diffX = startX - event.touches[0].clientX;
    if (diffX > 50) nextSlide();
    else if (diffX < -50) prevSlide();
}
updateSlider();