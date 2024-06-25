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
    button.innerHTML = element.innerHTML;
    // Verberge den Dropdown-Inhalt
    element.parentElement.style.display = 'none';
}

// Funktion zum Anzeigen des Dropdown-Menüs
function showDropdown(dropdownType) {
    let dropdownContent;
    if (dropdownType === 'location') {
        dropdownContent = document.querySelector('.dropdown-content_location');
    } else if (dropdownType === 'temperature') {
        dropdownContent = document.querySelector('.dropdown-content_temperature');
    } else if (dropdownType === 'weather') {
        dropdownContent = document.querySelector('.dropdown-content_weather');
    }
    dropdownContent.style.display = 'block'; // Zeige den Dropdown-Inhalt an
}

// Event-Listener für die Dropdown-Buttons
document.querySelector('.dropbtn-location').addEventListener('click', function () {
    showDropdown('location');
});

document.querySelector('.dropbtn-temperature').addEventListener('click', function () {
    showDropdown('temperature');
});

document.querySelector('.dropbtn-weather').addEventListener('click', function () {
    showDropdown('weather');
});

// Schließe das Dropdown-Menü, wenn außerhalb geklickt wird
document.addEventListener('click', function (event) {
    let locationDropdown = document.querySelector('.dropdown-content_location');
    let temperatureDropdown = document.querySelector('.dropdown-content_temperature');
    let weatherDropdown = document.querySelector('.dropdown-content_weather');

    if (!event.target.matches('.dropbtn-location') && !locationDropdown.contains(event.target)) {
        locationDropdown.style.display = 'none';
    }
    if (!event.target.matches('.dropbtn-temperature') && !temperatureDropdown.contains(event.target)) {
        temperatureDropdown.style.display = 'none';
    }
    if (!event.target.matches('.dropbtn-weather') && !weatherDropdown.contains(event.target)) {
        weatherDropdown.style.display = 'none';
    }
});

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
    const imageContainerLeft = document.getElementById('imageContainerLeft');
    const imageContainerRight = document.getElementById('imageContainerRight');
    const prevBtn1 = document.getElementById('left-first');
    const nextBtn1 = document.getElementById('right-first');
    const prevBtn2 = document.getElementById('left-second');
    const nextBtn2 = document.getElementById('right-second');
    const timeInput = document.getElementById('time');
    const dateSpan = document.getElementById('date-span');
    const locationDropdownContent = document.getElementById('dropdown-content_location');
    let currentIndex = 0;
    let currentIndex2 = 0;
    const rightInfo = document.getElementById('right-info');
    const leftInfo = document.getElementById('left-info');

    let images = [];
    let filteredImages = [];
    let currentDate = new Date('2022-06');

    async function fetchImages() {
        try {
            const response = await fetch('/all_image_data.json');
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Bilder');
            }
            const text = await response.text();
            images = JSON.parse(text);

            filterImagesByDate();
        } catch (error) {
            console.error('Fehler:', error);
        }
    }

    function showImageLeft(index) {
        const leftFilteredImages = filteredImages.filter(img => img.filename.toLowerCase().includes('left'));
        if (leftFilteredImages.length > 0 && index >= 0 && index < leftFilteredImages.length) {
            const img = leftFilteredImages[index];
            imageContainerLeft.innerHTML = `<img src="${img.path}" alt="Screenshot" />`;
            updateImageInfo(img, leftInfo); 
        } else {
            imageContainerLeft.innerHTML = 'Keine passenden linken Bilder gefunden.';
        }
    }

    
    function showImageRight(index) {
        const rightFilteredImages = filteredImages.filter(img => img.filename.toLowerCase().includes('right'));
        if (rightFilteredImages.length > 0 && index >= 0 && index < rightFilteredImages.length) {
            const img = rightFilteredImages[index];
            imageContainerRight.innerHTML = `<img src="${img.path}" alt="Screenshot" />`;
            updateImageInfo(img, rightInfo); 
        } else {
            imageContainerRight.innerHTML = 'Keine passenden rechten Bilder gefunden.';
        }
    }

    function updateImageInfo(img, infoContainer) {
        infoContainer.querySelector('i').textContent = img.time;
        infoContainer.querySelector('a').textContent = img.date.split('/').pop();
        infoContainer.querySelector('c').textContent = img.temperature;
        infoContainer.querySelector('d').textContent = img.weather_conditions;
        console.log('Updated image info:', img); // Log updated image info
    }

    function filterImagesByDate() {
        const selectedDateStr = currentDate.toISOString().substring(0, 10);
        filteredImages = images.filter(img => img.date === selectedDateStr);
        if (filteredImages.length > 0) {
            currentIndex = 0;
            filterImagesByTime();
            filterImagesByLocation();
        } else {
            imageContainerRight.innerHTML = 'Keine Bilder für das ausgewählte Datum gefunden.';
        }
    }

    function filterImagesByTime() {
        const selectedTime = timeInput.value;
        if (selectedTime) {
            filteredImages = filteredImages.filter(img => img.time === selectedTime);
        }
        currentIndex = 0;
        showImageLeft(currentIndex);
        showImageRight(currentIndex);
    }

    function filterImagesByLocation() {
        if (currentLocation === null) return; // Skip if no location selected
        console.log('Selected location:', currentLocation); // Log selected location
    
        // Further filter images based on the selected location
        filteredImages = filteredImages.filter(img => img.folder_number === currentLocation);
        console.log('Filtered images by location:', filteredImages); // Log filtered images
    
        if (filteredImages.length > 0) {
            currentIndex = 0;
            showImageLeft(currentIndex);
            showImageRight(currentIndex); // Display right images as well
        } else {
            imageContainerLeft.innerHTML = 'Keine Bilder für die ausgewählte Location gefunden.';
            imageContainerRight.innerHTML = 'Keine Bilder für die ausgewählte Location gefunden.';
            console.log('No images for the selected location.');
        }
    }

    function filterImagesByTemperature(temperature) {
        filteredImages = images.filter(img => img.temperature === temperature);
        currentIndex = 0;
        showImageLeft(currentIndex);
        showImageRight(currentIndex);
    }

    function filterImagesByWeather(weather) {
        filteredImages = images.filter(img => img.weather_conditions === weather);
        currentIndex = 0;
        showImageLeft(currentIndex);
        showImageRight(currentIndex);
    }

    // Event Listener for the location dropdown to trigger filtering
    window.selectDropdown = function (element, type, value) {
        if (type === 'location') {
            currentLocation = value; // Update current location
            console.log('Selected location ID:', value); // Log selected location ID
            filterImagesByLocation(); // Filter images when location changes
        }
    };

    // Toggle dropdown visibility
    window.toggleDropdown = function (id) {
        const dropdown = document.getElementById(id);
        dropdown.classList.toggle('show');
    };

    prevBtn1.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        showImageLeft(currentIndex);
    });

    nextBtn1.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        showImageLeft(currentIndex);
    });

    prevBtn2.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        showImageRight(currentIndex);
    });

    nextBtn2.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        showImageRight(currentIndex);
    });

    timeInput.addEventListener('change', function () {
        filterImagesByTime();
    });

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
                filterImagesByDate();
                dateSpan.textContent = info.dateStr;
            }
        });
        calendar.render();
    }

    initializeCalendar();
    fetchImages();
});

// Dropdown-Event-Listener hinzufügen
document.querySelector('.dropbtn-location').addEventListener('click', function () {
    showDropdown('location');
});

document.querySelector('.dropbtn-temperature').addEventListener('click', function () {
    showDropdown('temperature');
});

document.querySelector('.dropbtn-weather').addEventListener('click', function () {
    showDropdown('weather');
});

function showDropdown(dropdownType) {
    let dropdownContent;
    if (dropdownType === 'location') {
        dropdownContent = document.querySelector('.dropdown-content_location');
    } else if (dropdownType === 'temperature') {
        dropdownContent = document.querySelector('.dropdown-content_temperature');
    } else if (dropdownType === 'weather') {
        dropdownContent = document.querySelector('.dropdown-content_weather');
    }
    dropdownContent.style.display = 'block'; // Zeige den Dropdown-Inhalt an
}

// Schließe das Dropdown-Menü, wenn außerhalb geklickt wird
document.addEventListener('click', function (event) {
    let locationDropdown = document.querySelector('.dropdown-content_location');
    let temperatureDropdown = document.querySelector('.dropdown-content_temperature');
    let weatherDropdown = document.querySelector('.dropdown-content_weather');

    if (!event.target.matches('.dropbtn-location') && !locationDropdown.contains(event.target)) {
        locationDropdown.style.display = 'none';
    }
    if (!event.target.matches('.dropbtn-temperature') && !temperatureDropdown.contains(event.target)) {
        temperatureDropdown.style.display = 'none';
    }
    if (!event.target.matches('.dropbtn-weather') && !weatherDropdown.contains(event.target)) {
        weatherDropdown.style.display = 'none';
    }
});

// Funktion zum Zurücksetzen der Filter
function resetFilters() {
    document.querySelector('.dropdown.location .dropbtn-location').textContent = 'Standort wählen';
    document.getElementById('time').value = '';
    document.getElementById('imageContainerLeft').innerHTML = ''; // Clear left image container
    document.getElementById('imageContainerRight').innerHTML = ''; // Clear right image container
}
