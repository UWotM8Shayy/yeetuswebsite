


document.addEventListener("DOMContentLoaded", function() {
   
    const loaderContainer = document.querySelector('.loading-wave-container');

    
    setTimeout(function() {
        loaderContainer.style.opacity = 0;
        setTimeout(function() {
            loaderContainer.style.display = 'none';
        }, 500);
    }, 500); 
});



let menuOpen = false;

function toggleMenu() {
    var sideMenu = document.getElementById('side-menu');
    var bars = document.querySelectorAll('.bar');

    if (!menuOpen) {
        sideMenu.style.left = '0';
        bars.forEach(bar => {
            bar.style.backgroundColor = '#fff'; 
        });
    } else {
        sideMenu.style.left = '-250px';
        bars.forEach(bar => {
            bar.style.backgroundColor = '#333'; 
        });
    }

    menuOpen = !menuOpen;
}



