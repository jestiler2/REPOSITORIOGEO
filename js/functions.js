function checkSelection (select) {
    return select === 'Choose...';
}

function updateRank (rank) {
    component = document.getElementById("currentRange")
    component.innerHTML = "Rango actual: " + rank + " metros."
}

function addOptions (element, options) {
    let menu = document.getElementById(element);
    options.forEach((option) => {
        let add = document.createElement("option");
        add.setAttribute("value", "value");
        let value = document.createTextNode(option);
        add.appendChild(value);
        menu.appendChild(add);
    });
}

function removeOptions (element) {
    let menu = document.getElementById(element);
    for (i = menu.options.length; i >= 1; i--) {
        menu.remove(i);
    }
}

function resetOptions (element) {
    let menu = document.getElementById(element);
    menu.value = 'Choose...';
}

function toogleMessage () {
    $("#message-modal").modal('toggle');
}

function download (filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function shareSesion (type) {

    let url_share = server + "?share=";
    url_share += type === 0 ? idShare : idShare = generateId();

    if (markerMap['market'] !== null) url_share += "&radio=" + markerMap['radio'];

    let input = document.getElementById("share-url");
    input.style.display = "block";
    input.value = url_share;
    document.getElementById("text-share").innerText = "Se ha copiado el siguiente url a su portapapeles:";
    document.getElementById("share-button-now").disabled= true;
    document.getElementById("share-button-new").disabled= true;

    copy(url_share);

    if (mapLayers !== []) removeAndCreatedLocationShare(mapLayers);
}

function copy(text) {
    const type = 'text/plain';
    const blob = new Blob([text], {type});
    let data = [new ClipboardItem({[type]: blob})];

    navigator.clipboard.write(data).then(function() {
        console.log('Copiado!')
    }, function() {
        console.log('Ups! No se copio');
    });
}