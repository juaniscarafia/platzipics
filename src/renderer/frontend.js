import { setIpc, openDirectory, saveFile } from './ipcRendererEvent';
import { addImageEvents, changeImage, selectFirstImage, selectEvent, searchImagesEvent } from './images-ui';

window.addEventListener('load', () => {
    setIpc();
    addImageEvents();
    searchImagesEvent();
    selectEvent();
    buttonEvent('open-directory', openDirectory);
    buttonEvent('save-button', saveFile);
});

function buttonEvent(id,func){
    const openDirectory = document.getElementById(id);
    openDirectory.addEventListener('click', func);
}