import { searchActionTypes } from '../actionTypes';
const initialState = {
    loading: false,
    error: false,
    searchResults: []
};
export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case searchActionTypes.SET_SEARCH_RESULTS:
            return { ...state, searchResults: action.data, loading: false, error: false };
        case searchActionTypes.LOADING:
            return { ...state, loading: true, error: false };
        case searchActionTypes.ERROR:
            return { ...state, error: true, loading: false, data: [] };
        default:
            return state;
    }
};
