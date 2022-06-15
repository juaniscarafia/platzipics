'use strict'
// Instanciando los objetos app y BrowserWindow
import { app, BrowserWindow } from 'electron';
import devtools from './devtools';
import handleErrors from './handle-errors';
import setMainIpc from './ipcMainEvents';

global.win; // eslint-disable-line

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
    global.win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hola mundo!',
        center: true,
        maximizable: false,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: 'src/assets/Circle-icons-image.ico'    
    });

    setMainIpc(global.win);
    handleErrors(global.win);

    global.win.setMenu(null);

    //
    global.win.once('ready-to-show', () => {
        global.win.show();
    });

    // Detectando cuando la ventana se mueve
    global.win.on('move', () => {
        const position = global.win.getPosition();
        //console.log(`La posición es ${position}`);
    })

    // Detectando el cierre de la ventana que cierra el aplicativo
    global.win.on('close', () => {
        global.win = null;
        app.quit();
    });

    // Carga url en ventana
    global.win.loadURL(`file://${__dirname}/renderer/index.html`);
});
