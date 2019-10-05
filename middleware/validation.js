const expressValidator = require("express-validator");
const { Actor, Event } = require("../models");

const { check, validationResult } = expressValidator;

const returnValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) return next();
  return res.status(400).json({ errors });
};

const validateEvent = [
  check("type")
    .not()
    .isEmpty()
    .withMessage("Type must not be empty")
    .isString()
    .withMessage("Please login should contain letters"),

  check("actor.login")
    .not()
    .isEmpty()
    .withMessage("Login must not be empty")
    .isString()
    .withMessage("Please login should contain letters"),

  check("actor.avatar_url")
    .not()
    .isEmpty()
    .withMessage("Login must not be empty")
    .isURL()
    .withMessage("Avatar url must be a valid url"),

  check("repo.name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .isString()
    .withMessage("Please name should contain letters"),

  check("repo.url")
    .not()
    .isEmpty()
    .withMessage("Login must not be empty")
    .isURL()
    .withMessage("url must be a valid url")
];

const validateActor = [
  check("login")
    .not()
    .isEmpty()
    .withMessage("Login must not be empty")
    .isString()
    .withMessage("Please login should contain letters"),

  check("avatar_url")
    .not()
    .isEmpty()
    .withMessage("Avatar url must not be empty")
    .isURL()
    .withMessage("Avatar url must be a valid url")
];

const validateAvatarUrl = [
  check("avatar_url")
    .not()
    .isEmpty()
    .withMessage("Avatar url must not be empty")
    .isURL()
    .withMessage("Avatar url must be a valid url")
];

const validateId = async (req, res, next) => {
  const {
    params: { id }
  } = req;
  try {
    const actorId = await Actor.findOne({
      where: {
        id
      }
    });
    if (!Number(id)) {
      return res.status(400).json({
        message: "Id is not a number"
      });
    }

    if (!actorId) {
      return res.status(404).json({
        message: "Actor id does not exist"
      });
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};
module.exports = {
  returnValidationErrors,
  validateEvent,
  validateId,
  validateActor,
  validateAvatarUrl
};
