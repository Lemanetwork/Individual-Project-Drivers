const { Driver } = require("../db");

async function deleteDriverController(id) {
  await Driver.destroy({ where: { id } });
}

module.exports = deleteDriverController;
