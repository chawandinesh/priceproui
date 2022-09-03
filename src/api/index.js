import axios from 'axios';
import _ from 'lodash';
const baseUrl = 'https://api.pricepro.in';
const state = JSON.parse(localStorage.getItem('persist:pricepro'));
console.log(state, 'state');
const loginDetails = JSON.parse(_.get(state, 'login'));
console.log(loginDetails, 'login');
const accessToken = `Bearer ${_.get(loginDetails, 'loginDetails.data.access')}`;
console.log('token', accessToken);

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
            Authorization: accessToken
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
            Authorization: accessToken
        }
    });
};
export { getSearchResults, getAuthtoken, registerUser, getAllTrackingItems, addToTracking };
