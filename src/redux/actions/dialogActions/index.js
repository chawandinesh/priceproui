import _ from 'lodash';
import { dialogActionTypes } from 'redux/actionTypes';

const atnShowDialog = (infoType, navigate, title, desc, closeBtnText, okBtnText, hideClose, hideOpen) => {
    return (dispatch, getState) => {
        console.log(infoType);
        dispatch({
            type: dialogActionTypes.DIALOG_SHOW,
            infoType: infoType,
            navigate: navigate,
            title: title,
            show: true,
            desc: desc,
            closeBtnText: closeBtnText || 'Close',
            okBtnText: okBtnText || 'Ok',
            hideClose: hideClose || false,
            hideOpen: hideOpen || false
        });
    };
};

const atnCloseDialog = () => ({ type: dialogActionTypes.DIALOG_HIDE });

const atnOnOk = () => {
    return (dispatch, getState) => {
        const infoType = _.get(getState(), 'dialog.infoType');
        const navigate = _.get(getState(), 'dialog.navigate');
        console.log(getState());
        switch (infoType) {
            case 'loginRequired':
                dispatch(atnCloseDialog());
                navigate('/login');
                break;
            default:
                dispatch(atnCloseDialog());
        }
    };
};

export const dialogActions = {
    atnCloseDialog,
    atnShowDialog,
    atnOnOk
};
