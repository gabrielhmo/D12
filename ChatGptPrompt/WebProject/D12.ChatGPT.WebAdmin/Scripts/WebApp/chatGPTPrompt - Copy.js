//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - ChatGptPrompt
var $ModalFormChatGptPrompt = $("#ModalChatGptPrompt");
var $FormChatGptPrompt = $("#FormChatGptPrompt");
var $AlertFormChatGptPrompt = $('#AlertFormChatGptPrompt');

var filterCampaignId;
var businessOfferInfo;

//DhxLayoutCell - ChatGptPrompt
var dhxToolbarChatGptPrompt;
var dhxGridChatGptPrompt;
var dhxStatusBarChatGptPrompt;
var paginationChatGptPrompt = null;
var pageNumberChatGptPrompt = 1;
var pageSizeChatGptPrompt = 100;
var strSearchChatGptPrompt = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'ChatGptPrompt':
            return UrlChatGptPrompt(pageNum);
    }
}

//URL - ChatGptPrompt
var urlBaseChatGptPrompt = 'SEOContent/ChatGptPrompt/';
function UrlChatGptPrompt(newPage, newSearch, newPageSize) {

    pageNumberChatGptPrompt = newPage || pageNumberChatGptPrompt;
    strSearchChatGptPrompt = newSearch || strSearchChatGptPrompt;
    pageSizeChatGptPrompt = newPageSize || pageSizeChatGptPrompt;

    return rootPath + urlBaseChatGptPrompt + "All?PageNumber=" + pageNumberChatGptPrompt + "&PageSize=" + pageSizeChatGptPrompt + "&campaignId=" + filterCampaignId;
}
function UrlExportChatGptPrompt(format) {
    url = rootPath + urlBaseChatGptPrompt + "ExportData?PageNumber=" + pageNumberChatGptPrompt + "&PageSize=" + pageSizeChatGptPrompt + "&strSearch=" + strSearchChatGptPrompt + "&format=" + format + "&area=ChatGptPrompt";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormChatGptPrompt();

    $("#ToneVoiceSelect").select2({
        dropdownParent: $('#ModalChatGptPrompt'),
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
            { id: 'a', text: 'ChatGptPrompt', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxChatGptPrompt();
}

//Grid box
function InitBoxChatGptPrompt() {
    InitDhxToolbarChatGptPrompt();
    InitDxhGridChatGptPrompt();

    loadCamapaignFilter();

    if ($('.selectpicker').length > 0) {
        $('.selectpicker').on('hide.bs.select', function () {
            $(this).trigger("focusout");
        });

        $('.selectpicker').selectpicker('refresh');

        $('#filterCampaign').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

            if (isNumeric($(this).val())) {

                localStorage.setItem('filterCampaignId', $(this).val());

                ReInitPaging(paginationChatGptPrompt, 'ChatGptPrompt');
                reloadGrid(dhxLayout, dhxGridChatGptPrompt, UrlChatGptPrompt(), 'ChatGptPrompt', paginationChatGptPrompt);
            }
            else {
                localStorage.setItem('filterCampaignId', '');
                dhxGridChatGptPrompt.clearAll();
                dhxLayout.cells('a').setText('ChatGPT Prompt');
            }

        });
    }
}

//Toolbar
function InitDhxToolbarChatGptPrompt() {

    //Load DhcToolbar Config
    GetDhxToolbarChatGptPrompt();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarChatGptPrompt.removeItem("new");
    }

    //Add Space
    dhxToolbarChatGptPrompt.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarChatGptPrompt.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormChatGptPrompt();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteChatGptPrompt();

                break;
            case "reload":
                ReInitPaging(paginationChatGptPrompt, 'ChatGptPrompt');
                reloadGrid(dhxLayout, dhxGridChatGptPrompt, UrlChatGptPrompt(), 'ChatGptPrompt', paginationChatGptPrompt);
                break;
            case "print":
                dhxGridChatGptPrompt.printView();
                break;
            case "copyClipboard":
                dhxGridChatGptPrompt.setCSVDelimiter("t");
                dhxGridChatGptPrompt.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridChatGptPrompt, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridChatGptPrompt, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportChatGptPrompt('csv');
                //exportToFile(dxhGridChatGptPrompt, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarChatGptPrompt() {
    dhxToolbarChatGptPrompt = dhxLayout.cells('a').attachToolbar({
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
function InitDxhGridChatGptPrompt() {

    //dhxLayout - StatusBar
    dhxStatusBarChatGptPrompt = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('ChatGptPrompt')
    });

    dhxGridChatGptPrompt = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridChatGptPrompt, 'ChatGptPrompt');
    dhxGridChatGptPrompt.parse(GetDhxGridConfChatGptPrompt(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridChatGptPrompt);
    //Set columns header show/hide function
    setColHeader(dhxGridChatGptPrompt);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dhxGridChatGptPrompt.setColumnHidden(1, true);

    //onRowSelect
    dhxGridChatGptPrompt.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridChatGptPrompt.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormChatGptPrompt(rId);
    });

    //Default Events
    dhxGridChatGptPrompt.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlChatGptPrompt() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    if (!IsNull(filterCampaignId)) {
        dhxGridChatGptPrompt.load(UrlChatGptPrompt(), function () {

            businessOfferInfo = dhxGridChatGptPrompt.UserData.gridglobaluserdata.values[2].businessOffer;
            var paginParameter = dhxGridChatGptPrompt.UserData.gridglobaluserdata.values[2].paginParams;

            getBusinessOffer();

            ReInitPaging(paginationChatGptPrompt, 'ChatGptPrompt');

            paginationChatGptPrompt = initPaging(
                dhxLayout,
                dhxGridChatGptPrompt,
                'ChatGptPrompt',
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

    $('#ChatGptPromptChk').on('change', function () {

        if (this.checked)
            dhxGridChatGptPrompt.setCheckedRows(0, 1);
        else
            dhxGridChatGptPrompt.setCheckedRows(0, 0);
    });

    $('#PageSizeChatGptPrompt').change(function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationChatGptPrompt, 'ChatGptPrompt');
        reloadGrid(dhxLayout, dhxGridChatGptPrompt, UrlChatGptPrompt(1, null, sizeGrid), 'ChatGptPrompt', paginationChatGptPrompt);

        $('#PageSizeChatGptPrompt').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfChatGptPrompt() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ChatGptPromptChk"/><label for="ChatGptPromptChk"></label></div>', hidden: 'false' },
            { id: 'ToneVoiceIds', width: 100, type: 'ro', align: 'left', sort: 'na', value: 'ToneVoiceIds', hidden: 'true' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'SeoCampaignId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'SeoCampaignId', hidden: 'true' },
            { id: 'ChatGptRolId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'ChatGPTRolId', hidden: 'true' },
            { id: 'ControlTypeId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'ControlTypeId', hidden: 'true' },
            { id: 'LanguageCode', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'LanguageCode', hidden: 'true' },
            { id: 'TenseId', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'TenseId', hidden: 'true' },
            { id: 'CampaignName', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Campaign', hidden: 'false' },
            { id: 'ChatGPTRol', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'ChatGPT Rol', hidden: 'false' },
            { id: 'ControlType', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Control Type', hidden: 'false' },
            { id: 'Language', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Language', hidden: 'false' },
            { id: 'Tense', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Tense', hidden: 'false' },
            { id: 'Name', width: 150, type: 'ron', align: 'left', sort: 'str', value: 'Name', hidden: 'false' },
            { id: 'Prompt', width: 300, type: 'ron', align: 'left', sort: 'str', value: 'Prompt', hidden: 'false' },
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

//Modal - ChatGptPrompt
function OpenFormChatGptPrompt(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormChatGptPrompt).html("ChatGPT Prompt");
    $ModalFormChatGptPrompt.modal("show");

    if (rId)
        loadChatGptPrompt(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - ChatGptPrompt
function initModalFormChatGptPrompt() {

    //Button Save-ChatGptPrompt
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormChatGptPrompt).on('click', function (event) {
        submitFormChatGptPrompt();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormChatGptPrompt).on('click', function (event) {
        hideFormAlert($AlertFormChatGptPrompt);
        clearForm($FormChatGptPrompt);
    });

    $('#promptBuilder').on('click', function () {
        buildPrompt();
    });

    //Modal-ChatGptPrompt
    $ModalFormChatGptPrompt.on('hidden.bs.modal', function () {
        clearForm($FormChatGptPrompt);
        $("#ChatGptRolId").selectpicker('val', '');
        $("#ControlTypeId").selectpicker('val', '');
        $("#LanguageCode").selectpicker('val', '');
        $("#ToneVoiceSelect").select2("val", "");
        $('#ToneVoiceSelect').trigger('change');
    });

    //Enter key Naviation
    enterFormNavigation($FormChatGptPrompt);
}
//Form - ChatGptPrompt
async function submitFormChatGptPrompt() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormChatGptPrompt.valid()) {

        var tonevoices = $('#ToneVoiceSelect').select2('data');

        if (tonevoices.length > 0) {

            let result = tonevoices.map(a => a.id);

            if (result.length > 0) {
                $('#ToneVoiceRequest', $FormChatGptPrompt).val(result.join());
            }
        }

        var formData = formToJsonString(document.getElementById($FormChatGptPrompt.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormChatGptPrompt, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                if (response.Action === "ADD") {
                    dhxGridChatGptPrompt.addRow(response.Data.id,
                        [0,
                            response.Data.toneVoiceIds,
                            response.Data.id,
                            response.Data.seoCampaignId,
                            response.Data.ChatGptRolId,
                            response.Data.controlTypeId,
                            response.Data.languageCode,
                            response.Data.tenseId,
                            response.Data.campaginName,
                            response.Data.chatGptRol,
                            response.Data.controlType,
                            response.Data.language,
                            response.Data.tense,
                            response.Data.name,
                            response.Data.prompt,
                            response.Data.minLength,
                            response.Data.maxLength,
                            response.Data.minWord,
                            response.Data.maxWord,
                            active,
                            ''],
                        0);
                }
                else {

                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("chk")).setValue(0);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("ToneVoiceIds")).setValue(response.Data.toneVoiceIds);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Id")).setValue(response.Data.id);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("SeoCampaignId")).setValue(response.Data.seoCampaignId);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("ChatGptRolId")).setValue(response.Data.ChatGptRolId);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("ControlTypeId")).setValue(response.Data.controlTypeId);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("LanguageCode")).setValue(response.Data.languageCode);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("TenseId")).setValue(response.Data.tenseId);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("CampaignName")).setValue(response.Data.campaginName);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("ChatGPTRol")).setValue(response.Data.chatGptRol);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("ControlType")).setValue(response.Data.controlType);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Language")).setValue(response.Data.language);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Tense")).setValue(response.Data.tense);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Name")).setValue(response.Data.name);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Prompt")).setValue(response.Data.prompt);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("MinLength")).setValue(response.Data.minLength);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("MaxLength")).setValue(response.Data.maxLength);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("MinWord")).setValue(response.Data.minWord);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("MaxWord")).setValue(response.Data.maxWord);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Active")).setValue(active);
                    dhxGridChatGptPrompt.cells(response.Data.id, dhxGridChatGptPrompt.getColIndexById("Dummy")).setValue('');
                }

                dhxGridChatGptPrompt.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormChatGptPrompt, response.Errors);

        disableAll($FormChatGptPrompt, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - ChatGptPrompt
function loadChatGptPrompt(rId) {

    clearForm($FormChatGptPrompt);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var toneVoiceIds = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("ToneVoiceIds")).getValue();
        var id = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("Id")).getValue();
        var ChatGptRolId = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("ChatGptRolId")).getValue();
        var controlTypeId = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("ControlTypeId")).getValue();
        var languageCode = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("LanguageCode")).getValue();
        var tenseId = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("TenseId")).getValue();
        var name = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("Name")).getValue();
        var prompt = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("Prompt")).getValue();
        var minLength = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("MinLength")).getValue();
        var maxLength = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("MaxLength")).getValue();
        var minWord = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("MinWord")).getValue();
        var maxWord = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("MaxWord")).getValue();
        var active = dhxGridChatGptPrompt.cells(rId, dhxGridChatGptPrompt.getColIndexById("Active")).getValue();

        $('#Id', $FormChatGptPrompt).val(id);
        $('#ChatGptRolId', $FormChatGptPrompt).selectpicker('val', ChatGptRolId);
        $('#ControlTypeId', $FormChatGptPrompt).selectpicker('val', controlTypeId);
        $('#LanguageCode', $FormChatGptPrompt).selectpicker('val', languageCode);
        $('#TenseId', $FormChatGptPrompt).selectpicker('val', tenseId);
        $('#Name', $FormChatGptPrompt).val(name);
        $('#Prompt', $FormChatGptPrompt).val(prompt);
        $('#MinLength', $FormChatGptPrompt).val(minLength);
        $('#MaxLength', $FormChatGptPrompt).val(maxLength);
        $('#MinWord', $FormChatGptPrompt).val(minWord);
        $('#MaxWord', $FormChatGptPrompt).val(maxWord);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormChatGptPrompt).prop('checked', true);

        if (!IsNullOrEmpty(toneVoiceIds)) {

            var toneArray = toneVoiceIds.split(",");

            $('#ToneVoiceRequest', $FormChatGptPrompt).val(toneVoiceIds);

            $('#ToneVoiceSelect', $FormChatGptPrompt).val(toneArray);
            $('#ToneVoiceSelect').trigger('change');
        }


        $('#modal-loading').fadeOut();
    }
}
//Delete - ChatGptPrompt
async function deleteChatGptPrompt() {

    var ChatGptPromptId = dhxGridChatGptPrompt.getSelectedRowId();

    var rIds = [];

    dhxGridChatGptPrompt.forEachRow(function (id) {
        if (dhxGridChatGptPrompt.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseChatGptPrompt + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dhxGridChatGptPrompt.deleteRow(response.Data.deleted[i]);
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

        var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'GetBusinessOfferList?' + parameters, null, false, Method.GET, Datatype.Json, ContentType.Json);

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

                var ChatGptPromptId = dhxGridChatGptPrompt.getSelectedRowId();
                if (businessOfferList.length > 0 && !IsNull(ChatGptPromptId)) {
                    var businessOfferOpt = dhxGridChatGptPrompt.cells(ChatGptPromptId, dhxGridChatGptPrompt.getColIndexById("BusinessOfferId")).getValue();

                    if (!IsNullOrEmpty(businessOfferOpt))
                        $('#BusinessOfferId', $FormChatGptPrompt).selectpicker('val', businessOfferOpt);

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

    var response = await ajaxCall(rootPath + urlBaseChatGptPrompt + 'GetCampaignFilters', null, false, Method.GET, Datatype.Json, ContentType.Json);

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

async function buildPrompt() {

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

    if (IsNullOrEmpty(roltext) || IsNullOrEmpty(controlTypeText)) {
        swal("Action Required", "To continue, you must select Prompt Rol and Control Type.", "info");
    }
    else
    {
        var minChar = $('#MinLength').val();
        var maxChar = $('#MaxLength').val();
        var minWords = $('#MinWord').val();
        var maxWords = $('#MaxWord').val();

        var promptLength = getPromptLenghtCondition(minChar, maxChar, 'chars');
        promptLength += getPromptLenghtCondition(minWords, maxWords, 'words');

        if (!IsNullOrEmpty(langCodeText))
            langCodeText = langString(langCodeText);

        if (!IsNullOrEmpty(toneVoiceTextList))
            toneVoiceTextList = langString(toneVoiceTextList);

        if (!IsNullOrEmpty(promptLength))
            promptLength += 'including spaces, with no question statements. ';


        var strPrompt = `Consider the following ${businessOfferInfo.offerTypeName}. Name: ${businessOfferInfo.name}. Description: ${businessOfferInfo.description}. Characteristics: ${businessOfferInfo.characteristics}. Create a ${controlTypeText} using a ${toneVoiceTextList} tone of voice in ${tenseText}, it must be in ${langCodeText} with the main keywords  and keywords. `;
        strPrompt += promptLength;

        $('#Prompt').val(clearPrompt(strPrompt));
    }
}

function getPromptLenghtCondition(minLen, maxLen, type) {

    if (!IsNullOrEmpty(minLen) && !IsNullOrEmpty(maxLen))
        return `Desired ${type} length between ${ minLen } and ${ maxLen }. `; 

    if (!IsNullOrEmpty(minLen) && IsNullOrEmpty(maxLen))
        return `Desired a minimum ${minLen} chars. `; 

    if (IsNullOrEmpty(minLen) && !IsNullOrEmpty(maxLen))
        return `Imperative to not exceed more than ${maxLen} chars. `; 

    return '';
}

function langString(langList) {
    var lanstr = "";

    if (!IsNullOrEmpty(langList)) {
        var arrLang = langList.split(',');

        if (arrLang.length < 3) {
            lanstr = langList.replace(',', ' and ');
        }
        else {
            for (var i = 0; i < arrLang.length; i++) {

                if (i == arrLang.length - 1)
                    lanstr += ' and ' + arrLang[i];
                else
                    lanstr += arrLang[i] + ', ';
            }
        }
    }

    return lanstr.replace(',  and ', ' and ')

}

function clearPrompt(strPrompt) {

    strPrompt = strPrompt.replace(/(\r\n|\n|\r)/gm, ". ");
    strPrompt = strPrompt.replace(/(•	)/gm, ",");
    strPrompt = strPrompt.replace(/( o	)/gm, ", ");
    strPrompt = strPrompt.replace(/(. ,)/gm, ". ");
    strPrompt = strPrompt.replace(/( ., )/gm, ", ");
    strPrompt = strPrompt.replace(/(:, )/gm, ": ");
    strPrompt = strPrompt.replace(/(__)/gm, "_");
    strPrompt = strPrompt.replace(/(<<)/gm, "«");
    strPrompt = strPrompt.replace(/(>>)/gm, "»");

    return strPrompt;
}


