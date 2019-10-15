const start = async () => {
  // Création de l'objet apiWeather
  const city = document.getElementById('city-input').value === ''
    ? undefined : document.getElementById('city-input').value;

  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast

  try {
    const response = await apiWeather.fetchTodayForecast();

    // Récupère la donnée d'une API
    const data = response.data;

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

  } catch (error) {
    console.log('ERROR MESSAGE :', error.message);
    console.log('ERROR :', error);
  }

  try {
    const response = await apiWeather.getThreeDayForecast();

    // Récupère la donnée d'une API
    const data = response.data;

    // On récupère l'information principal
    data.list.forEach((data, id) => {
      document.getElementById(`${id + 1}-forecast-main`).innerHTML = data.weather[0].main;
      document.getElementById(`${id + 1}-forecast-more-info`).innerHTML = data.weather[0].description;
      document.getElementById(`${id + 1}-icon-weather-container`).innerHTML = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
      document.getElementById(`${id + 1}-forecast-temp`).innerHTML = `${data.temp.day}°C`;

    })
  } catch (error) {
    console.log('ERROR MESSAGE :', error.message);
    console.log('ERROR :', error);
  }
}

// Func call when doc is load
document.onload = start();