const {app} = require("electron");
const {createWindow} = require("./main");
//const electronReload = require('electron-reload');
const appPath = app.getAppPath();

// Habilitar el auto-recarga
//electronReload(appPath);


app.commandLine.appendSwitch('allow-file-access-from-files');
app.whenReady().then(createWindow);