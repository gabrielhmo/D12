//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');


//Modal - DB Settings
var $ModalDbSettings = $("#ModalDBSettings");
var $FormDBSettings = $("#FormDBSettings");
var $AlertFormDBSettings = $('#AlertFormDBSettings');

//Modal - DB Settings
var $ModalDbSettings = $("#ModalDBSettings");
var $FormUser = $("#FormUser");
var $AlertFormUser = $('#AlertFormUser');

//Modal - DB Settings
var $ModalDbSettings = $("#ModalDBSettings");
var $FormUser = $("#FormUser");
var $AlertFormUser = $('#AlertFormUser');

//Modal - DB Settings
var $ModalDbSettings = $("#ModalDBSettings");
var $FormUser = $("#FormUser");
var $AlertFormUser = $('#AlertFormUser');




//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 140);

    $('#btnOpenModalDBSettings').on('click', function () { OpenFormDBSettings(); });
}
function onResize() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 165);
}

//function initModals() {
//    //Button Save-User
//    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalDbSettings).on('click', function (event) {
//        $($FormUser).submit();
//    });

//    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalDbSettings).on('click', function (event) {
//        hideFormAlert($AlertFormUser);
//        ClearForm($FormUser);
//    });

//    //Modal-User
//    $ModalDbSettings.on('hidden.bs.modal', function () {
//        ClearForm($FormUser);
//    });

//}

//Modal - 
function OpenFormDBSettings() {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalDbSettings).html("Ajustes de Base de Datos");
    $ModalDbSettings.modal("show");

    var dbServer = $('#tagDBServer');
    var dbName = $('#tagDBName');
    var dbUsername = $('#tagDBUsername');
    var dbPassword = $('#tagDBPassword');

    $('#DBServer').val(dbServer.text());
    $('#DBName').val(dbName.text());
    $('#DBUsername').val(dbUsername.text());
    $('#DBPassword').val(dbPassword.text());

    $('#modal-loading').fadeOut();
}
