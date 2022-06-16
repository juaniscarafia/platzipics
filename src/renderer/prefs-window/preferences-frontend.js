import { remote, ipcRenderer } from 'electron';
import settings from 'electron-app-settings';

window.addEventListener('load', () => {
    cancelButton();
    saveButton();

    if (settings.has('cloudup-user')) {
        document.getElementById('cloudup-user').value = settings.get('cloudup-user');
    }
    if (settings.has('cloudup.password')) {
        document.getElementById('cloudup-passwd').value = settings.get('cloudup-password');
    }
});

function cancelButton(){
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', () => {
        const prefsWindow = remote.getCurrentWindow();
        prefsWindow.close();
    });
}

function saveButton(){
    const saveButton = document.getElementById('save-button');

    const prefsForm = document.getElementById('preferences-form');

    saveButton.addEventListener('click', () => {
        if (prefsForm.reportValidity()) {
            settings.set('cloudup.user', document.getElementById('cloudup-user').value);
            settings.set('cloudup.password', document.getElementById('cloudup-passwd').value);
            const prefsWindow = remote.getCurrentWindow();
            prefsWindow.close();
        }
        else {
            ipcRenderer.send('show-dialog', {
                type: 'error', 
                title: 'Platzipics', 
                message: 'Por favor complete los campos requeridos.'
            });
        }
    });
}