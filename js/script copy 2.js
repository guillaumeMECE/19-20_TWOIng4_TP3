
// Func call when doc is load
document.onload = start();

function start() {
  // Création de l'objet apiWeather
  let city = document.getElementById('city-input').value;
  if (city === '') {
    city = undefined;
  }
  console.log('city', city);

  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  apiWeather
    .fetchTodayForecast()
    .then(function (response) {
      // Récupère la donnée d'une API
      const data = response.data;
      console.log('data ', data);

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;

    })
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });

  apiWeather
    .getThreeDayForecast()
    .then(function (response) {
      // Récupère la donnée d'une API
      const data = response.data;
      console.log('data forecast', data);

      // On récupère l'information principal
      let days = 0;
      data.list.forEach((data, index) => {
        days++;
        document.getElementById(`${days}-forecast-main`).innerHTML = data.weather[0].main;
        document.getElementById(`${days}-forecast-more-info`).innerHTML = data.weather[0].description;
        document.getElementById(`${days}-icon-weather-container`).innerHTML = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
        document.getElementById(`${days}-forecast-temp`).innerHTML = `${data.temp.day}°C`;

      });

    })
    .catch(function (error) {
      // Affiche une erreur
      console.error(error);
    });
}
