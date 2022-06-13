'use strict'
import path from 'path';
// Instanciando los objetos app y BrowserWindow
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import devtools from './devtools';

let win;

if(process.env.NODE_ENV === 'development') {
    devtools();
}

// Imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
    console.log('saliendo');
});

// Ejecutando ordenes cuando la aplicación está lista
app.on('ready',() => {
    // Creando ventana
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hola mundo!',
        center: true,
        maximizable: false,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'src/assets/Circle-icons-image.ico'    
    });

    win.setMenu(null);

    //
    win.once('ready-to-show', () => {
        win.show();
    });

    // Detectando cuando la ventana se mueve
    win.on('move', () => {
        const position = win.getPosition();
        //console.log(`La posición es ${position}`);
    })

    // Detectando el cierre de la ventana que cierra el aplicativo
    win.on('close', () => {
        win = null;
        app.quit();
    });

    // Carga url en ventana
    win.loadURL(`file://${__dirname}/renderer/index.html`);
});

ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
        title: 'Seleccione la nueva ubicación',
        buttonLabel: 'Abrir ubicación',
        properties: ['openDirectory']
    }).then(result => {
        console.log(result.canceled);
        console.log(result.filePaths);
    }).catch(err => {
        console.log(err);
    });
});
