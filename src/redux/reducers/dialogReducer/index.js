import { dialogActionTypes } from 'redux/actionTypes';

const initialState = {
    infoType: '',
    navigate: null,
    title: '',
    show: false,
    desc: '',
    closeBtnText: 'Close',
    okBtnText: 'Ok',
    hideClose: false,
    hideOpen: false
};
export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case dialogActionTypes.DIALOG_SHOW:
            return {
                ...state,
                infoType: action.infoType,
                navigate: action.navigate,
                title: action.title,
                show: action.show,
                desc: action.desc,
                closeBtnText: action.closeBtnText,
                okBtnText: action.okBtnText,
                hideClose: action.hideClose,
                hideOpen: action.hideOpen
            };
        case dialogActionTypes.DIALOG_HIDE:
            return {
                ...state,
                navigate: null,
                title: '',
                show: false,
                desc: '',
                closeBtnText: 'Close',
                okBtnText: 'Ok',
                hideClose: false,
                hideOpen: false
            };
        default:
            return state;
    }
};
