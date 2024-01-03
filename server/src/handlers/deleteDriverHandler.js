const deleteDriverController = require("../controllers/deleteDriverController");

async function deleteDriverHandler(req, res) {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      await deleteDriverController(id);
      res.status(200).json({ message: "Driver was deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = deleteDriverHandler;
