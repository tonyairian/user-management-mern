const {
  adminLogin,
  addUser,
  getUsers,
  deleteUser,
  editUser,
  updateUser
} = require("../controllers/adminControllers");
const {checkAdmin}=require('../middlewares/adminMiddleware');
const router = require("express").Router();
router.post('/',checkAdmin)
router.post("/login",adminLogin);
router.post("/adduser", addUser);
router.get("/users", getUsers);
router.post('/delete',deleteUser);
router.post('/edituser',editUser)
router.post('/updateuser',updateUser);
module.exports = router;
