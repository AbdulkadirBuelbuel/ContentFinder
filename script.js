let calendarEl = document.getElementById('calendar');

document.addEventListener('DOMContentLoaded', function () {
    let dateSpan = document.getElementById('date-span');
    let currentDate = new Date('2022-06'); // Initiales Datum, das mit dem <span> synchronisiert ist

    function updateDateSpan() {
        dateSpan.textContent = currentDate.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: currentDate,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        dateClick: function (info) {
            currentDate = new Date(info.dateStr);
            updateDateSpan();
        }
    });

    calendar.render();
    updateDateSpan();

    document.getElementById('prev').addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() - 1);
        calendar.gotoDate(currentDate);
        updateDateSpan();
    });

    document.getElementById('next').addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() + 1);
        calendar.gotoDate(currentDate);
        updateDateSpan();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Überprüfe den Zustand des linken Herzensymbols
    let leftHeartState = localStorage.getItem('leftHeartState');
    if (leftHeartState === 'filled') {
        document.querySelector('.heart-symbol.left').classList.add('filled');
    }

    // Überprüfe den Zustand des rechten Herzensymbols
    let rightHeartState = localStorage.getItem('rightHeartState');
    if (rightHeartState === 'filled') {
        document.querySelector('.heart-symbol.right').classList.add('filled');
    }
});

// Funktion zum Ändern des Herzsymbolzustands
function toggleHeart(display) {
    let heartSymbol = document.querySelector('.heart-symbol.' + display);
    heartSymbol.classList.toggle('filled');

    // Speichere den Zustand des Herzensymbols im localStorage
    let localStorageKey = display === 'left' ? 'leftHeartState' : 'rightHeartState';
    if (heartSymbol.classList.contains('filled')) {
        localStorage.setItem(localStorageKey, 'filled');
    } else {
        localStorage.setItem(localStorageKey, 'empty');
    }
}

// Funktion zur Auswahl des Dropdown-Inhalts
function selectDropdown(element, dropdownType) {
    let button;
    if (dropdownType === 'location') {
        button = document.querySelector('.dropdown.location .dropbtn-location');
    } else if (dropdownType === 'temperature') {
        button = document.querySelector('.dropdown.temperature .dropbtn-temperature');
    } else if (dropdownType === 'weather') {
        button = document.querySelector('.dropdown.weather .dropbtn-weather');
    }
    button.textContent = element.textContent;
    // Verberge den Dropdown-Inhalt
    document.getElementById('dropdownContent').style.display = 'none';
}

// Funktion zum Zurücksetzen der Filter
function resetFilters() {
    document.querySelector('.dropdown.location .dropbtn-location').textContent = 'Standort wählen';
    document.querySelector('.dropdown.temperature .dropbtn-temperature').textContent = 'Temperatur wählen';
    document.querySelector('.dropdown.weather .dropbtn-weather').textContent = 'Wetterbedingung wählen';
    document.getElementById('time').value = '';
}

// JavaScript für saved.html
function loadSavedScreenshots() {
    // Überprüfe den Zustand des linken Herzensymbols
    var leftHeartState = localStorage.getItem('leftHeartState');
    if (leftHeartState === 'filled') {
        var leftScreenshotSrc = localStorage.getItem('leftScreenshotSrc');
        document.getElementById('leftScreenshot').setAttribute('src', leftScreenshotSrc);
        document.querySelector('.heart-symbol.left').classList.add('filled');
    }

    // Überprüfe den Zustand des rechten Herzensymbols
    var rightHeartState = localStorage.getItem('rightHeartState');
    if (rightHeartState === 'filled') {
        var rightScreenshotSrc = localStorage.getItem('rightScreenshotSrc');
        document.getElementById('rightScreenshot').setAttribute('src', rightScreenshotSrc);
        document.querySelector('.heart-symbol.right').classList.add('filled');
    }
}

// Lade die gespeicherten Bilder beim Laden der Seite
document.addEventListener('DOMContentLoaded', function () {
    loadSavedScreenshots();
});

// Dropdown-Content anzeigen/verbergen
document.addEventListener('DOMContentLoaded', () => {
    const dropbtn_location = document.querySelectorAll('.dropbtn-location');
    const dropbtn_temperature = document.querySelectorAll('.dropbtn-temperature');
    const dropbtn_weather = document.querySelectorAll('.dropbtn-weather');

    // Funktion, um alle Dropdowns zu schließen
    function closeAllDropdowns() {
        const dropdowns_location = document.querySelectorAll('.dropdown-content_location');
        const dropdowns_temperature = document.querySelectorAll('.dropdown-content_temperature');
        const dropdowns_weather = document.querySelectorAll('.dropdown-content_weather');

        dropdowns_location.forEach(dd => dd.classList.remove('show'));
        dropdowns_temperature.forEach(dd => dd.classList.remove('show'));
        dropdowns_weather.forEach(dd => dd.classList.remove('show'));
    }

    // Funktion, um Event-Listener zu Dropdown-Schaltflächen hinzuzufügen
    function addClickListenerToButtons(buttons) {
        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                // Schließt alle offenen Dropdowns
                closeAllDropdowns();

                // Öffnet das aktuelle Dropdown
                this.nextElementSibling.classList.toggle('show');
            });
        });
    }

    // Event-Listener für Klick auf Dokument, um Dropdowns zu schließen
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn-location') &&
            !event.target.matches('.dropbtn-temperature') &&
            !event.target.matches('.dropbtn-weather')) {
            closeAllDropdowns();
        }
    };

    // Event-Listener zu den Dropdown-Schaltflächen hinzufügen
    addClickListenerToButtons(dropbtn_location);
    addClickListenerToButtons(dropbtn_temperature);
    addClickListenerToButtons(dropbtn_weather);
});

document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('imageContainer');
    const prevBtn1 = document.getElementById('left-first');
    const nextBtn1 = document.getElementById('right-first');
    const timeInput = document.getElementById('time');
    const leftInfo = document.getElementById('left-info');
    const rightInfo = document.getElementById('right-info');
    const dateSpan = document.getElementById('date-span');

    let currentIndex = 0; // Index des aktuellen Bildes
    let images = []; // Array zum Speichern der Bilddaten aus JSON
    let filteredImages = []; // Array zum Speichern der gefilterten Bildpfade
    let currentDate = new Date('2022-06'); // Initial date

    // Function to fetch images
    async function fetchImages() {
        try {
            const response = await fetch('/image_data.json'); // Fetch JSON file
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Bilder');
            }
            const text = await response.text();
            console.log('Response text:', text); // Log the raw response text
            images = JSON.parse(text);
            console.log('Fetched images:', images); // Log fetched images
            filterImagesByDate(); // Filter images based on the selected date
        } catch (error) {
            console.error('Fehler:', error);
        }
    }

    // Function to filter images based on the selected date
    function filterImagesByDate() {
        const selectedDateStr = currentDate.toISOString().substring(0, 10);
        console.log('Selected date:', selectedDateStr); // Log selected date
        filteredImages = images.filter(img => img.date === selectedDateStr);
        console.log('Filtered images by date:', filteredImages); // Log filtered images
        filterImagesByTime(); // Proceed to filter by date and time
    }

    // Function to filter images based on selected date and time
    function filterImagesByTime() {
        const selectedTime = timeInput.value; // Get selected time from input
        console.log('Selected time:', selectedTime); // Log selected time
        if (selectedTime) {
            filteredImages = filteredImages.filter(img => img.time === selectedTime);
            console.log('Filtered images by date and time:', filteredImages); // Log filtered images by date and time
        }
        currentIndex = 0;
        showImage(currentIndex);
        timeInput.value = ''; // Reset time input
    }

    // Function to show image based on index
    function showImage(index) {
        if (filteredImages.length > 0 && index >= 0 && index < filteredImages.length) {
            const img = filteredImages[index];
            imageContainer.innerHTML = `<img src="${img.path}" alt="Screenshot" />`;
            console.log('Showing image:', img.path); // Log showing image
            updateImageInfo(img); // Update image information
        } else {
            imageContainer.innerHTML = 'Keine Bilder für das ausgewählte Datum und Zeit.';
            console.log('No images for the selected date and time.'); // Log no images message
        }
    }

    // Function to update image information
    function updateImageInfo(img) {
        leftInfo.querySelector('i').textContent = img.time;
        leftInfo.querySelector('b').textContent = img.path.split('/').pop();
        // Update other info if available in JSON
        console.log('Updated image info:', img); // Log updated image info
    }

    // Event Listeners for the next and previous buttons
    prevBtn1.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        showImage(currentIndex);
    });

    nextBtn1.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        showImage(currentIndex);
    });

    // Event Listener for the time input to trigger filtering
    timeInput.addEventListener('change', function () {
        filterImagesByTime();
    });

    // Function to initialize the calendar and attach dateClick event
    function initializeCalendar() {
        let calendarEl = document.getElementById('calendar');

        let calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: currentDate,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
            },
            dateClick: function (info) {
                currentDate = new Date(info.dateStr);
                filterImagesByDate(); // Filter images by the clicked date
                dateSpan.textContent = info.dateStr; // Update date display
            }
        });

        calendar.render();
    }

    // Initialize calendar
    initializeCalendar();

    // Fetch images on page load
    fetchImages();
});
