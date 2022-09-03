import { getAllTrackingItems } from '../../api';
import { allTrackingItemsActionTypes } from '../actionTypes';
import _ from 'lodash';

const atnAllTrackingItemsActions = (data, navigate) => {
    return async (dispatch, getState) => {
        dispatch({ type: allTrackingItemsActionTypes.ALL_TRACKING_ITEMS_LOAD });
        await getAllTrackingItems()
            .then((res) => {
                dispatch({ type: allTrackingItemsActionTypes.ALL_TRACKING_ITEMS_SUCCESS, data: res.data });
            })
            .catch((err) => {
                dispatch({ type: allTrackingItemsActionTypes.ALL_TRACKING_ITEMS_FAIL, errorText: _.get(err, 'response.data.detail', '') });
            });
    };
};

export { atnAllTrackingItemsActions };
