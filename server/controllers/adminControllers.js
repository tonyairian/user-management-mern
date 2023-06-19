const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const User = require("../model/authModel");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "Incorrect Email";
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

module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.cookie("adminjwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ admin: admin._id, status: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, status: false });
  }
};

module.exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
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

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    console.log(error + "user list error");
  }
};

module.exports.deleteUser = async (req, res) => {
  const { userId } = req.body;
  await User.findByIdAndDelete(userId)
    .then((result) => {
      console.log("user deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.editUser = async (req, res) => {
  const { userId } = req.body;
  await User.findOne({ _id: userId })
    .then((result) => {
      res.status(200).json({ userDetails: result, userFound: true });
    })
    .catch((err) => {
      console.log(err, "user not found");
    });
};

module.exports.updateUser = async (req, res) => {
  const { email, name } = req.body;
  await User.findOneAndUpdate({ name: name, email: email })
    .then((result) => {
      res.status(200).json({ userDetails: result, userUpdated: true });
    })
    .catch((err) => {
      console.log(err);
    });
};
