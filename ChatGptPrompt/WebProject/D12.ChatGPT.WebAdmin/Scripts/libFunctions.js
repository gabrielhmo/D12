//const { error } = require("jquery");

//Enums
const AlertType = Object.freeze({ Error: Symbol("Error"), Success: Symbol("Success"), Info: Symbol("Info"), Warning: Symbol("Warning"), Unknown: Symbol("Unknown"), None: Symbol("None") });
var dbEvent = { Save: "Save", Update: "Update", Delete: "Delete", Validation: "Validation", Duplicity: "Duplicity", Required: "Required" };
var DataFormat = { Excel: "Excel", CSV: "CSV" };
var Method = { GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE" };
var Datatype = { Default: '', XML: 'xml', Json: 'json', Script: 'script', Html: 'html', Text: 'text' };
var ContentType = { Default: 'application/x-www-form-urlencoded', Json: 'application/json', Multipart: 'multipart/form-data', PlainText: 'text/plain' }

function ajaxResponse(response) {
    if (IsNull(response)) {
        this.Action = '';
        this.Result = false;
        this.Data = '';
        this.StatusCode = 0;
        this.Title = '';
        this.Message = '';
        this.Errors = [];
        this.MessageType = AlertType.None;
        this.ReturnUrl = '';
    }
    else {
        this.Action = response.Action;
        this.Result = response.Result;
        this.Data = response.Data;
        this.StatusCode = response.StatusCode;
        this.Title = response.Title;
        this.Message = response.Message;
        this.Errors = IsNull(response.Errors) ? [] : response.Errors;
        this.MessageType = response.MessageType;
        this.ReturnUrl = response.ReturnUrl;
    }
}

async function ajaxCall(url, paramData, useToken, method, dataType, contentType, useAntyForgery = true) {

    var antiForgeryToken = $('input[name="__RequestVerificationToken"]').val();
    var ajaxResult;

    var ajaxPromise = await new Promise((resolve, reject) => {

        if (IsNullOrEmpty(method))
            method = Method.POST;

        if (IsNullOrEmpty(dataType))
            dataType = Datatype.Default;

        if (IsNullOrEmpty(contentType))
            contentType = ContentType.Default;

        if (IsNullOrEmpty(useToken))
            useToken = false;

        var header = {};

        if (useAntyForgery && $('input[name="__RequestVerificationToken"]').length > 0) {
            if (IsNullOrEmpty(antiForgeryToken)) {
                reject({
                    Result: false,
                    Status: '',
                    Data: '',
                    Title: 'Se requiere un token',
                    Message: 'Para comunicarse con el servidor se requiere el token Anti-Forgery'
                });
                return;
            }
        }
        else {
            header['RequestVerificationToken'] = antiForgeryToken;
        }

        if (useToken) {
            header['Authorization'] = $`Bearer ${localStorage.getItem("token")}`;
        }

        $.ajax({
            url: url,
            headers: header,
            type: method,
            dataType: dataType,
            contentType: contentType,
            cache: false,
            data: paramData
        })
            .done(function (response) {

                var responseSuccess = {
                    Result: response.result,
                    StatusCode: response.statusCode,
                    Data: response.data,
                    Title: response.title,
                    Message: response.message,
                    MessageType: response.messageType,
                    Errors: response.errors,
                    ReturnUrl: response.returnUrl,
                    Action: IsNullOrEmpty(response.action) ? '' : response.action
                };
                resolve(new ajaxResponse(responseSuccess));
            })
            .fail(function (req, status, errorMsg) {

                var ErrorsFound = '';
                var errorResponse;

                if (!IsNull(req.responseJSON)) {

                    if (!IsNull(req.responseJSON.errors)) {
                        for (var i = 0; i < req.responseJSON.errors.length; i++) {
                            ErrorsFound += '<strong> - ' + req.responseJSON.errors[i] + '</strong><br/>';
                        }
                    }

                    if (!IsNullOrEmpty(ErrorsFound))
                        req.responseJSON.message = req.responseJSON.message + '<br/>' + ErrorsFound;

                    errorResponse = {
                        Title: req.responseJSON.status + ' - ' + req.responseJSON.title,
                        Message: req.responseJSON.message
                    };
                }
                else {
                    errorResponse = ajaxErrorMessage(req, errorMsg)
                }

                var responseError = {
                    Result: false,
                    StatusCode: req.status,
                    Data: null,
                    Title: errorResponse.Title,
                    Message: errorResponse.Message,
                    MessageType: AlertType.Error,
                    ReturnUrl: req.returnUrl
                };

                reject(new ajaxResponse(responseError));
            });
    }).then(function (result) {
        ajaxResult = result;
    }, function (error) {
        ajaxResult = error;
    });

    return ajaxResult;
}

function ajaxErrorMessage(jqXHR, exception) {
    // Our error logic here
    var dataBack = {
        Title: '',
        Message: ''
    };

    switch (jqXHR.status) {
        case 0:
            dataBack.Title = 'Not Response';
            dataBack.Message = 'No cuenta con conexión a internet, verifique su conexión e intente de nuevo.';
            break;
        case 400:
            // Bad Request
            dataBack.Title = 'Error 400 - Bad Request'
            dataBack.Message = 'Solicitud incorrecta';
            break;
        case 404:
            // Not Found 
            dataBack.Title = 'Error 404 - Not Found'
            dataBack.Message = 'Página no encontrada. Por favor, verifique la URL.';
            break;
        case 401:
            // Unauthorized
            dataBack.Title = 'Error 401 - Unauthorized'
            dataBack.Message = 'El recurso que está solicitando requiere autenticación, inicie sesión primero e intente de nuevo.';
            break;
        case 403:
            // Forbidden
            dataBack.Title = 'Error 403 - Forbidden'
            dataBack.Message = 'No está autorizado al recurso que solicita, por favor contacte con el área de soporte';
            break;
        case 500:
            // Forbidden
            dataBack.Title = 'Error 500'
            dataBack.Message = 'Internal Server Error';
            break;
        default:
            if (IsNullOrEmpty(exception)) {
                //Something bad happened
                if (exception === 'parsererror') {
                    dataBack.Title = 'Parser Error'
                    dataBack.Message = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    dataBack.Title = 'Timeout error'
                    dataBack.Message = 'Request Timeout';
                } else if (exception === 'abort') {
                    dataBack.Title = 'Request Canceled'
                    dataBack.Message = 'Ajax request canceled';
                } else {
                    dataBack.Title = 'Internal Server Error'
                    dataBack.Message = 'Uncaught Error.\n' + jqXHR.responseText;
                }
            }
            break;
    }

    return dataBack;
}


//Set default value
function DefaultFor(arg, val) {

    if (arg === undefined || arg === null) {
        arg = val;
    }

    return arg;
}

//Set Container Available Height
function SetContainerAvailableHeight(container, element, correction) {

    if (IsNull(correction))
        correction = 0;

    element.height(container.height() - correction);
}

//Move div to other parent
$(function () {
    $.fn.moveTo = function (selector) {
        return this.each(function () {
            var cl = $(this).clone();
            $(cl).prependTo(selector);
            $(this).remove();
        });
    };
});

//Get Document Width
$.getDocWidth = function () {
    return Math.max(
        $(document).width(),
        $(window).width(),
        /* For opera: */
        document.documentElement.clientWidth
    );
};

//Get Document Height
$.getDocHeight = function () {
    return Math.max(
        $(document).height(),
        $(window).height(),
        /* For opera: */
        document.documentElement.clientHeight
    );
};

// Create a jquery plugin that prints the given element.
jQuery.fn.print = function (fileStyles, debug) {

    var frameW = "1px";
    var frameH = "1px";
    var frameL = "-9999px";
    var bgColor = "none";
    var frameMedia = "print";

    if (debug) {
        frameW = "980px";
        frameH = "740px";
        frameL = "190px";
        bgColor = "#fff";
        frameMedia = "screen";
    }

    // NOTE: We are trimming the jQuery collection down to the
    // first element in the collection.
    if (this.length > 1 && !debug) {
        this.eq(0).print();
        return;
    } else if (!this.length) {
        return;
    }


    // ASSERT: At this point, we know that the current jQuery
    // collection (as defined by THIS), contains only one
    // printable element.

    // Create a random name for the print frame.
    var strFrameName = ("printer-" + (new Date()).getTime());

    // Create an iFrame with the new name.
    var jFrame = $("<iframe name='" + strFrameName + "'>");

    // Hide the frame (sort of) and attach to the body.
    jFrame
        .css("width", frameW)
        .css("height", frameH)
        .css("position", "absolute")
        .css("left", frameL)
        .css("backgroundColor", bgColor)
        .appendTo($("body:first"))
        ;

    // Get a FRAMES reference to the new frame.
    var objFrame = window.frames[strFrameName];

    // Get a reference to the DOM in the new frame.
    var objDoc = objFrame.document;

    // Grab all the style tags and copy to the new
    // document so that we capture look and feel of
    // the current document.

    // Create a temp document DIV to hold the style tags.
    // This is the only way I could find to get the style
    // tags into IE.
    var jStyleDiv = $("<div>").append(
        $("style").clone()
    );

    // Write the HTML for the document. In this, we will
    // write out the HTML of the current element.
    objDoc.open();
    objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    objDoc.write("<html>");
    objDoc.write("<head>");
    objDoc.write('<link rel="Stylesheet" href="' + rootPath + 'Content/printstyles/' + fileStyles + '?' + Math.random() * Math.random() + '" type="text/css" media="' + frameMedia + '"/>');
    objDoc.write("<title>");
    objDoc.write(document.title);
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    objDoc.write("</head>");
    objDoc.write("<body>");
    objDoc.write(this.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();

    // Print the document.

    setTimeout(
        function () {
            objFrame.focus();
            objFrame.print();
        },
        (1000)
    );

    // Have the frame remove itself in about a minute so that
    // we don't build up too many of these frames.
    setTimeout(
        function () {
            if (!debug)
                jFrame.remove();
        },
        (60 * 1000)
    );
}

//Allow backspace without go back
$(function () {
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function (e) {
        if (e.which === 8) { // 8 == backspace
            if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                e.preventDefault();
            }
        }
    });
});

//String Helpers
//Validate if string is null or empty
function IsNullOrEmpty(value) {
    return (value === null || value === undefined || value === '');
}
//Validate if string is null or undefined
function IsNull(value) {
    return (value === null || value === undefined);
}
//Check if value is numeric
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
//Create randon string
function createRandomString(length) {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';

    for (let i = 0; i < length; i++) {
        let indice = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indice);
    }

    return resultado;
}
//PaddingLeft
Number.prototype.pad = function (size) {
    var sign = Math.sign(this) === -1 ? '-' : '';
    return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
}
//Capitalize word
function Capitalize(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
function CamelCase(str, spaces) {
    if (IsNullOrEmpty(spaces))
        false;

    var result = str.replace(/([A-Z])/g, " $1");
    str = result.charAt(0).toUpperCase() + result.slice(1);

    if (!spaces)
        str = str.replace(/ /g, "");

    return str;
}
function replaceSpace(str, char) {

    if (!IsNullOrEmpty(str)) {
        str = str.trim();
        return str.replace(/ /g, "_");
    }
    else {
        return "";
    }
}

function toString(str) {
    if (IsNullOrEmpty(str))
        return '';
    else
        return str;
}

function countCharacters(str) {

    if (IsNullOrEmpty(str))
        return 0;

    return typeof (str) === 'string' && str.trim().length;
}
function countWords(str) {

    if (IsNullOrEmpty(str))
        return 0;

    return typeof (str) === 'string'
        && str.trim().split(/\s+/).filter(st => st != '').length;
}

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

//Form Helper
//Enable navigation form items with Enter key
function enterFormNavigation(formObj) {

    $.fn.enterNext = function () {
        var _i = 0;
        $('input[type=text], select, button', this)
            .each(function (index) {
                _i = index;
                $(this)
                    .addClass('tab' + index)
                    .keydown(function (event) {
                        if (event.keyCode === 13) {
                            $('.tab' + (index + 1)).focus();
                            event.preventDefault();
                        }
                    });
            });
        $("input[type=submit]", this).addClass('tab' + (_i + 1));
    }

    $(formObj).enterNext();
}

function getCursorPos(input) {
    if ("selectionStart" in input && document.activeElement == input) {
        return {
            start: input.selectionStart,
            end: input.selectionEnd
        };
    }
    else if (input.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === input) {
            var rng = input.createTextRange();
            rng.moveToBookmark(sel.getBookmark());
            for (var len = 0;
                rng.compareEndPoints("EndToStart", rng) > 0;
                rng.moveEnd("character", -1)) {
                len++;
            }
            rng.setEndPoint("StartToStart", input.createTextRange());
            for (var pos = { start: 0, end: len };
                rng.compareEndPoints("EndToStart", rng) > 0;
                rng.moveEnd("character", -1)) {
                pos.start++;
                pos.end++;
            }
            return pos;
        }
    }
    return -1;
}
function setCursorPos(input, start, end) {
    if (arguments.length < 3) end = start;
    if ("selectionStart" in input) {
        setTimeout(function () {
            input.selectionStart = start;
            input.selectionEnd = end;
        }, 1);
    }
    else if (input.createTextRange) {
        var rng = input.createTextRange();
        rng.moveStart("character", start);
        rng.collapse();
        rng.moveEnd("character", end - start);
        rng.select();
    }
}

//Clear all form controls
function clearForm($form) {
    $form.find(':input').not(':button, :submit, :reset, :checkbox, :radio').val('');
    $form.find(':checkbox, :radio').prop('checked', false);
    $form.find('.selectpicker').selectpicker('val', '');
    $("input:radio:first-child").attr('checked', true);

    $form.get(0).reset()

    ResetValidations($form);
}
//Clear validation messages
function ResetValidations($form) {

    //reset jQuery Validate's internals
    $form.validate().resetForm();

    $('.field-validation-error')
        .removeClass('field-validation-error')
        .addClass('field-validation-valid');

    $('.input-validation-error')
        .removeClass('input-validation-error')
        .addClass('valid');

    //reset unobtrusive validation summary, if it exists
    $form.find("[data-valmsg-summary=true]")
        .removeClass("validation-summary-errors")
        .addClass("validation-summary-valid")
        .find("ul").empty();

    //reset unobtrusive field level, if it exists
    $form.find("[data-valmsg-replace]")
        .removeClass("field-validation-error")
        .addClass("field-validation-valid")
        .empty();
}
//Disable all form controls
function disableAll(form, status) {
    $('input:not(.disb), button, textarea, table, select, submit', form).prop("disabled", status);
}

//Get Json string from form controls

function formToJson(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");

    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        var type = element.type;

        if (typeof obj[name] === 'undefined') {
            if (type === 'checkbox') {

                if ($(element).is(':checked')) {
                    obj[name] = 'True';
                    $(element).val('true');
                }
                else {
                    obj[name] = 'False';
                    $(element).val('false');

                }

            }
            else if (type === 'radio') {
                obj[name] = $('input[name=' + name + ']:checked', form).val()
            }
            else {
                if (name) {
                    obj[name] = value;
                }
            }
        }
    }
    return obj;
}
function formToJsonString(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");

    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        var type = element.type;

        if (typeof obj[name] === 'undefined') {
            if (type === 'checkbox') {

                if ($(element).is(':checked')) {
                    obj[name] = 'True';
                    $(element).val('true');
                }
                else {
                    obj[name] = 'False';
                    $(element).val('false');

                }

            }
            else if (type === 'radio') {
                obj[name] = $('input[name=' + name + ']:checked', form).val()
            }
            else {
                if (name) {
                    obj[name] = value;
                }
            }
        }
    }

    return JSON.stringify(obj);
}

function overFlowText(maxLen, text) {
    if (!IsNullOrEmpty(text))
        return text.substring(0, maxLen - 3) + '...';
    else
        return text;
}
//Binding form with json object properties
function jsonToFormBinding(jsonObj, form) {
    if (!IsNull(jsonObj) && !IsNull(form) && form.length > 0) {

        for (var key in jsonObj) {

            var htmlControl = document.getElementsByName(CamelCase(key));
            var value = jsonObj[key];

            for (i = 0; i < htmlControl.length; i++) {

                if (htmlControl[i].type === "checkbox") {
                    if (value === true)
                        htmlControl[i].checked = true;
                    else
                        htmlControl[i].checked = false;
                }
                if (htmlControl[i].type === "radio") {
                    $("input[name=" + htmlControl[i].name + "][value=" + value + "]").prop('checked', true);
                }
                else {
                    htmlControl[i].value = value;
                }
            }

        }

        if (document.getElementsByClassName('selectpicker') !== null)
            $('.selectpicker').selectpicker('render');
    }
}

//Create default logoff form submition
function LogOff() {

    var form = document.createElement("form");
    form.setAttribute("id", "LogOff");
    form.setAttribute("method", "post");
    form.setAttribute("action", rootPath + "Account/LogOff");
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("name", "__RequestVerificationToken");
    hiddenField.setAttribute("value", $('[name= "__RequestVerificationToken"]').val());
    hiddenField.setAttribute("type", "hidden");
    form.appendChild(hiddenField);
    document.body.appendChild(form);

    form.submit();
}

function showFormAlert(alertType, title, message, errors, miliseconds = 5000) {

    $('.modalStatusbar').empty()
    
    let popErrorLink = '';
    let alertDiv = '';

    let messageBody = `<h5 class="pad-no mar-no" " style="color:white;display:inline-block">${title} <small style="color:white;">${message}</small></h5>`;
    let iconClose = '<i class="far fa-times-circle fa-lg" onClick="hideFormAlert();" style="padding-left: 15px;"></i>';

    if (isNumeric(alertType)) {
        switch (alertType) {
            case 0:
                alertType = AlertType.Error;
                let popErrorContent = '';
                if (!IsNullOrEmpty(errors)) {

                    popErrorLink = `<a href="#" class="alert-link" onClick='openPopLogger("${title}","${message}", "danger")'>Más Información</a>`;
                    popErrorContent = getErrorContent(errors);
                }

                alertDiv = `<div class="bg-danger pad-all text-right" style="color:white;">${messageBody} ${popErrorLink} ${iconClose}</div><div class="popError" style="display:none;">${popErrorContent}</div>`;
                miliseconds = 86400000;
                break;
            case 1:
                alertType = AlertType.Success;
                alertDiv = `<div class="bg-info pad-all text-right" style="color:white;">${messageBody} ${iconClose}</div>`;
                miliseconds = 2500;
                break;
            case 2:
                alertType = AlertType.Info;
                alertDiv = `<div class="bg-info pad-all text-right" style="color:white;">${messageBody} ${iconClose}</div>`;
                break;
            case 3:
                alertType = AlertType.Warning;
                alertDiv = `<div class="bg-warning pad-all text-right" style="color:white;">${messageBody} ${iconClose}</div>`;
                break;
            case 4:
                alertType = AlertType.Unknown;
                alertDiv = `<div class="bg-mint pad-all text-right" style="color:white;">${messageBody} ${iconClose}</div>`;
                break;
            case 5:
                alertType = AlertType.None;
                alertDiv = `<div class="bg-dark pad-all text-right" style="color:white;">${messageBody} ${iconClose}</div>`;
                break;
        }
    }

    $('.modalStatusbar').append(alertDiv);
    $('.modalStatusbar').addClass('animated fadeIn').show('slow');

    if (alertType == AlertType.Error)
        openPopLogger(title, message, "danger");

    setTimeout(
        function () {
            hideFormAlert();
        },
        (miliseconds)
    );
}
function hideFormAlert() {
    $('.modalStatusbar').addClass('fadeOut').hide('slow', function () {
        $('.modalStatusbar').removeClass('fadeOut animated fadeIn');
    });
}
function getErrorContent(logData) {
    var errorContent = '';

    if (!IsNull(logData)) {
        var logDetailAction = '<p id="showLogDetails" class="text-right"><a href="#" onClick="showLogDetails()"><small>Mostar detalles</small></a></p>';
        logDetailAction += '<p id="hideLogDetails" class="text-right" style="display:none;"><a href="#" onClick="showLogDetails()"><small>Ocultar detalles</small></a></p>';

        var errorUL = $('<ul class="list-group list-group-striped" />');

        for (let i = 0; i < logData.length; i++) {

            var errorList = logData[i].message.split('\r\n');

            for (var l = 0; l < errorList.length; l++) {
                var errorItem = $('<li class="list-group-item"/>').html(errorList[l]);
                errorUL.append(errorItem);
            }

            if (!IsNullOrEmpty(logData[i].reference)) {
                var logReferences = logData[i].reference.replace(logData[i].message, '');
                errorItem = $('<li class="list-group-item logDetail" style="display:none;"/>').html(logReferences);
                errorUL.append(errorItem);
            }
        }

        errorContent = logDetailAction + errorUL.get(0).outerHTML;
    }

    return errorContent;
}

function openPopLogger(title, message, color) {

    var errorContent = $('.popError','.modalStatusbar').html();

    var popUpContent = `
        <div class="panel panel-${color}">
            <div class="panel-heading">
                <div class="panel-control">
                    <button class="btn btn-default btnClosePopUpInfo"><i class="demo-psi-cross"></i></button>
                </div>
                <h3 class="panel-title">${title}</h3>
            </div>
            <div class="panel-errors pad-all">
            <h4 class="pad-btm text-${color}">${message}</h4>
            ${errorContent}
            </div>
        </div>`;

    $('#popLogger').append(popUpContent);

    $('#popLogger .btnClosePopUpInfo').click(function () {
        $('#popLogger').removeClass('animated bounceIn');
        $('#popLogger').addClass('animated bounceOut');
        $('#popLogger').empty();
        $('#popLogger').hide();

    });

    $('#popLogger').removeClass('animated bounceOut');
    $('#popLogger').show().addClass('animated bounceIn');

}
function openPopValidation(container) {

    var errorContent = $(container).html();

    var popUpContent = `
        <div class="panel panel-warning">
            <div class="panel-heading">
                <div class="panel-control">
                    <button class="btn btn-default btnClosePopUpInfo"><i class="demo-psi-cross"></i></button>
                </div>
                <h3 class="panel-title">${title}</h3>
            </div>
            <div class="panel-errors pad-all">${errorContent}</div>
        </div>`;

    $('#popLogger').append(popUpContent);

    $('#popLogger .btnClosePopUpInfo').click(function () {
        $('#popLogger').removeClass('animated bounceIn');
        $('#popLogger').addClass('animated bounceOut');
        $('#popLogger').empty();

    });

    $('#popLogger').removeClass('animated bounceOut');
    $('#popLogger').show().addClass('animated bounceIn');

}

function showLogDetails() {
    $('.logDetail', '#popLogger').toggle();
    $('#showLogDetails', '#popLogger').toggle();
    $('#hideLogDetails', '#popLogger').toggle();
}
function ShowMessage(status, title, message, isToastr, position, callback) {

    var timeout = 5000;
    var extendedTimeOut = 1000;
    var progressBar = true;
    var toastType = "success";
    var titleOpt = "";

    position = IsNullOrEmpty(position) ? 'toast-bottom-right' : position;
    isToastr = (isToastr === true) ? true : false;

    if (IsNullOrEmpty(title))
        title = '';

    if (IsNullOrEmpty(message))
        message = '';

    if (isNumeric(status)) {
        switch (status) {
            case 0:
                status = AlertType.Error;
                break;
            case 1:
                status = AlertType.Success;
                break;
            case 2:
                status = AlertType.Info;
                break;
            case 3:
                status = AlertType.Warning;
                break;
            case 4:
                status = AlertType.Empty;
                break;
        }
    }

    switch (status) {
        case AlertType.Success:
            statusClass = "gritter-success";
            toastType = "success";
            break;
        case AlertType.Info:
            statusClass = "gritter-info";
            toastType = "info";
            break;
        case AlertType.Warning:
            statusClass = "gritter-warning";
            toastType = "warning";
            break;
        case AlertType.Error:
            statusClass = "gritter-error gritter-center";
            stickyOpt = true;
            toastType = "error";
            break;
    }

    if (!isToastr) {
        timeout = 0;
        extendedTimeOut = 0;
        progressBar = false;
    }

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": progressBar,
        "positionClass": position,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": timeout,
        "extendedTimeOut": extendedTimeOut,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    toastr[toastType](message, title, {
        onHidden: function () { },
        onShown: function () { }
    });
}

function GetRootUrl(url) {
    return url.toString().replace(/^(.*\/\/[^/?#]*).*$/, "$1");
}

//Local & Session Storage Helpers

//Local & Session Storage Supported
function IsLocalStorageSupported() {
    return typeof (Storage) !== "undefined";
}
//Delete all items in LocalStorage
function ClearLocalStorage() {
    window.localStorage.clear();
}
//Delete all items in SessionStorage
function ClearSessionStorage() {
    window.sessionStorage.clear();
}
//Delete all items in Browser Storage
function ClearBrowserStorage() {
    window.localStorage.clear();
    window.sessionStorage.clear();
}

//Función para validar Formato RFC
function validateRFC(rfc) {

    if (IsNullOrEmpty(rfc))
        return false;

    var patternPM = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
    var patternPF = "^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";

    if (rfc.match(patternPM) || rfc.match(patternPF)) {
        return true;
    } else {
        return false;
    }
}

//Función para validar formato CURP
function validateCurp(curp) {

    if (IsNullOrEmpty(curp))
        return false;

    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
        return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma = 0.0,
            lngDigito = 0.0;
        for (var i = 0; i < 17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1]))
        return false;

    return true; //Validado
}

//Función para validar formato Número Seguro Social
// (deben ser 11 dígitos sin otro caracter en el medio)
function validateNSS(nss) {

    if (IsNullOrEmpty(nss))
        return false;

    const re = /^(\d{2})(\d{2})(\d{2})\d{5}$/,
        validado = nss.match(re);

    if (!validado)  // 11 dígitos y subdelegación válida?
        return false;

    const subDeleg = parseInt(validado[1], 10),
        anno = new Date().getFullYear() % 100;
    var annoAlta = parseInt(validado[2], 10),
        annoNac = parseInt(validado[3], 10);

    //Comparar años (excepto que no tenga año de nacimiento)
    if (subDeleg != 97) {
        if (annoAlta <= anno) annoAlta += 100;
        if (annoNac <= anno) annoNac += 100;
        if (annoNac > annoAlta)
            return false; // Err: se dio de alta antes de nacer!
    }

    return luhn(nss);
}
// Algoritmo de Luhn
function luhn(nss) {
    var suma = 0,
        par = false,
        digito;

    for (var i = nss.length - 1; i >= 0; i--) {
        var digito = parseInt(nss.charAt(i), 10);
        if (par)
            if ((digito *= 2) > 9)
                digito -= 9;

        par = !par;
        suma += digito;
    }
    return (suma % 10) == 0;
}

//Función para validar el formato del registro patronal
function validarRegistroPatronalIMSS(registroPatronal) {
    // Expresión regular para validar el formato del número de registro patronal del IMSS
    const regexRegistroPatronal = /^[A-Za-z0-9][0-9]{2}([1-9][0-9]{5})\d{2}$/;

    // Validar el formato del número de registro patronal del IMSS
    return regexRegistroPatronal.test(registroPatronal);
}

//Función para validar el formato de la Clabe Interbancaria
function validarClabeInterbancaria(clabe) {
    // Expresión regular para validar el formato de la Clabe Interbancaria
    const regexClabe = /^[0-9]{18}$/;

    // Validar el formato de la Clabe Interbancaria
    return regexClabe.test(clabe);
}