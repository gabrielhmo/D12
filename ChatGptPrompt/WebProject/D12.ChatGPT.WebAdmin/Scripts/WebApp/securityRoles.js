//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - Rol
var $ModalFormRol = $("#ModalRol");
var $FormRol = $("#FormRol");
var $AlertFormRol = $('#AlertFormRol');


//DhxLayoutCell - Rol
var dhxToolbarRol;
var dhxGridRol;
var dhxStatusBarRol;
var paginationRol = null;
var pageNumberRol = 1;
var pageSizeRol = 100;
var strSearchRol = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'Rol':
            return UrlRol(pageNum);
    }
}

//URL - Rol
var urlBaseRol = 'Ajustes/Roles/';
function UrlRol(newPage, newSearch, newPageSize) {

    pageNumberRol = newPage || pageNumberRol;
    strSearchRol = newSearch || strSearchRol;
    pageSizeRol = newPageSize || pageSizeRol;

    return rootPath + urlBaseRol + "All?PageNumber=" + pageNumberRol + "&PageSize=" + pageSizeRol + "&search=" + strSearchRol;
}
function UrlExportRol(format) {
    url = rootPath + urlBaseRol + "ExportData?PageNumber=" + pageNumberRol + "&PageSize=" + pageSizeRol + "&strSearch=" + strSearchRol + "&format=" + format + "&area=Rol";
    window.location.replace(url);
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 140);
    InitForms();
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
            { id: 'a', text: 'Rol', header: true, fix_size: [false, false] }
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxRol();
}

//Grid box
function InitBoxRol() {
    InitDhxToolbarRol();
    InitDxhGridRol();
}

//Toolbar
function InitDhxToolbarRol() {

    //Load DhcToolbar Config
    GetDhxToolbarRol();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarRol.removeItem("new");
    }

    //Add Space
    dhxToolbarRol.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarRol.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":

                if (!isReadOnly)
                    OpenFormRol();

                break;
            case "delete":

                if (!isReadOnly)
                    deleteRol();

                break;
            case "reload":
                ReInitPaging(paginationRol, 'Rol');
                reloadGrid(dhxLayout, dhxGridRol, UrlRol(), 'Rol', paginationRol);
                break;
            case "print":
                dhxGridRol.printView();
                break;
            case "copyClipboard":
                dhxGridRol.setCSVDelimiter("t");
                dhxGridRol.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dhxGridRol, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dhxGridRol, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportRol('csv');
                //exportToFile(dxhGridRol, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarRol() {
    dhxToolbarRol = dhxLayout.cells('a').attachToolbar({
        iconset: "awesome",
        items: [
            {
                type: "buttonSelect", id: "new", text: "Nuevo", img: "far fa-file", img_disabled: "far fa-file", renderSelect: true, openAll: false,
                options: [
                    { type: "button", id: "delete", text: "Eliminar", img: "fas fa-trash", img_disabled: "fas fa-trash" }
                ]
            },
            {
                type: "buttonSelect", id: "copyClipboard", text: "Copiar", img: "fa fa-clipboard", img_disabled: "fa fa-file-o", renderSelect: false, openAll: true,
                options: [
                    { type: "button", id: "copyExcel", text: "Copiar a Excel", img: "fa fa-file-excel-o", img_disabled: "fa fa-file-excel-o" },
                    { type: "button", id: "copyCSV", text: " Copy to CSV", img: "fa fa-file-text-o", img_disabled: "fa fa-file-text-o" }
                ]
            },
            { type: "separator", id: "sep2" },
            { type: "button", id: "reload", text: "Refrescar", img: "fas fa-sync-alt", img_disabled: "fas fa-sync-alt" },
            { type: "text", id: "strSearch", text: SearchComponent('Rol', false) }
        ],
        onload: function () {

            $('#frmSearchRol').parent().css('textAlign', 'right');
            $('#frmSearchRol').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchRol').closest('.dhx_toolbar_Rol').css('overflow', 'visible');

            $('#frmSearchRol').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationRol, 'Rol');
                strSearchRol = $('#inputSearchRol').val();
                reloadGrid(dhxLayout, dhxGridRol, UrlRol(1, strSearchRol), 'Rol', paginationRol);
            });
        }
    });
}

//Init DhxGrid
function InitDxhGridRol() {

    //dhxLayout - StatusBar
    dhxStatusBarRol = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('Rol')
    });

    dhxGridRol = dhxLayout.cells("a").attachGrid();
    initGrid(dhxGridRol, 'Rol');
    dhxGridRol.parse(GetDhxGridConfRol(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dhxGridRol);
    //Set columns header show/hide function
    setColHeader(dhxGridRol);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly) 
        dhxGridRol.setColumnHidden(1, true);

    //onRowSelect
    dhxGridRol.attachEvent("onRowSelect", function (rId, cInd) {
    });

    //OnDoubleClick
    dhxGridRol.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormRol(rId);
    });

    //Default Events
    dhxGridRol.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlRol() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dhxGridRol.load(UrlRol(), function () {

        ReInitPaging(paginationRol, 'Rol');

        var paginParameter = dhxGridRol.UserData.gridglobaluserdata.values[4].paginParams;

        paginationRol = initPaging(
            dhxLayout,
            dhxGridRol,
            'Rol',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    $('#RolChk').on('change', function () {

        if (this.checked)
            dhxGridRol.setCheckedRows(0, 1);
        else
            dhxGridRol.setCheckedRows(0, 0);
    });

    $('#PageSizeRol').on('change', function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationRol, 'Rol');
        reloadGrid(dhxLayout, dhxGridRol, UrlRol(1, null, sizeGrid), 'Rol', paginationRol);

        $('#PageSizeRol').val(sizeGrid);
    });
}

//DhxGrid Config
function GetDhxGridConfRol() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="RolChk"/><label for="RolChk"></label></div>', hidden: 'false' },
            { id: 'Id', width: 0, type: 'ro', align: 'left', sort: 'na', value: 'Id', hidden: 'true' },
            { id: 'Name', width: '*', type: 'ron', align: 'left', sort: 'str', value: 'Name', hidden: 'false' },
            { id: 'Dummy', width: 50, type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - Rol
function OpenFormRol(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormRol).html("Rol");
    $ModalFormRol.modal("show");

    if (rId)
        loadRol(rId);
    else
        $('#modal-loading').fadeOut();
}
//Modal Buttons - Rol
function InitForms() {

    //Button Save-Rol
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormRol).on('click', function (event) {
        $($FormRol).submit();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormRol).on('click', function (event) {
        hideFormAlert($AlertFormRol);
        ClearForm($FormRol);
    });

    //Modal-Rol
    $ModalFormRol.on('hidden.bs.modal', function () {
        ClearForm($FormRol);
    });

    //Enter key Naviation
    enterFormNavigation($FormRol);

    //Init forms
    InitRolForm();
}

//Form - Rol
function InitRolForm() {

    //Form validate
    var formValidator = $FormRol.validate();

    $FormRol.submit(function (e) {

        e.preventDefault();

        if (isFormProcessing)
            return;

        if (formValidator.valid()) {

            var formData = FormToJsonString(document.getElementById($FormRol.attr('Id')));

            // Start loading
            $('#modal-loading').fadeIn();

            DisableAll($FormRol, true);
            isFormProcessing = true;

            AjaxCall(rootPath + urlBaseRol + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json)
                .then(function (response) {

                    DisableAll($FormRol, false);
                    isFormProcessing = false;

                    $('#modal-loading').fadeOut();

                    if (response.result) {

                        if (response.data !== undefined) {
                            $('#id').val(response.data.id);

                            var active = response.data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";

                            if (response.action === "ADD") {
                                dhxGridRol.addRow(response.data.id,
                                    [0,
                                        response.data.id,
                                        response.data.name,
                                        ''],
                                    0);
                            }
                            else {

                                dhxGridRol.cells(response.data.id, dhxGridRol.getColIndexById("chk")).setValue(0);
                                dhxGridRol.cells(response.data.id, dhxGridRol.getColIndexById("Id")).setValue(response.data.id);
                                dhxGridRol.cells(response.data.id, dhxGridRol.getColIndexById("Name")).setValue(response.data.name);
                                dhxGridRol.cells(response.data.id, dhxGridRol.getColIndexById("Dummy")).setValue('');
                            }

                            dhxGridRol.selectRowById(response.data.id, false, true, false);
                        }

                        ShowFormAlert(Status.Success, response.title, response.message, $AlertFormRol, response.errors);
                    }
                    else {
                        ShowFormAlert(Status.Error, response.title, response.message, $AlertFormRol, response.errors);
                    }

                }).catch(function (errorResponse) {
                    DisableAll($FormRol, false);
                    isFormProcessing = false;
                    $('#modal-loading').fadeOut();

                    if (errorResponse.Status === 401) {
                        errorResponse.Message = "Wrong username or password";
                    }
                    else {
                        ShowFormAlert(Status.Error, errorResponse.Title, errorResponse.Message, $AlertFormRol, errorResponse.errors);
                    }
                });
        }
    });
}
//Edit - Rol
function loadRol(id) {

    if (id === undefined)
        ClearForm($FormRol);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        loadInfo = true;

        var parameter = { id: id };


        AjaxCall(rootPath + urlBaseRol + 'id', parameter, false, Method.GET, Datatype.Json, ContentType.Json)
            .then(function (response) {

                isFormProcessing = false;
                DisableAll($FormRol, false);

                $('#modal-loading').fadeOut();

                if (response.result) {

                    loadInfo = false;

                    if (response.Errors !== undefined) {
                        var message = '';
                        for (var i = 0; i < response.Errors.length; i++) {
                            message += response.Errors[i].messageTitle + '\r\n' +
                                response.Errors[i].message + '\r\n\r\n';
                        }
                        sweetAlert('Error', message, 'error');
                    }
                    else {

                        JsonToFormBinding(response.data, $FormRol);
                        $('#modal-loading').fadeOut();
                    }
                }
                else {
                    ShowFormAlert(Status.Error, errorResponse.title, '', $AlertFormRol, errorResponse.errors);
                }

            }).catch(function (errorResponse) {
                DisableAll($FormRol, false);
                isFormProcessing = false;
                $('#modal-loading').fadeOut();

                if (errorResponse.Status === 401) {
                    errorResponse.Message = "Wrong username or password";
                }
                else {
                    ShowFormAlert(Status.Error, errorResponse.title, errorResponse.message, $AlertFormRol, errorResponse.errors);
                }
            });

    }
}
//Delete - Rol
function deleteRol() {
    var RolId = dhxGridRol.getSelectedRowId();

    var rIds = [];

    dhxGridRol.forEachRow(function (id) {
        if (dhxGridRol.cells(id, 0).getValue() === "1")
            rIds.push(id);
    });

    if (rIds.length === 0) {
        swal("Acción requerida", "Para continuar debe marcar los registros que desea eliminar", "info");
    }
    else {
        swal({
            title: '¿Eliminar registros?',
            text: "Por favor, confirme esta acción.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {

            if (result.value) {

                var urlDelete = rootPath + urlBaseRol + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });

                AjaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)
                    .then(function (response) {

                        if (response.errors.length > 0) {
                            var message = '';
                            for (let i = 0; i < response.errors.length; i++) {
                                message += response.errors[i].messageTitle + '\r\n' +
                                    response.errors[i].message + '\r\n\r\n';
                            }
                            sweetAlert('Error', message, 'error');
                        }
                        else {

                            for (var i = 0; i < response.data.deleted.length; i++) {
                                dhxGridRol.deleteRow(response.data.deleted[i]);
                            }

                            Swal.fire(
                                response.title,
                                response.message,
                                response.action
                            );
                        }
                    }).catch(function (errorResponse) {

                        if (errorResponse.Status === 401) {
                            errorResponse.Message = "Wrong username or password";
                        }
                        else {
                            ShowMessage(Status.Error, errorResponse.Title, errorResponse.Message, false, 'toast-bottom-center');
                        }
                    });
            }

        });
    }
}
