//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - Language
var $ModalFormLanguage = $("#ModalLanguage");
var $FormLanguage = $("#FormLanguage");
var $AlertFormLanguage = $('#AlertFormLanguage');


//DhxLayoutCell - Language
var dhxToolbarLanguage;
var dhxGridLanguage;
var dhxStatusBarLanguage;
var paginationLanguage = null;
var pageNumberLanguage = 1;
var pageSizeLanguage = 100;
var strSearchLanguage = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'Language':
            return UrlLanguage(pageNum);
    }
}

//URL - Language
var urlBaseLanguage = 'PromptOptions/Language/';
function UrlLanguage(newPage, newSearch, newPageSize) {

    pageNumberLanguage = newPage || pageNumberLanguage;
    strSearchLanguage = newSearch || strSearchLanguage;
    pageSizeLanguage = newPageSize || pageSizeLanguage;

    return rootPath + urlBaseLanguage + "All?PageNumber=" + pageNumberLanguage + "&PageSize=" + pageSizeLanguage + "&search=" + strSearchLanguage;
}
function UrlExportLanguage(format) {
    url = rootPath + urlBaseLanguage + "ExportData?PageNumber=" + pageNumberLanguage + "&PageSize=" + pageSizeLanguage + "&strSearch=" + strSearchLanguage + "&format=" + format + "&area=Language";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormLanguage();
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
            { id: 'a', text: 'Language', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxLanguage();
}

//Grid box
function InitBoxLanguage() {
    InitDhxToolbarLanguage();
    InitDxhGridLanguage();
}

//Toolbar
function InitDhxToolbarLanguage() {

    //Load DhcToolbar Config
    GetDhxToolbarLanguage();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarLanguage.removeItem("new");
    }

    //Add Space
    dhxToolbarLanguage.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarLanguage.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormLanguage();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteLanguage();

                break;
            case "reload":
                ReInitPaging(paginationLanguage, 'Language');
                reloadGrid(dhxLayout, dhxGridLanguage, UrlLanguage(), 'Language', paginationLanguage);
                break;
            case "print":
                dhxGridLanguage.printView();
                break;
            case "copyClipboard":
                dhxGridLanguage.setCSVDelimiter("t");
                dhxGridLanguage.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridLanguage, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridLanguage, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportLanguage('csv');
                //exportToFile(dxhGridLanguage, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarLanguage() {
    dhxToolbarLanguage = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('Language', false) }
        ],
        onload: function () {

            $('#frmSearchLanguage').parent().css('textAlign', 'right');
            $('#frmSearchLanguage').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchLanguage').closest('.dhx_toolbar_Language').css('overflow', 'visible');

            $('#frmSearchLanguage').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationLanguage, 'Language');
                strSearchLanguage = $('#inputSearchLanguage').val();
                reloadGrid(dhxLayout, dhxGridLanguage, UrlLanguage(1, strSearchLanguage), 'Language', paginationLanguage);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridLanguage() {

    //dhxLayout - StatusBar
    dhxStatusBarLanguage = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('Language')
    });

    dhxGridLanguage = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridLanguage, 'Language');
    dhxGridLanguage.parse(GetDhxGridConfLanguage(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridLanguage);
    //Set columns header show/hide function
    setColHeader(dhxGridLanguage);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridLanguage.setColumnHidden(1, true);

    //onRowSelect
    dhxGridLanguage.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridLanguage.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormLanguage(rId);
    });

    //Default Events
    dhxGridLanguage.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlLanguage() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridLanguage.load(UrlLanguage(), function () {

        ReInitPaging(paginationLanguage, 'Language');

        var paginParameter = dhxGridLanguage.UserData.gridglobaluserdata.values[4].paginParams;

        paginationLanguage = initPaging(
            dhxLayout,
            dhxGridLanguage,
            'Language',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#LanguageChk').on('change', function () {

        if (this.checked)
            dhxGridLanguage.setCheckedRows(0, 1);
        else
            dhxGridLanguage.setCheckedRows(0, 0);
    });

    $('#PageSizeLanguage').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationLanguage, 'Language');
        reloadGrid(dhxLayout, dhxGridLanguage, UrlLanguage(1, null, sizeGrid), 'Language', paginationLanguage);

        $('#PageSizeLanguage').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfLanguage() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="LanguageChk"/><label for="LanguageChk"></label></div>', hidden: 'false' },
            { id: 'Code', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Code', hidden: 'false' },
            { id: 'Label', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Label', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - Language
function OpenFormLanguage(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormLanguage).html("Language");
    $ModalFormLanguage.modal("show");

    if (rId)
        loadLanguage(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - Language
function initModalFormLanguage() {

    //Button Save-Language
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormLanguage).on('click', function (event) {
        submitFormLanguage();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormLanguage).on('click', function (event) {
        hideFormAlert($AlertFormLanguage);
        clearForm($FormLanguage);
    });

    //Modal-Language
    $ModalFormLanguage.on('hidden.bs.modal', function () {
        clearForm($FormLanguage);
    });

    //Enter key Naviation
    enterFormNavigation($FormLanguage);
}
//Form - Language
async function submitFormLanguage() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormLanguage.valid()) {

        var formData = formToJsonString(document.getElementById($FormLanguage.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormLanguage, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseLanguage + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.code);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                if (response.Action === "ADD") {
                    dhxGridLanguage.addRow(response.Data.code,
                        [0,
                            response.Data.code,
                            response.Data.label,
                            active,
                            ''],
                        0);
                }
                else {

                    dhxGridLanguage.cells(response.Data.code, dhxGridLanguage.getColIndexById("chk")).setValue(0);
                    dhxGridLanguage.cells(response.Data.code, dhxGridLanguage.getColIndexById("Code")).setValue(response.Data.code);
                    dhxGridLanguage.cells(response.Data.code, dhxGridLanguage.getColIndexById("Label")).setValue(response.Data.label);
                    dhxGridLanguage.cells(response.Data.code, dhxGridLanguage.getColIndexById("Active")).setValue(active);
                    dhxGridLanguage.cells(response.Data.code, dhxGridLanguage.getColIndexById("Dummy")).setValue('');
                }

                dhxGridLanguage.selectRowById(response.Data.code, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormLanguage, response.Errors);

        disableAll($FormLanguage, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - Language
function loadLanguage(rCode) {

    clearForm($FormLanguage);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var code = dhxGridLanguage.cells(rCode, dhxGridLanguage.getColIndexById("Code")).getValue();
        var label = dhxGridLanguage.cells(rCode, dhxGridLanguage.getColIndexById("Label")).getValue();
        var active = dhxGridLanguage.cells(rCode, dhxGridLanguage.getColIndexById("Active")).getValue();

        $('#Code', $FormLanguage).val(code);
        $('#Label', $FormLanguage).val(label);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormLanguage).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - Language
async function deleteLanguage() {

    var codeLang = dhxGridLanguage.getSelectedRowId();

    var rCodes = [];

    dhxGridLanguage.forEachRow(function (code) {
        if (dhxGridLanguage.cells(code, 0).getValue() === "1")
            rCodes.push(code);
    });

    if (rCodes.length === 0) {
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

                var urlDelete = rootPath + urlBaseLanguage + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ codes: rCodes });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridLanguage.deleteRow(response.Data.deleted[i]);
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
