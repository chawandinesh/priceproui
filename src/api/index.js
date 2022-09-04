import axios from 'axios';
import _ from 'lodash';
const baseUrl = 'https://api.pricepro.in';

export const getAccessToken = () => {
    const state = JSON.parse(localStorage.getItem('persist:pricepro'));
    if (state) {
        const loginDetails = JSON.parse(_.get(state, 'login', ''));
        const accessToken = loginDetails && `Bearer ${_.get(loginDetails, 'loginDetails.data.access')}`;
        return accessToken;
    } else {
        return '';
    }
};

export const isLogin = () => {
    const state = JSON.parse(localStorage.getItem('persist:pricepro'));
    if (state) {
        const loginDetails = JSON.parse(_.get(state, 'login', ''));
        const userIdExists = Boolean(_.get(loginDetails, 'loginDetails.data.user.id'));
        return userIdExists;
    } else {
        return false;
    }
};

const getSearchResults = async (text) => {
    return await axios({
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        url: `${baseUrl}/common/search/`,
        data: { search_term: text }
    });
};

const getAuthtoken = async (data) => {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/auth/token/`,
        data: data
    });
};

const registerUser = async (data) => {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/user/register/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    });
};

const addToTracking = async (data) => {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/user/tracking/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getAccessToken()
        },
        data: data
    });
};

const getAllTrackingItems = async () => {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/user/tracking/all/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getAccessToken()
        }
    });
};
export { getSearchResults, getAuthtoken, registerUser, getAllTrackingItems, addToTracking };
