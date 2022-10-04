function getLocation () {
    document.getElementById("overall-modal").innerHTML = '<div class="modal fade" id="message-modal" tabindex="-1" role="dialog"' +
        ' aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Obtener ubicación</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        'Seleccione el nivel de radio a explorar: <br/><br/>' +
        '<label for="input-range" class="form-label" id="currentRange">Rango actual: 500 metros.</label>' +
        "<input id='input-range' type='range' style='width: 100%' class='form-range' min='100' max='1000' value='500' oninput='updateRank(this.value)'>" +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-primary"' + " onclick='" + 'locationUser()' + "'>Aceptar</button>'" +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#message-modal").modal('toggle');
}

function shareLocation () {
    let user = generateId();
    let url_share = server + "?share=" + user;
    document.getElementById("overall-modal").innerHTML = '<div class="modal fade" id="message-modal" tabindex="-1" role="dialog"' +
        ' aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Compartir mapa</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<span id="text-share">¿Como desea compartir esta ubicación?</span>' +
        "<input class='form-control' id='share-url' style='display: none; margin-top: 10px' type='text' disabled value=''>" +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-primary" id="share-button-now"' + " onclick='" + 'shareSesion(0)' + "'>Sesión actual</button>" +
        '<button type="button" class="btn btn-primary" id="share-button-new"' + " onclick='" + 'shareSesion(1)' + "'>Crear sesión</button>" +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#message-modal").modal('toggle');
}

function removeAll () {
    document.getElementById("overall-modal").innerHTML = '<div class="modal fade" id="message-modal" tabindex="-1" role="dialog"' +
        ' aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Reiniciar mapa</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '¿Desea reiniciar solamente los marcadores o todo el mapa?' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-primary"' + " onclick='" + 'removeAllMap(false, true, false)' + "'>Solo marcadores</button>" +
        '<button type="button" class="btn btn-secondary"' + " onclick='" + 'removeAllMap(true, true, true)' + "'>Todo el mapa</button>" +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#message-modal").modal('toggle');
}

function removeLayer (index) {
    document.getElementById("overall-modal").innerHTML = '<div class="modal fade" id="message-modal" tabindex="-1" role="dialog"' +
        ' aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Eliminar ubicación en el mapa</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '¿Realmente desea eliminar esta ubicacióm marcada en el mapa?' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-primary"' + "onclick='" + 'removeLayerSelect(' + index + ')' + "'>Aceptar</button>'" +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#message-modal").modal('toggle');
}

function restoreSession () {
    document.getElementById("overall-modal").innerHTML = '<div class="modal fade" id="message-modal" tabindex="0" role="dialog"' +
        ' aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Sesión iniciada</h5>' +
        '</div>' +
        '<div class="modal-body">' +
        'Existe una sesión registrada anteriormente ¿desea restaurarla?' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-primary"' + "onclick='" + 'restoreLocation()' + "'" + ' data-dismiss="modal">Restaurar</button>' +
        '<button type="button" class="btn btn-secondary"' + "onclick='" + 'removeLocation()' + "'" + ' data-dismiss="modal">Eliminar</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#message-modal").modal('toggle');
}

function getDetailsPlace (data) {
    document.getElementById("overall-modal").innerHTML = '<div class="modal fade" id="message-modal" tabindex="-1" role="dialog"' +
        ' aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">' +
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLongTitle">Información de la ubicación</h5>' +
        '</div>' +
        '<div class="modal-body" style="overflow-wrap: break-word;">' +
        JSON.stringify(data) +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#message-modal").modal('toggle');
}