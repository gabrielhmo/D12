var colsArray;

var ExportPath = rootPath + 'ExportData/CSV';

//Init Configuration
function initGrid(dhxGrid, gridName) {

    dhxGrid.setImagePath(rootPath + "Plugins/Dhtmlx/Skins/material/imgs/");
    dhxGrid.preventIECaching(true);

    //set global userdata
    dhxGrid.setUserData("", "GridID", gridName);

    dhxGrid.i18n.decimal_separator = "."
    dhxGrid.i18n.group_separator = ",";
    dhxGrid.setNumberFormat("0,000.00", 1);
    dhxGrid.setDateFormat("%m/%d/%Y H%:i");

    dhxGrid.enableMultiselect(true);
    //dhxGrid.enableMultiline(true);
    //dhxGrid.enableLightMouseNavigation(true);
    dhxGrid.enableRowsHover(true, "hover");
    dhxGrid.enableAlterCss("even", "uneven");
    dhxGrid.setStyle("background-color: #fff;", "line-height:1.42857143;padding:8px;", "", "line-height:1.42857143;padding:8px;");

    //dhxGrid.enableColumnAutoSize(true);
    //dhxGrid.enableAutoWidth(true);

    //Serialization Settings
    dhxGrid.enableCSVAutoID(true);
    setSerializableCols(dhxGrid);
    //userdata,selectedRowAttr,config,changedAttr,onlyChenaged,asCDATA
    dhxGrid.setSerializationLevel(false, false, false, false, false, true);
}
//Reload Grid and data
function reloadGrid(container, dhxGrid, url, element, paginator) {

    var sub = (url.indexOf('?') > 0) ? '&' : '?';

    var dataRespond;
    var parameter = sub + Math.random() * Math.random();
    var gridID = dhxGrid.getUserData("", "GridID");

    container.progressOn();

    //clear grid and load new data
    dhxGrid.clearAndLoad(url + parameter, function () {

        if (!IsNull(dhxGrid.UserData.gridglobaluserdata.values[2])) {

            var paginParameter = dhxGrid.UserData.gridglobaluserdata.values[2].paginParams;

            if (!IsNull(paginParameter)) {

                initPaging(container, dhxGrid, element,
                    paginParameter.totalRecords,
                    paginParameter.pageSize,
                    paginParameter.totalPages,
                    paginParameter.pageNumber);
            }
        }

        dhxGrid.setUserData('', 'GridID', gridID);
        if (typeof doAfterGridReload === 'function')
            doAfterGridReload(dhxGrid, container)
        else
            container.progressOff();

    }, 'json');
}

function clearGrid(dhxGrid) {
    var gridId = dhxGrid.getUserData("", "GridID");
    dhxGrid.clearAll();
    dhxGrid.setUserData("", "GridID", gridId);
}

//External Component

//Search form
function SearchComponent(id, dateRange) {
    var strCtrl = '<form id="frmSearch' + id + '" class="navbar-form form-horizontal navbar-right searToolbar" role="search" style="width:200; margin:0; padding:0;">';

    if (dateRange) {

        strCtrl +=
            `<div class="input-group pull-left" style="position:relative;width:160px;">
                <div id="reportrange" style="background: #fff; text-align: left; cursor: pointer; border: 1px solid rgba(0, 0, 0, 0.07);">
                  <span style="padding-left: 8px;"></span> <i class="fas fa-calendar" style="position: absolute;right: 10px;top: 10px;"></i>
                </div>
              </div>`;
    }


    strCtrl +=
        `<div class="input-group mar-btm" style="position:relative;">
            <input type="text" id="inputSearch${id}" name="inputSearch${id}" placeholder="Buscar" class="form-control">
            <div class="input-group-btn dropdown">
              <button id="btnSearch${id}" class="btn btn-primary" type="submit"><i class="fas fa-search"></i></button>
            </div>
          </div>
        </form>`

    return strCtrl;
}

function addToolbarBootstrapSelect({ id, container = "body", title = "Seleccionar", search = false, width = 100, dataSize = 10, disabled = '' }) {
    return `<select id="${id}" class="selectpicker" data-container="${container}" title="${title}" data-live-search="${search}" data-width="${width}" data-size="${dataSize}" ${disabled}>
    <option>${title}</option>
    </select>`;
}

//Set Column Header
function getColHeaderSearch(dhxGrid) {

    var totalCol = dhxGrid.getColumnsNum();
    var col = [];

    for (var i = 0; i < totalCol; i++) {

        if (dhxGrid.isColumnHidden(i))
            col.push('');
        else if (dhxGrid.getColumnId(i) === 'chk')
            col.push('');
        else if (dhxGrid.getColumnId(i) === 'lkEdit')
            col.push('');
        else if (dhxGrid.getColumnId(i) === 'Dummy')
            col.push('');
        else
            col.push('true');
    }

    if (col.length > 0)
        colList = col.join(',');

    dhxGrid.enableHeaderMenu(colList);

}

//Date Range Component
function initDateRange(linkedCalendars = false) {

    var now = moment();

    var start = moment().subtract(29, 'days');
    var end = moment();

    $('#reportrange').daterangepicker({
        "linkedCalendars": linkedCalendars,
        "showDropdowns": true,
        "minYear": 2017,
        "maxYear": now.year(+1),
        "showWeekNumbers": true,
        "timePicker": true,
        "timePicker24Hour": true,
        ranges: {
            'Hoy': [moment().hour(0).minute(0).second(0), moment().hour(23).minute(59).second(0)],
            'Ayer': [moment().subtract(1, 'days').hour(0).minute(0).second(0), moment().subtract(1, 'days').hour(23).minute(59).second(0)],
            'Últimos 7 días': [moment().subtract(6, 'days').hour(0).minute(0).second(0), moment().hour(23).minute(59).second(0)],
            'Últimos 30 días': [moment().subtract(29, 'days').hour(0).minute(0).second(0), moment().hour(23).minute(59).second(0)],
            'Mes actual': [moment().startOf('month').hour(0).minute(0).second(0), moment().endOf('month').hour(23).minute(59).second(0)],
            'Mes anterior': [moment().subtract(1, 'month').startOf('month').hour(0).minute(0).second(0), moment().subtract(1, 'month').endOf('month').hour(23).minute(59).second(0)]
        },
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "Del",
            "toLabel": "al",
            "customRangeLabel": "Personalizada",
            "weekLabel": "S",
            "daysOfWeek": [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Deciembre"
            ],
            "firstDay": 1
        },
        "startDate": start,
        "endDate": end,
        "showCustomRangeLabel": false,
        "alwaysShowCalendars": true,
        "opens": "left"
    }, cb);

    cb(start, end);

    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {

        if (typeof onDateRangeSelected === 'function') {
            onDateRangeSelected(picker.startDate, picker.endDate);
        }
    });
}
function updateComboDateRange(start, end) {
    $('#reportrange span').html(start.format('DD/MMM/YY') + ' - ' + end.format('DD/MMM/YY'));
    if (typeof doAterSetRange === 'function') { doAterSetRange(start, end); }

}

//DateTime Filter
function initDateTimeFilter() {
    var now = moment();
    $('.inputFilterDate').daterangepicker({
        "singleDatePicker": true,
        "linkedCalendars": false,
        "showDropdowns": true,
        "minYear": 2017,
        "maxYear": now.year(+1),
        "showWeekNumbers": false,
        "timePicker": true,
        "timePicker24Hour": true,
        "locale": {
            "format": "DD/MM/YYYY HH:mm",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "Del",
            "toLabel": "al",
            "customRangeLabel": "Personalizada",
            "weekLabel": "S",
            "daysOfWeek": [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Deciembre"
            ],
            "firstDay": 1
        },
        "showCustomRangeLabel": false,
        "alwaysShowCalendars": false,
        "opens": "center"
    });
}

//InitPageSize
function GetPageSize(id) {
    var pageSize =
        '  <div class="pull-left" style="position:relative;">\n' +
        '    <select class="pageSize" data-style="btn-primary" data-width="fit" data-container="" id="PageSize' + id + '" name="PageSize' + id + '"></select>\n' +
        '  </div>\n';
    return pageSize;
}

//Set Paging Component
function GetPagingComponent(id) {
    var dataBack = '';

    dataBack =
        '<div style="position:relative;height:50px;">\n' +
        '  <div id="Status' + id + '" style="display:inline-block;height:50px;width:40%;text-align:left;"><span id="PagingStatusMsg' + id + '" class="pull-left"></div>\n' +
        '  <div id="PageSize" style="display:inline-block;height:50px;width:15%;text-align:center;">\n' + GetPageSize(id) + '\n</div>\n' +
        '  <div id="paging' + id + '" style="display:inline-block;height:50px;width:45%;text-align:right;"></div>\n' +
        '</div> ';

    return dataBack;
}
//Paging dhxGrid
function initPaging(container, dhxGrid, element, TotalRecords, PageSize, TotalPages, PageNumber) {

    ReInitPaging(element);

    var txtFirst = '';
    var txtPrev = '';
    var txtNext = '';
    var txtLast = '';
    var txtRecordsFoundMessage = 'No se encontraron registros';
    var txtStartIndex = 0;
    var txtEndIndex = 0;

    if (TotalRecords > 0) {

        txtStartIndex = ((PageNumber * PageSize) - PageSize) + 1;
        txtEndIndex = (PageNumber * PageSize);

        if (txtEndIndex > TotalRecords)
            txtEndIndex = TotalRecords;

        txtRecordsFoundMessage = 'Mostrando del ' +
            '<span id="PagingStartIndex' + element + '">' + txtStartIndex + '</span>' +
            ' al <span id = "PagingEndIndex' + element + '"> ' + txtEndIndex + '</span>' +
            ' de <span id = "PagingTotalRecords' + element + '"> ' + TotalRecords + '</span> Registros';

        if (TotalPages > 10) {

            txtFirst = 'Primero';
            txtPrev = '<span aria-hidden="true">&laquo;</span>';
            txtNext = '<span aria-hidden="true">&raquo;</span>';
            txtLast = 'Último';
        }

        $('#paging' + element)
            .twbsPagination({
                totalPages: TotalPages,
                items: TotalRecords,
                itemOnPage: PageSize,
                startPage: PageNumber,
                visiblePages: 10,
                first: txtFirst,
                prev: txtPrev,
                next: txtNext,
                last: txtLast,
                href: false,
                paginationClass: 'pagination pull-right',
                onPageClick: function (event, selectedPage) {
                }
            }).on('page', function (event, selectedPage) {
                reloadGrid(container, dhxGrid, GetPaginUrl(element, selectedPage), element);
            });

        //Init Pagesize Select
        initPageSize(element, PageSize, TotalRecords);
    }

    $('#PagingStatusMsg' + element).html(txtRecordsFoundMessage);
}

//Init PageSize Select
function initPageSize(element, PageSize, TotalRecords) {

    if ($('#PageSize' + element).length > 0)
        $('#PageSize' + element).selectpicker('destroy');

    //Init Combo Page Size
    $("#PageSize" + element).empty().append('<option value="' + TotalRecords + '">Todos</option>');

    var strSelected = "selected";
    for (var i = 100; i < TotalRecords + 100; i += 100) {

        if (i === PageSize)
            strSelected = "selected";

        $("#PageSize" + element).append('<option value="' + i + '" ' + strSelected + '>' + i + '</option>');

        strSelected = '';
    }

    $('#PageSize' + element).selectpicker();
    $('#PageSize' + element).closest(".dhx_cell_statusbar_text").css('overflow', 'visible');
}
//Reinitializate Paging
function ReInitPaging(element) {

    //Destroy pagination object before init
    if ($('#paging' + element).data("twbs-pagination")) {
        $('#paging' + element).twbsPagination('destroy');
    }
}

//DHTMLGRID FUNCTIONS

//Set Attach Filter Header Column
function attachHeader(dhxGrid) {

    var totalCol = dhxGrid.getColumnsNum();
    var col = [];
    var initDateControl = false;

    for (var i = 0; i < totalCol; i++) {

        switch (dhxGrid.getColType(i)) {
            case 'filterText':
                //col.push('<input id="' + dhxGrid.getColumnId(i) + '" name="filterText" type="text" class="form-control colFilter has-feedback" autocomplete="off"></input><i class="fas fa-info-circle form-control-feedback text-mint"></i>');
                col.push('<input id="' + dhxGrid.getColumnId(i) + '" name="filterText" type="text" class="form-control colFilter has-feedback" autocomplete="off"></input>');
                break;
            case 'filterDate':
                col.push('<input id="' + dhxGrid.getColumnId(i) + '" name="filterText" type="text" class="form-control colFilter inputFilterDate" autocomplete="off"></input>');
                initDateControl = true;
                break;
            case 'filterDateRangeStart':
                col.push('<input id="' + dhxGrid.getColumnId(i) + '" name="filterText" type="text" class="form-control colFilter inputFilterDate" autocomplete="off"></input>');
                initDateControl = true;
                break;
            case 'filterDateRangeEnd':
                col.push('<input id="' + dhxGrid.getColumnId(i) + '" name="filterText" type="text" class="form-control colFilter inputFilterDate" autocomplete="off"></input>');
                initDateControl = true;
                break;
            default:
                col.push('');
        }

        //    if (initDateControl)
        //        initDateTimeFilter();
    }

    if (col.length > 0)
        colList = col.join(',');

    dhxGrid.attachHeader(colList);
    dhxGrid.hdr.rows[2].onclick = function (e) { (e || window.event).cancelBubble = true; };

}

function getFilterValues(dhxGrid) {

    var totalCol = dhxGrid.getColumnsNum();
    var col = [];

    for (var i = 0; i < dhxGrid.hdr.rows[2].cells.length; i++) {
        var inputFilter = $(dhxGrid.hdr.rows[2].cells[i]).find('input');
        if (inputFilter.length > 0) {
            var filterValue = $(inputFilter).val();
            col.push(filterValue.substring(0));
        }
        else {
            col.push('');
        }
    }

    return col;
}

//Set vertial alignment
function setVerticalAlign(dhxGrid, colList = null) {
    if (colList === null) {

        var totalCol = dhxGrid.getColumnsNum();
        var col = [];

        for (var i = 0; i < totalCol; i++) {
            col.push('middle');
        }

        if (col.length > 0)
            colList = col.join(',');
    }

    if (colList !== '')
        dhxGrid.setColVAlign(colList);
}

//Set Column Header
function setColHeader(dhxGrid) {

    var totalCol = dhxGrid.getColumnsNum();
    var col = [];

    for (var i = 0; i < totalCol; i++) {

        if (dhxGrid.isColumnHidden(i))
            col.push('');
        else if (dhxGrid.getColumnId(i) === 'chk')
            col.push('');
        else if (dhxGrid.getColumnId(i) === 'lkEdit')
            col.push('');
        else if (dhxGrid.getColumnId(i) === 'Dummy')
            col.push('');
        else
            col.push('true');
    }

    if (col.length > 0)
        colList = col.join(',');

    dhxGrid.enableHeaderMenu(colList);

}

//Get Grid Data delimited
function getData(dhxGrid, format) {
    var rowsNum = dhxGrid.getRowsNum();
    var cols = dhxGrid.getColumnsNum();
    var dataBack = "";

    var delimiterData = ',';

    if (format === DataFormat.Excel)
        delimiterData = '\t';

    var data = [];

    for (var i = 0; i < rowsNum; i++) {

        var id = dhxGrid.getRowId(i);
        var col = [];

        dhxGrid.forEachCell(id, function (cellObj, ind) {

            if (!dhxGrid.isColumnHidden(ind) && dhxGrid.getColType(ind) !== 'link') {

                if (ind > 0 && ind < cols) {
                    var cellVal = "";
                    switch (dhxGrid.getColType(ind)) {
                        case 'acheck':
                            cellVal = (cellObj.isChecked()) ? "VERDADERO" : "FALSO";
                            break;
                        case 'ch':
                            cellVal = (cellObj.isChecked()) ? "VERDADERO" : "FALSO";
                            break;
                        case 'combo':
                            cellVal = cellObj.getText();
                            break;
                        case 'co':
                            cellVal = cellObj.getText();
                            break;
                        case 'dhxCalendar':
                            cellVal = moment(cellObj.getDate()).format(formatDate);
                            cellVal = cellVal.replace(' 00:00', '');
                            break;
                        case 'dhxCalendarA':
                            cellVal = moment(cellObj.getDate()).format(formatDate);
                            cellVal = cellVal.replace(' 00:00', '');
                            break;
                        case 'link':
                            cellVal = '';
                            break;
                        case 'price':
                            cellVal = cellObj.getValue();
                            cellVal = cellVal.replace('$', '');
                            cellVal = cellVal.replace(',', '');
                            break;
                        default:

                            var cellValue = cellObj.getValue();

                            if (cellValue.indexOf('<i') === -1)
                                cellVal = cellObj.getValue();

                            if (cellValue.search('<i class="fa fa-check unChecked">') !== -1)
                                cellVal = 'FALSO';

                            if (cellValue.search('<i class="fa fa-check Checked">') !== -1)
                                cellVal = 'VERDADERO';

                            if (cellValue.indexOf('$') === -1) {
                                cellVal = cellVal.replace('$', '');
                                cellVal = cellVal.replace(',', '');
                            }
                    }

                    col.push(cellVal);
                }
            }
        });

        data.push(col.join(delimiterData));
    }

    dataBack = data.join('\n');

    dataBack = getColsHeaders(dhxGrid, delimiterData) + '\n' + dataBack;

    return dataBack;
}

//Convert dhxGrid to Table
function dhxGridToTable(dhxGridObj) {
    var csv = dhxGridObj.serializeToCSV();
    //var xml = dhxGridObj.serialize();

    parseResult(csv);
}

//Copy Grid data
function copyData(dhxGrid, format) {
    var dataBack = getData(dhxGrid, format);
    //submitFORM
    showCopyDialog(dataBack);
}
//Enable grid column for serialization
function setSerializableCols(dhxGrid) {
    var colList = "";

    var cols = dhxGrid.getColumnsNum();

    for (var i = 0; i < cols; i++) {

        if (i === 0) {
            colList = "false";
        }
        else if ((cols - i) === 1) {
            colList += ",false";
        } else {

            if (dhxGrid.getColType(i) === 'link') {
                colList += ",false";
            } else {

                if (!dhxGrid.isColumnHidden(0)) {
                    colList += ",true";
                }
            }
        }

    }
    dhxGrid.setSerializableColumns(colList);
}
//Convert grid to json Object
function getGridJson(dhxGrid) {
    var csv = getData(dhxGrid, DataFormat.CSV)
    var newJson = Papa.parse(csv, { header: true });
    return newJson;
}
//Show dialog for copy
function showCopyDialog(textToCopy) {

    //window.prompt("Copy to clipboard: Ctrl+C, Enter", cvsGrid);

    var booxModal = bootbox.dialog({

        title: "Para copiar presione: Ctrl+C",

        message: '<div class="row">  ' +
            '<div class="col-md-12"> ' +
            '<form class="form-horizontal"> ' +
            '<div class="form-group"> ' +
            '<textarea id="copytext" class="form-control col-md-12">' + textToCopy + '</textarea>' +
            '</div>' +
            '</form> </div></div>',

        buttons: {
            success: {
                label: "Close",
                className: "btn-success"
            }
        }
    });

    $(document).on("shown.bs.modal", function (event) {
        $('#copytext').select();
    });

    $("#copytext").on('copy', function () {
        booxModal.modal('hide');
        ShowMessage(Status.Info, "Texto copiado al portapapeles", "", true, '');
    });
}
//Disable Grid Rows
function disableALL(dhxGrid, status) {

    var rowsIds = dhxGrid.getAllRowIds();

    for (var i = 0; i < rowsIds.length; i++) {
        //dhxGrid.cells(rowsIds[i], 0).setDisabled(true);

        dhxGrid.lockRow(rowsIds[i], status);
    }
}
//Disable Grid Rows
function disableCol(dhxGrid, colIndex, status) {

    var rIds = dhxGrid.getAllRowIds();

    if (!IsNull(rIds)) {

        var rowsIds = rIds.split(',');

        for (var i = 0; i < rowsIds.length; i++) {
            dhxGrid.cells(rowsIds[i], colIndex).setDisabled(status);
        }
    }
}
//Get list of columns to enable update trigger
function getColsTriggerUpdate(dhxGrid) {

    var cols = dhxGrid.getColumnsNum();

    colsArray.push(false);

    for (var i = 1; i < cols - 1; i++) {
        colsArray.push(true);
    }

    colsArray.push(false);
}
//Get Grid Header lables delimited
function getColsHeaders(dhxGrid, delimiterData) {

    var headerColLabel = "";
    var colsNum = dhxGrid.getColumnsNum();

    for (var i = 1; i < colsNum - 1; i++) {

        if (!dhxGrid.isColumnHidden(i) && dhxGrid.getColType(i) !== 'link') {
            headerColLabel += dhxGrid.getColumnLabel(i);

            if (i < colsNum - 2)
                headerColLabel += delimiterData;
        }
    }

    return headerColLabel;
}
//Export Grid to File
function exportToFile(dhxGrid, fileName, format) {
    var dataBack = getData(dhxGrid, format);

    submitFORM(dataBack, fileName);
}
//Submit CSV grid to generate file
function submitFORM(dataCSV, CSVFileName) {

    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", ExportPath);
    form.setAttribute("target", "_blank");

    //Move the submit function to another variable
    //so that it doesn't get overwritten.
    form._submit_function_ = form.submit;

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "cvsData");
    hiddenField.setAttribute("value", dataCSV);
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "cvsFileName");
    hiddenField.setAttribute("value", CSVFileName);
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form._submit_function_();
}
//Print Grid
function printGrid(dhxGrid, documentPrint) {

    if (dhxGrid.getRowsNum() > 0) {

        var tableExtraInfo = "";

        //dhxGrid.printView();
        var jsonData = getGridJson(dhxGrid);

        var jsonHtmlTable = ConvertJsonToTable(jsonData.data, 'printTable', 'table table-striped table-bordered', '');

        $(documentPrint).find('#printTable').append(jsonHtmlTable);

        tableExtraInfo = $(documentPrint).find('#printTable tr').find('th').last().html();

        if (tableExtraInfo === '__parsed_extra')
            $(documentPrint).find('#printTable  tr').find('th:last, td:last').remove();

        $(documentPrint).find('#reportTitles span.printDate').append('Fecha de Impresión: ' + moment(Date.now()).format("DD/MM/YYYY HH:mm"))

        $(documentPrint).print('basicPrint.css?' + Math.random() * Math.random(), false);
    }

}
//Get Partial View with print header
function print(dhxGrid, headerName, title) {

    if (headerName === undefined)
        headerName = 'Basic';

    var toURL = rootPath + "PrintHeaders?" + Math.random() * Math.random();

    var parameters = {
        "headerName": headerName
    };

    $.ajax({
        url: toURL,
        type: "POST",
        data: parameters
    })
        .done(function (htmlCode) {
            //Request complete
            if (htmlCode !== undefined) {
                htmlCode = htmlCode.replace("#PrintTitle#", title);
                printGrid(dhxGrid, $(htmlCode), title);
            }
        })
        .fail(function () {
            //Request fail
        })
        .always(function () {
            //Do always
        });
}
//Resize grid with dhxWindows
function resizedhxWinGrid(dhxGrid, win) {

    var dim = win.getDimension(); // returns [w,h]
    var htmlGrid;

    var winFrameDoc = win.getFrame();
    var innerDoc = winFrameDoc.contentDocument || winFrameDoc.contentWindow.document;

    $(innerDoc).find('#dhxGrid').width(dim[0]);

    if (win.isMaximized())
        $(innerDoc).find('#dhxGrid').height($(innerDoc).height() - 100);
    else
        $(innerDoc).find('#dhxGrid').height(dim[1] - 130);

    dhxGrid.setSizes();

}
//Actions for Unloads the document
function doOnUnload(dhxGrid) {

    if (dhxGrid !== null) {
        //dhxGrid.destructor();
        dhxGrid = null;
    }

    if (dhxWins !== null && dhxWins.unload !== null) {
        dhxWins.unload();
        dhxWins = null;
    }
}
//Convert CSV to HTML Table
function parseResult(result) {
    var resultArray = [];
    result.split("\n").forEach(function (row) {
        var rowArray = [];
        row.split(",").forEach(function (cell) {
            rowArray.push(cell);
        });
        resultArray.push(rowArray);
    });
    console.log(resultArray);
    return resultArray;
}

//Custom Column Types Read Only
function eXcell_filterText(cell) { //the eXcell name is defined here
    if (cell) {                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function () { }  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function () { return true; }
    this.setValue = function (val) {
        this.setCValue(val, val);
    }
}
eXcell_filterText.prototype = new eXcell;// nests all other methods from the base class

//DatePicker
function eXcell_filterDate(cell) { //the eXcell name is defined here
    if (cell) {                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function () { }  //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function () { return true; }
    this.setValue = function (val) {
        this.setCValue(val, val);
    }
}
eXcell_filterDate.prototype = new eXcell;// nests all other methods from the base class//DatePicker
