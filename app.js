// const axios = require('axios');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

//ASYNC <= Regresa una promesa y dentro del async puedo usar await
let getInfo = async(direccion) => {
    try {
        let coors = await lugar.getLugarLatLng(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);

        // console.log(coors);
        // console.log(temp);

        return `[*] El clima en ${ coors.direccion} es de ${temp}°C`;
    } catch (error) {
        return `[!] No se pudo determinar el clima en ${direccion}`
    }

}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));

/************************** Con el codigo de arriba ya NO es necesario este codigo
lugar.getLugarLatLng(argv.direccion)
    .then(resp => {
        console.log(resp);
    })
    .catch(e => console.log(e));

clima.getClima(19.4326077, -99.133208)
    .then(temp => console.log(temp))
    .catch(e => console.log(e));
***************************************/

// console.log(argv.direccion);

/*Codigo movido a lugar/lugar.js para optimización

let encodedUrl = encodeURI(argv.direccion);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM`)
    .then(resp => {
        //************** Parsear la salida en formato JSON
        //let dataResp = (JSON.stringify(resp.data, null, 2));

        let location = resp.data.results[0];
        let coors = location.geometry.location;

        console.log(location.formatted_address);
        console.log(location.geometry.location.lat);
        console.log(location.geometry.location['lng']);
        //otra forma
        console.log("lat:", coors.lat);
        console.log("lng:", coors.lng);
        // console.log(resp.statusng
    })
    .catch(e => console.log('ERROR!!!', e))

*/