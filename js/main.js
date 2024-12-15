async function search(query) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e90001d8dd3a40b4bd0114005241312&q=${query}&days=3`);
    if (response.ok && response.status !== 400) {
        let data = await response.json();
        displayCurrent(data.location, data.current);
        displayAnother(data.forecast.forecastday);
    }
}

document.getElementById("search").addEventListener("keyup", (event) => {
    search(event.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (current) {
        var date = new Date(current.last_updated.replace(" ", "T"));
        let currentWeatherHTML = `
            <div class="today forecast">
                <div class="forecast-header" id="today">
                    <div class="day">${days[date.getDay()]}</div>
                    <div class="date">${date.getDate()} ${monthNames[date.getMonth()]}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location">${location.name}</div>
                    <div class="degree">
                        <div class="num">${current.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="images/icon-umberella.png" alt="">20%</span>
                    <span><img src="images/icon-wind.png" alt="">18km/h</span>
                    <span><img src="images/icon-compass.png" alt="">East</span>
                </div>
            </div>
        `;
        document.getElementById("forecast").innerHTML = currentWeatherHTML;
    }
}

function displayAnother(forecast) {
    let forecastHTML = "";
    for (let i = 1; i < forecast.length; i++) {
        let day = new Date(forecast[i].date.replace(" ", "T"));
        forecastHTML += `
            <div class="forecast">
                <div class="forecast-header">
                    <div class="day">${days[day.getDay()]}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${forecast[i].day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree">${forecast[i].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${forecast[i].day.mintemp_c}<sup>o</sup></small>
                    <div class="custom">${forecast[i].day.condition.text}</div>
                </div>
            </div>
        `;
    }
    document.getElementById("forecast").innerHTML += forecastHTML;
}

search("Cairo");
