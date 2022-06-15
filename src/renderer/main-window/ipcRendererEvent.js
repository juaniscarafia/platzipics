import { ipcRenderer, remote } from 'electron';
import settings from 'electron-app-settings';
import { addImageEvents, selectFirstImage, clearImages, loadImages } from './images-ui';
import { saveImage } from './filters';
import path from 'path';
import os from 'os';

function setIpc(){
    if (settings.has('directory')) {
        ipcRenderer.send('load-directory',settings.get('directory'));
    }

    ipcRenderer.on('load-images',(event, dir, images) =>{
        clearImages();
        loadImages(images);
        addImageEvents();
        selectFirstImage();
        settings.set('directory', dir);
    });

    ipcRenderer.on('save-image', (event, file) =>{
        saveImage(file, (err) => {
            if (err) return showDialog('error', 'Platzypics', err.message);

            showDialog('info', 'Platzypics', 'La imagen fue guardada');
        });
    });
}

function openPreferences() {
    const BrowserWindow = remote.BrowserWindow;

    const mainWindow = remote.getGlobal('win');

    const preferencesWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Preferencias',
        center: true,
        maximizable: false,
        resizable: false,
        show: false,
        modal: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            // Habilitando remote module
            enableRemoteModule: true,
        }  
    });

    if (os.platform() !== 'win32') {
        preferencesWindow.setParentWindow(mainWindow);    
    }

    preferencesWindow.once('ready-to-show', () => {
        preferencesWindow.show();
        preferencesWindow.focus();
    });
    
    preferencesWindow.loadURL(`file://${path.join(__dirname, '..')}/preferences.html`);
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
    saveFile,
    openPreferences
}