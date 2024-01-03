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
    return res.status(400).json({
      error: "We are missing some important information about the Driver",
    });

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
