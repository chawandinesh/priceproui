import { registerUser } from '../../api';
import { registerActionTypes } from '../actionTypes';
import _ from 'lodash';

const atnRegisterUser = (data, navigate) => {
    return async (dispatch, getState) => {
        dispatch({ type: registerActionTypes.REGISTER_LOADING });
        await registerUser(data)
            .then((res) => {
                dispatch({ type: registerActionTypes.REGISTER_SUCCESS, data: res.data });
                navigate('/login');
            })
            .catch((err) => {
                dispatch({ type: registerActionTypes.REGISTER_FAIL, errorText: _.get(err, 'response.data.detail', '') });
            });
    };
};

export { atnRegisterUser };
