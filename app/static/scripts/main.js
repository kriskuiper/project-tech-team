// DOM Elements
const filter = document.querySelector(".filter");
const filterActivator = document.querySelector(".filter--activator");

// Filter flag
let filterOpen = false;

// Cut the mustard
if ("querySelector" in document) {
  document.body.classList.add("js-enabled");

  if (filterActivator) {
    filterActivator.addEventListener("click", toggleFilter);
  }
}

// Register serviceworker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      navigator.serviceWorker
          .register("/sw.js")
          .then(registration => {
              console.log(`ServiceWorker registration successfull with scope: ${registration.scope}`); // eslint-disable-line
          })
          .catch(() => {
              console.log("Failed to register ServiceWorker"); // eslint-disable-line
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

// Toggle the filter
function toggleFilter() {
  filter.classList.toggle("is--open");
  filterActivator.classList.toggle("is--shown");
  if (!filterOpen) {
    filterActivator.textContent = "Close filter";
    filterOpen = true;
  } else {
    filterActivator.textContent = "Filter";
    filterOpen = false;
  }
}

// Trigger value
let triggered = false;
const navBar = document.querySelector("#nav__inital");

// position on page detector
window.onscroll = function() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if ((currentScroll >= 20) && (triggered === false)) {
    navBar.classList.toggle("big");
    triggered = true;
  } else if ((currentScroll < 20) && (triggered === true)) {
    navBar.classList.toggle("big");
    triggered = false;
  }
};
