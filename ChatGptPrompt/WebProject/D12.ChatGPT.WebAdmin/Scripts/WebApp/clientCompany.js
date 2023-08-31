//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - ClientCompany
var $ModalFormClientCompany = $("#ModalClientCompany");
var $FormClientCompany = $("#FormClientCompany");
var $AlertFormClientCompany = $('#AlertFormClientCompany');

//DhxLayoutCell - ClientCompany
var dhxToolbarClientCompany;
let lastSelectedRowId = 0;
let loadingClientCompany = false;
var dhxGridClientCompany;
var dhxStatusBarClientCompany;
var paginationClientCompany = null;
var pageNumberClientCompany = 1;
var pageSizeClientCompany = 100;
var strSearchClientCompany = '';

//Modals Forms - ClientBusinessOffer
var $ModalFormClientBusinessOffer = $("#ModalClientBusinessOffer");
var $FormClientBusinessOffer = $("#FormClientBusinessOffer");
var $AlertFormClientBusinessOffer = $('#AlertFormClientBusinessOffer');

//DhxLayoutCell - ClientBusinessOffer
var dhxToolbarClientBusinessOffer;
var dhxGridClientBusinessOffer;
var dhxStatusBarClientBusinessOffer;
var paginationClientBusinessOffer = null;
var pageNumberClientBusinessOffer = 1;
var pageSizeClientBusinessOffer = 100;
var strSearchClientBusinessOffer = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'ClientCompany':
            return UrlClientCompany(pageNum);
        case 'ClientBusinessOffer':
            return UrlClientBusinessOffer(pageNum);
    }
}

//URL - ClientCompany
var urlBaseClientCompany = 'Clients/Companies/';
function UrlClientCompany(newPage, newSearch, newPageSize) {

    pageNumberClientCompany = newPage || pageNumberClientCompany;
    strSearchClientCompany = newSearch || strSearchClientCompany;
    pageSizeClientCompany = newPageSize || pageSizeClientCompany;

    return rootPath + urlBaseClientCompany + "All?PageNumber=" + pageNumberClientCompany + "&PageSize=" + pageSizeClientCompany + "&search=" + strSearchClientCompany;
}
function UrlExportClientCompany(format) {
    url = rootPath + urlBaseClientCompany + "ExportData?PageNumber=" + pageNumberClientCompany + "&PageSize=" + pageSizeClientCompany + "&strSearch=" + strSearchClientCompany + "&format=" + format + "&area=ClientCompany";
    window.location.replace(url);
}

//URL - ClientBusinessOffer
var urlBaseClientBusinessOffer = 'ClientBusinessOffer/';
function UrlClientBusinessOffer(newPage, newSearch, newPageSize) {

    pageNumberClientCompany = newPage || pageNumberClientCompany;
    strSearchClientCompany = newSearch || strSearchClientCompany;
    pageSizeClientCompany = newPageSize || pageSizeClientCompany;

    var companyId = dhxGridClientCompany.getSelectedRowId();

    return rootPath + urlBaseClientBusinessOffer + "All?companyId=" + companyId +"&PageNumber=" + pageNumberClientCompany + "&PageSize=" + pageSizeClientCompany + "&search=" + strSearchClientCompany;
}
function UrlExportClientBusinessOffer(format) {
    url = rootPath + urlBaseClientBusinessOffer + "ExportData?PageNumber=" + pageNumberClientCompany + "&PageSize=" + pageSizeClientCompany + "&strSearch=" + strSearchClientCompany + "&format=" + format + "&area=ClientCompany";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormClientCompany();
    initModalFormClientBusinessOffer();
}
function onResize() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 165);
}

//Init DhxLayout 
function initLayout() {

    //Attach Layout
    dhxLayout = new dhtmlXLayoutObject({
        pattern: '2U',
        parent: 'MainContainer',
        offsets: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        cells: [
            { id: 'a', text: 'Companies', header: true, fix_size: [false, false] },
            { id: 'b', text: 'Business Offer', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setAutoSize("a;b");
    dhxLayout.cells('a').setWidth('70%');

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxClientCompany();
}

//Grid box
function InitBoxClientCompany() {
    InitDhxToolbarClientCompany();
    InitDxhGridClientCompany();

    InitDhxToolbarClientBusinessOffer();
    InitDxhGridClientBusinessOffer();
}

//Toolbar
function InitDhxToolbarClientCompany() {

    //Load DhcToolbar Config
    GetDhxToolbarClientCompany();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarClientCompany.removeItem("new");
    }

    //Add Space
    dhxToolbarClientCompany.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarClientCompany.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormClientCompany();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteClientCompany();

                break;
            case "reload":
                lastSelectedRowId = 0;
                dhxGridClientBusinessOffer.clearAll();
                ReInitPaging(paginationClientCompany, 'ClientCompany');
                reloadGrid(dhxLayout, dhxGridClientCompany, UrlClientCompany(), 'ClientCompany', paginationClientCompany);
                break;
            case "print":
                dhxGridClientCompany.printView();
                break;
            case "copyClipboard":
                dhxGridClientCompany.setCSVDelimiter("t");
                dhxGridClientCompany.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridClientCompany, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridClientCompany, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportClientCompany('csv');
                //exportToFile(dxhGridClientCompany, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}
function InitDhxToolbarClientBusinessOffer() {

    //Load DhcToolbar Config
    GetDhxToolbarClientBusinessOffer();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarClientBusinessOffer.removeItem("new");
    }

    //Add Space
    dhxToolbarClientBusinessOffer.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarClientBusinessOffer.attachEvent("onClick", function (id) {

        var companyId = dhxGridClientCompany.getSelectedRowId();


        if (IsNull(companyId)) {
            swal("Action Required", "To continue, you must select one Company.", "info");

        } else {
            switch (id) {
                case "new":

                    if (!isReadOnly) 
                        OpenFormClientBusinessOffer();

                    break;
                case "delete":

                    if (!isReadOnly)
                        deleteClientBusinessOffer();

                    break;
                case "reload":
                    ReInitPaging(paginationClientBusinessOffer, 'ClientBusinessOffer');
                    reloadGrid(dhxLayout, dhxGridClientBusinessOffer, UrlClientBusinessOffer(), 'ClientBusinessOffer', paginationClientBusinessOffer);
                    break;
                case "print":
                    dhxGridClientBusinessOffer.printView();
                    break;
                case "copyClipboard":
                    dhxGridClientBusinessOffer.setCSVDelimiter("t");
                    dhxGridClientBusinessOffer.copyBlockToClipboard();
                    break;
                case "copyExcel":
                    copyData(dhxGridClientBusinessOffer, DataFormat.Excel);
                    break;
                case "copyCSV":
                    copyData(dhxGridClientBusinessOffer, DataFormat.CSV);
                    break;
                case "saveCSV":
                    UrlExportClientBusinessOffer('csv');
                    //exportToFile(dxhGridClientBusinessOffer, "csvFileName", DataFormat.CSV);
                    break;
            }
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarClientCompany() {
    dhxToolbarClientCompany = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('ClientCompany', false) }
        ],
        onload: function () {

            $('#frmSearchClientCompany').parent().css('textAlign', 'right');
            $('#frmSearchClientCompany').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchClientCompany').closest('.dhx_toolbar_ClientCompany').css('overflow', 'visible');

            $('#frmSearchClientCompany').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationClientCompany, 'ClientCompany');
                strSearchClientCompany = $('#inputSearchClientCompany').val();
                reloadGrid(dhxLayout, dhxGridClientCompany, UrlClientCompany(1, strSearchClientCompany), 'ClientCompany', paginationClientCompany);
            });
        }
    });
}
function GetDhxToolbarClientBusinessOffer() {
    dhxToolbarClientBusinessOffer = dhxLayout.cells('b').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('ClientBusinessOffer', false) }
        ],
        onload: function () {

            $('#frmSearchClientCompany').parent().css('textAlign', 'right');
            $('#frmSearchClientCompany').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchClientCompany').closest('.dhx_toolbar_ClientCompany').css('overflow', 'visible');

            $('#frmSearchClientCompany').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationClientCompany, 'ClientCompany');
                strSearchClientCompany = $('#inputSearchClientCompany').val();
                reloadGrid(dhxLayout, dhxGridClientCompany, UrlClientCompany(1, strSearchClientCompany), 'ClientCompany', paginationClientCompany);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridClientCompany() {

    //dhxLayout - StatusBar
    dhxStatusBarClientCompany = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('ClientCompany')
    });

    dhxGridClientCompany = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridClientCompany, 'ClientCompany');
    dhxGridClientCompany.parse(GetDhxGridConfClientCompany(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridClientCompany);
    //Set columns header show/hide function
    setColHeader(dhxGridClientCompany);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridClientCompany.setColumnHidden(1, true);

    dhxGridClientCompany.attachEvent("onBeforeSelect", function (rId, cInd) {
        if (!loadingClientCompany)
            return true;
    });

    //onRowSelect
    dhxGridClientCompany.attachEvent("onRowSelect", function (rId, cInd) {
        if (lastSelectedRowId === 0 || lastSelectedRowId !== rId) {
            dhxGridClientBusinessOffer.clearAll();
            lastSelectedRowId = dhxGridClientCompany.getSelectedRowId();
            reloadGrid(dhxLayout, dhxGridClientBusinessOffer, UrlClientBusinessOffer(), 'ClientBusinessOffer', paginationClientBusinessOffer);
        }
    });

    //OnDoubleClick
    dhxGridClientCompany.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormClientCompany(rId);
    });

    //Default Events
    dhxGridClientCompany.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlClientCompany() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridClientCompany.load(UrlClientCompany(), function () {

        ReInitPaging(paginationClientCompany, 'ClientCompany');

        var paginParameter = dhxGridClientCompany.UserData.gridglobaluserdata.values[4].paginParams;

        paginationClientCompany = initPaging(
            dhxLayout,
            dhxGridClientCompany,
            'ClientCompany',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#ClientCompanyChk').on('change', function () {

        if (this.checked)
            dhxGridClientCompany.setCheckedRows(0, 1);
        else
            dhxGridClientCompany.setCheckedRows(0, 0);
    });

    $('#PageSizeClientCompany').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationClientCompany, 'ClientCompany');
        reloadGrid(dhxLayout, dhxGridClientCompany, UrlClientCompany(1, null, sizeGrid), 'ClientCompany', paginationClientCompany);

        $('#PageSizeClientCompany').val(sizeGrid);
    });
}
function InitDxhGridClientBusinessOffer() {

    //dhxLayout - StatusBar
    dhxStatusBarClientBusinessOffer = dhxLayout.cells('b').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('ClientBusinessOffer')
    });

    dhxGridClientBusinessOffer = dhxLayout.cells("b").attachGrid();
    initGrid(dhxGridClientBusinessOffer, 'ClientBusinessOffer');
    dhxGridClientBusinessOffer.parse(GetDhxGridConfClientBusinessOffer(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridClientBusinessOffer);
    //Set columns header show/hide function
    setColHeader(dhxGridClientBusinessOffer);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridClientBusinessOffer.setColumnHidden(1, true);

    //onRowSelect
    dhxGridClientBusinessOffer.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridClientBusinessOffer.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormClientBusinessOffer(rId);
    });

    //Default Events
    dhxGridClientBusinessOffer.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlClientBusinessOffer() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });


    $('#ClientBusinessOfferChk').on('change', function () {

        if (this.checked)
            dhxGridClientBusinessOffer.setCheckedRows(0, 1);
        else
            dhxGridClientBusinessOffer.setCheckedRows(0, 0);
    });

    $('#PageSizeClientBusinessOffer').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationClientBusinessOffer, 'ClientBusinessOffer');
        reloadGrid(dhxLayout, dhxGridClientBusinessOffer, UrlClientBusinessOffer(1, null, sizeGrid), 'ClientBusinessOffer', paginationClientBusinessOffer);

        $('#PageSizeClientBusinessOffer').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfClientCompany() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ClientCompanyChk"/><label for="ClientCompanyChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'ClientId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'ClientId', hidden: 'true' },
            { id: 'ClientName', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Client', hidden: 'false' },
            { id: 'Name', width: 250, type: 'ron', align: 'left', sort: 'str', value: 'Company', hidden: 'false' },
            { id: 'Industry', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Industry', hidden: 'false' },
            { id: 'Activity', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Activity', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'EntryDate', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Entry Date', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}
function GetDhxGridConfClientBusinessOffer() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ClientBusinessOfferChk"/><label for="ClientBusinessOfferChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'CompanyId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'CompanyId', hidden: 'true' },
            { id: 'OfferTypeId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'OfferTypeId', hidden: 'true' },
            { id: 'CompanyName', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Company', hidden: 'true' },
            { id: 'OfferTypeName', width: 100, type: 'ron', align: 'left', sort: 'str', value: 'Offer Type', hidden: 'false' },
            { id: 'Name', width: 300, type: 'ron', align: 'left', sort: 'str', value: 'Product/Services Name', hidden: 'false' },
            { id: 'Description', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Description', hidden: 'false' },
            { id: 'Characteristics', width: 200, type: 'ron', align: 'left', sort: 'str', value: 'Characteristics', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'EntryDate', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Entry Date', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - ClientCompany
function OpenFormClientCompany(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormClientCompany).html("Company");
    $ModalFormClientCompany.modal("show");

    if (rId)
        loadClientCompany(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - ClientCompany
function initModalFormClientCompany() {

    //Button Save-ClientCompany
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormClientCompany).on('click', function (event) {
        submitFormClientCompany();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormClientCompany).on('click', function (event) {
        hideFormAlert($AlertFormClientCompany);
        clearForm($FormClientCompany);
    });

    //Modal-ClientCompany
    $ModalFormClientCompany.on('hidden.bs.modal', function () {
        clearForm($FormClientCompany);
    });

    //Enter key Naviation
    enterFormNavigation($FormClientCompany);
}
//Form - ClientCompany
async function submitFormClientCompany() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormClientCompany.valid()) {

        var formData = formToJsonString(document.getElementById($FormClientCompany.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormClientCompany, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseClientCompany + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var entrydate = moment(response.Data.entryDate).format('MM/DD/YY HH:mm');

                if (response.Action === "ADD") {
                    dhxGridClientCompany.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.clientId,
                            response.Data.clientName,
                            response.Data.name,
                            response.Data.industry,
                            response.Data.activity,
                            active,
                            entrydate,
                            ''],
                        0);
                }
                else {

                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("chk")).setValue(0);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("ClientId")).setValue(response.Data.clientId);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("ClientName")).setValue(response.Data.clientName);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("Industry")).setValue(response.Data.industry);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("Activity")).setValue(response.Data.activity);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("Active")).setValue(active);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("EntryDate")).setValue(entrydate);
                    dhxGridClientCompany.cells(response.Data.id, dhxGridClientCompany.getColIndexById("Dummy")).setValue('');
                }

                dhxGridClientCompany.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormClientCompany, response.Errors);

        disableAll($FormClientCompany, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - ClientCompany
function loadClientCompany(rId) {

    clearForm($FormClientCompany);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("Id")).getValue();
        var clientId = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("ClientId")).getValue();
        var clientName = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("ClientName")).getValue();
        var name = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("Name")).getValue();
        var industry = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("Industry")).getValue();
        var activity = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("Activity")).getValue();
        var active = dhxGridClientCompany.cells(rId, dhxGridClientCompany.getColIndexById("Active")).getValue();

        $('#Id', $FormClientCompany).val(id);
        $('#ClientId', $FormClientCompany).selectpicker('val',clientId);
        $('#ClientName', $FormClientCompany).val(clientName);
        $('#Name', $FormClientCompany).val(name);
        $('#Industry', $FormClientCompany).val(industry);
        $('#Activity', $FormClientCompany).val(activity);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormClientCompany).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - ClientCompany
async function deleteClientCompany() {

    var ClientCompanyId = dhxGridClientCompany.getSelectedRowId();

    var rIds = [];

    dhxGridClientCompany.forEachRow(function (id) {
        if (dhxGridClientCompany.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseClientCompany + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridClientCompany.deleteRow(response.Data.deleted[i]);
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

//Modal - ClientBusinessOffer
function OpenFormClientBusinessOffer(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormClientBusinessOffer).html("Business Offer");
    $ModalFormClientBusinessOffer.modal("show");

    if (rId) {
        loadClientBusinessOffer(rId);
    }
    else {
        $('#modal-loading').fadeOut();
        var companyId = dhxGridClientCompany.getSelectedRowId();
        $('#CompanyId', $FormClientBusinessOffer).val(companyId);
    }
}
//Modal Buttons - ClientBusinessOffer
function initModalFormClientBusinessOffer() {

    //Button Save-ClientBusinessOffer
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormClientBusinessOffer).on('click', function (event) {
        submitFormClientBusinessOffer();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormClientBusinessOffer).on('click', function (event) {
        hideFormAlert($AlertFormClientBusinessOffer);
        clearForm($FormClientBusinessOffer);
    });

    //Modal-ClientBusinessOffer
    $ModalFormClientBusinessOffer.on('hidden.bs.modal', function () {
        clearForm($FormClientBusinessOffer);
    });

    //Enter key Naviation
    enterFormNavigation($FormClientBusinessOffer);
}
//Form - ClientBusinessOffer
async function submitFormClientBusinessOffer() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormClientBusinessOffer.valid()) {

        var formData = formToJsonString(document.getElementById($FormClientBusinessOffer.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormClientBusinessOffer, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseClientBusinessOffer + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var entrydate = moment(response.Data.entryDate).format('MM/DD/YY HH:mm');

                if (response.Action === "ADD") {
                    dhxGridClientBusinessOffer.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.companyId,
                            response.Data.offerTypeId,
                            response.Data.companyName,
                            response.Data.offerTypeName,
                            response.Data.name,
                            response.Data.description,
                            response.Data.characteristics,
                            active,
                            entrydate,
                            ''],
                        0);
                }
                else {

                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("chk")).setValue(0);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("CompanyId")).setValue(response.Data.companyId);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("OfferTypeId")).setValue(response.Data.offerTypeId);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("CompanyName")).setValue(response.Data.companyName);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("OfferTypeName")).setValue(response.Data.offerTypeName);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("Description")).setValue(response.Data.description);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("Characteristics")).setValue(response.Data.characteristics);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("Active")).setValue(active);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("EntryDate")).setValue(entrydate);
                    dhxGridClientBusinessOffer.cells(response.Data.id, dhxGridClientBusinessOffer.getColIndexById("Dummy")).setValue('');
                }

                dhxGridClientBusinessOffer.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormClientBusinessOffer, response.Errors);

        disableAll($FormClientBusinessOffer, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - ClientBusinessOffer
function loadClientBusinessOffer(rId) {

    clearForm($FormClientBusinessOffer);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("Id")).getValue();
        var companyId = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("CompanyId")).getValue();
        var offerTypeId = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("OfferTypeId")).getValue();
        var name = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("Name")).getValue();
        var description = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("Description")).getValue();
        var characteristics = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("Characteristics")).getValue();
        var active = dhxGridClientBusinessOffer.cells(rId, dhxGridClientBusinessOffer.getColIndexById("Active")).getValue();

        $('#Id', $FormClientBusinessOffer).val(id);
        $('#CompanyId', $FormClientBusinessOffer).val(companyId);
        $('#OfferTypeId', $FormClientBusinessOffer).selectpicker('val',offerTypeId);
        $('#Name', $FormClientBusinessOffer).val(name);
        $('#Description', $FormClientBusinessOffer).val(description);
        $('#Characteristics', $FormClientBusinessOffer).val(characteristics);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormClientBusinessOffer).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - ClientBusinessOffer
async function deleteClientBusinessOffer() {

    var ClientBusinessOfferId = dhxGridClientBusinessOffer.getSelectedRowId();

    var rIds = [];

    dhxGridClientBusinessOffer.forEachRow(function (id) {
        if (dhxGridClientBusinessOffer.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseClientBusinessOffer + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridClientBusinessOffer.deleteRow(response.Data.deleted[i]);
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
