const { Driver, Team } = require("../db");
const axios = require("axios");

async function getDriverById(id, src) {
  if (src === "api") {
    const { data } = await axios.get(`http://localhost:5000/drivers/${id}`);

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
    const { forename, surname, Teams, description, image, nationality, dob } =
      await Driver.findByPk(id, {
        include: {
          model: Team,
          attributes: ["name"],
        },
      });

    let teamsCollection = [];

    Teams.forEach((teamDriver) => {
      teamsCollection.push(teamDriver.name);
    });

    teamsCollection = teamsCollection.join(", ");

    return {
      id,
      forename,
      surname,
      teams: teamsCollection,
      description,
      image,
      nationality,
      dob,
    };
  }
}

module.exports = getDriverById;
