import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar position={'static'}>
            <Toolbar style={{ gap: 20 }}>
                <Link to={'/'}>Editor</Link>
                <Link to={'/result'}>Result</Link>
            </Toolbar>
        </AppBar>
    );
}
