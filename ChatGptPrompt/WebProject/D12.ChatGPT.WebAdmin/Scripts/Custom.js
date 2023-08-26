// Observer Resize Maincontainer
const mainNav = document.getElementById("MainContainer");

const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
        setDivSize();
    }
});

if (mainNav !== null)
    observer.observe(mainNav);

function showAlert(title, message, style, container, icon, closebtn, position, animaIn, animOut, sticky) {

    title = DefaultFor(title, '');
    message = DefaultFor(message, '');
    style = DefaultFor(style, 'info');
    container = DefaultFor(container, 'floating');
    closebtn = DefaultFor(closebtn, false);
    position = DefaultFor(position, 'top-right');
    animaIn = DefaultFor(animaIn, 'jellyIn');
    animOut = DefaultFor(animOut, 'fadeOut');
    sticky = DefaultFor(sticky, 2500);


    $.niftyNoty({
        type: style,
        icon: icon,
        container: container,
        title: title,
        message: message,
        closeBtn: closebtn,
        floating: {
            position: position,
            animationIn: animaIn,
            animationOut: animOut
        },
        focus: true,
        timer: sticky
    });
}
