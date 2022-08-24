// project imports
import config from 'config';

// action - state management
import { uiActionTypes } from '../actionTypes';

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const uiReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case uiActionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case uiActionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case uiActionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case uiActionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};
