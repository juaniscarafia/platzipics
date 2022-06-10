import url from 'url';
import path from 'path';
import applyFilter from './filters';
import { setIpc, sendIpc} from './ipcRendererEvent';

window.addEventListener('load', () => {
    setIpc();
    addImageEvents();
    searchImagesEvent();
    selectEvent();
    openDirectory();
});

function addImageEvents() {
    const thumbs = document.querySelectorAll('li.list-group-item');

    thumbs.forEach(imagen => {
        imagen.addEventListener('click', function () {
            changeImage(this);
        });
    });
}

function selectEvent(){
    const select = document.getElementById('filters');
    const image = document.getElementById('image-displayed');

    select.addEventListener('change', function(){
        applyFilter(this.value,image);
    });
}

function changeImage(node){
    if (node) {
        document.querySelector('li.selected').classList.remove('selected');
        node.classList.add('selected');
        document.getElementById('image-displayed').src = node.querySelector('img').src;
    }
    else{
        document.getElementById('image-displayed').src = '';
    }
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

function selectFirstImage(){
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}

function showAllImages(){
    const thumbs = document.querySelectorAll('li.list-group-item img');
    thumbs.forEach(imagen => {
        imagen.parentNode.classList.remove('hidden');
    });
}

function openDirectory(){
    const openDirectory = document.getElementById('open-directory');
    openDirectory.addEventListener('click', function(){
        sendIpc();
    });
}