const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

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

    browserWindow.loadURL('http://localhost:3000').catch((ex) => console.error(ex));
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

ipcMain.on('input_resources', (event, path) => {
    try {
        const resources = fs.readFileSync(path, 'utf8');
        event.reply('success_update_resources', JSON.parse(resources));
    } catch (ex) {
        console.error(ex);
    }
});

ipcMain.on('update_resources', (event, { path, updatedResources }) => {
    try {
        fs.writeFileSync(path, JSON.stringify(updatedResources, null, 2));
        event.reply('success_update_resources', updatedResources, 'Update was successful');
    } catch (ex) {
        console.error(ex);
    }
});
