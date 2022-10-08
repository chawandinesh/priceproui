import { getAuthtoken } from '../../api';
import { loginActionTypes } from '../actionTypes';
import _ from 'lodash';

const atnGetLoginToken = (data, navigate) => {
    return async (dispatch, getState) => {
        dispatch({ type: loginActionTypes.LOGIN_LOADING });
        await getAuthtoken(data)
            .then((res) => {
                dispatch({ type: loginActionTypes.LOGIN_SUCCESS, data: res.data });
                navigate('/search');
            })
            .catch((err) => {
                dispatch({ type: loginActionTypes.LOGIN_FAIL, errorText: _.get(err, 'response.data.detail', '') });
            });
    };
};

const atnLogout = () => {
    return async (dispatch, getState) => {
        dispatch({ type: loginActionTypes.LOGOUT });
    };
};
export { atnGetLoginToken, atnLogout };
