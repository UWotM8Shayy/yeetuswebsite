

const queryParams = new URLSearchParams(window.location.search);
const email = queryParams.get('email');
if(email == null)
{
    document.getElementById('home-link').href = '/html/home.html';
    document.getElementById('about-link').href = '/html/about.html';
    document.getElementById('contact-link').href = '/html/contact.html';
    document.getElementById('myprofile-link').href = '/html/myprofile.html';
    document.getElementById('shop-link').href = '/html/shop.html';
    document.getElementById('pfpIcon').href = '/html/myprofile.html';
}
else {

document.getElementById('home-link').href = '/html/home.html?email=' + encodeURIComponent(email);
document.getElementById('about-link').href = '/html/about.html?email=' + encodeURIComponent(email);
document.getElementById('contact-link').href = '/html/contact.html?email=' + encodeURIComponent(email);
document.getElementById('myprofile-link').href = '/html/myprofile.html?email=' + encodeURIComponent(email);
document.getElementById('shop-link').href = '/html/shop.html?email=' +encodeURIComponent(email);
document.getElementById('pfpIcon').href = '/html/myprofile.html?email=' + encodeURIComponent(email);

}