import { ipcRenderer } from 'electron';
import { addImageEvents, changeImage, selectFirstImage, clearImages, loadImages } from './images-ui';
import { saveImage } from './filters';
import path from 'path';

function setIpc(){
    ipcRenderer.on('load-images',(event, images) =>{
        clearImages();
        loadImages(images);
        addImageEvents();
        selectFirstImage();
    });

    ipcRenderer.on('save-image', (event, file) =>{
        saveImage(file, (err) => {
            if (err) return showDialog('error', 'Platzypics', err.message);

            showDialog('info', 'Platzypics', 'La imagen fue guardada');
        });
    });
}

function openDirectory(){
    ipcRenderer.send('open-directory');
}

function showDialog(type, title, message){
    ipcRenderer.send('show-dialog', {type, title, message});
}

function saveFile(){
    const image = document.getElementById('image-displayed').dataset.original;
    if (typeof image !== 'undefined') {
        const ext = path.extname(image);

        ipcRenderer.send('open-save-dialog', ext);
    }
}

module.exports = {
    setIpc,
    openDirectory,
    saveFile
}