import { getSearchResults } from '../../api';
import { searchActionTypes } from '../actionTypes';

const atnGetSearchResults = (searchText) => {
    console.log(searchText);
    return async (dispatch, getState) => {
        dispatch({ type: searchActionTypes.LOADING });
        await getSearchResults(searchText)
            .then((res) => {
                dispatch({ type: searchActionTypes.SET_SEARCH_RESULTS, data: res.data });
            })
            .catch((err) => {
                dispatch({ type: searchActionTypes.ERROR });
            });
    };
};

export { atnGetSearchResults };
