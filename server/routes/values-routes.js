const express = require("express");
const valuesHandler = require("../handlers/values-handlers");

const router = express.Router();

router.route("/all").get(valuesHandler.getAllValues);
router.route("/current").get(valuesHandler.getCurrentValues);
router.route("/").post(valuesHandler.submitIndex);

module.exports = router;
