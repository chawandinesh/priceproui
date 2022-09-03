import { snackBarActionTypes } from '../actionTypes';
import _ from 'lodash';

const atnShowSnackbar = (data, type) => {
    return {
        type: snackBarActionTypes.SHOW_SNACKBAR,
        data: data,
        snackbarType: type
    };
};

const atnHideSnackbar = () => {
    return {
        type: snackBarActionTypes.HIDE_SNACKBAR
    };
};

export { atnShowSnackbar, atnHideSnackbar };
