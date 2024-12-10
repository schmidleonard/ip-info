

function searchIpInfo(){
    console.log('search Called')


    let searchStr = document.getElementById('searchInput').value;
    console.log("searched for " + searchStr);

    fetch('http://ip-api.com/json/' + searchStr).then(res => res.json()).then(apiSearchJson => {
        createResult(apiSearchJson);
    })
}



function createResult(apiJson){

    document.getElementById('createContent').innerHTML = '';


    let ipText = document.createElement('p');
    ipText.innerHTML = apiJson.query;

    document.getElementById('createContent').appendChild(ipText);
}