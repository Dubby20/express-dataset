const db = require("../models");

const { Event, Actor, Repo } = db;
const options = {
  attributes: { exclude: ["actorId", "repoId", "updatedAt"] },
  include: [
    { model: Actor, as: "actor", attributes: { exclude: ["createdAt", "updatedAt"] } },
    { model: Repo, as: "repo", attributes: { exclude: ["createdAt", "updatedAt"] } }
  ]
};

var getAllEvents = async (req, res) => {
  const events = await Event.findAll(options)
  return res.status(200).json({
    message: 'Successful',
    events,
  })
};

var addEvent = (req, res) => {
  const { type, actor, repo } = req.body;
  Actor.findCreateFind({ where: { ...actor } }).spread(async actorRes => {
    try {
      const eventRes = await Event.create(
        {
          type,
          actorId: actorRes.dataValues.id,
          repo
        },
        { include: [{ model: Repo, as: "repo" }] }
      );

      const event = await Event.findByPk(eventRes.id, options);
      return res.status(201).json({
        message: "Event created successfully",
        event
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  });
};

var getByActor = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const events = await Event.findAll({
      where: {
        actorId: id
      },
      attributes: { exclude: ["actorId", "repoId", "updatedAt"] },
      include: [
        { model: Actor, as: "actor", attributes: { exclude: ["createdAt", "updatedAt"] } },
        { model: Repo, as: "repo", attributes: { exclude: ["createdAt", "updatedAt"] } },
      ]
    });
    return res.status(200).json({
      events,
      message: "All events by actor returned successfully"
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

var eraseEvents = async(req, res) => {
  const events = await Event.destroy({
    truncate: true
  })
  return res.status(200).json({
    message: "All events deleted successfully",
    events:{}
  })
};

module.exports = {
  getAllEvents,
  addEvent,
  getByActor,
  eraseEvents
};
