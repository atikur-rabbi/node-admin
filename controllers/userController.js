const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, validate } = require("../models/user");

const createUser = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(422).send({
      code: "error",
      message: error.details[0].message,
    });
  }

  let user = await User.findOne({
    email: req.body.email,
    isDeleted: false,
  }).exec();

  if (user) {
    return res.status(400).send({
      code: "error",
      message: "This email is already registered",
    });
  }

  user = new User(_.pick(req.body, ["nama", "email", "password", "role"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  (await user).save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .status(200)
    .send({
      code: "success",
      message: "User created successfully",
      data: _.pick(user, ["_id", "nama", "email"]),
    });
};

const deleteUser = async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res.status(401).send({
      code: "error",
      message: "User not found",
    });
  }

  user.isDeleted = true;
  user.deletedAt = new Date();

  (await user).save();

  res.status(200).send({
    code: "success",
    message: "User deleted successfully",
    data: user,
  });
};

module.exports = {
  createUser,
  deleteUser,
};
