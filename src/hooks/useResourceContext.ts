import { useContext } from 'react';
import { ResourceContext } from '../contexts';

export default function useResourceContext() {
    return useContext(ResourceContext);
}
