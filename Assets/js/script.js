$(document).ready(function () {

    var cities = []

    // for UV index on the API --- http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
    function displayCities() {






        var city = $(this).attr("data-name")
        var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=42c350817d56f82945a139c5b4898ee8";
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=42c350817d56f82945a139c5b4898ee8";

        $.ajax({
            url: cityURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $("#daily").empty();

            var dailyDiv = $("<div>");
            $("#daily").append(dailyDiv);

            var cityName = response.name;
            var today = moment().format("(" + 'L' + ")");

            var cityIconCode = response.weather[0].icon;
            var cityIconURL = "https://openweathermap.org/img/wn/" + cityIconCode + ".png";
            console.log(cityIconURL);
            var cityIcon = $("<img>").attr("src", cityIconURL);
            console.log(cityIcon);
            var dailyHead = $("<h2>").text(cityName + "" + today);

            $(dailyDiv).append(dailyHead);

            var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var dailyTemp = $("<p>").text('Temperature: ' + tempF + String.fromCharCode(176) + 'F');

            $(dailyDiv).append(dailyTemp);

            var humidity = response.main.humidity;
            var dailyHumidity = $("<p>").text('Humidity: ' + humidity + '%');

            $(dailyDiv).append(dailyHumidity);

            var windSpeed = ((response.wind.speed * 2.23694).toFixed(1));
            var dailyWindSpeed = $("<p>").text('Wind Speed: ' + windSpeed + ' MPH');

            $(dailyDiv).append(dailyWindSpeed);

            // var UVIndex = 


        })
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $("#results").empty();

            var forecastDiv = $("<div>");
            $("#forecast").append(forecastDiv);

            var forecastHead = $("<h3>").text('5-Day Forecast:');
            $(forecastDiv).append(forecastHead);

            for (let a = 0; a < 5; a++) {

                var forecast = $("<div class='col'>");
                $("#forecast2").append(forecast);

                var forecastSignifier = ((a * 8) + 3);
                var forecastTempValue = response.list[forecastSignifier].main.temp;
                forecastTemp = $("<p>").text('Temperature: ' + forecastTempValue + String.fromCharCode(176) + 'F');

                $(forecast).append(forecastTemp);

                var forecastHumidityValue = response.list[forecastSignifier].main.humidity;
                forecastHumidity = $("<p>").text('Humidity: ' + forecastHumidityValue + '%');

                $(forecast).append(forecastHumidity);
            }

        });

    }

    function renderCities() {
        $("#cities").empty();

        for (let i = 0; i < cities.length; i++) {
            var cityBtn = $("<button>");
            cityBtn.addClass("cityBtn cityName");
            cityBtn.attr("data-name", cities[i]);
            cityBtn.text(cities[i]);
            $("#cities").prepend(cityBtn);

        }
    }

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        var cityInput = $("#city-input").val().trim();
        cities.push(cityInput)
        renderCities();
    });

    $(document).on("click", ".cityBtn", displayCities);


    renderCities();
})