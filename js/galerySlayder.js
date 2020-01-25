/******* gallery 1 *********/

let btnPrev = document.querySelector('#gallery .buttons .prev');
let btnNext = document.querySelector('.next');
let images = document.querySelectorAll('#gallery .photos img');
let i = 0;


btnPrev.addEventListener('click', function (e) {
    images[i].style.opacity = '0';
    i--;
    if (i < 0) i = images.length-1;
    images[i].style.opacity = '1';
});

btnNext.addEventListener('click', function (e) {
    images[i].style.opacity = '0';
    i++;
    if (i >= images.length) i = 0;
    images[i].style.opacity = '1';
});

/******* gallery 2 *********/

let btnPrev = document.querySelector('#gallery .buttons .prev');
let btnNext = document.querySelector('.next');
let images = document.querySelectorAll('#gallery .photos img');
let i = 0;


btnPrev.addEventListener('click', function (e) {
    images[i].className = '';
    i--;
    if (i < 0) i = images.length-1;
    images[i].className = 'showed';
});

btnNext.addEventListener('click', function (e) {
    images[i].className = '';
    i++;
    if (i >= images.length) i = 0;
    images[i].className = 'showed';
});