$
// CDN links 

// https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js
// https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css


$(function () {

  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    selectable: true,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    select: function (startDate, endDate) {
      console.log('selected ' + startDate.format() + ' to ' + endDate.format());
    }
  });

});