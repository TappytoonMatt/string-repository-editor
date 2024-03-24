const { contextBridge, ipcRenderer } = require('electron');

const ipcRendererAPI = {
    send: (channel, data) => ipcRenderer.send(channel, data),
    addListener: (channel, listener) => ipcRenderer.on(channel, listener),
    removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
};

contextBridge.exposeInMainWorld('ipcRenderer', ipcRendererAPI);
