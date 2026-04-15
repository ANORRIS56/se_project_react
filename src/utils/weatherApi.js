function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  return res.json();
}

export function getWeatherCondition(temperatureFahrenheit) {
  if (temperatureFahrenheit >= 86) {
    return "hot";
  }

  if (temperatureFahrenheit >= 66) {
    return "warm";
  }

  return "cold";
}

export function fetchWeather({ latitude, longitude }, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  return fetch(url)
    .then(checkResponse)
    .then((data) => {
      const temperatureF = Math.round(data.main.temp);
      const temperatureC = Math.round(((data.main.temp - 32) * 5) / 9);

      return {
        city: data.name,
        temperature: {
          F: temperatureF,
          C: temperatureC,
        },
        condition: getWeatherCondition(temperatureF),
        isDay: true,
      };
    });
}
