const axios = require('axios');
const getClima = async(lat, lng) => {
    try {
        let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=a1504d82d9f34fcbb9103b621db6e6b6&units=metric`)

        return resp.data.main.temp;

    } catch (e) {
        throw new Error(`ERROR!!`);
    }
}

module.exports = {
    getClima
}