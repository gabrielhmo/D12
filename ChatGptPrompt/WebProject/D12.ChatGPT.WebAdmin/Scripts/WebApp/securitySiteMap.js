//Main Container
var $MainContainer = $('#container');
var $ContainerLayout = $('#MainContainer');


//DhxLayoutCell - SiteMap
var dhxTreeViewSiteMap;
var siteMapItemForm
var jsonTree = rootPath + "Ajustes/SiteMap/InitTree";

//DhxLayoutCell - Rol
var dhxToolbarRol;
var dxhGridRol;

//URL - Rol
var urlBaseRol = 'Ajustes/SiteMap/';
function UrlRol() {
    return rootPath + urlBaseRol + "Permisos";
}

//DhxLayout
function onReady() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 140);
}
function onResize() {
    SetContainerAvailableHeight($MainContainer, $ContainerLayout, 165);
}

//Init DhxLayout 
function initLayout() {

    //Attach Layout
    dhxLayout = new dhtmlXLayoutObject({
        pattern: '2U', //'3W'
        parent: 'MainContainer',
        offsets: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        cells: [
            { id: 'a', text: 'Mapa del Sitio', header: true, fix_size: [true, false] },
            //{ id: 'b', text: 'Configuración', header: false, fix_size: [false, false] },
            { id: 'b', text: 'Configuración de Permisos', header: true, fix_size: [true, false] }
        ]
    });

    dhxLayout.cells('a').setWidth(300);
    dhxLayout.cells('a').hideArrow();
    dhxLayout.cells('b').hideArrow();

    dhxLayout.setSeparatorSize(0, 5);
    //dhxLayout.setSeparatorSize(1, 5);

    //Set Progress On
    dhxLayout.progressOn();

    //Load DhxLayout
    InitBoxSiteMap();
    InitBoxRol();
}

//Grid box
function InitBoxSiteMap() {
    //InitDhxToolbarSiteMap();
    InitDhxTreeViewSiteMap();

    //Add TreeView Item Configuration
//    siteMapItemForm = document.getElementById("FormContainerSiteMap");
//    dhxLayout.cells("b").appendObject(siteMapItemForm);
}
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
            case "reload":
                reloadGrid(dhxLayout, dxhGridRol, UrlRol(), 'Rol', '');
                break;
        }
    });
}

//DhxToolbar Config
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
function InitDxhGridRol() {

    //dhxLayout - StatusBar
    dhxStatusBarUsuario = dhxLayout.cells('b').attachStatusBar({
        height: 50 // custom height
    });

    dxhGridRol = dhxLayout.cells("b").attachGrid();
    initGrid(dxhGridRol, 'Rol');
    dxhGridRol.parse(GetDhxGridConfRol(), "json");

    //Set default valgin (middle) for all columns
    setVerticalAlign(dxhGridRol);
    //Set columns header show/hide function
    setColHeader(dxhGridRol);

    //
    eXcell_link.prototype.getTitle = function () {
        return "Editar información";
    };

    if (isReadOnly)
        dxhGridRol.setColumnHidden(1, true);

    //OnDoubleClick
    dxhGridRol.attachEvent("onRowDblClicked", function (rId, cInd) {
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
    dxhGridRol.attachEvent("onCheck", async function (rId, cInd, state) {

        $('#modal-loading').fadeIn();


        //var id = myTreeView.getSelectedId();
        var siteMapId = dhxTreeViewSiteMap.getSelected();
        var colReadIndx = dxhGridRol.getColIndexById("Read");
        var colRWriteInd = dxhGridRol.getColIndexById("Write");

        var read = (dxhGridRol.cells(rId, colReadIndx).isChecked()) ? true : false;
        var write = (dxhGridRol.cells(rId, colRWriteInd).isChecked()) ? true : false;

        if (colReadIndx === cInd)
            read = state;

        if (colRWriteInd === cInd)
            write = state;

        var siteMapIds = [];
        var childs = dhxTreeViewSiteMap.getSubItems(siteMapId);

        if (childs.length > 0) {
            siteMapIds = childs.split(',');
        }

        var subChildsItem = [];

        for (var i = 0; i < siteMapIds.length; i++) {
            subChildsItem = getSubItems(siteMapIds[i]);

            if (subChildsItem.length > 0)
                siteMapIds.push(...subChildsItem);

            subChildsItem = [];
        }


        //Agregar el SitemMapId Seleccionado
        siteMapIds.unshift(siteMapId);

        var siteMapPolicies = {
            SiteMapId: siteMapIds,
            RolId: rId,
            Read: read,
            Write: write
        };

        var urlUpdatePolicies = rootPath + urlBaseRol + "UpdatePolicies?rnd=" + createRandomString(10);
        var parameter = JSON.stringify(siteMapPolicies);

        var response = await ajaxCall(urlUpdatePolicies, parameter, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            updateTreeSiteMapUserData(siteMapPolicies);
        }
        else {
            var message = '';
            for (let i = 0; i < response.errors.length; i++) {
                message += response.errors[i].messageTitle + '\r\n' +
                    response.errors[i].message + '\r\n\r\n';
            }

            ShowMessage(Status.Error, errorResponse.Title, message, false, 'toast-bottom-center');
        }

        showFormAlert(response.MessageType, response.Title, response.Message, '', response.Errors);

        $('#modal-loading').fadeOut();


    });

    dxhGridRol.load(UrlRol(), function () {
        dhxLayout.progressOff();
    }, 'json');

    $('#ChkRol').on('change', function () {

        if (this.checked)
            dxhGridRol.setCheckedRows(0, 1);
        else
            dxhGridRol.setCheckedRows(0, 0);
    });
}

//DhxGrid Config
function GetDhxGridConfRol() {
    var data = {
        head: [
            { id: 'chk', width: 43, type: 'ch', align: 'center', sort: 'na', value: '<div class="checkbox"><input type="checkbox" id="ChkRol"/><label for="UsuarioChk"></label></div>', hidden: 'false' },
            { id: "Id", width: 0, type: "ro", align: "left", sort: "na", value: "Id", hidden: "true" },
            { id: "Name", width: 300, type: "ron", align: "left", sort: "str", value: "Rol", hidden: "false" },
            { id: 'Read', width: 100, type: 'ch', align: 'center', sort: 'na', value: 'Lectura', hidden: 'false' },
            { id: 'Write', width: 100, type: 'ch', align: 'center', sort: 'na', value: 'Escritura', hidden: 'false' },
            { id: 'Dummy', width: '*', type: 'ro', align: 'left', sort: 'na', value: '', hidden: 'false' }
        ],
        rows: ''
    };

    return data;
}

//Init DhxTreeView
function InitDhxTreeViewSiteMap() {

    dhxTreeViewSiteMap = dhxLayout.cells("a").attachTree();
    dhxTreeViewSiteMap.setImagePath(rootPath + "Plugins/Dhtmlx/Skins/material/imgs/dhxtree_material/");

    //dhxTreeViewSiteMap.enableDragAndDrop(true);
    dhxTreeViewSiteMap.setDragBehavior('complex');
    dhxTreeViewSiteMap.enableKeyboardNavigation(true);
    dhxTreeViewSiteMap.attachEvent("onSelect", function (id) {
        SetPermisos(id);
    });

    LoadDataTree();
}

function LoadDataTree() {

    dhxTreeViewSiteMap.load(jsonTree, function () {
        dhxTreeViewSiteMap.openAllItems(0);
        //dhxTreeViewSiteMap.lockItem(1, true)

        dhxLayout.progressOff();
    }, "json");

}

function LoadPermisos(rId, cInd, state)
{
    var siteMapId = dhxTreeViewSiteMap.getSelected();
    var colReadIndx = dxhGridRol.getColIndexById("Read");
    var colRWriteInd = dxhGridRol.getColIndexById("Write");

    var read = (dxhGridRol.cells(rId, colReadIndx).isChecked()) ? true : false;
    var write = (dxhGridRol.cells(rId, colRWriteInd).isChecked()) ? true : false;

    if (colReadIndx === cInd)
        read = state;

    if (colRWriteInd === cInd)
        write = state;

    var siteMapIds = [];
    var childs = dhxTreeViewSiteMap.getSubItems(siteMapId);

    if (childs.length > 0) {
        siteMapIds = childs.split(',');
    }

    var subChildsItem = [];

    for (var i = 0; i < siteMapIds.length; i++) {
        subChildsItem = getSubItems(siteMapIds[i]);

        if (subChildsItem.length > 0)
            siteMapIds.push(...subChildsItem);

        subChildsItem = [];
    }


    //Agregar el SitemMapId Seleccionado
    siteMapIds.unshift(siteMapId);

    var siteMapPolicies = {
        SiteMapId: siteMapIds,
        RolId: rId,
        Read: read,
        Write: write
    };

}

//Load Roles of Selected User 
function SetPermisos(sitemapId) {

    dxhGridRol.checkAll(false);

    var permisos = dhxTreeViewSiteMap.getUserData(sitemapId, sitemapId);

    if (!IsNull(permisos)) {

        for (var i = 0; i < permisos.length; i++) {
            if (!IsNull(permisos[i])) {

                var cellRead = dxhGridRol.cells(permisos[i].id, 3);
                var cellWrite = dxhGridRol.cells(permisos[i].id, 4);

                cellRead.setValue(permisos[i].read)
                cellWrite.setValue(permisos[i].write)
            }
        }
    }
    //return permisos;
}
//Update User Roles
function updateTreeSiteMapUserData(newPermisos) {

    var newPermiso = {};
    var permisosList = [];


    for (var i = 0; i < newPermisos.SiteMapId.length; i++) {

        newPermiso = {
            id: newPermisos.RolId,
            read: newPermisos.Read ? 1 : 0,
            write: newPermisos.Write ? 1 : 0
        };

        var currentPermisos = dhxTreeViewSiteMap.getUserData(newPermisos.SiteMapId[i], newPermisos.SiteMapId[i]);

        currentPermisos.push(newPermiso);

        dhxTreeViewSiteMap.setUserData(newPermisos.SiteMapId[i], newPermisos.SiteMapId[i], currentPermisos);
        SetPermisos(newPermisos.SiteMapId[i]);
    }
}

function getSubItems(parentId)
{
    var siteMapIds = [];
    var text = dhxTreeViewSiteMap.getItemText(parentId);

    if (!IsNullOrEmpty(text)) {

        var childs = dhxTreeViewSiteMap.getSubItems(parentId);

        if (childs.length > 0) {
            siteMapIds = childs.split(',');

            if (siteMapIds.length > 0) {
                var subChilds = [];

                for (var i = 0; i < siteMapIds.length; i++) {
                    subChilds = getSubItems(siteMapIds[i]);

                    if (subChilds.length > 0) 
                        siteMapIds.push(...subChilds);

                    subChilds = [];
                }
            }
        }
    }

    return siteMapIds;
}

//Update User Roles
function updatePermisos(permisos) {

    var siteMapId = dhxTreeViewSiteMap.getSelected();
    var currentPermisos = loadPermisos(siteMapId);
    var siteMapIds = [];

    var childs = dhxTreeViewSiteMap.getSubItems(siteMapId);

    if (childs.length > 0) {
        siteMapIds = childs.split(',');
    }

    siteMapIds.unshift(siteMapId);

    var newPermiso = {
        id: permisos.RolId,
        read: permisos.Read ? 1 : 0,
        write: permisos.Write ? 1 : 0
    };

    currentPermisos.push(newPermiso);
    dhxTreeViewSiteMap.setUserData(siteMapId, siteMapId, currentPermisos);
    currentPermisos = loadPermisos(siteMapId);
}