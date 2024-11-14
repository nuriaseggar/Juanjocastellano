// Cambiar idioma en la página "Sobre mí"
function changeLanguage(language) {
    const contents = ['content-es', 'content-en', 'content-fr', 'content-de'];
    contents.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById(`content-${language}`).classList.remove('hidden');
}

// Cambiar idioma en la descripción de la galería
function changeDescriptionLanguage(language) {
    const descriptionText = document.getElementById("description-text");
    switch(language) {
        case 'es':
            descriptionText.textContent = "En esta página puedes explorar una selección de mis trabajos más representativos de los últimos años, realizados para bandas de culto que han confiado en mi estilo. Haz clic en las imágenes para ampliarlas y ver más detalles.";
            break;
        case 'en':
            descriptionText.textContent = "On this page, you can explore a selection of my most representative works from recent years, created for cult bands that have trusted my style. Click on the images to enlarge them and view more details.";
            break;
        case 'fr':
            descriptionText.textContent = "Sur cette page, vous pouvez explorer une sélection de mes œuvres les plus représentatives de ces dernières années, créées pour des groupes de culte qui ont fait confiance à mon style. Cliquez sur les images pour les agrandir et voir plus de détails.";
            break;
        case 'de':
            descriptionText.textContent = "Auf dieser Seite können Sie eine Auswahl meiner repräsentativsten Arbeiten der letzten Jahre erkunden, die für Kultbands erstellt wurden, die meinem Stil vertrauen. Klicken Sie auf die Bilder, um sie zu vergrößern und weitere Details zu sehen.";
            break;
    }
}

// Mostrar solo las imágenes de la página seleccionada en la galería
function showPage(pageNumber) {
    const allImages = document.querySelectorAll(".gallery img");
    allImages.forEach(img => {
        img.style.display = img.getAttribute("data-page") == pageNumber ? "block" : "none";
    });
    document.querySelectorAll('.pagination li').forEach(li => li.classList.remove('active'));
    document.querySelector(`.pagination li:nth-child(${pageNumber})`).classList.add('active');
}

// Mostrar modal con la imagen seleccionada
let currentImageIndex = 0;
function openModal(image) {
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-content img');
    const descriptionBox = document.querySelector('.description');
    const images = document.querySelectorAll('.gallery img');

    // Determina el índice actual de la imagen seleccionada
    currentImageIndex = Array.from(images).indexOf(image);

    modalImg.src = image.src;
    descriptionBox.innerText = image.getAttribute('data-description') || '';

    // Si no hay descripción, ajusta la imagen para pantalla completa
    if (!image.getAttribute('data-description')) {
        modalImg.classList.add('fullscreen');
    } else {
        modalImg.classList.remove('fullscreen');
    }

    // Crear y agregar el botón de cierre en rojo
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('close-modal-btn');  // Clase CSS para el estilo del botón
    closeButton.onclick = closeModal;

    // Elimina el botón existente si ya está en el DOM para evitar duplicados
    const existingCloseButton = document.querySelector('.close-modal-btn');
    if (existingCloseButton) existingCloseButton.remove();

    modal.appendChild(closeButton);
    modal.style.display = 'flex';
}

// Cerrar modal
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}


// Navegar entre imágenes en el modal
function navigateImage(step) {
    const images = document.querySelectorAll('.gallery img');
    currentImageIndex = (currentImageIndex + step + images.length) % images.length;

    const nextImage = images[currentImageIndex];
    const modalImg = document.querySelector('.modal-content img');
    const descriptionBox = document.querySelector('.description');

    modalImg.src = nextImage.src;
    descriptionBox.innerText = nextImage.getAttribute('data-description') || '';

    // Ajusta el modo de pantalla completa según la descripción
    if (!nextImage.getAttribute('data-description')) {
        modalImg.classList.add('fullscreen');
    } else {
        modalImg.classList.remove('fullscreen');
    }
}

// Cerrar modal
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

// Inicializar primera página en la galería al cargar
document.addEventListener("DOMContentLoaded", () => showPage(1));

// Filtrar imágenes según la palabra clave en el campo de búsqueda
function filterImages() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const images = document.querySelectorAll('.gallery img');

    images.forEach(img => {
        const description = img.getAttribute('data-description').toLowerCase();
        // Mostrar u ocultar imagen según si la descripción incluye la palabra clave
        img.style.display = description.includes(query) ? 'block' : 'none';
    });
}

// Filtrar imágenes y abrir la primera coincidencia en el modal
function searchAndOpenModal(event) {
    if (event.key === "Enter") {
        const query = document.getElementById('search-bar').value.toLowerCase();
        const images = document.querySelectorAll('.gallery img');

        let found = false;

        images.forEach(img => {
            const description = img.getAttribute('data-description').toLowerCase();
            if (!found && description.includes(query)) {
                openModal(img);
                found = true; // Marcar como encontrado para detener la búsqueda en la primera coincidencia
            }
        });

        // Mensaje de alerta si no hay coincidencias
        if (!found) {
            alert("No se encontraron coincidencias.");
        }
    }
}
// JavaScript para agregar la clase "active" al enlace actual
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".navbar a");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
});


//Para la pagina de index

  const slides = document.querySelectorAll('.slide');
        const overlayText = document.getElementById('overlayText');
        let currentIndex = 0;

        // Textos correspondientes a cada imagen
        const texts = ["Juanjo Castellano Artwork", "Album Cover", "Commission Artwork", "Fantasy and Horror Illustrations", "Available Art Portfolio"];

        function showNextSlide() {
            // Configurar el texto actual para que salga hacia la izquierda
            overlayText.classList.remove('active');
            overlayText.classList.add('exiting');

            // Ocultar la imagen actual
            slides[currentIndex].classList.remove('active');

            // Calcular el siguiente índice y mostrar la imagen correspondiente
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
            overlayText.textContent = texts[currentIndex];

            // Esperar a que termine la animación de salida antes de hacer que el texto entre desde la derecha
            setTimeout(() => {
                overlayText.classList.remove('exiting');
                overlayText.classList.add('active');
            }, 500);
        }

        // Cambio de slide cada 4 segundos
        setInterval(showNextSlide, 4000);

        // Cambio de slide al hacer clic
        document.addEventListener('click', showNextSlide);

        // Función para mostrar u ocultar el menú
        function toggleMenu() {
            const menuOptions = document.getElementById('menuOptions');
            menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
        }
		
		  // Función para mostrar u ocultar el menú
        function toggleMenu() {
            const menuOptions = document.getElementById("menuOptions");
            menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
        }
		
		// Función para alternar el menú sándwich
function toggleMenu() {
    const menuOptions = document.getElementById("menuOptions");
    menuOptions.classList.toggle("show");
}

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", function(event) {
    const menu = document.querySelector(".menu");
    const menuOptions = document.getElementById("menuOptions");
    if (event.target !== menu && !menuOptions.contains(event.target)) {
        menuOptions.classList.remove("show");
    }
});

<script>
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
}
</script>
