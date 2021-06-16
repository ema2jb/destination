// Foursquare API Info
const clientId = '4GM4RD20BF2GMEZMAQA2TTVCLWQIJL0O34VYHN0GA51VLAIH';
const clientSecret = 'FWENPMN3XWRHDMLUZTFV232UN4E0JGVVMKGHKQVHLUGDFVZY';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '2d582bd591cfc7c80fd87718df308688';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210520`
    try{
      const response = await fetch(urlToFetch)
      if(response.ok){
        const jsonResponse = await response.json();
        const venues = jsonResponse.response.groups[0].items.map(item=>item.venue);
        console.log(venues);
        return venues;
      }
    }catch(error){
      console.log(error)
    }
}

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = `${weatherUrl}?&q=${city}&APPID=${openWeatherKey}`
    try{
      const response = await fetch(urlToFetch)
      if(response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
      }
    }catch(error){
      console.log(error);
    }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    let venueContent = createVenueHTML(venue.name,venue.location,venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then((venues)=>{
   return renderVenues(venues)
  })
  getForecast().then((forecast)=>{
    return renderForecast(forecast);
  })
  return false;
}

$submit.click(executeSearch)



//addons

/*Fetch more than 4 venues and randomize which ones are added to the page.

40.
Include additional information about the weather.

41.
Include additional information about each venue from the response.

For a real challenge, try fetching venue photos! This will 
require an additional request for venue details for each 
venue, as the photo information is not returned in the 
initial request*/