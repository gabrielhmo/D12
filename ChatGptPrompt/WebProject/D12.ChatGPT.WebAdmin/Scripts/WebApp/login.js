var request;  // Stores the XMLHTTPRequest object
var timeout;  // Stores timeout reference for long running requests
var isProcessing = false;


$(window).on('load', function () {
    window.paceOptions = {
        startOnPageLoad: false,
        document: false,
        ajax: false,
        eventLag: false, // disabled
    };
});

$(document).ready(function () {
    // Validation
    $('#loginForm').validate({
        submitHandler: function (form) {

            if (isProcessing)
                return;

            var frm = $(form);
            var formData = frm.serialize();

            //Create a new instance of ladda for the specified button
            const btnLadda = Ladda.create(document.getElementById('btnLogin'));

            // Start loading
            btnLadda.start();
            btnLadda.isLoading();

            $('#btnLogin span.ladda-label').html("Verifying Information");

            DisableAll(frm, true);

            isProcessing = true;
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = (evt.loaded / evt.total);
                            btnLadda.setProgress(percentComplete);
                        }
                    }, false);
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = (evt.loaded / evt.total);
                            btnLadda.setProgress(percentComplete);
                        }
                    }, false);
                    return xhr;
                },
                cache: false,
                url: frm.attr('action'),
                type: frm.attr('method'),
                dataType: "json",
                data: formData
            })
                .done(function (json) {
                    isProcessing = false;

                    if (json.excInfo.Result) {

                        $('#btnLogin span.ladda-label').html(json.excInfo.MessageTitle);

                        setTimeout(function () {

                            $('#btnLogin span.ladda-label').html('Loading...');
                            btnLadda.stop();
                            $('#btnLogin span.ladda-label').addClass('animated flash infinite slow');

                            window.location.replace(replace(json.returnURL,'//','/'));
                        }, 1000);
                    }
                    else {
                        DisableAll(frm, false);
                        btnLadda.stop();

                        showAlert(json.excInfo.MessageTitle, json.excInfo.Message, 'danger', '#panel-alert', '.fa-window-close', true, null, null, null, 0);
                        $('#btnLogin span.ladda-label').html("Sign in");
                    }
                })
                .fail(function (jqXHR, exception) {
                    isProcessing = false;
                    DisableAll(frm, false);
                    btnLadda.stop();
                    var msg = AjaxErrorMessage(jqXHR, exception);
                    swal('Internal Error', msg, 'error');
                })
                .always(function () {
                });
        },
        rules:
        {
            username:
            {
                required: true
            },
            password:
            {
                required: true
            },
        },

        // Messages for form validation
        messages:
        {
            username:
            {
                required: 'Enter username'
            },
            password:
            {
                required: 'Enter password'
            }
        },

        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        }
    });
});