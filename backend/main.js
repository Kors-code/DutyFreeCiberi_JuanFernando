const path = require("path");
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { autoUpdater } = require('electron-updater');

let appWin;
const Menu = electron.Menu;
const log = require('electron-log');
log.transports.file.resolvePathFn = () => path.join('C:/duty-free/Logs/','main.log');
const feedUrl = 'https://duty-free-app.s3.us-east-2.amazonaws.com';
require("./index");
createWindow = () => {
    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Dutty Free",
        resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    // appWin.loadURL(`file://${__dirname}/duty-free/index.html`);
    appWin.loadURL(`http://localhost:6511`)

    appWin.setMenu(null);

    // appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on('ready', function(){
    createWindow();
    const template = [
      {
        label: 'Vista',
        submenu: [
          { role: 'reload' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'toggleDevTools' },
  
        ]
      }, 
      {
        label:'Version ' +  app.getVersion(),
          click:function(){
          autoUpdater.checkForUpdates();
        }
      }
  
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);
    autoUpdater.setFeedURL(feedUrl);
    autoUpdater.checkForUpdates(res=>{
      log.info(res)
    });
  })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

// Eventos de autoUpdater
// Configurar la URL del servidor de actualización

// log.info('URL ...', feedUrl);
// Eventos de autoUpdater
autoUpdater.on('checking-for-update', () => {
 
});

autoUpdater.on('update-available', () => {
  log.info('Actualización disponible. Descargando...');

});

autoUpdater.on('update-not-available', () => {
  log.info('No hay actualizaciones disponibles.');
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  log.info('update-downloaded.');
  autoUpdater.quitAndInstall();
  // const dialogOpts = {
  //   type: 'info',
  //   buttons: ['Reiniciar ahora', 'Más tarde'],
  //   title: 'Actualización lista',
  //   message: process.platform === 'win32' ? releaseNotes : releaseName,
  //   detail: 'Se ha descargado una nueva versión. Reinicia la aplicación para aplicar la actualización.'
  // };

  // dialog.showMessageBox(dialogOpts).then((returnValue) => {
  //   if (returnValue.response === 0) autoUpdater.quitAndInstall();
  // });
});

autoUpdater.on('error', (err) => {
  console.error('Error en la actualización:', err);
  log.info('Error en la actualización: ', err);
});

function sendStatusToWindow(message) {
  log.info(message)
}


