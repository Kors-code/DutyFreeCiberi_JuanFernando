const { app, BrowserWindow } = require("electron");

let appWin;
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

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});
