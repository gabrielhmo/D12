//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - Tenses
var $ModalFormTenses = $("#ModalTenses");
var $FormTenses = $("#FormTenses");
var $AlertFormTenses = $('#AlertFormTenses');


//DhxLayoutCell - Tenses
var dhxToolbarTenses;
var dhxGridTenses;
var dhxStatusBarTenses;
var paginationTenses = null;
var pageNumberTenses = 1;
var pageSizeTenses = 100;
var strSearchTenses = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'Tenses':
            return UrlTenses(pageNum);
    }
}

//URL - Tenses
var urlBaseTenses = 'PromptOptions/Tense/';
function UrlTenses(newPage, newSearch, newPageSize) {

    pageNumberTenses = newPage || pageNumberTenses;
    strSearchTenses = newSearch || strSearchTenses;
    pageSizeTenses = newPageSize || pageSizeTenses;

    return rootPath + urlBaseTenses + "All?PageNumber=" + pageNumberTenses + "&PageSize=" + pageSizeTenses + "&search=" + strSearchTenses;
}
function UrlExportTenses(format) {
    url = rootPath + urlBaseTenses + "ExportData?PageNumber=" + pageNumberTenses + "&PageSize=" + pageSizeTenses + "&strSearch=" + strSearchTenses + "&format=" + format + "&area=Tenses";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormTenses();
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
            { id: 'a', text: 'Tenses', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxTenses();
}

//Grid box
function InitBoxTenses() {
    InitDhxToolbarTenses();
    InitDxhGridTenses();
}

//Toolbar
function InitDhxToolbarTenses() {

    //Load DhcToolbar Config
    GetDhxToolbarTenses();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarTenses.removeItem("new");
    }

    //Add Space
    dhxToolbarTenses.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarTenses.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormTenses();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteTenses();

                break;
            case "reload":
                ReInitPaging(paginationTenses, 'Tenses');
                reloadGrid(dhxLayout, dhxGridTenses, UrlTenses(), 'Tenses', paginationTenses);
                break;
            case "print":
                dhxGridTenses.printView();
                break;
            case "copyClipboard":
                dhxGridTenses.setCSVDelimiter("t");
                dhxGridTenses.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridTenses, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridTenses, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportTenses('csv');
                //exportToFile(dxhGridTenses, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarTenses() {
    dhxToolbarTenses = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('Tenses', false) }
        ],
        onload: function () {

            $('#frmSearchTenses').parent().css('textAlign', 'right');
            $('#frmSearchTenses').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchTenses').closest('.dhx_toolbar_Tenses').css('overflow', 'visible');

            $('#frmSearchTenses').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationTenses, 'Tenses');
                strSearchTenses = $('#inputSearchTenses').val();
                reloadGrid(dhxLayout, dhxGridTenses, UrlTenses(1, strSearchTenses), 'Tenses', paginationTenses);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridTenses() {

    //dhxLayout - StatusBar
    dhxStatusBarTenses = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('Tenses')
    });

    dhxGridTenses = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridTenses, 'Tenses');
    dhxGridTenses.parse(GetDhxGridConfTenses(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridTenses);
    //Set columns header show/hide function
    setColHeader(dhxGridTenses);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridTenses.setColumnHidden(1, true);

    //onRowSelect
    dhxGridTenses.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridTenses.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormTenses(rId);
    });

    //Default Events
    dhxGridTenses.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlTenses() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridTenses.load(UrlTenses(), function () {

        ReInitPaging(paginationTenses, 'Tenses');

        var paginParameter = dhxGridTenses.UserData.gridglobaluserdata.values[4].paginParams;

        paginationTenses = initPaging(
            dhxLayout,
            dhxGridTenses,
            'Tenses',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#TensesChk').on('change', function () {

        if (this.checked)
            dhxGridTenses.setCheckedRows(0, 1);
        else
            dhxGridTenses.setCheckedRows(0, 0);
    });

    $('#PageSizeTenses').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationTenses, 'Tenses');
        reloadGrid(dhxLayout, dhxGridTenses, UrlTenses(1, null, sizeGrid), 'Tenses', paginationTenses);

        $('#PageSizeTenses').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfTenses() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="TensesChk"/><label for="TensesChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'Tense', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Tense', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - Tenses
function OpenFormTenses(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormTenses).html("Tenses");
    $ModalFormTenses.modal("show");

    if (rId)
        loadTenses(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - Tenses
function initModalFormTenses() {

    //Button Save-Tenses
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormTenses).on('click', function (event) {
        submitFormTenses();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormTenses).on('click', function (event) {
        hideFormAlert($AlertFormTenses);
        clearForm($FormTenses);
    });

    //Modal-Tenses
    $ModalFormTenses.on('hidden.bs.modal', function () {
        clearForm($FormTenses);
    });

    //Enter key Naviation
    enterFormNavigation($FormTenses);
}
//Form - Tenses
async function submitFormTenses() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormTenses.valid()) {

        var formData = formToJsonString(document.getElementById($FormTenses.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormTenses, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseTenses + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                if (response.Action === "ADD") {
                    dhxGridTenses.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.tense,
                            active,
                            ''],
                        0);
                }
                else {

                    dhxGridTenses.cells(response.Data.id, dhxGridTenses.getColIndexById("chk")).setValue(0);
                    dhxGridTenses.cells(response.Data.id, dhxGridTenses.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridTenses.cells(response.Data.id, dhxGridTenses.getColIndexById("Tense")).setValue(response.Data.tense);
                    dhxGridTenses.cells(response.Data.id, dhxGridTenses.getColIndexById("Active")).setValue(active);
                    dhxGridTenses.cells(response.Data.id, dhxGridTenses.getColIndexById("Dummy")).setValue('');
                }

                dhxGridTenses.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormTenses, response.Errors);

        disableAll($FormTenses, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - Tenses
function loadTenses(rId) {

    clearForm($FormTenses);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridTenses.cells(rId, dhxGridTenses.getColIndexById("Id")).getValue();
        var tense = dhxGridTenses.cells(rId, dhxGridTenses.getColIndexById("Tense")).getValue();
        var active = dhxGridTenses.cells(rId, dhxGridTenses.getColIndexById("Active")).getValue();

        $('#Id', $FormTenses).val(id);
        $('#Tense', $FormTenses).val(tense);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormTenses).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - Tenses
async function deleteTenses() {

    var TensesId = dhxGridTenses.getSelectedRowId();

    var rIds = [];

    dhxGridTenses.forEachRow(function (id) {
        if (dhxGridTenses.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseTenses + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridTenses.deleteRow(response.Data.deleted[i]);
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
