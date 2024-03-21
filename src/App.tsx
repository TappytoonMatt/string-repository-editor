import React from 'react';
import { IpcRendererEvent } from 'electron';
import AppRouter from './AppRouter';
import { ResourceProvider, SnackbarProvider } from './contexts';
import './App.css';

export default function App() {
    return (
        <SnackbarProvider>
            <ResourceProvider>
                <AppRouter/>
            </ResourceProvider>
        </SnackbarProvider>
    );
};

declare global {
    interface Window {
        ipcRenderer: {
            send: (channel: string, data?: any) => void;
            addListener: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void;
            removeListener: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void;
        };
    }
}
