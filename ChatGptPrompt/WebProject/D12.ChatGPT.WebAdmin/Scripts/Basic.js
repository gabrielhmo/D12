var dhxLayout;
var dhxStatusBar;

var dateTostring = "DD/MM/YYYY HH:mm";
var formatDate = "YYYY/MM/DD HH:mm";

$(document).ready(function () {
    KeepSessionAlive();
    setDivSize();
    if (typeof onReady === 'function') { onReady(); }
});
$(window).on('load', function () {

    //If exists DHTMLX Content
    if (typeof initLayout === 'function') { initLayout(); }

    if (typeof onLoad === 'function') { onLoad(); }
});
$(window).on('resize', function () {

    //setDivSize();

    if (typeof onResize === 'function') {
        onResize();
    }

    if ($('.modal.in').length !== 0) {
        setModalMaxHeight($('.modal.in'));
    }

});
$(window).on('beforeunload', function () { if (typeof onBeforeUnload === 'function') { return onBeforeUnload(); } });

function setDivSize(dw, dh) {

    if (dw === null)
        dw = 0;

    if (dh === null)
        dh = 0;

    if ($(dhxLayout).length > 0) {
        dhxLayout.setSizes();
    }

}

function setModalMaxHeight(element) {
    this.$element = $(element);
    this.$content = this.$element.find('.modal-content');
    var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight = contentHeight - (headerHeight + footerHeight);

    this.$content.css({
        'overflow': 'hidden'
    });

    this.$element
        .find('.modal-body').css({
            'max-height': maxHeight,
            'overflow-y': 'auto'
        });
}

$('.modal').on('show.bs.modal', function () {
    $(this).show();
    setModalMaxHeight(this);
});

function KeepSessionAlive() {

    // Gets reference of image
    var img = document.getElementById("SessionAlive");

    // Set new src value, which will cause request to server, so
    // session will stay alive
    img.src = rootPath + 'Account/KeepSessionAlive?rnd=' + createRandomString(10);

    // Schedule new call of KeepSessionAlive function after 60 seconds
    setTimeout(KeepSessionAlive, 60000);
}