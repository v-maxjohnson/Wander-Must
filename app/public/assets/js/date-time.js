// function to add datetimepicker calendar to new suitcase modal
$(function () {
    $('#start-date').datepicker({
        format: 'MM-DD-YYYY',
        onSelect: function (date) {
            var date2 = $('#start-date').datepicker('getDate');
            date2.setDate(date2.getDate() + 1);
            $('#end-date').datepicker('setDate', date2);
            //sets minDate to dt1 date + 1
            $('#end-date').datepicker('option', 'minDate', date2);
        }
    });
    $('#end-date').datepicker({
        format: 'MM-DD-YYYY',
        onClose: function () {
            var dt1 = $('#start-date').datepicker('getDate');
            var dt2 = $('#end-date').datepicker('getDate');
            //check to prevent a user from entering a date below date of dt1
            if (dt2 <= dt1) {
                var minDate = $('#end-date').datepicker('option', 'minDate');
                $('#end-date').datepicker('setDate', minDate);
            }
        }
    });

    $("#pickOne").on("click", function () {
        $('#start-date').focus();
    });

    $("#pickTwo").on("click", function () {
        $('#end-date').focus();
    });
});