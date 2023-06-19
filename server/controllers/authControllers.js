const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const directoryPath = "public/";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message == "Name is Required") {
    errors.name = "Name is Required";
  }
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

module.exports.editProfile = async (req, res) => {
  const { userId } = req.body;
  await User.findOne({ _id: userId })
    .then((result) => {
      res.status(200).json({ userDetails: result, userEdited: true });
    })
    .catch((err) => {
      console.log(err, "user not found");
    });
};

module.exports.updateUser = async (req, res) => {
  const image = req.files[0]?.filename;
  const { email, name } = req.body;
  await User.findOneAndUpdate({ name: name, email: email, image: image })
    .then((result) => {
      res.status(200).json({ userDetails: result, userUpdated: true });
    })
    .catch((err) => {
      console.log(err);
    });
};
