import path from 'path';
import isImage from 'is-image';
import filesize from 'filesize';
import fs from 'fs';
import { ipcMain, dialog } from 'electron';

function setMainIpc(win){
    ipcMain.on('open-directory', (event) => {
        dialog.showOpenDialog(win, {
            title: 'Seleccione la nueva ubicación',
            buttonLabel: 'Abrir ubicación',
            properties: ['openDirectory']
        }).then(result => {
            const images = [];
            if (!result.canceled) {
                const dir = result.filePaths[0];
                fs.readdir(dir,(err, files) =>{
                    if (err) throw err;
                    files.forEach(file => {
                        if (isImage(file)) {
                            let imageFile = path.join(dir,file);
                            let stats = fs.statSync(imageFile);
                            let size = filesize(stats.size, { round: 0 });
                            images.push({
                                filename: file,
                                src: `file://${imageFile}`,
                                size
                            });
                        }
                    });
                    event.sender.send('load-images', images);
                });
            }
        }).catch(err => {
            console.log(err);
        });
    });
    
    ipcMain.on('open-save-dialog', (event, ext) =>{
        dialog.showSaveDialog(win, {
            title: 'Guardar imagen modificada',
            buttonLabel: 'Guardar imagen',
            filters: [
                { name: 'Images', extensions: [ext.substr(1)] },
            ]
        }).then(result => {
            if (!result.canceled && result.filePath) {
                const dir = result.filePath;
                event.sender.send('save-image', dir);
            }
        }).catch(err => {
            console.log(err);
        });
    });
    
    
    ipcMain.on('show-dialog', (evt, info) => {
        dialog.showMessageBox(win, {
            type: info.type,
            title: info.title,
            message: info.message
        });
    });
}

module.exports = setMainIpc;