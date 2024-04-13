// const User = require("../models/User.js");
// const bcrypt = require("bcryptjs");
const axios = require("axios");

const headers = {
    'sec-ch-ua': process.env.SEC_CH_UA,
    'X-APP-ID': process.env.X_APP_ID,
    'x-device-type': process.env.X_DEVICE_TYPE,
    'sec-ch-ua-mobile': '?1',
    'Authorization': process.env.AUTH,
    'x-platform': process.env.X_PLATFORM,
    'User-Agent': process.env.USER_AGENT,
    'Accept': 'application/json, text/plain, */*',
    'Referer': process.env.REFERER,
    'X-REQUEST-CHECKSUM': process.env.X_REQUEST_CHECKSUM,
    'X-USER-CAMPAIGN': process.env.X_USER_CAMPAIGN,
    'X-DEVICE-ID': process.env.X_DEVICE_ID,
};


const headers2 = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'referer': process.env.REFERER,
    'sec-ch-ua': process.env.SEC_CH_UA,
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': process.env.USER_AGENT,
    'x-app-id': process.env.X_APP_ID,
    'x-device-id': process.env.X_DEVICE_ID,
    'x-device-type': process.env.X_DEVICE_TYPE,
    'x-platform': process.env.X_PLATFORM,
    'x-request-checksum': process.env.X_REQUEST_CHECKSUM2,
    'x-request-id': process.env.X_REQUEST_ID2
};

const getSearch = async (req, res, next) => {

    const id = req.params.id;

    axios.get(process.env.BASE_URL+`/data/mf/web/v3/scheme/search/${id}`, { headers })
        .then(response => {
            // console.log(response.data);
            // console.log("hiii");
            res.status(200).json(response.data);
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        });
};

const getQuery = async (req, res, next) => {
    const id = req.params.id;
    axios.get(process.env.BASE_URL+`/search/v3/query/global/st_p_query?entity_type=scheme&page=0&query=${id}&size=50&web=true`, { headers2 })
        .then(response => {
            // console.log(response.data);
            // console.log("byee");
            res.status(200).json(response.data);
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        });
};


module.exports = { getQuery, getSearch };
