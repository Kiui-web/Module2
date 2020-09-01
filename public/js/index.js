function initMap() {

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     const user_location = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     console.log(position.coords.latitude);
 
  //     // Center map with user location
  //     map.setCenter(user_location);
 
  //     // Add a marker for your user location
  //     const ironhackBCNMarker = new google.maps.Marker({
  //       position: {
  //         lat: user_location.lat,
  //         lng: user_location.lng
  //       },
  //       map: map,
  //       title: "You are here."
  //     });
 
  //   }, function () {
  //     console.log('Error in the geolocation service.');
  //   });
  // } else {
  //   console.log('Browser does not support geolocation.');
  // }
    console.log(navigator.geolocation);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        // lat: -95.712891,
        // lng: 37.09024
        lat:40.4378698, 
        lng: -3.8196207
      },
      zoom: 13
    });

    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input); // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
  
    autocomplete.bindTo("bounds", map); // Set the data fields to return when the user selects a place.
  
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
  
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      } // If the place has a geometry, then present it on a map.
  
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
  
      marker.setPosition(place.geometry.location);
      const geocode = new google.maps.Geocoder()
      geocodeAddress(geocode);
      marker.setVisible(true);
      let address = "";
  
      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            ""
        ].join(" ");
      }
  
      infowindowContent.children["place-icon"].src = place.icon;
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);
    });
    const geocoder = new google.maps.Geocoder();

  }

  function geocodeAddress(geocoder) {
    const address = document.getElementById("pac-input").value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location
        const latitud = location.lat()
        const longitud = location.lng()
        document.getElementById('latitude').value = latitud
        document.getElementById('longitud').value = longitud
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}



  