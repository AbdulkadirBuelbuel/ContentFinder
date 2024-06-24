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
    const imageContainerLeft = document.getElementById('imageContainerLeft');
    const imageContainerRight = document.getElementById('imageContainerRight');
    const prevBtn1 = document.getElementById('left-first');
    const nextBtn1 = document.getElementById('right-first');
    const prevBtn2 = document.getElementById('left-second');
    const nextBtn2 = document.getElementById('right-second');
    const timeInput = document.getElementById('time');
    const leftInfo = document.getElementById('left-info');
    const rightInfo = document.getElementById('right-info');
    const dateSpan = document.getElementById('date-span');

    let currentIndex = 0; // Index des aktuellen Bildes
    let currentIndex2 = 0; // Index des aktuellen Bildes

    let images = []; // Array zum Speichern der Bilddaten aus JSON
    let filteredImages = []; // Array zum Speichern der gefilterten Bildpfade
    let currentDate = new Date('2022-06'); // Initial date

    // Function to fetch images
    async function fetchImages() {
        try {
            const response = await fetch('/all_image_data.json'); // Fetch JSON file
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen der Bilder');
            }
            const text = await response.text();
            console.log('Response text:', text); // Log the raw response text
            images = JSON.parse(text);
            console.log('Fetched images:', images); // Log fetched images
            filterImagesByDateLeft(); // Filter images based on the selected date
            filterImagesByDateRight();
        } catch (error) {
            console.error('Fehler:', error);
        }
    }

    // Function to filter images based on the selected date
    function filterImagesByDateLeft() {
        const selectedDateStr = currentDate.toISOString().substring(0, 10); // Beispiel: '2022-06-01'
        console.log('Selected date:', selectedDateStr); // Log selected date
    
        // Filter images based on the selected date
        filteredImages = images.filter(img => img.date === selectedDateStr);
        console.log('Filtered images by date:', filteredImages); // Log filtered images
    
        // Check if there are filtered images to display
        if (filteredImages.length > 0) {
            currentIndex1 = 0;
     
            showImageLeft(currentIndex1) 

        } else {
            // Handle case when no images match the selected date
            imageContainerLeft.innerHTML = 'Keine Bilder für das ausgewählte Datum gefunden.';
            console.log('No images for the selected date.');
        }
    }

   /* function filterImagesByDateRight() {
        const selectedDateStr2 = currentDate.toISOString().substring(0, 10); // Beispiel: '2022-06-01'
        console.log('Selected date:', selectedDateStr); // Log selected date
    
        // Filter images based on the selected date
        filteredImages = images.filter(img => img.date === selectedDateStr2);
        console.log('Filtered images by date:', filteredImages); // Log filtered images
    
        // Check if there are filtered images to display
        if (filteredImages.length > 0) {
            currentIndex2 = 0;
            showImageRight(currentIndex2)
        } else {
            // Handle case when no images match the selected date
            imageContainerRight.innerHTML = 'Keine Bilder für das ausgewählte Datum gefunden.';
            console.log('No images for the selected date.');
        }
    }*/


        function showImageLeft(index) {
            // Filtern der Bilder nach Dateinamen, die "Left" enthalten
            const leftFilteredImages = filteredImages.filter(img => img.filename.toLowerCase().includes('left'));
        
            if (leftFilteredImages.length > 0 && index >= 0 && index < leftFilteredImages.length) {
                const img = leftFilteredImages[index];
                imageContainerLeft.innerHTML = `<img src="${img.path}" alt="Screenshot" />`;
                console.log('Showing left image:', img.path); // Log showing image
                updateImageInfo(img, leftInfo); // Update image information
            } else {
                imageContainerLeft.innerHTML = 'Keine passenden linken Bilder gefunden.';
                console.log('No left images matching the criteria.'); // Log no images message
            }
        }
        
        function showImageRight(index) {
            // Filtern der Bilder nach Dateinamen, die "Right" enthalten
            const rightFilteredImages = filteredImages.filter(img => img.filename.toLowerCase().includes('right'));
        
            if (rightFilteredImages.length > 0 && index >= 0 && index < rightFilteredImages.length) {
                const img = rightFilteredImages[index];
                imageContainerRight.innerHTML = `<img src="${img.path}" alt="Screenshot" />`;
                console.log('Showing right image:', img.path); // Log showing image
                updateImageInfo(img, rightInfo); // Update image information
            } else {
                imageContainerRight.innerHTML = 'Keine passenden rechten Bilder gefunden.';
                console.log('No right images matching the criteria.'); // Log no images message
            }
        }
        
        function updateImageInfo(img, infoContainer) {
            infoContainer.querySelector('i').textContent = img.time;
            infoContainer.querySelector('b').textContent = img.filename.split('/').pop();
            // Update other info if available in JSON
            console.log('Updated image info:', img); // Log updated image info
        }
        
        // Event Listeners for the next and previous buttons for left images
        prevBtn1.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
            showImageLeft(currentIndex);
        });
        
        nextBtn1.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % filteredImages.length;
            showImageLeft(currentIndex);
        });
        
        // Event Listeners for the next and previous buttons for right images
        prevBtn2.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
            showImageRight(currentIndex);
        });
        
        nextBtn2.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % filteredImages.length;
            showImageRight(currentIndex);
        });
        
        // Fetch images and filter by date for both left and right containers
        function filterImagesByDateLeft() {
            const selectedDateStr = currentDate.toISOString().substring(0, 10); // Beispiel: '2022-06-01'
            console.log('Selected date:', selectedDateStr); // Log selected date
            
            // Filter images based on the selected date
            filteredImages = images.filter(img => img.date === selectedDateStr);
            console.log('Filtered images by date:', filteredImages); // Log filtered images
            
            // Check if there are filtered images to display
            if (filteredImages.length > 0) {
                currentIndex = 0;
                showImageLeft(currentIndex);
                showImageRight(currentIndex); // Display right images as well
            } else {
                // Handle case when no images match the selected date
                imageContainerLeft.innerHTML = 'Keine Bilder für das ausgewählte Datum gefunden.';
                imageContainerRight.innerHTML = 'Keine Bilder für das ausgewählte Datum gefunden.';
                console.log('No images for the selected date.');
            }
        }
        

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
                filterImagesByDateLeft() // Filter images by the clicked date
                filterImagesByDateRight();
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

/*document.addEventListener('DOMContentLoaded', function () {
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
                showImageLeft(currentIndex);
                showImageRight(currentIndex);
            } catch (error) {
                console.error('Fehler:', error);
            }
        }


        function fetchAndDisplayImagesRight(container, prevBtn, nextBtn, side) {
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
                    showImageLeft(currentIndex);
                    showImageRight(currentIndex);
                } catch (error) {
                    console.error('Fehler:', error);
                }
            }

        function showImageLeft(index) {
            if (index >= 0 && index < images.length) {
                container.innerHTML = `<img src="${images[index]}" alt="Screenshot" />`;
            }
        }

        function showImageRight(index) {
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
        });*/

        fetchImages();
    /*}
    }*/
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
    fetchAndDisplayImages(leftConfig.container, leftConfig.prevBtn1, leftConfig.nextBtn1, leftConfig.side);
    fetchAndDisplayImages(rightConfig.container, rightConfig.prevBtn2, rightConfig.nextBtn2, rightConfig.side);


