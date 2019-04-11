// Register serviceworker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      navigator.serviceWorker
          .register("/sw.js")
          .then(registration => {
              console.log(`ServiceWorker registration successfull with scope: ${registration.scope}`);
          })
          .catch(() => {
              console.log("Failed to register ServiceWorker");
          });
  });
}

// Get geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {

    const location = new GeoLocation(
      position.coords.latitude, 
      position.coords.longitude
    );

    
    let { lat, long } = location;
    
    // set cookie
    document.cookie = `location=${lat}-${long}`;
  });
} else {
  document.cookie = "location=52.361778-4.907370";
}

class GeoLocation {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
}