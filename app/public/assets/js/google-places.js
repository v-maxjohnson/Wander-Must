// create google autocomplete variables
var placeSearch, autocomplete;

// create object to determine which values to display
var componentForm = {
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('suitcase-city')),
    { types: ['(cities)'] });
}