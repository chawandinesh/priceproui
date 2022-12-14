import { snackBarActionTypes } from '../actionTypes';
const initialState = {
    show: false,
    data: '',
    snackbarType: 'success'
};
export const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case snackBarActionTypes.SHOW_SNACKBAR:
            return { ...state, show: true, data: action.data, snackbarType: action.snackbarType };
        case snackBarActionTypes.HIDE_SNACKBAR:
            return { ...state, show: false, data: '', snackbarType: '' };
        default:
            return state;
    }
};
