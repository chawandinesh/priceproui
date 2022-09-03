import { allTrackingItemsActionTypes } from '../actionTypes';
const initialState = {
    loading: false,
    error: false,
    trackingItems: [],
    errorText: ''
};
export const allTrackingItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case allTrackingItemsActionTypes.ALL_TRACKING_ITEMS_LOAD:
            return { ...state, trackingItems: [], loading: true, error: false };
        case allTrackingItemsActionTypes.ALL_TRACKING_ITEMS_SUCCESS:
            return { ...state, trackingItems: action.data, loading: false, error: false };
        case allTrackingItemsActionTypes.ALL_TRACKING_ITEMS_FAIL:
            return { ...state, error: true, loading: false, trackingItems: [], errorText: action.errorText };
        default:
            return state;
    }
};
