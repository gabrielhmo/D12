//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - ChatGptContext
var $ModalFormChatGptContext = $("#ModalChatGptContext");
var $FormChatGptContext = $("#FormChatGptContext");
var $AlertFormChatGptContext = $('#AlertFormChatGptContext');

var filterCampaignId;
var businessOfferInfo;

//DhxLayoutCell - ChatGptContext
var dhxToolbarChatGptContext;
var dhxGridChatGptContext;
var dhxStatusBarChatGptContext;
var paginationChatGptContext = null;
var pageNumberChatGptContext = 1;
var pageSizeChatGptContext = 100;
var strSearchChatGptContext = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'ChatGptContext':
            return UrlChatGptContext(pageNum);
    }
}

//URL - ChatGptContext
var urlBaseChatGptContext = 'SEOContent/GPTContext/';
function UrlChatGptContext(newPage, newSearch, newPageSize) {

    pageNumberChatGptContext = newPage || pageNumberChatGptContext;
    strSearchChatGptContext = newSearch || strSearchChatGptContext;
    pageSizeChatGptContext = newPageSize || pageSizeChatGptContext;

    return rootPath + urlBaseChatGptContext + "All?PageNumber=" + pageNumberChatGptContext + "&PageSize=" + pageSizeChatGptContext + "&campaignId=" + filterCampaignId;
}
function UrlExportChatGptContext(format) {
    url = rootPath + urlBaseChatGptContext + "ExportData?PageNumber=" + pageNumberChatGptContext + "&PageSize=" + pageSizeChatGptContext + "&strSearch=" + strSearchChatGptContext + "&format=" + format + "&area=ChatGptContext";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormChatGptContext();

    $("#ToneVoiceSelect").select2({
        dropdownParent: $('#ModalChatGptContext'),
        width: 'resolve'
    });

}
function onResize() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 200);
    filterCampaignId = localStorage.getItem('filterCampaignId');
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
            { id: 'a', text: 'ChatGptContext', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxChatGptContext();
}

//Grid box
function InitBoxChatGptContext() {
    InitDhxToolbarChatGptContext();
    InitDxhGridChatGptContext();

    loadCamapaignFilter();

    if ($('.selectpicker').length > 0) {
        $('.selectpicker').on('hide.bs.select', function () {
            $(this).trigger("focusout");
        });

        $('.selectpicker').selectpicker('refresh');

        $('#filterCampaign').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

            if (isNumeric($(this).val())) {

                localStorage.setItem('filterCampaignId', $(this).val());

                ReInitPaging(paginationChatGptContext, 'ChatGptContext');
                reloadGrid(dhxLayout, dhxGridChatGptContext, UrlChatGptContext(), 'ChatGptContext', paginationChatGptContext);
            }
            else {
                localStorage.setItem('filterCampaignId', '');
                dhxGridChatGptContext.clearAll();
                dhxLayout.cells('a').setText('ChatGPT Context');
            }

        });
    }
}

//Toolbar
function InitDhxToolbarChatGptContext() {

    //Load DhcToolbar Config
    GetDhxToolbarChatGptContext();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarChatGptContext.removeItem("new");
    }

    //Add Space
    dhxToolbarChatGptContext.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarChatGptContext.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormChatGptContext();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteChatGptContext();

                break;
            case "reload":
                ReInitPaging(paginationChatGptContext, 'ChatGptContext');
                reloadGrid(dhxLayout, dhxGridChatGptContext, UrlChatGptContext(), 'ChatGptContext', paginationChatGptContext);
                break;
            case "print":
                dhxGridChatGptContext.printView();
                break;
            case "copyClipboard":
                dhxGridChatGptContext.setCSVDelimiter("t");
                dhxGridChatGptContext.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridChatGptContext, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridChatGptContext, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportChatGptContext('csv');
                //exportToFile(dxhGridChatGptContext, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarChatGptContext() {
    dhxToolbarChatGptContext = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "filterCampaign", text: addToolbarBootstrapSelect({ id: 'filterCampaign', container: 'body', title: 'Select Campaign', width: '250', search: true }) }
        ],
        onload: function () {
        }
    });
}

//Init DhxGrid
function InitDxhGridChatGptContext() {

    //dhxLayout - StatusBar
    dhxStatusBarChatGptContext = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('ChatGptContext')
    });

    dhxGridChatGptContext = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridChatGptContext, 'ChatGptContext');
    dhxGridChatGptContext.parse(GetDhxGridConfChatGptContext(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridChatGptContext);
    //Set columns header show/hide function
    setColHeader(dhxGridChatGptContext);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridChatGptContext.setColumnHidden(1, true);

    //onRowSelect
    dhxGridChatGptContext.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridChatGptContext.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormChatGptContext(rId);
    });

    //Default Events
    dhxGridChatGptContext.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlChatGptContext() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    if (!IsNull(filterCampaignId)) {
        dhxGridChatGptContext.load(UrlChatGptContext(), function () {

            businessOfferInfo = dhxGridChatGptContext.UserData.gridglobaluserdata.values[2].businessOffer;
            var paginParameter = dhxGridChatGptContext.UserData.gridglobaluserdata.values[2].paginParams;

            getBusinessOffer();

            ReInitPaging(paginationChatGptContext, 'ChatGptContext');

            paginationChatGptContext = initPaging(
                dhxLayout,
                dhxGridChatGptContext,
                'ChatGptContext',
                paginParameter.totalRecords,
                paginParameter.pageSize,
                paginParameter.totalPages,
                paginParameter.pageNumber);

            dhxLayout.progressOff();
        }, 'json');
    }
    else {
        dhxLayout.progressOff();
    }

    $('#ChatGptContextChk').on('change', function () {

        if (this.checked)
            dhxGridChatGptContext.setCheckedRows(0, 1);
        else
            dhxGridChatGptContext.setCheckedRows(0, 0);
    });

    $('#PageSizeChatGptContext').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationChatGptContext, 'ChatGptContext');
        reloadGrid(dhxLayout, dhxGridChatGptContext, UrlChatGptContext(1, null, sizeGrid), 'ChatGptContext', paginationChatGptContext);

        $('#PageSizeChatGptContext').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfChatGptContext() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ChatGptContextChk"/><label for="ChatGptContextChk"></label></div>', hidden: 'false' },
            { id: 'ToneVoiceIds', width: 100, type: 'ro', align: 'left', sort: 'na', value: 'ToneVoiceIds', hidden: 'true' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'SeoCampaignId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'SeoCampaignId', hidden: 'true' },
            { id: 'ChatGPTRolId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'ChatGPTRolId', hidden: 'true' },
            { id: 'ControlTypeId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'ControlTypeId', hidden: 'true' },
            { id: 'LanguageCode', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'LanguageCode', hidden: 'true' },
            { id: 'TenseId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'TenseId', hidden: 'true' },
            { id: 'CampaignName', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Campaign', hidden: 'false' },
            { id: 'ChatGPTRol', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'ChatGPT Rol', hidden: 'false' },
            { id: 'ControlType', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Control Type', hidden: 'false' },
            { id: 'Language', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Language', hidden: 'false' },
            { id: 'Tense', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Tense', hidden: 'false' },
            { id: 'Name', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Name', hidden: 'false' },
            { id: 'Context', width: 300, type: 'ron', align: 'left', sort: 'str', value: 'Context', hidden: 'false' },
            { id: 'MinLength', width: 100, type: 'ron', align: 'left', sort: 'str', value: 'Min Length', hidden: 'false' },
            { id: 'MaxLength', width: 100, type: 'ron', align: 'left', sort: 'str', value: 'Max Length', hidden: 'false' },
            { id: 'MinWord', width: 100, type: 'ron', align: 'left', sort: 'str', value: 'Min Word', hidden: 'false' },
            { id: 'MaxWord', width: 100, type: 'ron', align: 'left', sort: 'str', value: 'Max Word', hidden: 'false' },
            { id: 'Active', width: 55, type: 'ron', align: 'center', sort: 'str', value: 'Active', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - ChatGptContext
function OpenFormChatGptContext(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormChatGptContext).html("ChatGPT Context");
    $ModalFormChatGptContext.modal("show");

    if (rId)
        loadChatGptContext(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - ChatGptContext
function initModalFormChatGptContext() {

    //Button Save-ChatGptContext
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormChatGptContext).on('click', function (event) {
        submitFormChatGptContext();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormChatGptContext).on('click', function (event) {
        hideFormAlert($AlertFormChatGptContext);
        clearForm($FormChatGptContext);
    });

    $('#contextBuilder').on('click', function () {
        buildContext();
    });

    //Modal-ChatGptContext
    $ModalFormChatGptContext.on('hidden.bs.modal', function () {
        clearForm($FormChatGptContext);
        $("#ChatGptRolId").selectpicker('val', '');
        $("#ControlTypeId").selectpicker('val', '');
        $("#LanguageCode").selectpicker('val', '');
        $("#ToneVoiceSelect").select2("val", "");
        $('#ToneVoiceSelect').trigger('change');
    });

    //Enter key Naviation
    enterFormNavigation($FormChatGptContext);
}
//Form - ChatGptContext
async function submitFormChatGptContext() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormChatGptContext.valid()) {

        var tonevoices = $('#ToneVoiceSelect').select2('data');

        if (tonevoices.length > 0) {

            let result = tonevoices.map(a => a.id);

            if (result.length > 0) {
                $('#ToneVoiceRequest', $FormChatGptContext).val(result.join());
            }
        }

        var formData = formToJsonString(document.getElementById($FormChatGptContext.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormChatGptContext, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseChatGptContext + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                if (response.Action === "ADD") {
                    dhxGridChatGptContext.addRow(response.Data.id,
                        [0,
                            response.Data.toneVoiceIds,
                            response.Data.id,
                            response.Data.seoCampaignId,
                            response.Data.chatGPTRolId,
                            response.Data.controlTypeId,
                            response.Data.languageCode,
                            response.Data.tenseId,
                            response.Data.campaginName,
                            response.Data.chatGptRol,
                            response.Data.controlType,
                            response.Data.language,
                            response.Data.tense,
                            response.Data.name,
                            response.Data.context,
                            response.Data.minLength,
                            response.Data.maxLength,
                            response.Data.minWord,
                            response.Data.maxWord,
                            active,
                            ''],
                        0);
                }
                else {

                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("chk")).setValue(0);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("ToneVoiceIds")).setValue(response.Data.toneVoiceIds);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("SeoCampaignId")).setValue(response.Data.seoCampaignId);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("ChatGPTRolId")).setValue(response.Data.chatGPTRolId);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("ControlTypeId")).setValue(response.Data.controlTypeId);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("LanguageCode")).setValue(response.Data.languageCode);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("TenseId")).setValue(response.Data.tenseId);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("CampaignName")).setValue(response.Data.campaginName);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("ChatGPTRol")).setValue(response.Data.chatGptRol);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("ControlType")).setValue(response.Data.controlType);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Language")).setValue(response.Data.language);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Tense")).setValue(response.Data.tense);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Context")).setValue(response.Data.context);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("MinLength")).setValue(response.Data.minLength);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("MaxLength")).setValue(response.Data.maxLength);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("MinWord")).setValue(response.Data.minWord);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("MaxWord")).setValue(response.Data.maxWord);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Active")).setValue(active);
                    dhxGridChatGptContext.cells(response.Data.id, dhxGridChatGptContext.getColIndexById("Dummy")).setValue('');
                }

                dhxGridChatGptContext.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormChatGptContext, response.Errors);

        disableAll($FormChatGptContext, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - ChatGptContext
function loadChatGptContext(rId) {

    clearForm($FormChatGptContext);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var toneVoiceIds = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("ToneVoiceIds")).getValue();
        var id = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("Id")).getValue();
        var chatGPTRolId = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("ChatGPTRolId")).getValue();
        var controlTypeId = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("ControlTypeId")).getValue();
        var languageCode = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("LanguageCode")).getValue();
        var tenseId = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("TenseId")).getValue();
        var name = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("Name")).getValue();
        var context = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("Context")).getValue();
        var minLength = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("MinLength")).getValue();
        var maxLength = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("MaxLength")).getValue();
        var minWord = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("MinWord")).getValue();
        var maxWord = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("MaxWord")).getValue();
        var active = dhxGridChatGptContext.cells(rId, dhxGridChatGptContext.getColIndexById("Active")).getValue();

        $('#Id', $FormChatGptContext).val(id);
        $('#ChatGptRolId', $FormChatGptContext).selectpicker('val', chatGPTRolId);
        $('#ControlTypeId', $FormChatGptContext).selectpicker('val', controlTypeId);
        $('#LanguageCode', $FormChatGptContext).selectpicker('val', languageCode);
        $('#TenseId', $FormChatGptContext).selectpicker('val', tenseId);
        $('#Name', $FormChatGptContext).val(name);
        $('#Context', $FormChatGptContext).val(context);
        $('#MinLength', $FormChatGptContext).val(minLength);
        $('#MaxLength', $FormChatGptContext).val(maxLength);
        $('#MinWord', $FormChatGptContext).val(minWord);
        $('#MaxWord', $FormChatGptContext).val(maxWord);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormChatGptContext).prop('checked', true);

        if (!IsNullOrEmpty(toneVoiceIds)) {

            var toneArray = toneVoiceIds.split(",");

            $('#ToneVoiceRequest', $FormChatGptContext).val(toneVoiceIds);

            $('#ToneVoiceSelect', $FormChatGptContext).val(toneArray);
            $('#ToneVoiceSelect').trigger('change');
        }


        $('#modal-loading').fadeOut();
    }
}
//Delete - ChatGptContext
async function deleteChatGptContext() {

    var ChatGptContextId = dhxGridChatGptContext.getSelectedRowId();

    var rIds = [];

    dhxGridChatGptContext.forEachRow(function (id) {
        if (dhxGridChatGptContext.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseChatGptContext + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridChatGptContext.deleteRow(response.Data.deleted[i]);
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

        var response = await ajaxCall(rootPath + urlBaseChatGptContext + 'GetBusinessOfferList?' + parameters, null, false, Method.GET, Datatype.Json, ContentType.Json);

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

                var ChatGptContextId = dhxGridChatGptContext.getSelectedRowId();
                if (businessOfferList.length > 0 && !IsNull(ChatGptContextId)) {
                    var businessOfferOpt = dhxGridChatGptContext.cells(ChatGptContextId, dhxGridChatGptContext.getColIndexById("BusinessOfferId")).getValue();

                    if (!IsNullOrEmpty(businessOfferOpt))
                        $('#BusinessOfferId', $FormChatGptContext).selectpicker('val', businessOfferOpt);

                }
            }

        }

        //Set Progress On
        $('#modal-loading').fadeOut();
    }
}

//Load Filters
async function loadCamapaignFilter() {
    //Set Progress On
    dhxLayout.progressOn();

    var response = await ajaxCall(rootPath + urlBaseChatGptContext + 'GetCampaignFilters', null, false, Method.GET, Datatype.Json, ContentType.Json);

    if (response.Result) {

        if (!IsNull(response.Data)) {


            if (IsNull(response.Data)) {
                swal("No active campaigns found", "", "info");
            } else {

                var campaignList = response.Data;
                //Campaign Filter
                for (var i = 0; i < campaignList.length; i++) {
                    $('#filterCampaign').append('<option data-tokens="' + campaignList[i].text + '" value="' + campaignList[i].value + '">' + campaignList[i].text + '</option>');
                }

                $('#filterCampaign').selectpicker('refresh');

                var filterCampaignId = localStorage.getItem('filterCampaignId');

                if (!IsNullOrEmpty(filterCampaignId))
                    $('#filterCampaign').selectpicker('val', filterCampaignId);
            }
        }
    }

    //Set Progress On
    dhxLayout.progressOff();
}

//Load BusinessOffer Info
function getBusinessOffer() {

    dhxLayout.cells('a').setText(businessOfferInfo.companyName + ': ' + businessOfferInfo.name);
}

async function buildContext() {

    var roltext = $('#ChatRolId').find('option:selected').map(function () {
        return $(this).text();
    }).get().join(',');
    var controlTypeText = $('#ControlTypeId').find('option:selected').map(function () {
        return $(this).text();
    }).get().join(',');
    var langCodeText = $('#LanguageCode').find('option:selected').map(function () {
        return $(this).text();
    }).get().join(',');
    var toneVoiceTextList = $('#ToneVoiceSelect').find('option:selected').map(function () {
        return $(this).text();
    }).get().join(',');
    var tenseText = $('#TenseId').find('option:selected').map(function () {
        return $(this).text();
    }).get().join(',');
    
    var minChar = $('#MinLength').val();
    var maxChar = $('#MaxLength').val();
    var minWords = $('#MinWord').val();
    var maxWords = $('#MaxWord').val();

    var contextLength = getContextLenghtCondition(minChar, maxChar, 'chars');
    contextLength += getContextLenghtCondition(minWords, maxWords, 'words');

    if (!IsNullOrEmpty(toneVoiceTextList))
        toneVoiceTextList = toneVoiceTextList.replace(/,/g, ' and ');

    if (!IsNullOrEmpty(contextLength))
        contextLength += 'including spaces, with no question statements. ';

    var mainKeyWord = '';
    var keywords = '';


    var strContext = `Consider the following ${businessOfferInfo.offerTypeName} with name: ${businessOfferInfo.name}, description: ${businessOfferInfo.description}, and manin characteristics: ${businessOfferInfo.characteristics}. Create a ${controlTypeText} using a ${toneVoiceTextList} tone of voice in ${tenseText}, it must be in ${langCodeText} with the main keywords ${mainKeyWord} and keywords ${keywords}. `;
    strContext += contextLength;

    $('#Context').val(strContext);
}

function getContextLenghtCondition(minChar, maxChar, type) {

    if (!IsNullOrEmpty(minChar) && !IsNullOrEmpty(maxChar))
        return `Desired ${type} length between ${ minChar } and ${ maxChar } `; 

    if (!IsNullOrEmpty(minChar) && IsNullOrEmpty(maxChar))
        return `Desired a minimum ${minChar} chars `; 

    if (IsNullOrEmpty(minChar) && !IsNullOrEmpty(minChar))
        return `Dmperative to not exceed more than ${maxChar} chars `; 

    return '';
}

