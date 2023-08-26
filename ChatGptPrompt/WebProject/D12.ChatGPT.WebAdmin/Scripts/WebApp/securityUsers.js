//Generic
var confirmLeave = false;
var loadInfo = false;
var isFormProcessing = false;

//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');

//Modals Forms - User
var $ModalFormUser = $("#ModalUser");
var $FormUser = $("#FormUser");
var $AlertFormUser = $('#AlertFormUser');

//DhxLayoutCell - Usuarios
var dhxToolbarUser;
var dxhGridUser;
var dhxStatusBarUser;
var paginationUser = null;
var pageNumberUser = 1;
var pageSizeUser = 100;
var strSearchUser = '';

//DhxLayoutCell - Rol
var dhxToolbarRol;
var dxhGridRol;

//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'User':
            return UrlUser(pageNum);
        case 'Rol':
            return UrlUser(pageNum);
    }
}

//URL - Usuarios
var urlBaseUser = 'Ajustes/Usuarios/';
function UrlUser(newPage, newSearch, newPageSize) {

    pageNumberUser = newPage || pageNumberUser;
    strSearchUser = newSearch || strSearchUser;
    pageSizeUser = newPageSize || pageSizeUser;

    return rootPath + urlBaseUser + "All?PageNumber=" + pageNumberUser + "&PageSize=" + pageSizeUser + "&search=" + strSearchUser;
}
function UrlExportUser(format) {
    url = rootPath + urlBaseUser + "ExportData?PageNumber=" + pageNumberUser + "&PageSize=" + pageSizeUser + "&strSearch=" + strSearchUser + "&format=" + format + "&area=ser";
    window.location.replace(url);
}

//URL - Rol
var urlBaseRol = 'Ajustes/Roles/';
function UrlRol() {
    return rootPath + urlBaseRol + "RolList";
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
        pattern: '2U',
        parent: 'MainContainer',
        offsets: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        cells: [
            { id: 'a', text: 'Usuarios', header: true, fix_size: [false, true] },
            { id: 'b', text: 'Roles', header: true, fix_size: [true, true] },
        ]
    });

    dhxLayout.setSeparatorSize(0, 5);
    dhxLayout.setSeparatorSize(1, 5);

    dhxLayout.cells("b").setWidth(300);

    dhxLayout.setAutoSize("a", "a;b");

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxUser();
    InitBoxRol();
}

//Grid box
function InitBoxUser() {
    InitDhxToolbarUser();
    InitDxhGridUser();
}
function InitBoxRol() {
    InitDhxToolbarRol();
    InitDxhGridRol();
}

//Toolbar
function InitDhxToolbarUser() {

    //Load DhcToolbar Config
    GetDhxToolbarUser();

    //If Read Only remove New Button
    if (isReadOnly) {
        dhxToolbarUser.removeItem("new");
    }

    //Add Space
    dhxToolbarUser.addSpacer("reload");

    //DhxToolbar Commands
    dhxToolbarUser.attachEvent("onClick", function (id) {
        switch (id) {
            case "new":
                if (!isReadOnly)
                    OpenFormUser();
                break;
            case "delete":
                if (!isReadOnly)
                    deleteUser();
                break;
            case "reload":
                ReInitPaging(paginationUser, 'User');
                dxhGridRol.uncheckAll();
                reloadGrid(dhxLayout, dxhGridUser, UrlUser(), 'User', paginationUser);
                break;
            case "print":
                dxhGridUser.printView();
                break;
            case "copyClipboard":
                dxhGridUser.setCSVDelimiter("t");
                dxhGridUser.copyBlockToClipboard();
                break;
            case "copyExcel":
                copyData(dxhGridUser, DataFormat.Excel);
                break;
            case "copyCSV":
                copyData(dxhGridUser, DataFormat.CSV);
                break;
            case "saveCSV":
                UrlExportUser('csv');
                //exportToFile(dxhGridUser, "csvFileName", DataFormat.CSV);
                break;
        }
    });
}

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
            case "reload":
                reloadGrid(dhxLayout, dxhGridRol, UrlRol(), 'Rol', '');
                break;
        }
    });
}

//DhxToolbar Config
function GetDhxToolbarUser()
{
    dhxToolbarUser = dhxLayout.cells('a').attachToolbar({
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
            { type: "text", id: "strSearch", text: SearchComponent('User', false) }
        ],
        onload: function () {

            $('#frmSearchUser').parent().css('textAlign', 'right');
            $('#frmSearchUser').closest('.dhx_cell_toolbar_def').css('overflow', 'visible');
            $('#frmSearchUser').closest('.dhx_toolbar_User').css('overflow', 'visible');

            $('#frmSearchUser').on('submit', function (event) {
                event.preventDefault();
                ReInitPaging(paginationUser, 'User');
                strSearchUser = $('#inputSearchUser').val();
                reloadGrid(dhxLayout, dxhGridUser, UrlUser(1, strSearchUser), 'User', paginationUser);
            });
        }
    });
}
function GetDhxToolbarRol()
{
    dhxToolbarRol = dhxLayout.cells('b').attachToolbar({
        iconset: "awesome",
        items: [
            { type: "button", id: "reload", text: "Refrescar", img: "fas fa-sync-alt", img_disabled: "fas fa-sync-alt" }
        ],
        onload: function () {
        }
    });
}

//Init DhxGrid
function InitDxhGridUser() {

    //dhxLayout - StatusBar
    dhxStatusBarUser = dhxLayout.cells('a').attachStatusBar({
        height: 50, // custom height
        text: GetPagingComponent('User')
    });

    dxhGridUser = dhxLayout.cells("a").attachGrid();
    initGrid(dxhGridUser, 'User');
    dxhGridUser.parse(GetDhxGridConfUser(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dxhGridUser);
    //Set columns header show/hide function
    setColHeader(dxhGridUser);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dxhGridUser.setColumnHidden(0, true);

    //onRowSelect
    dxhGridUser.attachEvent("onRowSelect", function (rId, cInd) {
        LoadUserRoles(rId);
    });

    //OnDoubleClick
    dxhGridUser.attachEvent("onRowDblClicked", function (rId, cInd) {
        OpenFormUser(rId);
    });

    //Default Events
    dxhGridUser.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlUser() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    dxhGridUser.load(UrlUser(), function () {

        ReInitPaging(paginationUser, 'User');

        var paginParameter = dxhGridUser.UserData.gridglobaluserdata.values[4].paginParams;

        paginationUser = initPaging(
            dhxLayout,
            dxhGridUser,
            'User',
            paginParameter.totalRecords,
            paginParameter.pageSize,
            paginParameter.totalPages,
            paginParameter.pageNumber);

        dhxLayout.progressOff();
    }, 'json');

    if (!isReadOnly)
        $('#UserChk').on('change', function () {

        if (this.checked)
            dxhGridUser.setCheckedRows(0, 1);
        else
            dxhGridUser.setCheckedRows(0, 0);
    });

    $('#PageSizeUser').on('change', function () {

        var sizeGrid = $(this).find(":selected").val();
        ReInitPaging(paginationUser, 'User');
        reloadGrid(dhxLayout, dxhGridUser, UrlUser(1, null, sizeGrid), 'User', paginationUser);

        $('#PageSizeUser').val(sizeGrid);
    });
}
function InitDxhGridRol() {

    //dhxLayout - StatusBar
    dhxStatusBarUser = dhxLayout.cells('b').attachStatusBar({
        height: 50 // custom height
    });

    dxhGridRol = dhxLayout.cells("b").attachGrid();
    initGrid(dxhGridRol, 'Rol');
    dxhGridRol.parse(GetDhxGridConfRol(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dxhGridRol);
    //Set columns header show/hide function
    setColHeader(dxhGridRol);

    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    //OnDoubleClick
    dxhGridRol.attachEvent("onRowDblClicked", function (rId, cInd) {
        if (!isReadOnly)
            openFormRol(rId);
    });

    //Default Events
    dxhGridRol.attachEvent("onBeforeSorting", function (ind, type, direction) {

        this.clearAll(); //clears grid
        this.load(UrlRol() + "&dir=" + direction + "&col=" + ind);//loads new data from the server 
        //in the required order
        this.setSortImgState(true, ind, direction); //sets a correct sorting image
        return false;
    });

    //Oncheck
    dxhGridRol.attachEvent("onCheck", function (rId, cInd, state) {
        if (!isReadOnly) {
            var userId = dxhGridUser.getSelectedRowId();

            var userRole = {
                UserId: userId,
                RoleId: rId,
                State: state
            };

            var urlUpdateRoles = rootPath + urlBaseUser + "UpdateRole?rnd=" + createRandomString(10);
            var parameter = JSON.stringify(userRole);

            AjaxCall(urlUpdateRoles, parameter, false, Method.POST, Datatype.Json, ContentType.Json)
                .then(function (response) {

                    if (response.result) {
                        UpdateUserRoles(userId, rId);
                    }
                    else {
                        var message = '';
                        for (let i = 0; i < response.errors.length; i++) {
                            message += response.errors[i].messageTitle + '\r\n' +
                                response.errors[i].message + '\r\n\r\n';
                        }

                        ShowMessage(Status.Error, errorResponse.Title, message, false, 'toast-bottom-center');
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

    dxhGridRol.load(UrlRol(), function () {

        if (isReadOnly)
            disableCol(dxhGridRol, 0, true);

        dhxLayout.progressOff();
    }, 'json');

    $('#ChkRol').on('change', function () {

        if (isReadOnly) {
            return false;
        } else {

            if (this.checked)
                dxhGridRol.setCheckedRows(0, 1);
            else
                dxhGridRol.setCheckedRows(0, 0);
        }
    });
}

//DhxGrid Config
function GetDhxGridConfUser() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="UserChk"/><label for="UserChk"></label></div>', hidden: 'false' },
            { id: "Id", width: 0, type: "ro", align: "left", sort: "na", value: "Id", hidden: "true" },
            { id: "FirstName", width: 150, type: "ron", align: "left", sort: "str", value: "Name", hidden: "false" },
            { id: "LastName", width: 200, type: "ron", align: "left", sort: "str", value: "Last name", hidden: "false" },
            { id: "JobTitle", width: 150, type: "ron", align: "left", sort: "str", value: "Position", hidden: "false" },
            { id: "PhoneNumber", width: 150, type: "ron", align: "left", sort: "str", value: "Phone", hidden: "false" },
            { id: "Email", width: 200, type: "ron", align: "left", sort: "str", value: "Email", hidden: "false" },
            { id: "Username", width: 80, type: "ron", align: "center", sort: "str", value: "User", hidden: "false" },
            { id: "Active", width: 80, type: "ron", align: "center", sort: "str", value: "Status", hidden: "false" },
            { id: "ReadOnly", width: 80, type: "ron", align: "center", sort: "str", value: "Read Only", hidden: "false" },
            { id: "Deleted", width: 80, type: "ron", align: "center", sort: "str", value: "Deleted", hidden: "true" },
            { id: "LastAccess", width: 200, type: "ron", align: "left", sort: "date", value: "Last access", hidden: "false" },
            { id: "EntryDate", width: 200, type: "ron", align: "left", sort: "date", value: "Entry Date", hidden: "false" },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}
function GetDhxGridConfRol() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ChkRol"/><label for="UserChk"></label></div>', hidden: 'false' },
            { id: "Id", width: 0, type: "ro", align: "left", sort: "na", value: "Id", hidden: "true" },
            { id: "Name", width: 245, type: "ron", align: "left", sort: "str", value: "Rol", hidden: "false" },
            { id: 'Dummy', width: 5, type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Modal - User
function OpenFormUser(rId) {

    $('.alert').hide('slow').removeClass('alert-success').removeClass('alert-danger');

    // reset modal body with a spinner or empty content
    $('#modal-loading').fadeIn();
    $(".modal-title", $ModalFormUser).html("User");
    $ModalFormUser.modal("show");

    if (rId)
        loadUser(rId);
    else
        $('#modal-loading').fadeOut();

    if(isReadOnly)
        DisableAll($FormUser, true);

}
//Modal Buttons - User
function InitForms() {

    //Button Save-User
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormUser).on('click', function (event) {
        $($FormUser).submit();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormUser).on('click', function (event) {
        hideFormAlert($AlertFormUser);
        ClearForm($FormUser);
    });

    //Modal-User
    $ModalFormUser.on('hidden.bs.modal', function () {
        ClearForm($FormUser);
    });

    //Enter key Naviation
    enterFormNavigation($FormUser);

    //Init forms
    InitUserForm();

    if ($('#Active').length > 0) {
        $('#Active').on('change', function () {
            $('#Active').val(this.checked);
        });
    }
    if ($('#ReadOnly').length > 0) {
        $('#ReadOnly').on('change', function () {
            $('#ReadOnly').val(this.checked);
        });
    }

    if (isReadOnly) {
        $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormUser).hide();
        $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormUser).hide();
    }
}

//Form - User
function InitUserForm() {
        //Form validate
        var formValidator = $FormUser.validate();
        $FormUser.submit(function (e) {

            e.preventDefault();

            if (isFormProcessing)
                return;

            if (formValidator.valid()) {

                var formData = FormToJsonString(document.getElementById($FormUser.attr('Id')));

                // Start loading
                $('#modal-loading').fadeIn();

                DisableAll($FormUser, true);
                isFormProcessing = true;

                AjaxCall($FormUser.attr('action'), formData, false, Method.POST, Datatype.Json, ContentType.Json)
                    .then(function (response) {

                        DisableAll($FormUser, false);
                        isFormProcessing = false;

                        $('#modal-loading').fadeOut();

                        if (response.result) {

                            if (response.data !== undefined) {
                                $('#id').val(response.data.id);

                                var active = response.data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                                var readOnly = response.data.readOnly === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                                var deleted = response.data.deleted === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                                var entrydate = moment(response.data.entryDate).format('DD/MM/YY HH:mm');

                                if (response.action === "ADD") {
                                    dxhGridUser.addRow(response.data.id,
                                        [0,
                                            response.data.id,
                                            response.data.firstName,
                                            response.data.lastName,
                                            response.data.jobTitle,
                                            response.data.phoneNumber,
                                            response.data.email,
                                            response.data.userName,
                                            active,
                                            readOnly,
                                            deleted,
                                            entrydate,
                                            ''],
                                        0);
                                }
                                else {

                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("chk")).setValue(0);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("Id")).setValue(response.data.id);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("FirstName")).setValue(response.data.firstName);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("LastName")).setValue(response.data.lastName);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("JobTitle")).setValue(response.data.jobTitle);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("PhoneNumber")).setValue(response.data.phoneNumber);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("Email")).setValue(response.data.email);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("Username")).setValue(response.data.userName);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("Active")).setValue(active);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("ReadOnly")).setValue(readOnly);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("Deleted")).setValue(deleted);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("EntryDate")).setValue(entrydate);
                                    dxhGridUser.cells(response.data.id, dxhGridUser.getColIndexById("Dummy")).setValue('');
                                }

                                dxhGridUser.selectRowById(response.data.id, false, true, false);
                                dxhGridUser.setUserData(response.data.id, "roles", response.data.roles);
                                LoadUserRoles(response.data.id, response.data.roles);
                            }

                            ShowFormAlert(Status.Success, response.title, response.message, $AlertFormUser, response.errors);
                        }
                        else {
                            ShowFormAlert(Status.Error, response.title, response.message, $AlertFormUser, response.errors);
                        }

                    }).catch(function (errorResponse) {
                        DisableAll($FormUser, false);
                        isFormProcessing = false;
                        $('#modal-loading').fadeOut();

                        if (errorResponse.Status === 401) {
                            errorResponse.Message = "Wrong username or password";
                        }
                        else {
                            ShowFormAlert(Status.Error, errorResponse.Title, errorResponse.Message, $AlertFormUser, errorResponse.errors);
                        }
                    });
            }
        });
}
//Edit - User
function loadUser(id) {

    if (id === undefined)
        ClearForm($FormUser);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        loadInfo = true;

        var parameter = { id: id };


        AjaxCall(rootPath + 'Ajustes/Usuarios/id', parameter, false, Method.GET, Datatype.Json, ContentType.Json)
            .then(function (response) {

                isFormProcessing = false;
                DisableAll($FormUser, false);

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
                        
                        JsonToFormBinding(response.data, $FormUser);

                        if (isReadOnly)
                            DisableAll($FormUser, true);

                        $('#modal-loading').fadeOut();
                    }
                }
                else {
                    ShowFormAlert(Status.Error, errorResponse.title, '', $AlertFormUser, errorResponse.errors);
                }

            }).catch(function (errorResponse) {
                DisableAll($FormUser, false);
                isFormProcessing = false;
                $('#modal-loading').fadeOut();

                if (errorResponse.Status === 401) {
                    errorResponse.Message = "Wrong username or password";
                }
                else {
                    ShowFormAlert(Status.Error, errorResponse.title, errorResponse.message, $AlertFormUser, errorResponse.errors);
                }
            });

    }
}
//Delete - User
function deleteUser() {
    var departamentoId = dxhGridUser.getSelectedRowId();

    var rIds = [];

    dxhGridUser.forEachRow(function (id) {
        if (dxhGridUser.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseUser + "Delete?rnd=" + createRandomString(10);
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
                                dxhGridUser.deleteRow(response.data.deleted[i]);
                            }

                            Swal.fire(
                                json.title,
                                json.message,
                                json.action
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
//Load Roles of Selected User 
function LoadUserRoles(userId)
{
    if (IsNull(userId))
        userId = dxhGridUser.getSelectedRowId();

    if (IsNull(userId))
        sweetAlert('Info', 'please select a user first', 'Acción requerida');

    var UserRoles = dxhGridUser.getUserData(userId, "roles");

    dxhGridRol.uncheckAll();

    for (var i = 0; i < UserRoles.length; i++) {
        var cell = dxhGridRol.cells(UserRoles[i].id, 0);
        if (cell.isCheckbox()) cell.setValue(1);
    }

    if (isReadOnly)
        disableCol(dxhGridRol, 0, true);

}
//Update User Roles
function UpdateUserRoles(userId, rolId) {

    var rolName = dxhGridRol.cells(rolId, dxhGridRol.getColIndexById("Name")).getValue();
    var UserRoles = dxhGridUser.getUserData(userId, "roles");
    var ind = -1;

    for (var i = 0; i < UserRoles.length; i++) {
        if (UserRoles[i].id === rolId) {
            ind = i;
        }
    }

    if (ind < 0)
    {
        UserRoles.push({ id: rolId, name: rolName });
    }
    else{
        UserRoles.splice(ind,1);
    }

    dxhGridUser.setUserData(userId, "roles", UserRoles);
}

function doAterGridReload(dhxGrid) {

    var gridID = dhxGrid.getUserData("", "GridID");

    if (gridID === 'Rol')
        LoadUserRoles();
}