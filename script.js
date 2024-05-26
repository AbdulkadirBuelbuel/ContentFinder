document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
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
