const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");


module.exports.checkAdmin = (req, res, next) => {
  const token = req.cookies.adminjwt;
  console.log(req.body);

  if (token) {
    jwt.verify(token, "kishan sheth super secret key", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const admin = await Admin.findById(decodedToken.id);
        console.log(admin);
        if (admin) {
          res.json({ status: true, email: admin.email });
          next();
        } else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
