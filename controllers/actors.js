const db = require("../models");

const { Actor } = db;


var getAllActors = async (req, res) => {
  const actors = await Actor.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }
  });
  return res.status(200).json({
    message: "Successful",
    actors
  });
};

var updateActor = async (req, res) => {
  const {
    params: { id }
  } = req;

  const { avatar_url } = req.body;

  try {
    const avatarUrl = await Actor.update(
      {
        avatar_url
      },
      {
        where: {
          id
        },
        include: [
          { model: Actor, attributes: { exclude: ["createdAt", "updatedAt"] } }
        ]
      }
    );

    return res.status(200).json({
      message: "Actor updated successfully",
      avatarUrl ,
      
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

var getStreak = () => {};

module.exports = {
  updateActor,
  getAllActors,
  getStreak
};
