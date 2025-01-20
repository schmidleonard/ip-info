let googleMapsLoaded = false;

// fetch ip data
function searchIpInfo() {
    console.log('ip api Called');


    let searchStr = document.getElementById('searchInput').value;
    console.log("searched for " + searchStr);

    fetch('http://ip-api.com/json/' + searchStr + '?lang=de').then(res => res.json()).then(ipSearchJson => {
        createIpResult(ipSearchJson);
    })
}


// create IP Result
function createIpResult(ipSearchJson) {
    let success = ipSearchJson.status;
    if (success == 'success') {
        //clear old Results and fill table with content
        document.getElementById('createMapsContent').innerHTML = '';

        document.getElementById('resultTableIp').setAttribute('style', 'display: block');

        document.getElementById('ipquery').innerHTML = ipSearchJson.query;
        document.getElementById('ipcountry').innerHTML = ipSearchJson.country;
        document.getElementById('ipcity').innerHTML = ipSearchJson.zip + ' ' + ipSearchJson.city;
        document.getElementById('ipregion').innerHTML = ipSearchJson.regionName;
        document.getElementById('ipisp').innerHTML = ipSearchJson.isp;
        document.getElementById('iptime').innerHTML = ipSearchJson.timezone;

        //create Google Maps Map
        let mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'map');
        mapContainer.style.height = '400px';
        mapContainer.style.width = '100%';

        document.getElementById('createMapsContent').appendChild(mapContainer);

        console.log(ipSearchJson.lat)
        console.log(ipSearchJson.lon)

        console.log("Vor dem Aufruf von loadGoogleMapsAPI");
        loadGoogleMapsAPI(() => {
            console.log("Callback von loadGoogleMapsAPI wird ausgeführt");
            console.log("Übergebene Werte:", ipSearchJson.lat, ipSearchJson.lon);
            initMap(ipSearchJson.lat, ipSearchJson.lon);
        });
    } else {
        // Print Error Message
        document.getElementById('createMapsContent').innerHTML = '';

        let ipFailed = document.createElement('div');
        ipFailed.setAttribute('class', 'alert alert-danger mt-4');
        ipFailed.setAttribute('role', 'alert');
        ipFailed.innerHTML = 'Bitte gebe eine Korrekte IP-Adresse oder Domain ein und versuche es erneut';
        document.getElementById('createMapsContent').appendChild(ipFailed);

        document.getElementById('resultTableIp').setAttribute('style', 'display: none');

        //fetch Dog Api
        try {
            fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()).then(dogJson => {
                let dogImg = document.createElement('img');
                dogImg.setAttribute('src', dogJson.message);
                dogImg.setAttribute('alt', 'Ein Random Hundebild');
                dogImg.setAttribute('class', 'rounded mx-auto d-block');


                let dogText = document.createElement('p')
                dogText.innerHTML = 'Damit du nicht traurig bist, hier ein Hundebild :)';
                document.getElementById('createMapsContent').appendChild(dogText);
                document.getElementById('createMapsContent').appendChild(dogImg);

            })
        } catch (error) {
            console.error("dog api couldnt load:", error.message);
        }
    }
}

// fetch dns data
function searchDns() {
    console.log('dns api called');

    fetch('http://edns.ip-api.com/json').then(res => res.json()).then(dnsSearchJson => {
        createDnsResult(dnsSearchJson);
    })
}


function createDnsResult(dnsSearchJson) {

    // split information from Json "geo" into isp and location
    let inputParts = dnsSearchJson.dns.geo.split('-');

    let geo = inputParts[0];
    let isp = inputParts[1];

    document.getElementById('dnsip').innerHTML = dnsSearchJson.dns.ip;
    document.getElementById('dnsisp').innerHTML = isp;
    document.getElementById('dnsgeo').innerHTML = geo;



}

//Google Maps API
function loadGoogleMapsAPI(callback) {
    if (googleMapsLoaded) {
        callback();
        return;
    }

    console.log("loadGoogleMapsAPI aufgerufen");
    let script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY=googleMapsCallback`;
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
        center: { lat: lat, lng: lon },
    });

    // Marker hinzufügen
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
        title: "Standort"
    });
}

