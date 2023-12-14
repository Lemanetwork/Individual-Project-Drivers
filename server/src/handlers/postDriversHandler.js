const postDriversController = require("../controllers/postDriversController");

async function postDriversHandler(req, res) {
  const { forename, surname, teams, description, image, nationality, dob } =
    req.body;

  if (
    !forename ||
    !surname ||
    !teams ||
    !description ||
    !image ||
    !nationality ||
    !dob
  )
    res.status(400).json({ error: "Faltan datos del Driver" });

  try {
    const newDriver = await postDriversController(
      forename,
      surname,
      teams,
      description,
      image,
      nationality,
      dob
    );

    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = postDriversHandler;
