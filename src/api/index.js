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

const getSearchResult = async (text) => {
    return await axios({
        method: 'GET',
        url: `https://demo.dataverse.org/api/search?q=${text}`
    });
};

export { getSearchResults };
