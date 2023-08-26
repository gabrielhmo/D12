//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - Client
var $ModalFormClient = $("#ModalClient");
var $FormClient = $("#FormClient");
var $AlertFormClient = $('#AlertFormClient');


//DhxLayoutCell - Client
var dhxToolbarClient;
var dhxGridClient;
var dhxStatusBarClient;
var paginationClient = null;
var pageNumberClient = 1;
var pageSizeClient = 100;
var strSearchClient = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'Client':
            return UrlClient(pageNum);
    }
}

//URL - Client
var urlBaseClient = 'Clients/Client/';
function UrlClient(newPage, newSearch, newPageSize) {

    pageNumberClient = newPage || pageNumberClient;
    strSearchClient = newSearch || strSearchClient;
    pageSizeClient = newPageSize || pageSizeClient;

    return rootPath + urlBaseClient + "All?PageNumber=" + pageNumberClient + "&PageSize=" + pageSizeClient + "&search=" + strSearchClient;
}
function UrlExportClient(format) {
    url = rootPath + urlBaseClient + "ExportData?PageNumber=" + pageNumberClient + "&PageSize=" + pageSizeClient + "&strSearch=" + strSearchClient + "&format=" + format + "&area=Client";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormClient();
}
function onResize() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 165);
}

//Init DhxLayout 
function initLayout() {

    //Attach Layout
    dhxLayout = new dhtmlXLayoutObject({
        pattern: '1C',
        parent: 'MainContainer',
        offsets: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        cells: [
            { id: 'a', text: 'Client', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxClient();
}

//Grid box
function InitBoxClient() {
    InitDhxToolbarClient();
    InitDxhGridClient();
}

//Toolbar
function InitDhxToolbarClient() {

    //Load DhcToolbar Config
    GetDhxToolbarClient();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarClient.removeItem("new");
    }

    //Add Space
    dhxToolbarClient.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarClient.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormClient();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteClient();

                break;
            case "reload":
                ReInitPaging(paginationClient, 'Client');
                reloadGrid(dhxLayout, dhxGridClient, UrlClient(), 'Client', paginationClient);
                break;
            case "print":
                dhxGridClient.printView();
                break;
            case "copyClipboard":
                dhxGridClient.setCSVDelimiter("t");
                dhxGridClient.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridClient, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridClient, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportClient('csv');
                //exportToFile(dxhGridClient, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarClient() {
    dhxToolbarClient = dhxLayout.cells('a').attachToolbar({
        iconset: "awesome",
        items: [
            {
                type: "buttonSelect", id: "new", text: "New", img: "far fa-file", img_disabled: "far fa-file", renderSelect: true, openAll: false,
                options: [
                    { type: "button", id: "delete", text: "Delete", img: "fas fa-trash", img_disabled: "fas fa-trash" }
                ]
            },
            {
                type: "buttonSelect", id: "copyClipboard", text: "Copy", img: "fa fa-clipboard", img_disabled: "fa fa-file-o", renderSelect: false, openAll: true,
                options: [
                    { type: "button", id: "copyExcel", text: "Copy to Excel", img: "fa fa-file-excel-o", img_disabled: "fa fa-file-excel-o" },
                    { type: "button", id: "copyCSV", text: " Copy to CSV", img: "fa fa-file-text-o", img_disabled: "fa fa-file-text-o" }
                ]
            },
            { type: "separator", id: "sep2" },
            { type: "button", id: "reload", text: "Refresh", img: "fas fa-sync-alt", img_disabled: "fas fa-sync-alt" },
            { type: "text", id: "strSearch", text: SearchComponent('Client', false) }
        ],
        onload: function () {

            $('#frmSearchClient').parent().css('textAlign', 'right');
            $('#frmSearchClient').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchClient').closest('.dhx_toolbar_Client').css('overflow', 'visible');

            $('#frmSearchClient').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationClient, 'Client');
                strSearchClient = $('#inputSearchClient').val();
                reloadGrid(dhxLayout, dhxGridClient, UrlClient(1, strSearchClient), 'Client', paginationClient);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridClient() {

    //dhxLayout - StatusBar
    dhxStatusBarClient = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('Client')
    });

    dhxGridClient = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridClient, 'Client');
    dhxGridClient.parse(GetDhxGridConfClient(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridClient);
    //Set columns header show/hide function
    setColHeader(dhxGridClient);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridClient.setColumnHidden(1, true);

    //onRowSelect
    dhxGridClient.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridClient.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormClient(rId);
    });

    //Default Events
    dhxGridClient.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlClient() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridClient.load(UrlClient(), function () {

        ReInitPaging(paginationClient, 'Client');

        var paginParameter = dhxGridClient.UserData.gridglobaluserdata.values[4].paginParams;

        paginationClient = initPaging(
            dhxLayout,
            dhxGridClient,
            'Client',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#ClientChk').on('change', function () {

        if (this.checked)
            dhxGridClient.setCheckedRows(0, 1);
        else
            dhxGridClient.setCheckedRows(0, 0);
    });

    $('#PageSizeClient').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationClient, 'Client');
        reloadGrid(dhxLayout, dhxGridClient, UrlClient(1, null, sizeGrid), 'Client', paginationClient);

        $('#PageSizeClient').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfClient() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ClientChk"/><label for="ClientChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'Name', width: 500, type: 'ron', align: 'left', sort: 'str', value: 'Name', hidden: 'false' },
            { id: 'Email', width: 400, type: 'ron', align: 'left', sort: 'str', value: 'Email', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'EntryDate', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Entry Date', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - Client
function OpenFormClient(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormClient).html("Client");
    $ModalFormClient.modal("show");

    if (rId)
        loadClient(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - Client
function initModalFormClient() {

    //Button Save-Client
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormClient).on('click', function (event) {
        submitFormClient();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormClient).on('click', function (event) {
        hideFormAlert($AlertFormClient);
        clearForm($FormClient);
    });

    //Modal-Client
    $ModalFormClient.on('hidden.bs.modal', function () {
        clearForm($FormClient);
    });

    //Enter key Naviation
    enterFormNavigation($FormClient);
}
//Form - Client
async function submitFormClient() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormClient.valid()) {

        var formData = formToJsonString(document.getElementById($FormClient.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormClient, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseClient + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var entrydate = moment(response.Data.entryDate).format('MM/DD/YY HH:mm');

                if (response.Action === "ADD") {
                    dhxGridClient.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.name,
                            response.Data.email,
                            active,
                            entrydate,
                            ''],
                        0);
                }
                else {

                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("chk")).setValue(0);
                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("Email")).setValue(response.Data.email);
                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("Active")).setValue(active);
                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("EntryDate")).setValue(entrydate);
                    dhxGridClient.cells(response.Data.id, dhxGridClient.getColIndexById("Dummy")).setValue('');
                }

                dhxGridClient.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormClient, response.Errors);

        disableAll($FormClient, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - Client
function loadClient(rId) {

    clearForm($FormClient);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridClient.cells(rId, dhxGridClient.getColIndexById("Id")).getValue();
        var name = dhxGridClient.cells(rId, dhxGridClient.getColIndexById("Name")).getValue();
        var email = dhxGridClient.cells(rId, dhxGridClient.getColIndexById("Email")).getValue();
        var active = dhxGridClient.cells(rId, dhxGridClient.getColIndexById("Active")).getValue();

        $('#Id', $FormClient).val(id);
        $('#Name', $FormClient).val(name);
        $('#Email', $FormClient).val(email);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormClient).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - Client
async function deleteClient() {

    var ClientId = dhxGridClient.getSelectedRowId();

    var rIds = [];

    dhxGridClient.forEachRow(function (id) {
        if (dhxGridClient.cells(id, 0).getValue() === "1")
            rIds.push(id);
    });

    if (rIds.length === 0) {
        swal("Action Required", "To continue, you must check at least one row.", "info");
    }
    else {
        swal({
            title: 'Delete records?',
            text: "Please, confirm!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then(async (result) => {

            if (result.value) {

                var urlDelete = rootPath + urlBaseClient + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridClient.deleteRow(response.Data.deleted[i]);
                    }

                    if (response.Errors.length > 0) {

                        errorMessage = '\r\n';

                        for (let i = 0; i < response.Errors.length; i++) {
                            errorMessage += response.Errors[i].messageTitle + '\r\n' +
                                response.Errors[i].message + '\r\n\r\n';
                        }
                        sweetAlert('Error', message, 'error');
                    }


                    Swal.fire(
                        response.Title,
                        response.Message + ' ' + errorMessage,
                        response.Action
                    );
                }
                else {
                    ShowMessage(response.MessageType, response.Title, response.Message, true, 'toast-bottom-center');
                }
            }
        });
    }
}
