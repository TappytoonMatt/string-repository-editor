import React from 'react';
import { JSONTree, KeyPath } from 'react-json-tree';
import { useResourceContext } from '../../hooks';

const MAXIMUM_OPEN_TREE_LEVEL = 2;

export default function ResultScreen() {
    const { resources } = useResourceContext();

    const shouldExpandNodeInitially = (keyPath: KeyPath, data: unknown, level: number) => {
        return level < MAXIMUM_OPEN_TREE_LEVEL;
    };

    return (
        <JSONTree
            data={resources}
            hideRoot={true}
            shouldExpandNodeInitially={shouldExpandNodeInitially}
        />
    );
}
