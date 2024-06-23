document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.getElementById('imageContainer');
    const prevBtn1 = document.getElementById('left-first');
    const nextBtn1 = document.getElementById('right-first');

    let currentIndex = 0; // Index des aktuellen Bildes
    let images = []; // Array zum Speichern der Bilddaten aus JSON
    let filteredImages = []; // Array zum Speichern der gefilterten Bildpfade

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
        showImage(currentIndex);
    }

    // Function to filter images based on selected date and time
    function filterImagesByTime() {
        const selectedTime = document.getElementById('time').value; // Get selected time from input
        console.log('Selected time:', selectedTime); // Log selected time
        if (selectedTime) {
            filteredImages = filteredImages.filter(img => img.time === selectedTime);
            console.log('Filtered images by date and time:', filteredImages); // Log filtered images by date and time
        }
        currentIndex = 0;
        showImage(currentIndex);
    }

    // Function to show image based on index
    function showImage(index) {
        if (filteredImages.length > 0 && index >= 0 && index < filteredImages.length) {
            imageContainer.innerHTML = `<img src="${filteredImages[index].path}" alt="Screenshot" />`;
            console.log('Showing image:', filteredImages[index].path); // Log showing image
        } else {
            imageContainer.innerHTML = 'Keine Bilder für das ausgewählte Datum und Zeit.';
            console.log('No images for the selected date and time.'); // Log no images message
        }
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
    document.getElementById('time').addEventListener('change', function () {
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
            }
        });

        calendar.render();
    }

    // Initialize calendar
    let currentDate = new Date('2022-06'); // Initial date
    initializeCalendar();

    // Fetch images on page load
    fetchImages();
});
