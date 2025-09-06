
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    const body = document.body;

    // Set a minimum display time for the preloader.
    // This ensures a smooth transition even on fast connections.
    const minDisplayTime = 5000; // 5 seconds

    const loadFinishTime = new Date().getTime();
    const scriptStartTime = window.performance.timing.domLoading;
    const timeElapsed = loadFinishTime - scriptStartTime;
    const remainingTime = Math.max(0, minDisplayTime - timeElapsed);

    setTimeout(function () {
        if (preloader) {
            preloader.classList.add('preloader-hidden');

            preloader.addEventListener('transitionend', function () {
                preloader.remove();
                body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
    }, remainingTime);
});
