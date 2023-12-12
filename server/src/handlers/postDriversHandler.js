const postDriversController = require("../controllers/postDriversController");

async function postDriversHandler(req, res) {
  const { forename, surname, description, image, nationality, dob, teamId } =
    req.body;

  if (
    !forename ||
    !surname ||
    !description ||
    !image ||
    !nationality ||
    !dob ||
    !teamId
  )
    res.status(400).send("Faltan datos del Driver");

  try {
    const newDriver = await postDriversController(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teamId
    );

    res.status(200).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = postDriversHandler;
