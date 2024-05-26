document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dayMaxEventRows: true,
        dayMaxEvents: true,
        events: [
            {
                title: 'Event 1',
                start: '2023-05-01'
            },
            {
                title: 'Event 2',
                start: '2023-05-07',
                end: '2023-05-10'
            },
            {
                title: 'Event 3',
                start: '2023-05-09T12:30:00',
                allDay: false
            }
        ]
    });

    calendar.render();
});

document.addEventListener('DOMContentLoaded', function () {
    let filterBTN = document.getElementById('filterBTN');
    let expansion = document.getElementById('expansion');

    filterBTN.addEventListener('click', function () {
        filterBTN.style.backgroundColor = "darkgray";
        expansion.style.display = "block";
    });
});