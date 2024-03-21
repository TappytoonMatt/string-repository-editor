import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useResourceContext } from '../../../hooks';
import { Resources } from '../../../types';
import { UpdateTranslationProps, UseResourceEditorReturns } from './useResourceEditor';
import { supportLanguages } from '../../../utils';

type TranslationEditorProps = Pick<UseResourceEditorReturns, 'handleUpdateTranslation' | 'keyInputValue'>;

export default function TranslationEditor(props: TranslationEditorProps) {
    const {
        handleUpdateTranslation,
        keyInputValue,
    } = props;

    const {
        resources,
        selectedBundleOption,
    } = useResourceContext();

    const initialValues: UpdateTranslationProps = {
        en_content: (resources as Resources)['en'][selectedBundleOption][keyInputValue] ?? '',
        de_content: (resources as Resources)['de'][selectedBundleOption][keyInputValue] ?? '',
        fr_content: (resources as Resources)['fr'][selectedBundleOption][keyInputValue] ?? '',
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
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                    }}>
                        {supportLanguages.map((language) => (
                            <Field
                                disabled={!keyInputValue}
                                fullWidth={true}
                                key={language}
                                multiline={true}
                                rows={3}
                                label={language}
                                name={`${language}_content`}
                                component={TextField}
                                variant={'outlined'}
                            />
                        ))}

                        <Button
                            disabled={!keyInputValue || isSubmitting || !dirty}
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
