const jwt = require("jsonwebtoken");

const apiMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    if (!authHeader) {
      return res.status(401).json({ meg: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .json({ success: false, msg: "Forbidden access!!" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({ meg: "Unauthorized access" });
  }
};

module.exports = { apiMiddleware };
