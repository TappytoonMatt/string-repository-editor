import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { EditorScreen, ResultScreen } from './screens';
import { useSnackbarContext } from './hooks';
import { Snackbar } from '@mui/material';

export default function AppRouter() {
    const {
        handleCloseSnackbar,
        message,
    } = useSnackbarContext();

    return (
        <React.Fragment>
            <Router>
                <Header/>

                <Routes>
                    <Route path={'/'} Component={EditorScreen}/>
                    <Route path={'/result'} Component={ResultScreen}/>
                </Routes>
            </Router>

            <Snackbar
                message={message}
                onClose={handleCloseSnackbar}
                open={!!message}
            />
        </React.Fragment>
    );
}
