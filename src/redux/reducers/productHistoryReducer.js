import { productHistoryActionTypes } from '../actionTypes';
const initialData = {
    loading: false,
    data: [],
    error: false,
    errorText: ''
};

export const productHistoryReducer = (state = initialData, action) => {
    switch (action.type) {
        case productHistoryActionTypes.PRODUCT_HISTORY_LOADING:
            return { ...state, loading: true, data: [], error: false, errorText: '' };
        case productHistoryActionTypes.PRODUCT_HISTORY_SUCCESS:
            return { ...state, loading: false, data: action.data, error: false, errorText: '' };
        case productHistoryActionTypes.PRODUCT_HISTORY_FAIL:
            return { ...state, loading: false, data: [], error: true, errorText: action.errorText };
        default:
            return state;
    }
};
