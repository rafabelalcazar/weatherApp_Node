const colors = require("colors");
const { getPlace, getWeather } = require("./searcher/search");

const argv = require("yargs").options({
  addres: {
    alias: "d",
    describe: "Dirección de la ciudad para obtener el clima",
    demandOption: true,
  },
}).argv;

const getInfo = async (addres) => {
  try {
    const place = await getPlace(addres);
    const { temp } = await getWeather(place.lat, place.lng);
    return `La temperatura en ${place.addres} es ${temp}°C`.green;
  } catch (error) {
    return `No se encuentra la ciudad ${addres}`.red;
  }
};

getInfo(argv.addres)
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
