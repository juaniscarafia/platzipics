'use strict'
// Instanciando los objetos app y BrowserWindow
import { app, BrowserWindow } from 'electron';
import devtools from './devtools';
import handleErrors from './handle-errors';
import setMainIpc from './ipcMainEvents';

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

    setMainIpc(win);
    handleErrors(win);

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
