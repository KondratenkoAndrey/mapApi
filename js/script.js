$('document').ready(function() {

  var initlatlng = [38.891896, -77.033788];

  var mymap = L.map('map', {
    center: initlatlng,
    zoom: 13
  });

  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  }).addTo(mymap);

  var sourceUrl = 'https://raw.githubusercontent.com/benbalter/dc-wifi-social/master/bars.geojson';
  $.getJSON(sourceUrl, function(data) {

    $.each(data.features, function(i, item) {

      var marker = new L.Marker(
        item['geometry']['coordinates'].reverse(),
        {draggable:true});

      marker.bindPopup(
        '<p class="popupTitle">'+
        item['properties']['marker-symbol'] +
        ' "' +
        item['properties']['name']
        +'"</p><p>'+
        item['properties']['address']
        +'</p>'
      ).openPopup();

      mymap.addLayer(marker);

    })

    mymap.panTo(initlatlng);

  });


})
