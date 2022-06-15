import { setIpc, openDirectory, saveFile, openPreferences } from './main-window/ipcRendererEvent';
import { addImageEvents, selectFirstImage, selectEvent, searchImagesEvent } from './main-window/images-ui';

window.addEventListener('load', () => {
    setIpc();
    addImageEvents();
    searchImagesEvent();
    selectEvent();
    selectFirstImage();
    buttonEvent('open-directory', openDirectory);
    buttonEvent('open-preferences', openPreferences);
    buttonEvent('save-button', saveFile);
});

function buttonEvent(id,func){
    const openDirectory = document.getElementById(id);
    openDirectory.addEventListener('click', func);
}