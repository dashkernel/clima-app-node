const axios = require('axios');

// cuando hacemos el async eso regresa una promesa, por tanto se puede hacer then, catch, etc
const getLugarLatLng = async(direccion) => {

    let encodedUrl = encodeURI(direccion);

    //Espera a que la peticion regrese y lo que retorne insertarlo en 'resp'
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM`)

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${direccion}`)
    }

    let location = resp.data.results[0];
    let coors = location.geometry.location;

    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }

}

module.exports = {
    getLugarLatLng
}