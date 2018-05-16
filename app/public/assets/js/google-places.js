

function initService() {
  var displaySuggestions = function(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      conosle.log("this is running")
      return;
    }

    predictions.forEach(function(prediction) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(prediction.description));
      document.getElementById('results').appendChild(li);
    });
  };

  var service = new google.maps.places.AutocompleteService();
  service.getQueryPredictions({ input: 'pizza near Syd' }, displaySuggestions);
}
