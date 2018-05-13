$
// doc- https://fullcalendar.io/docs/events-json-feed

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