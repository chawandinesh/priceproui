import { loginActionTypes } from '../actionTypes';
const initialState = {
    loading: false,
    error: false,
    loginDetails: null,
    errorText: ''
};
export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginActionTypes.LOGIN_LOADING:
            return { ...state, loginDetails: null, loading: false, error: false };
        case loginActionTypes.LOGIN_SUCCESS:
            return { ...state, loginDetails: action.data, loading: false, error: false };
        case loginActionTypes.LOGIN_FAIL:
            return { ...state, error: true, loading: false, loginDetails: null, errorText: action.errorText };
        case loginActionTypes.LOGOUT:
            return { ...state, error: false, loading: false, loginDetails: null, errortext: '' };
        default:
            return state;
    }
};
