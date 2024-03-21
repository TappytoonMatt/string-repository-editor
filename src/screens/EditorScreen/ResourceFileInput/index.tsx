import { Cached } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useResourceContext } from '../../../hooks';

export default function ResourceFileInput() {
    const {
        directoryPath,
        isConnect,
        onDirectoryChangePress,
        onReloadResources,
    } = useResourceContext();

    const buttonTitle = directoryPath ? 'Change directory' : 'Choose directory';

    return (
        <Box style={{
            alignItems: 'center',
            display: 'flex',
            gap: 10,
        }}>
            <Button
                component="label"
                onClick={onDirectoryChangePress}
                variant={'contained'}
            >
                <Typography
                    children={buttonTitle}
                    variant={'button'}
                />
            </Button>

            <Typography
                children={directoryPath}
                variant={'body2'}
            />

            <Button
                disabled={!isConnect}
                onClick={onReloadResources}
            >
                <Cached/>
            </Button>
        </Box>
    );
}
