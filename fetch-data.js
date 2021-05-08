const axios = require("axios");

const fetchData = async (url, year, month, day) => {
    const logs = await axios.get(url + year + month + day).then((response) => {
        if (response.data.error.length > 1) {
            throw new Error("Ошибка: ", response.data.error);
        }
        return [...response.data.logs];
    }, (errorFetch) => console.log(errorFetch))
    const data = await logs;
    return data;
}

module.exports = fetchData;