const {
  register,
  login,
  editProfile,
  updateUser,
} = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");
const store = require('../utils/multer')  

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/editprofile", editProfile);
router.post("/updateuser",store.any('image'), updateUser);
router.post("/updateuser", updateUser);

module.exports = router;
