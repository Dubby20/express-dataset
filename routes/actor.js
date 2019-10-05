var express = require("express");
var { returnValidationErrors, validateAvatarUrl, validateId, validateAvatarUrl } = require("../middleware/validation");
var router = express.Router();
const { getAllActors, updateActor } = require("../controllers/actors");

// Routes related to actor.

router.get("/", getAllActors);
router.put("/:id", validateId, validateAvatarUrl, returnValidationErrors, updateActor)
module.exports = router;
