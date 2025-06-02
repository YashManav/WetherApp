const api = {
  key: "425a46ae80f84fd34f1de5c87e5d809a",
  base: "https://api.openweathermap.org/data/2.5/"
};


const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getWeather(searchBox.value);
  }
});

function getWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(displayResults)
    .catch(error => alert(error.message));
}

function displayResults(weather) {
  document.querySelector('.city').innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  document.querySelector('.date').innerText = formatDate(now);

  document.querySelector('.temp').innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  document.querySelector('.weather').innerText = weather.weather[0].main;
  document.querySelector('.hi-low').innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function formatDate(d) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
