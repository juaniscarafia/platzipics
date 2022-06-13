import { ipcRenderer } from 'electron';
import { addImageEvents, changeImage, selectFirstImage, clearImages, loadImages } from './images-ui';

function setIpc(){
    ipcRenderer.on('load-images',(event, images) =>{
        clearImages();
        loadImages(images);
        addImageEvents();
        selectFirstImage();
    });
}

function openDirectory(){
    ipcRenderer.send('open-directory');
}

module.exports = {
    setIpc,
    openDirectory
}