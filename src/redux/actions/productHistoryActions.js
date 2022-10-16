import { getProductHistory } from 'api';
import _ from 'lodash';
import { productHistoryActionTypes } from 'redux/actionTypes';

const atnGetProductHistory = (ids) => {
    return async (dispatch, getState) => {
        dispatch({ type: productHistoryActionTypes.PRODUCT_HISTORY_LOADING });
        try {
            if (_.size(ids)) {
                const result = await Promise.all(_.map(ids, (each) => getProductHistory(each)));
                if (_.size(result)) {
                    const data = _.map(result, (each) => {
                        return _.get(each, 'data').sort((a, b) => {
                            let dateA = new Date(a.created_at);
                            let dateB = new Date(b.created_at);
                            return dateA - dateB;
                        });
                    });
                    dispatch({ type: productHistoryActionTypes.PRODUCT_HISTORY_SUCCESS, data: data });
                } else {
                    dispatch({ type: productHistoryActionTypes.PRODUCT_HISTORY_FAIL, errorText: 'No History found' });
                }
            } else {
                dispatch({ type: productHistoryActionTypes.PRODUCT_HISTORY_FAIL, errorText: 'No History found' });
            }
        } catch (err) {
            dispatch({ type: productHistoryActionTypes.PRODUCT_HISTORY_FAIL, errorText: 'Failed to fetch product history' });
        }
    };
};

export { atnGetProductHistory };
