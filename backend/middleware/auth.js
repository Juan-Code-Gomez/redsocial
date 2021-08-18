const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");

  // [Bearer, iufhwuhr2urh2i3ufasfsfhuiehuiu]
  //       0, 1
  jwtToken = jwtToken.split(" ")[1];
  //iufhwuhr2urh2i3ufasfsfhuiehuiu
  if (!jwtToken) return res.status(400).send("Authorization denied: No token"); 


  try {
    const payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(400).send("Authorization denied: Invalid Token");
  }
};

module.exports = auth;