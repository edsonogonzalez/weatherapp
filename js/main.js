window.addEventListener("load", () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegrees = document.querySelector(".temperature-degrees");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/6e462c2ba01ab7445d7f77c1ef0fa55f/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // Used to display Location Data in browser console
          // console.log(data);
          const { temperature, summary, icon } = data.currently;

          // Set DOM Elements from API
          temperatureDegrees.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // FORMULA FOR CELCIUS
          let celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcon(icon, document.querySelector(".icon"));

          // Change temperature from Farenheit/Celsius
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegrees.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegrees.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent =
      "There seems to be an error, please enable location if possible";
  }

  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
