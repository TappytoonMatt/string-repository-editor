import { Cached } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useResourceContext } from '../../../hooks';

export default function ResourceFileInput() {
    const {
        handleReloadResourceFile,
        handleResourceFileChange,
        resourceFilePath,
    } = useResourceContext();

    const buttonTitle = resourceFilePath ? 'Change file' : 'Choose file';

    return (
        <Box style={{
            alignItems: 'center',
            display: 'flex',
            gap: 10,
        }}>
            <Button
                component="label"
                variant={'contained'}
            >
                <Typography
                    children={buttonTitle}
                    variant={'button'}
                />

                <input
                    hidden={true}
                    onChange={handleResourceFileChange}
                    type={'file'}
                />
            </Button>

            <Typography
                children={resourceFilePath}
                variant={'body2'}
            />

            <Button
                disabled={!resourceFilePath}
                onClick={handleReloadResourceFile}
            >
                <Cached/>
            </Button>
        </Box>
    );
}
