const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

const WEB_RESOURCE_PATH = 'services/web-service/gsr/resources.json';
const APP_RESOURCE_PATH = 'services/native-service/resources/jsons/gsr-default-resources.json';

function createWindow() {
    const browserWindow = new BrowserWindow({
        height: 800,
        width: 1200,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    const startURL = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    browserWindow.loadURL(startURL).catch((ex) => console.error(ex));
}

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('input_directory', (event) => {
    try {
        const directoryPath = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
        event.reply('success_input_directory', directoryPath);
    } catch (ex) {
        console.error(ex);
    }
});

ipcMain.on('read_resources', (event, directoryPath) => {
    try {
        const webResources = fs.readFileSync(`${directoryPath}/${WEB_RESOURCE_PATH}`, 'utf8');
        const appResources = fs.readFileSync(`${directoryPath}/${APP_RESOURCE_PATH}`, 'utf8');

        event.reply(
            'success_read_resources',
            JSON.parse(webResources),
            JSON.parse(appResources),
        );
    } catch (ex) {
        console.error(ex);
        event.reply('failure_read_resources', ex.message);
    }
});

ipcMain.on('update_resources', (event, { directoryPath, updatedResources }) => {
    try {
        const data = JSON.stringify(updatedResources, null, 2);

        fs.writeFileSync(`${directoryPath}/${WEB_RESOURCE_PATH}`, data);
        fs.writeFileSync(`${directoryPath}/${APP_RESOURCE_PATH}`, data);

        event.reply('success_update_resources', updatedResources);
    } catch (ex) {
        console.error(ex);
    }
});
