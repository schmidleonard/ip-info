
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

    document.getElementById('createContent').appendChild(ipText);
}

// fetch dns data
function searchDns(){
    console.log('dns api called');

    fetch('http://edns.ip-api.com/json').then(res => res.json()).then(dnsSearchJson => {
        createDnsResult(dnsSearchJson);
    })
}

function createDnsResult(dnsSearchJson){
    //clear Div
    document.getElementById('createContentDns').innerHTML = '';

    // split information from Json "geo" into isp and location
    let inputParts = dnsSearchJson.dns.geo.split('-');

    let geo = inputParts[0];
    let isp = inputParts[1];



    let dnsIP = document.createElement('p');
    dnsIP.innerHTML = 'Dein aktueller DNS-Server hat folgende IP-Adresse: ' + dnsSearchJson.dns.ip;
    let ispName = document.createElement('p');
    ispName.innerHTML = 'Dein ISP ist ' + isp;

    let dnsGeo = document.createElement('p');
    dnsGeo.innerHTML = 'Der DNS-Server steht in ' + geo;

    document.getElementById('createContentDns').appendChild(dnsIP);
    document.getElementById('createContentDns').appendChild(ispName);
    document.getElementById('createContentDns').appendChild(dnsGeo);
}