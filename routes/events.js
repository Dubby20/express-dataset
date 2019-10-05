var express = require("express");
var router = express.Router();
const { addEvent, getByActor, getAllEvents, eraseEvents } = require("../controllers/events");
const { returnValidationErrors, validateEvent, validateId } = require("../middleware/validation");

// Routes related to event
router.post("/", validateEvent, returnValidationErrors, addEvent);
router.get("/actors/:id", validateId, getByActor);
router.get("/", getAllEvents)
router.delete("/erase", eraseEvents)

module.exports = router;
