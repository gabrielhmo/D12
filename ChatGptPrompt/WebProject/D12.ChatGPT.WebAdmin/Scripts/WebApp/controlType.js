//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - ControlType
var $ModalFormControlType = $("#ModalControlType");
var $FormControlType = $("#FormControlType");
var $AlertFormControlType = $('#AlertFormControlType');


//DhxLayoutCell - ControlType
var dhxToolbarControlType;
var dhxGridControlType;
var dhxStatusBarControlType;
var paginationControlType = null;
var pageNumberControlType = 1;
var pageSizeControlType = 100;
var strSearchControlType = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'ControlType':
            return UrlControlType(pageNum);
    }
}

//URL - ControlType
var urlBaseControlType = 'PromptOptions/ControlType/';
function UrlControlType(newPage, newSearch, newPageSize) {

    pageNumberControlType = newPage || pageNumberControlType;
    strSearchControlType = newSearch || strSearchControlType;
    pageSizeControlType = newPageSize || pageSizeControlType;

    return rootPath + urlBaseControlType + "All?PageNumber=" + pageNumberControlType + "&PageSize=" + pageSizeControlType + "&search=" + strSearchControlType;
}
function UrlExportControlType(format) {
    url = rootPath + urlBaseControlType + "ExportData?PageNumber=" + pageNumberControlType + "&PageSize=" + pageSizeControlType + "&strSearch=" + strSearchControlType + "&format=" + format + "&area=ControlType";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormControlType();
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
            { id: 'a', text: 'ControlType', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxControlType();
}

//Grid box
function InitBoxControlType() {
    InitDhxToolbarControlType();
    InitDxhGridControlType();
}

//Toolbar
function InitDhxToolbarControlType() {

    //Load DhcToolbar Config
    GetDhxToolbarControlType();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarControlType.removeItem("new");
    }

    //Add Space
    dhxToolbarControlType.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarControlType.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormControlType();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteControlType();

                break;
            case "reload":
                ReInitPaging(paginationControlType, 'ControlType');
                reloadGrid(dhxLayout, dhxGridControlType, UrlControlType(), 'ControlType', paginationControlType);
                break;
            case "print":
                dhxGridControlType.printView();
                break;
            case "copyClipboard":
                dhxGridControlType.setCSVDelimiter("t");
                dhxGridControlType.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridControlType, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridControlType, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportControlType('csv');
                //exportToFile(dxhGridControlType, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarControlType() {
    dhxToolbarControlType = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('ControlType', false) }
        ],
        onload: function () {

            $('#frmSearchControlType').parent().css('textAlign', 'right');
            $('#frmSearchControlType').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchControlType').closest('.dhx_toolbar_ControlType').css('overflow', 'visible');

            $('#frmSearchControlType').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationControlType, 'ControlType');
                strSearchControlType = $('#inputSearchControlType').val();
                reloadGrid(dhxLayout, dhxGridControlType, UrlControlType(1, strSearchControlType), 'ControlType', paginationControlType);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridControlType() {

    //dhxLayout - StatusBar
    dhxStatusBarControlType = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('ControlType')
    });

    dhxGridControlType = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridControlType, 'ControlType');
    dhxGridControlType.parse(GetDhxGridConfControlType(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridControlType);
    //Set columns header show/hide function
    setColHeader(dhxGridControlType);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridControlType.setColumnHidden(1, true);

    //onRowSelect
    dhxGridControlType.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridControlType.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormControlType(rId);
    });

    //Default Events
    dhxGridControlType.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlControlType() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridControlType.load(UrlControlType(), function () {

        ReInitPaging(paginationControlType, 'ControlType');

        var paginParameter = dhxGridControlType.UserData.gridglobaluserdata.values[4].paginParams;

        paginationControlType = initPaging(
            dhxLayout,
            dhxGridControlType,
            'ControlType',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#ControlTypeChk').on('change', function () {

        if (this.checked)
            dhxGridControlType.setCheckedRows(0, 1);
        else
            dhxGridControlType.setCheckedRows(0, 0);
    });

    $('#PageSizeControlType').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationControlType, 'ControlType');
        reloadGrid(dhxLayout, dhxGridControlType, UrlControlType(1, null, sizeGrid), 'ControlType', paginationControlType);

        $('#PageSizeControlType').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfControlType() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ControlTypeChk"/><label for="ControlTypeChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'Label', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Label', hidden: 'false' },
            { id: 'Type', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Type', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - ControlType
function OpenFormControlType(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormControlType).html("ControlType");
    $ModalFormControlType.modal("show");

    if (rId)
        loadControlType(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - ControlType
function initModalFormControlType() {

    //Button Save-ControlType
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormControlType).on('click', function (event) {
        submitFormControlType();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormControlType).on('click', function (event) {
        hideFormAlert($AlertFormControlType);
        clearForm($FormControlType);
    });

    //Modal-ControlType
    $ModalFormControlType.on('hidden.bs.modal', function () {
        clearForm($FormControlType);
    });

    //Enter key Naviation
    enterFormNavigation($FormControlType);
}
//Form - ControlType
async function submitFormControlType() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormControlType.valid()) {

        var formData = formToJsonString(document.getElementById($FormControlType.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormControlType, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseControlType + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                if (response.Action === "ADD") {
                    dhxGridControlType.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.label,
                            response.Data.type,
                            active,
                            ''],
                        0);
                }
                else {

                    dhxGridControlType.cells(response.Data.id, dhxGridControlType.getColIndexById("chk")).setValue(0);
                    dhxGridControlType.cells(response.Data.id, dhxGridControlType.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridControlType.cells(response.Data.id, dhxGridControlType.getColIndexById("Label")).setValue(response.Data.label);
                    dhxGridControlType.cells(response.Data.id, dhxGridControlType.getColIndexById("Type")).setValue(response.Data.type);
                    dhxGridControlType.cells(response.Data.id, dhxGridControlType.getColIndexById("Active")).setValue(active);
                    dhxGridControlType.cells(response.Data.id, dhxGridControlType.getColIndexById("Dummy")).setValue('');
                }

                dhxGridControlType.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormControlType, response.Errors);

        disableAll($FormControlType, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - ControlType
function loadControlType(rId) {

    clearForm($FormControlType);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridControlType.cells(rId, dhxGridControlType.getColIndexById("Id")).getValue();
        var label = dhxGridControlType.cells(rId, dhxGridControlType.getColIndexById("Label")).getValue();
        var type = dhxGridControlType.cells(rId, dhxGridControlType.getColIndexById("Type")).getValue();
        var active = dhxGridControlType.cells(rId, dhxGridControlType.getColIndexById("Active")).getValue();

        $('#Id', $FormControlType).val(id);
        $('#Label', $FormControlType).val(label);
        $('#Type', $FormControlType).val(type);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormControlType).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - ControlType
async function deleteControlType() {

    var ControlTypeId = dhxGridControlType.getSelectedRowId();

    var rIds = [];

    dhxGridControlType.forEachRow(function (id) {
        if (dhxGridControlType.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseControlType + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridControlType.deleteRow(response.Data.deleted[i]);
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
