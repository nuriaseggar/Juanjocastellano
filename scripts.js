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
function openModal(imgElement, description) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImage.src = imgElement.src;

    const [title, location, date] = description.split('\n').map(text => text.split(': ')[1]);
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalLocation").textContent = location;
    document.getElementById("modalDate").textContent = date;
}

// Cerrar modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
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


// Filtrar imágenes según la palabra clave en el campo de búsqueda y abrir la primera coincidencia
function searchAndOpenModal(event) {
    if (event.key === "Enter") {
        const query = document.getElementById('search-bar').value.toLowerCase();
        const images = document.querySelectorAll('.gallery img');

        let found = false;

        images.forEach(img => {
            const description = img.getAttribute('data-description').toLowerCase();
            if (!found && description.includes(query)) {
                // Abrir modal con la primera coincidencia
                openModal(img, img.getAttribute('data-description').replace(/, /g, '\n'));
                found = true; // Marcar como encontrado para detener la búsqueda en la primera coincidencia
            }
        });

        // Mensaje de alerta si no hay coincidencias
        if (!found) {
            alert("No se encontraron coincidencias.");
        }
    }
}

// Mostrar modal con la imagen seleccionada
function openModal(imgElement, description) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "flex";
    modalImage.src = imgElement.src;

    const [title, location, date] = description.split('\n').map(text => text.split(': ')[1]);
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalLocation").textContent = location;
    document.getElementById("modalDate").textContent = date;
}

// Cerrar modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
