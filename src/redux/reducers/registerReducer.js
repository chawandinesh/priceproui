import { registerActionTypes } from '../actionTypes';
const initialState = {
    loading: false,
    error: false,
    userDetails: null,
    errorText: ''
};
export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case registerActionTypes.REGISTER_LOADING:
            return { ...state, userDetails: null, loading: false, error: false };
        case registerActionTypes.REGISTER_SUCCESS:
            return { ...state, userDetails: action.data, loading: false, error: false };
        case registerActionTypes.REGISTER_FAIL:
            return { ...state, error: true, loading: false, userDetails: null, errorText: action.errorText };
        default:
            return state;
    }
};
