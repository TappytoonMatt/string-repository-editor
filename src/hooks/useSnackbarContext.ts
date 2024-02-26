import { useContext } from 'react';
import { SnackBarContext } from '../contexts';

export default function useSnackbarContext() {
    return useContext(SnackBarContext);
}
