import axios from 'axios';
const baseUrl = 'https://api.pricepro.in';

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
    const state = JSON.parse(localStorage.getItem('persist:pricepro'));
    const loginDetails = JSON.parse(_.get(state, 'login'));
    const accessToken = _.get(loginDetails, 'loginDetails.access');
    return await axios({
        method: 'POST',
        url: `${baseUrl}/user/register`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: data
    });
};

export { getSearchResults, getAuthtoken, registerUser };
