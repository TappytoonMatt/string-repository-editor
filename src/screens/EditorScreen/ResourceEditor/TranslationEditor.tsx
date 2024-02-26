import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useResourceContext } from '../../../hooks';
import { Language, Resources } from '../../../types';
import { UpdateTranslationProps, UseResourceEditorReturns } from './useResourceEditor';

type TranslationEditorProps = Pick<UseResourceEditorReturns, 'handleUpdateTranslation' | 'keyInputValue'> & {
    language: Language;
}

export default function TranslationEditor(props: TranslationEditorProps) {
    const {
        handleUpdateTranslation,
        keyInputValue,
        language,
    } = props;

    const {
        resources,
        selectedBundleOption,
    } = useResourceContext();

    const initialValues: UpdateTranslationProps = {
        content: (resources as Resources)[language][selectedBundleOption][keyInputValue] ?? '',
        language,
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleUpdateTranslation}
        >
            {({ isSubmitting, dirty }) => (
                <Form>
                    <Box style={{
                        alignItems: 'flex-end',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 15,
                    }}>
                        <Field
                            fullWidth={true}
                            multiline={true}
                            rows={3}
                            label={language}
                            name={'content'}
                            component={TextField}
                            variant={'outlined'}
                        />

                        <Button
                            disabled={isSubmitting || !dirty}
                            children={'Save'}
                            type={'submit'}
                            variant={'contained'}
                        />
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
