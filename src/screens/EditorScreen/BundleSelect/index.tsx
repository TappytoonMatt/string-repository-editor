import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useResourceContext } from '../../../hooks';
import { ResourceTemplateKeys } from '../../../types';

export default function BundleSelect() {
    const {
        bundleOptions,
        selectedBundleOption,
        setSelectedBundleOption,
    } = useResourceContext();

    return (
        <Select
            onChange={({ target: { value } }) => setSelectedBundleOption(value as ResourceTemplateKeys)}
            style={{
                height: 45,
                width: 250,
            }}
            value={selectedBundleOption as any}
            variant={'outlined'}
        >
            {bundleOptions.map((option) => (
                <MenuItem
                    key={option}
                    value={option}
                >
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
}
