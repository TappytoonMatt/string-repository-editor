import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { NOOP } from '../../utils';

export interface SnackBarContextProps {
    handleCloseSnackbar: () => void;
    handleOpenSnackbar: (message: string) => void;
    message: string;
}

export const SnackBarContext = createContext<SnackBarContextProps>({
    handleCloseSnackbar: NOOP,
    handleOpenSnackbar: NOOP,
    message: '',
});

export function SnackbarProvider({ children }: PropsWithChildren<{}>) {
    const [message, setMessage] = useState<string>('');

    const handleOpenSnackbar = useCallback((message: string) => {
        setMessage(message);
    }, []);

    const handleCloseSnackbar = useCallback(() => {
        setMessage('');
    }, []);

    return (
        <SnackBarContext.Provider value={{
            handleCloseSnackbar,
            handleOpenSnackbar,
            message,
        }}>
            {children}
        </SnackBarContext.Provider>
    );
}
