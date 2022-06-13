import url from 'url';
import path from 'path';
import applyFilter from './filters';

function addImageEvents() {
    const thumbs = document.querySelectorAll('li.list-group-item');

    thumbs.forEach(imagen => {
        imagen.addEventListener('click', function () {
            changeImage(this);
        });
    });
}

function changeImage(node){
    if (node) {
        const selected = document.querySelector('li.selected');
        if (selected) {
            selected.classList.remove('selected');    
        }
        node.classList.add('selected');
        document.getElementById('image-displayed').src = node.querySelector('img').src;
    }
    else{
        document.getElementById('image-displayed').src = '';
    }
}

function selectFirstImage(){
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}

function selectEvent(){
    const select = document.getElementById('filters');
    const image = document.getElementById('image-displayed');

    select.addEventListener('change', function(){
        applyFilter(this.value,image);
    });
}

function searchImagesEvent(){
    const searchBox = document.getElementById('search-box');

    searchBox.addEventListener('keyup', function(){
        const regex = new RegExp(this.value.toLowerCase(),'gi');
        if (this.value.length > 0){
            const thumbs = document.querySelectorAll('li.list-group-item img');
            thumbs.forEach(imagen => {
                const fileUrl = url.parse(imagen.src);
                const fileName = path.basename(fileUrl.pathname);
                if (fileName.match(regex)) {
                    imagen.parentNode.classList.remove('hidden');
                }
                else {
                    imagen.parentNode.classList.add('hidden');
                }
            });
            selectFirstImage();
        }
        else{
            showAllImages();
            selectFirstImage();
        }
    });
}

function showAllImages(){
    const thumbs = document.querySelectorAll('li.list-group-item img');
    thumbs.forEach(imagen => {
        imagen.parentNode.classList.remove('hidden');
    });
}

function clearImages(){
    const oldImages = document.querySelectorAll('li.list-group-item');
    oldImages.forEach(image => {
        image.parentNode.removeChild(image);
    });
}

function loadImages(images){
    const imagesList = document.querySelector('ul.list-group');

    images.forEach(image => {
        const node = `<li class="list-group-item">
                    <img class="media-object pull-left" src="${image.src}" height="32">
                    <div class="media-body">
                    <strong>${image.filename}</strong>
                    <p>${image.size}</p>
                    </div>
                </li>`;
        imagesList.insertAdjacentHTML('beforeend', node);
    });
}

module.exports = {
    addImageEvents,
    changeImage,
    selectFirstImage,
    selectEvent,
    searchImagesEvent,
    clearImages,
    loadImages
}