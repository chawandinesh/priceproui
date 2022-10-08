import { getSearchResults } from '../../api';
import { searchActionTypes } from '../actionTypes';
import _ from 'lodash';
import { atnGetProductHistory } from './productHistoryActions';

const atnGetSearchResults = (searchText) => {
    return async (dispatch, getState) => {
        dispatch({ type: searchActionTypes.LOADING });
        await getSearchResults(searchText)
            .then((res) => {
                const productIds = _.map(res.data, (each) => _.get(each, 'id', ''));
                dispatch({ type: searchActionTypes.SET_SEARCH_RESULTS, data: res.data });
                if (productIds.length) {
                    dispatch(atnGetProductHistory(productIds));
                }
            })
            .catch((err) => {
                dispatch({ type: searchActionTypes.ERROR });
            });
    };
};

export { atnGetSearchResults };
