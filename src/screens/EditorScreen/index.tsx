import { Box } from '@mui/material';
import React from 'react';
import BundleSelect from './BundleSelect';
import ResourceEditor from './ResourceEditor';
import ResourceFileInput from './ResourceFileInput';
import { useResourceContext } from '../../hooks';

export default function EditorScreen() {
    const { isConnect } = useResourceContext();

    return (
        <Box style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: 20,
        }}>
            <ResourceFileInput/>

            {isConnect && (
                <React.Fragment>
                    <BundleSelect/>
                    <ResourceEditor/>
                </React.Fragment>
            )}
        </Box>
    );
}
