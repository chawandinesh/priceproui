import { snackBarActionTypes } from '../actionTypes';
const initialState = {
    show: false,
    data: '',
    snackbarType: ''
};
export const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case snackBarActionTypes.SHOW_SNACKBAR:
            return { ...state, show: true, data: action.data, snackbarType: action.snackbarType };
        case snackBarActionTypes.HIDE_SNACKBAR:
            return { ...state, show: false, data: '' };
        default:
            return state;
    }
};
