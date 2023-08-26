//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - SeoCampaign
var $ModalFormSeoCampaign = $("#ModalSeoCampaign");
var $FormSeoCampaign = $("#FormSeoCampaign");
var $AlertFormSeoCampaign = $('#AlertFormSeoCampaign');


//DhxLayoutCell - SeoCampaign
var dhxToolbarSeoCampaign;
var dhxGridSeoCampaign;
var dhxStatusBarSeoCampaign;
var paginationSeoCampaign = null;
var pageNumberSeoCampaign = 1;
var pageSizeSeoCampaign = 100;
var strSearchSeoCampaign = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'SeoCampaign':
            return UrlSeoCampaign(pageNum);
    }
}

//URL - SeoCampaign
var urlBaseSeoCampaign = 'SEOContent/Campaigns/';
function UrlSeoCampaign(newPage, newSearch, newPageSize) {

    pageNumberSeoCampaign = newPage || pageNumberSeoCampaign;
    strSearchSeoCampaign = newSearch || strSearchSeoCampaign;
    pageSizeSeoCampaign = newPageSize || pageSizeSeoCampaign;

    return rootPath + urlBaseSeoCampaign + "All?PageNumber=" + pageNumberSeoCampaign + "&PageSize=" + pageSizeSeoCampaign + "&search=" + strSearchSeoCampaign;
}
function UrlExportSeoCampaign(format) {
    url = rootPath + urlBaseSeoCampaign + "ExportData?PageNumber=" + pageNumberSeoCampaign + "&PageSize=" + pageSizeSeoCampaign + "&strSearch=" + strSearchSeoCampaign + "&format=" + format + "&area=SeoCampaign";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormSeoCampaign();
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
            { id: 'a', text: 'SeoCampaign', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxSeoCampaign();
}

//Grid box
function InitBoxSeoCampaign() {
    InitDhxToolbarSeoCampaign();
    InitDxhGridSeoCampaign();
}

//Toolbar
function InitDhxToolbarSeoCampaign() {

    //Load DhcToolbar Config
    GetDhxToolbarSeoCampaign();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarSeoCampaign.removeItem("new");
    }

    //Add Space
    dhxToolbarSeoCampaign.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarSeoCampaign.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormSeoCampaign();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteSeoCampaign();

                break;
            case "reload":
                ReInitPaging(paginationSeoCampaign, 'SeoCampaign');
                reloadGrid(dhxLayout, dhxGridSeoCampaign, UrlSeoCampaign(), 'SeoCampaign', paginationSeoCampaign);
                break;
            case "print":
                dhxGridSeoCampaign.printView();
                break;
            case "copyClipboard":
                dhxGridSeoCampaign.setCSVDelimiter("t");
                dhxGridSeoCampaign.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridSeoCampaign, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridSeoCampaign, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportSeoCampaign('csv');
                //exportToFile(dxhGridSeoCampaign, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarSeoCampaign() {
    dhxToolbarSeoCampaign = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('SeoCampaign', false) }
        ],
        onload: function () {

            $('#frmSearchSeoCampaign').parent().css('textAlign', 'right');
            $('#frmSearchSeoCampaign').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchSeoCampaign').closest('.dhx_toolbar_SeoCampaign').css('overflow', 'visible');

            $('#frmSearchSeoCampaign').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationSeoCampaign, 'SeoCampaign');
                strSearchSeoCampaign = $('#inputSearchSeoCampaign').val();
                reloadGrid(dhxLayout, dhxGridSeoCampaign, UrlSeoCampaign(1, strSearchSeoCampaign), 'SeoCampaign', paginationSeoCampaign);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridSeoCampaign() {

    //dhxLayout - StatusBar
    dhxStatusBarSeoCampaign = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('SeoCampaign')
    });

    dhxGridSeoCampaign = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridSeoCampaign, 'SeoCampaign');
    dhxGridSeoCampaign.parse(GetDhxGridConfSeoCampaign(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridSeoCampaign);
    //Set columns header show/hide function
    setColHeader(dhxGridSeoCampaign);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridSeoCampaign.setColumnHidden(1, true);

    //onRowSelect
    dhxGridSeoCampaign.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridSeoCampaign.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormSeoCampaign(rId);
    });

    //Default Events
    dhxGridSeoCampaign.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlSeoCampaign() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridSeoCampaign.load(UrlSeoCampaign(), function () {

        ReInitPaging(paginationSeoCampaign, 'SeoCampaign');

        var paginParameter = dhxGridSeoCampaign.UserData.gridglobaluserdata.values[4].paginParams;

        paginationSeoCampaign = initPaging(
            dhxLayout,
            dhxGridSeoCampaign,
            'SeoCampaign',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#SeoCampaignChk').on('change', function () {

        if (this.checked)
            dhxGridSeoCampaign.setCheckedRows(0, 1);
        else
            dhxGridSeoCampaign.setCheckedRows(0, 0);
    });

    $('#PageSizeSeoCampaign').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationSeoCampaign, 'SeoCampaign');
        reloadGrid(dhxLayout, dhxGridSeoCampaign, UrlSeoCampaign(1, null, sizeGrid), 'SeoCampaign', paginationSeoCampaign);

        $('#PageSizeSeoCampaign').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfSeoCampaign() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="SeoCampaignChk"/><label for="SeoCampaignChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'CompanyId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'CompanyId', hidden: 'true' },
            { id: 'BusinessOfferId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'BusinessOfferId', hidden: 'true' },
            { id: 'Company', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Company', hidden: 'false' },
            { id: 'BusinessOffer', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Business Offer', hidden: 'false' },
            { id: 'Name', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Campaign Name', hidden: 'false' },
            { id: 'Market', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Market', hidden: 'false' },
            { id: 'PrimaryKeyword', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Primary Keyword', hidden: 'false' },
            { id: 'Keywords', width: 400, type: 'ron', align: 'left', sort: 'str', value: 'Keywords', hidden: 'false' },
            { id: 'Description', width: 400, type: 'ron', align: 'left', sort: 'str', value: 'Description', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'EntryDate', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Entry Date', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - SeoCampaign
function OpenFormSeoCampaign(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormSeoCampaign).html("Seo Campaigns");
    $ModalFormSeoCampaign.modal("show");

    if (rId)
        loadSeoCampaign(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - SeoCampaign
function initModalFormSeoCampaign() {

    //Button Save-SeoCampaign
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormSeoCampaign).on('click', function (event) {
        submitFormSeoCampaign();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormSeoCampaign).on('click', function (event) {
        hideFormAlert($AlertFormSeoCampaign);
        clearForm($FormSeoCampaign);
        $('#BusinessOfferId').empty();
        $('#BusinessOfferId').selectpicker('refresh');
    });

    //Modal-SeoCampaign
    $ModalFormSeoCampaign.on('hidden.bs.modal', function () {
        clearForm($FormSeoCampaign);
        $('#BusinessOfferId').empty();
        $('#BusinessOfferId').selectpicker('refresh');
    });

    $('#CompanyId').on('changed.bs.select', async function (e, clickedIndex, isSelected, previousValue) {
        var companyId = $(this).val();
        await loadBusinessOfferList(companyId);
    });


    //Enter key Naviation
    enterFormNavigation($FormSeoCampaign);
}
//Form - SeoCampaign
async function submitFormSeoCampaign() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormSeoCampaign.valid()) {

        var formData = formToJsonString(document.getElementById($FormSeoCampaign.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormSeoCampaign, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseSeoCampaign + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var entrydate = moment(response.Data.entryDate).format('MM/DD/YY HH:mm');

                if (response.Action === "ADD") {
                    dhxGridSeoCampaign.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.companyId,
                            response.Data.businessOfferId,
                            response.Data.businessOffer,
                            response.Data.name,
                            response.Data.name,
                            response.Data.market,
                            response.Data.primaryKeyword,
                            response.Data.keywords,
                            response.Data.description,
                            active,
                            entrydate,
                            ''],
                        0);
                }
                else {

                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("chk")).setValue(0);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("CompanyId")).setValue(response.Data.companyId);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("BusinessOfferId")).setValue(response.Data.businessOfferId);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Company")).setValue(response.Data.company);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("BusinessOffer")).setValue(response.Data.businessOffer);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Market")).setValue(response.Data.market);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("PrimaryKeyword")).setValue(response.Data.primaryKeyword);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Keywords")).setValue(response.Data.keywords);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Description")).setValue(response.Data.description);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Active")).setValue(active);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("EntryDate")).setValue(entrydate);
                    dhxGridSeoCampaign.cells(response.Data.id, dhxGridSeoCampaign.getColIndexById("Dummy")).setValue('');
                }

                dhxGridSeoCampaign.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormSeoCampaign, response.Errors);

        disableAll($FormSeoCampaign, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - SeoCampaign
function loadSeoCampaign(rId) {

    clearForm($FormSeoCampaign);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("Id")).getValue();
        var companyId = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("CompanyId")).getValue();
        //var businessOfferId = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("BusinessOfferId")).getValue();
        var name = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("Name")).getValue();
        var market = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("Market")).getValue();
        var primaryKeyword = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("PrimaryKeyword")).getValue();
        var keywords = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("Keywords")).getValue();
        var description = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("Description")).getValue();
        var active = dhxGridSeoCampaign.cells(rId, dhxGridSeoCampaign.getColIndexById("Active")).getValue();

        $('#Id', $FormSeoCampaign).val(id);
        $('#CompanyId', $FormSeoCampaign).selectpicker('val', companyId);
        //$('#BusinessOfferId', $FormSeoCampaign).selectpicker('val', businessOfferId);
        $('#Name', $FormSeoCampaign).val(name);
        $('#Market', $FormSeoCampaign).val(market);
        $('#PrimaryKeyword', $FormSeoCampaign).val(primaryKeyword);
        $('#Keywords', $FormSeoCampaign).val(keywords);
        $('#Description', $FormSeoCampaign).val(description);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormSeoCampaign).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - SeoCampaign
async function deleteSeoCampaign() {

    var SeoCampaignId = dhxGridSeoCampaign.getSelectedRowId();

    var rIds = [];

    dhxGridSeoCampaign.forEachRow(function (id) {
        if (dhxGridSeoCampaign.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseSeoCampaign + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridSeoCampaign.deleteRow(response.Data.deleted[i]);
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

//Load Business Offer Select
async function loadBusinessOfferList(companyId) {

    if (!IsNullOrEmpty(companyId)) {

        // Start loading
        $('#modal-loading').fadeIn();

        var parameters = `companyId=${companyId}`;

        var response = await ajaxCall(rootPath + urlBaseSeoCampaign + 'GetBusinessOfferList?' + parameters, null, false, Method.GET, Datatype.Json, ContentType.Json);

        if (response.Result) {

            $('#BusinessOfferId').empty();

            if (!IsNull(response.Data)) {

                var businessOfferList = response.Data;

                if (businessOfferList.length > 0)
                    $('#BusinessOfferId').prop('disabled', false);

                //Filtro Tipo Periodo
                for (var i = 0; i < businessOfferList.length; i++) {
                    $('#BusinessOfferId').append('<option data-tokens="' + businessOfferList[i].text + '" value="' + businessOfferList[i].value + '">' + businessOfferList[i].text + '</option>');
                }

                $('#BusinessOfferId').selectpicker('refresh');

                var SeoCampaignId = dhxGridSeoCampaign.getSelectedRowId();
                if (businessOfferList.length > 0 && !IsNull(SeoCampaignId)) {
                    var businessOfferOpt = dhxGridSeoCampaign.cells(SeoCampaignId, dhxGridSeoCampaign.getColIndexById("BusinessOfferId")).getValue();

                    if (!IsNullOrEmpty(businessOfferOpt))
                        $('#BusinessOfferId', $FormSeoCampaign).selectpicker('val', businessOfferOpt);

                }
            }

        }

        //Set Progress On
        $('#modal-loading').fadeOut();
    }
}

