import { Add, Delete } from '@mui/icons-material';
import { Autocomplete, Box, Button, Fab, TextField } from '@mui/material';
import React from 'react';
import { supportLanguages } from '../../../utils';
import useResourceEditor from './useResourceEditor';
import CreateTranslationDialog from './CreateTranslationDialog';
import TranslationEditor from './TranslationEditor';

export default function ResourceEditor() {
    const {
        handleCreateTranslation,
        handleRemoveTranslation,
        handleUpdateTranslation,
        isCreateDialogOpen,
        keyInputValue,
        keyOptions,
        setIsCreateDialogOpen,
        setKeyInputValue,
    } = useResourceEditor();

    return (
        <React.Fragment>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
            }}>
                <Box style={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 20,
                }}>
                    <Autocomplete
                        onChange={(_, value) => setKeyInputValue(value as string)}
                        options={keyOptions}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={'Key'}
                                style={{ width: 600 }}
                            />
                        )}
                        value={keyInputValue}
                    />

                    <Button
                        disabled={!keyInputValue}
                        onClick={handleRemoveTranslation}
                    >
                        <Delete/>
                    </Button>
                </Box>

                {supportLanguages.map((language) => (
                    <TranslationEditor
                        handleUpdateTranslation={handleUpdateTranslation}
                        key={language}
                        keyInputValue={keyInputValue}
                        language={language}
                    />
                ))}
            </Box>

            <Fab
                children={<Add/>}
                color={'primary'}
                onClick={() => setIsCreateDialogOpen(true)}
                style={{
                    bottom: 20,
                    position: 'fixed',
                    right: 20,
                }}
            />

            <CreateTranslationDialog
                handleCreateTranslation={handleCreateTranslation}
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
            />
        </React.Fragment>
    );
}
