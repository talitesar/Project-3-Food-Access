// Define cityLayer variable
var cityLayer = L.layerGroup();

// create the map centered on Texas
var map = L.map("map", {
  center: [31.168934999999998, -100.07684],
  zoom: 6,
  layers: [cityLayer]
});

// add the OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

// read the McDonald's locations from a JSON file
var inputElement = document.getElementById("fileInput");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  var fileList = this.files;
  var reader = new FileReader();
  reader.readAsText(fileList[0]);

  reader.onload = readerEvent => {
    var content = readerEvent.target.result;
    var json = JSON.parse(content);

    // filter the locations to only those in Texas
    var texasLocations = json.features.filter(function(feature) {
      return feature.properties.state === "TX";
    });

    // add markers for the Texas McDonald's locations
    texasLocations.forEach(function(feature) {
      var coordinates = feature.geometry.coordinates;
      var marker = L.marker([coordinates[1], coordinates[0]]).addTo(map);
      marker.bindPopup("<b>" + feature.properties.storeNumber + "</b><br>" + feature.properties.address + "<br>" + feature.properties.city + ", " + feature.properties.state + " " + feature.properties.zip);
    });

    // count the number of locations per city in Texas
    var cityCounts = {};
    texasLocations.forEach(function(feature) {
      var city = feature.properties.city;
      if (city in cityCounts) {
        cityCounts[city]++;
      } else {
        cityCounts[city] = 1;
      }
    });

    // sort the cityCounts object by the number of locations in each city
    var sortedCityCounts = Object.keys(cityCounts).sort(function(a, b) {
      return cityCounts[b] - cityCounts[a];
    }).reduce(function(obj, key) {
      obj[key] = cityCounts[key];
      return obj;
    }, {});

    // generate an HTML table showing the top 10 location counts by city
    var tableHtml = "<table><tr><th>City</th><th>Number of Locations</th></tr>";
    var count = 0;
    for (var city in sortedCityCounts) {
      if (count >= 10) {
        break;
      }
      tableHtml += "<tr><td>" + city + "</td><td>" + sortedCityCounts[city] + "</td></tr>";
      count++;
    }
    tableHtml += "</table>";
    document.getElementById("locationTable").innerHTML = tableHtml;
  };

  // add a marker at the center of Texas
  var marker = L.marker([31.168934999999998, -100.07684]).addTo(map);
  marker.bindPopup("<b>Welcome to Texas!</b>").openPopup();
}