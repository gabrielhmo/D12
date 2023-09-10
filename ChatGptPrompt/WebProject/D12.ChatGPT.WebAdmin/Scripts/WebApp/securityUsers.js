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


//DhxLayoutCell - User
var dhxToolbarUser;
var dxhGridUser;
var dhxStatusBarUser;
var paginationUser = null;
var pageNumberUser = 1;
var pageSizeUser = 100;
var strSearchUser = '';


//Paging URL by dhxGrid
function GetPaginUrl(pager, pageNum) {
    switch (pager) {
        case 'User':
            return UrlUser(pageNum);
    }
}

//URL - User
var urlBaseUser = 'Security/Users/';
function UrlUser(newPage, newSearch, newPageSize) {

    pageNumberUser = newPage || pageNumberUser;
    strSearchUser = newSearch || strSearchUser;
    pageSizeUser = newPageSize || pageSizeUser;

    return rootPath + urlBaseUser + "All?PageNumber=" + pageNumberUser + "&PageSize=" + pageSizeUser + "&search=" + strSearchUser;
}
function UrlExportUser(format) {
    url = rootPath + urlBaseUser + "ExportData?PageNumber=" + pageNumberUser + "&PageSize=" + pageSizeUser + "&strSearch=" + strSearchUser + "&format=" + format + "&area=User";
    window.location.replace(url);
}

//URL - Rol
var urlBaseRol = 'Security/Roles/';
function UrlRol() {
    return rootPath + urlBaseRol + "RolList";
}


//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 125);
    initModalFormUser();
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
function GetDhxToolbarUser() {
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
function GetDhxToolbarRol() {
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

            ajaxCall(urlUpdateRoles, parameter, false, Method.POST, Datatype.Json, ContentType.Json)
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

                        ShowMessage(response.MessageType, errorResponse.Title, message, false, 'toast-bottom-center');
                    }

                }).catch(function (errorResponse) {

                    if (errorResponse.Status === 401) {
                        errorResponse.Message = "Wrong username or password";
                    }
                    else {
                        ShowMessage(response.MessageType, errorResponse.Title, errorResponse.Message, false, 'toast-bottom-center');
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
}
//Modal Buttons - User
function initModalFormUser() {

    //Button Save-User
    $('.modal-dialog > .modal-content > .modal-footer button.btnSave', $ModalFormUser).on('click', function (event) {
        submitFormUser();
    });

    $(' > .modal-dialog > .modal-content > .modal-footer button.btnNew', $ModalFormUser).on('click', function (event) {
        hideFormAlert($AlertFormUser);
        clearForm($FormUser);
    });

    //Modal-User
    $ModalFormUser.on('hidden.bs.modal', function () {
        clearForm($FormUser);
    });

    //Enter key Naviation
    enterFormNavigation($FormUser);
}
//Form - User
async function submitFormUser() {

    //Form validate
    if (isFormProcessing)
        return;

    if ($FormUser.valid()) {

        var formData = formToJsonString(document.getElementById($FormUser.attr('Id')));

        // Start loading
        $('#modal-loading').fadeIn();

        disableAll($FormUser, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + urlBaseUser + 'id', formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            if (response.Data !== undefined) {
                $('#id').val(response.Data.id);

                var active = response.Data.active === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var readOnly = response.Data.readOnly === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var deleted = response.Data.deleted === true ? "<i class=\"fas fa-check Checked\">" : "<i class=\"fas fa-check unChecked\">";
                var entrydate = moment(response.Data.entryDate).format('DD/MM/YY HH:mm');

                if (response.Action === "ADD") {
                    dxhGridUser.addRow(response.Data.id,
                        [0,
                            response.Data.id,
                            response.Data.firstName,
                            response.Data.lastName,
                            response.Data.jobTitle,
                            response.Data.phoneNumber,
                            response.Data.email,
                            response.Data.userName,
                            active,
                            readOnly,
                            deleted,
                            entrydate,
                            ''],
                        0);
                }
                else {

                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("chk")).setValue(0);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("Id")).setValue(response.Data.id);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("FirstName")).setValue(response.Data.firstName);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("LastName")).setValue(response.Data.lastName);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("JobTitle")).setValue(response.Data.jobTitle);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("PhoneNumber")).setValue(response.Data.phoneNumber);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("Email")).setValue(response.Data.email);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("Username")).setValue(response.Data.userName);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("Active")).setValue(active);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("ReadOnly")).setValue(readOnly);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("Deleted")).setValue(deleted);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("EntryDate")).setValue(entrydate);
                    dxhGridUser.cells(response.Data.id, dxhGridUser.getColIndexById("Dummy")).setValue('');
                }

                dxhGridUser.selectRowById(response.Data.id, false, true, false);
            }
        }

        showFormAlert(response.MessageType, response.Title, response.Message, $AlertFormUser, response.Errors);

        disableAll($FormUser, false);
        isFormProcessing = false;
        $('#modal-loading').fadeOut();

    }
}
//Edit - User
function loadUser(rId) {

    clearForm($FormUser);

    if (!loadInfo) {

        $('#modal-loading').fadeIn();

        var id = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("Id")).getValue();
        var firstName = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("FirstName")).getValue();
        var lastName = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("LastName")).getValue();
        var jobTitle = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("JobTitle")).getValue();
        var phoneNumber = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("PhoneNumber")).getValue();
        var email = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("Email")).getValue();
        var username = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("Username")).getValue();
        var active = dxhGridUser.cells(rId, dxhGridUser.getColIndexById("Active")).getValue();

        $('#Id', $FormUser).val(id);
        $('#FirstName', $FormUser).val(firstName);
        $('#LastName', $FormUser).val(lastName);
        $('#JobTitle', $FormUser).val(jobTitle);
        $('#PhoneNumber', $FormUser).val(phoneNumber);
        $('#Email', $FormUser).val(email);
        $('#UserName', $FormUser).val(username);

        if (active.includes('fas fa-check Checked'))
            $('#Active', $FormUser).prop('checked', true);

        $('#modal-loading').fadeOut();
    }
}
//Delete - User
async function deleteUser() {

    var UserId = dxhGridUser.getSelectedRowId();

    var rIds = [];

    dxhGridUser.forEachRow(function (id) {
        if (dxhGridUser.cells(id, 0).getValue() === "1")
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

                var urlDelete = rootPath + urlBaseUser + "Delete?rnd=" + createRandomString(10);
                var parameter = JSON.stringify({ ids: rIds });


                var response = await ajaxCall(urlDelete, parameter, false, Method.POST, Datatype.Json, ContentType.Json)

                if (response.Result) {
                    var errorMessage = '';

                    for (var i = 0; i < response.Data.deleted.length; i++) {
                        dxhGridUser.deleteRow(response.Data.deleted[i]);
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

//Load Roles of Selected User 
function LoadUserRoles(userId) {
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

    if (ind < 0) {
        UserRoles.push({ id: rolId, name: rolName });
    }
    else {
        UserRoles.splice(ind, 1);
    }

    dxhGridUser.setUserData(userId, "roles", UserRoles);
}

function doAterGridReload(dhxGrid) {

    var gridID = dhxGrid.getUserData("", "GridID");

    if (gridID === 'Rol')
        LoadUserRoles();
}