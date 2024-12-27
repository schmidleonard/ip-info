
let googleMapsLoaded = false;

// fetch ip data
function searchIpInfo(){
    console.log('ip api Called');


    let searchStr = document.getElementById('searchInput').value;
    console.log("searched for " + searchStr);

    fetch('http://ip-api.com/json/' + searchStr).then(res => res.json()).then(ipSearchJson => {
        createIpResult(ipSearchJson);
    })
}


// create IP Result
function createIpResult(ipSearchJson){

    document.getElementById('createContent').innerHTML = '';


    let ipText = document.createElement('p');
    ipText.innerHTML = ipSearchJson.query;


    let mapContainer = document.createElement('div');
    mapContainer.setAttribute('id', 'map');
    mapContainer.style.height = '400px';
    mapContainer.style.width = '100%';
    

    document.getElementById('createContent').appendChild(ipText);
    document.getElementById('createContent').appendChild(mapContainer);

    console.log(ipSearchJson.lat)
    console.log(ipSearchJson.lon)
    
    
    //loadGoogleMapsAPI(() => initMap(ipSearchJson.lat, ipSearchJson.lon));
    console.log("Vor dem Aufruf von loadGoogleMapsAPI");
    loadGoogleMapsAPI(() => {
        console.log("Callback von loadGoogleMapsAPI wird ausgeführt");
        console.log("Übergebene Werte:", ipSearchJson.lat, ipSearchJson.lon);
        initMap(ipSearchJson.lat, ipSearchJson.lon);
    });
}

// fetch dns data
function searchDns(){
    console.log('dns api called');

    fetch('http://edns.ip-api.com/json').then(res => res.json()).then(dnsSearchJson => {
        createDnsResult(dnsSearchJson);
    })
}


function createDnsResult(dnsSearchJson){

    // split information from Json "geo" into isp and location
    let inputParts = dnsSearchJson.dns.geo.split('-');

    let geo = inputParts[0];
    let isp = inputParts[1];

    document.getElementById('dnsip').innerHTML = dnsSearchJson.dns.ip;
    document.getElementById('dnsisp').innerHTML = isp;
    document.getElementById('dnsgeo').innerHTML = geo;

    

}

function loadGoogleMapsAPI(callback) {
    if (googleMapsLoaded) {
        callback();
        return;
    }

    console.log("loadGoogleMapsAPI aufgerufen");
    let script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBeJLY88Z0YpMHP3NXuSnNuZNsUmAfhdgg&callback=googleMapsCallback`;
    script.async = true;
    window.googleMapsCallback = () => {
        console.log("Google Maps API geladen, Callback wird ausgeführt");
        googleMapsLoaded = true;
        callback();
    };
    document.head.appendChild(script);
}

function initMap(lat, lon) {
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    const mapElement = document.getElementById('map');
    const map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: {lat: lat, lng: lon},
    });

    // Marker hinzufügen
    const marker = new google.maps.Marker({
        position: {lat: lat, lng: lon},
        map: map,
        title: "Standort"
    });
}