//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - ChatGptRol
var $ModalFormChatGptRol = $("#ModalChatGptRol");
var $FormChatGptRol = $("#FormChatGptRol");
var $AlertFormChatGptRol = $('#AlertFormChatGptRol');


//DhxLayoutCell - ChatGptRol
var dhxToolbarChatGptRol;
var dhxGridChatGptRol;
var dhxStatusBarChatGptRol;
var paginationChatGptRol = null;
var pageNumberChatGptRol = 1;
var pageSizeChatGptRol = 100;
var strSearchChatGptRol = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'ChatGptRol':
            return UrlChatGptRol(pageNum);
    }
}

//URL - ChatGptRol
var urlBaseChatGptRol = 'PromptOptions/ChatGptRol/';
function UrlChatGptRol(newPage, newSearch, newPageSize) {

    pageNumberChatGptRol = newPage || pageNumberChatGptRol;
    strSearchChatGptRol = newSearch || strSearchChatGptRol;
    pageSizeChatGptRol = newPageSize || pageSizeChatGptRol;

    return rootPath + urlBaseChatGptRol + "All?PageNumber=" + pageNumberChatGptRol + "&PageSize=" + pageSizeChatGptRol + "&search=" + strSearchChatGptRol;
}
function UrlExportChatGptRol(format) {
    url = rootPath + urlBaseChatGptRol + "ExportData?PageNumber=" + pageNumberChatGptRol + "&PageSize=" + pageSizeChatGptRol + "&strSearch=" + strSearchChatGptRol + "&format=" + format + "&area=ChatGptRol";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormChatGptRol();
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
            { id: 'a', text: 'ChatGptRol', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxChatGptRol();
}

//Grid box
function InitBoxChatGptRol() {
    InitDhxToolbarChatGptRol();
    InitDxhGridChatGptRol();
}

//Toolbar
function InitDhxToolbarChatGptRol() {

    //Load DhcToolbar Config
    GetDhxToolbarChatGptRol();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarChatGptRol.removeItem("new");
    }

    //Add Space
    dhxToolbarChatGptRol.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarChatGptRol.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormChatGptRol();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteChatGptRol();

                break;
            case "reload":
                ReInitPaging(paginationChatGptRol, 'ChatGptRol');
                reloadGrid(dhxLayout, dhxGridChatGptRol, UrlChatGptRol(), 'ChatGptRol', paginationChatGptRol);
                break;
            case "print":
                dhxGridChatGptRol.printView();
                break;
            case "copyClipboard":
                dhxGridChatGptRol.setCSVDelimiter("t");
                dhxGridChatGptRol.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridChatGptRol, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridChatGptRol, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportChatGptRol('csv');
                //exportToFile(dxhGridChatGptRol, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarChatGptRol() {
    dhxToolbarChatGptRol = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('ChatGptRol', false) }
        ],
        onload: function () {

            $('#frmSearchChatGptRol').parent().css('textAlign', 'right');
            $('#frmSearchChatGptRol').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchChatGptRol').closest('.dhx_toolbar_ChatGptRol').css('overflow', 'visible');

            $('#frmSearchChatGptRol').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationChatGptRol, 'ChatGptRol');
                strSearchChatGptRol = $('#inputSearchChatGptRol').val();
                reloadGrid(dhxLayout, dhxGridChatGptRol, UrlChatGptRol(1, strSearchChatGptRol), 'ChatGptRol', paginationChatGptRol);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridChatGptRol() {

    //dhxLayout - StatusBar
    dhxStatusBarChatGptRol = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('ChatGptRol')
    });

    dhxGridChatGptRol = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridChatGptRol, 'ChatGptRol');
    dhxGridChatGptRol.parse(GetDhxGridConfChatGptRol(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridChatGptRol);
    //Set columns header show/hide function
    setColHeader(dhxGridChatGptRol);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridChatGptRol.setColumnHidden(1, true);

    //onRowSelect
    dhxGridChatGptRol.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridChatGptRol.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormChatGptRol(rId);
    });

    //Default Events
    dhxGridChatGptRol.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlChatGptRol() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridChatGptRol.load(UrlChatGptRol(), function () {

        ReInitPaging(paginationChatGptRol, 'ChatGptRol');

        var paginParameter = dhxGridChatGptRol.UserData.gridglobaluserdata.values[4].paginParams;

        paginationChatGptRol = initPaging(
            dhxLayout,
            dhxGridChatGptRol,
            'ChatGptRol',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#ChatGptRolChk').on('change', function () {

        if (this.checked)
            dhxGridChatGptRol.setCheckedRows(0, 1);
        else
            dhxGridChatGptRol.setCheckedRows(0, 0);
    });

    $('#PageSizeChatGptRol').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationChatGptRol, 'ChatGptRol');
        reloadGrid(dhxLayout, dhxGridChatGptRol, UrlChatGptRol(1, null, sizeGrid), 'ChatGptRol', paginationChatGptRol);

        $('#PageSizeChatGptRol').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfChatGptRol() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ChatGptRolChk"/><label for="ChatGptRolChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'Name', width: 500, type: 'ron', align: 'left', sort: 'str', value: 'Name', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - ChatGptRol
function OpenFormChatGptRol(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormChatGptRol).html("ChatGptRol");
    $ModalFormChatGptRol.modal("show");

    if (rId)
        loadChatGptRol(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - ChatGptRol
function initModalFormChatGptRol() {

    //Button Save-ChatGptRol
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormChatGptRol).on('click', function (event) {
        submitFormChatGptRol();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormChatGptRol).on('click', function (event) {
        hideFormAlert($AlertFormChatGptRol);
        clearForm($FormChatGptRol);
    });

    //Modal-ChatGptRol
    $ModalFormChatGptRol.on('hidden.bs.modal', function () {
        clearForm($FormChatGptRol);
    });

    //Enter key Naviation
    enterFormNavigation($FormChatGptRol);
}
//Form - ChatGptRol
async function submitFormChatGptRol() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormChatGptRol.valid()) {

        var formData = formToJsonString(document.getElementById($FormChatGptRol.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormChatGptRol, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseChatGptRol + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var entrydate = moment(response.Data.entryDate).format('MM/DD/YY HH:mm');

                if (response.Action === "ADD") {
                    dhxGridChatGptRol.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.name,
                            active,
                            ''],
                        0);
                }
                else {

                    dhxGridChatGptRol.cells(response.Data.id, dhxGridChatGptRol.getColIndexById("chk")).setValue(0);
                    dhxGridChatGptRol.cells(response.Data.id, dhxGridChatGptRol.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridChatGptRol.cells(response.Data.id, dhxGridChatGptRol.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridChatGptRol.cells(response.Data.id, dhxGridChatGptRol.getColIndexById("Active")).setValue(active);
                    dhxGridChatGptRol.cells(response.Data.id, dhxGridChatGptRol.getColIndexById("Dummy")).setValue('');
                }

                dhxGridChatGptRol.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormChatGptRol, response.Errors);

        disableAll($FormChatGptRol, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - ChatGptRol
function loadChatGptRol(rId) {

    clearForm($FormChatGptRol);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridChatGptRol.cells(rId, dhxGridChatGptRol.getColIndexById("Id")).getValue();
        var name = dhxGridChatGptRol.cells(rId, dhxGridChatGptRol.getColIndexById("Name")).getValue();
        var active = dhxGridChatGptRol.cells(rId, dhxGridChatGptRol.getColIndexById("Active")).getValue();

        $('#Id', $FormChatGptRol).val(id);
        $('#Name', $FormChatGptRol).val(name);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormChatGptRol).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - ChatGptRol
async function deleteChatGptRol() {

    var ChatGptRolId = dhxGridChatGptRol.getSelectedRowId();

    var rIds = [];

    dhxGridChatGptRol.forEachRow(function (id) {
        if (dhxGridChatGptRol.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseChatGptRol + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridChatGptRol.deleteRow(response.Data.deleted[i]);
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
