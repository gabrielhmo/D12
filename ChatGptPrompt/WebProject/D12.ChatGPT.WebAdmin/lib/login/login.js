var request;  // Stores the XMLHTTPRequest object
var timeout;  // Stores timeout reference for long running requests
var isFormProcessing = false;
var loginURL = '';

var $formLogin = $('#loginForm');

$(document).ready(function ()
{
    ClearBrowserStorage();

    var imgPath = rootPath + 'Content/images/company/backgrounds/'

    window.onload = function () {
        var images = [imgPath + 'bg-login.jpg', ];
        var image = images[Math.floor(Math.random() * images.length)];
        document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + image + "')";
    }

    // change the background image using the passed parameter
    function changeBackgroundImage(bgImage) {
        document.body.style.backgroundImage = "url(" + bgImage + ")";
    }

    // Validation
    $('#loginForm').validate({
        submitHandler: function (form) {
            submitLogin();
        },
        rules:
        {
            Username:
            {
                required: true
            },
            Password:
            {
                required: true
            },
        },
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
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            element.parents(".col-sm-5").addClass("has-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        success: function (label, element) {
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("is-invalid");
        }
    });
});

async function submitLogin() {
    //Form validate
    if (isFormProcessing)
        return;

    console.log($formLogin.validate());

    if ($formLogin.validate()) {

        var btnText = $('#btnLogin span.ladda-label').html();
        var formData = formToJsonString(document.getElementById($formLogin.attr('Id')));
        var loginURL ='account/login/';

        //Create a new instance of ladda for the specified button
        const btnLadda = Ladda.create(document.getElementById('btnLogin'));

        //Hide login alert div
        $('#LoginMessage').addClass('visually-hidden').removeClass('animate__animated animate__headShake');

        // Start loading
        btnLadda.start();
        btnLadda.isLoading();
        $('#btnLogin span.ladda-label').html("Authenticating");

        disableAll($formLogin, true);
        isFormProcessing = true;

        var response = await ajaxCall(rootPath + loginURL, formData, false, Method.POST, Datatype.Json, ContentType.Json);

        if (response.Result) {
            $('#btnLogin span.ladda-label').html('Verifying . . .');
            $('#btnLogin span.ladda-label').addClass('animate__animated animate__flash animate__infinite animate__slow');

            window.location.replace(response.ReturnUrl);
        } else {

            $('#LoginMessage').removeClass('visually-hidden').addClass('animate__animated animate__headShake');
            $('#btnLogin span.ladda-label').removeClass('animate__animated animate__flash animate__infinite animate__slow');
            $('#btnLogin span.ladda-label').html(btnText);

            if (response.StatusCode === 401) {
                $('#LoginMessage').text(response.Message);
            }
            else {
                ShowMessage(Status.Error, response.Title, response.Message, false, 'toast-bottom-center');
            }
        }

        btnLadda.stop();
        disableAll($formLogin, false);
        isFormProcessing = false;
    }
}