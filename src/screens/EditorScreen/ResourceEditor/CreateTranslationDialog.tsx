import { Field, Form, Formik } from 'formik';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { CreateTranslationProps, UseResourceEditorReturns } from './useResourceEditor';
import { TextField } from 'formik-material-ui';

type CreateTranslationDialogProps = Pick<UseResourceEditorReturns, 'handleCreateTranslation'> & {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateTranslationDialog(props: CreateTranslationDialogProps) {
    const {
        handleCreateTranslation,
        isOpen,
        onClose,
    } = props;

    const initialValues: CreateTranslationProps = {
        translation: '',
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(...args) => {
                    handleCreateTranslation(...args);
                    onClose();
                }}
            >
                {({ isSubmitting, dirty }) => (
                    <Form>
                        <DialogTitle>{'New Translation'}</DialogTitle>

                        <DialogContent style={{ width: 450 }}>
                            <Field
                                autoFocus={true}
                                fullWidth={true}
                                label={'Name'}
                                name={'translation'}
                                component={TextField}
                                variant={'standard'}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button
                                children={'Cancel'}
                                color={'inherit'}
                                onClick={onClose}
                            />

                            <Button
                                disabled={isSubmitting || !dirty}
                                children={'Save'}
                                type={'submit'}
                            />
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}
