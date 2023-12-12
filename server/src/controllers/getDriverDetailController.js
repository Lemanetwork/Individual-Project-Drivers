const axios = require("axios");
const { Driver } = require("../db");

async function getDriverById(idDriver, src) {
  if (src === "api") {
    const { data } = await axios.get(
      `http://localhost:5000/drivers/${idDriver}`
    );

    const driverDetail = {
      id: data.id,
      forename: data.name.forename,
      surname: data.name.surname,
      teams: data.teams,
      description: data.description,
      image: data.image
        ? data.image.url
        : "https://img.freepik.com/premium-photo/man-racing-suit-stands-front-blurry-background_901003-10316.jpg",
      nationality: data.nationality,
      dob: data.dob,
    };

    return driverDetail;
  } else {
    const driverDetail = await Driver.findByPk(idDriver);

    if (!driverDetail)
      throw new Error(`No se encontraron Drivers con el id: ${idDriver}`);

    return driverDetail;
  }
}

module.exports = {
  getDriverById,
};
