const axios = require("axios");

// use your api keys
const services = require("../key").services;

const getPlace = async (address) => {
  let encodeAddress = encodeURI(address);

  let resp = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${services.googleMapsApiKey}`
  );

  if (resp.data.status == "ZERO_RESULTS") {
    throw new Error(`No existen resultados para ${address}`);
  }

  let formatedAddress = resp.data.results[0].formatted_address;
  let { lat, lng } = resp.data.results[0].geometry.location;

  return {
    addres: formatedAddress,
    lat,
    lng,
  };
};

const getWeather = async (lat, lng) => {
  let resp = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${services.openweathermapKey}&units=metric`
  );
  return resp.data.main;
};

module.exports = {
  getPlace,
  getWeather,
};
