document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const mainImg = document.getElementById('main-img');
    const questionTitle = document.getElementById('question-title');
    const dateModal = document.getElementById('date-modal');
    const closeModal = document.getElementById('close-modal');
    const dateOptions = document.querySelectorAll('.date-option');
    const heartsContainer = document.querySelector('.hearts-container');

    let yesBtnScale = 1;
    let noClickCount = 0;

    // Lista de GIFs para cuando intenta presionar "No"
    const sadImages = [
    "cin.jpg",
    "muse.jpg",
    "peke.jpg",
    "yul.jpg"
];

    // Función para hacer que el botón "No" huya y crezca el "Sí"
    function moveNoButton() {
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 100 - 50;

        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        // Cambiar imagen de forma dinámica
        if (noClickCount < sadImages.length) {
            mainImg.src = sadImages[noClickCount];
            noClickCount++;
        }

        // Hacer crecer el botón de "Sí"
        yesBtnScale += 0.15;
        yesBtn.style.transform = `scale(${yesBtnScale})`;
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Acción al presionar "Sí"
    yesBtn.addEventListener('click', () => {
        // Lanzar confeti con la librería externa
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });

        mainImg.src = "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif";
        questionTitle.textContent = "Gracias por aceptar:)";
         questionTitle.textContent = "Nadaa obligado cierto?";
        
        // Ocultar los botones de respuesta
        document.getElementById('buttons-container').style.display = 'none';

        // Mostrar la ventana emergente (modal) de opciones de cita
        dateModal.classList.remove('hidden');
        dateModal.classList.add('flex');
    });

    // Cerrar modal
    closeModal.addEventListener('click', () => {
        dateModal.classList.add('hidden');
        dateModal.classList.remove('flex');
    });

    // Seleccionar plan de cita
    dateOptions.forEach(option => {
        option.addEventListener('click', () => {
            const plan = option.getAttribute('data-plan');
            alert(`me parece muy bien ${plan}. nos vemos pronto Yulissa`);
            dateModal.classList.add('hidden');
            dateModal.classList.remove('flex');
        });
    });

    // Generar corazones flotantes continuamente en el fondo
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '105vh';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHeart, 400);
});