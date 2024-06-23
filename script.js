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
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('dropdownButton').addEventListener('click', function () {
        var dropdownContent = document.getElementById('dropdownContent');
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    var dropdownOptions = document.querySelectorAll('.dropdown-content p');
    dropdownOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            document.getElementById('dropdownContent').style.display = 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Funktion zum Abrufen und Anzeigen der Bilder
    function fetchAndDisplayImages(container, prevBtn, nextBtn, side) {
        let currentIndex = 0;
        let images = [];

        async function fetchImages() {
            try {
                const response = await fetch(`/images?side=${side}`);
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Bilder');
                }
                const data = await response.json();
                images = data.map(img => img.img_path);
                showImage(currentIndex);
            } catch (error) {
                console.error('Fehler:', error);
            }
        }

        function showImage(index) {
            if (index >= 0 && index < images.length) {
                container.innerHTML = `<img src="${images[index]}" alt="Screenshot" />`;
            }
        }

        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        fetchImages();
    }

    // Konfiguration für den linken Bereich
    const leftConfig = {
        container: document.getElementById('imageContainerLeft'),
        prevBtn: document.getElementById('left-first'),
        nextBtn: document.getElementById('right-first'),
        side: 'left'
    };

    // Konfiguration für den rechten Bereich
    const rightConfig = {
        container: document.getElementById('imageContainerRight'),
        prevBtn: document.getElementById('left-second'),
        nextBtn: document.getElementById('right-second'),
        side: 'right'
    };

    // Initialisierung: Bilder vom Server für beide Bereiche abrufen und anzeigen
    fetchAndDisplayImages(leftConfig.container, leftConfig.prevBtn, leftConfig.nextBtn, leftConfig.side);
    fetchAndDisplayImages(rightConfig.container, rightConfig.prevBtn, rightConfig.nextBtn, rightConfig.side);
});
