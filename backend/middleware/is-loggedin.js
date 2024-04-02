const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;

  const processedToken = token ? token.split("Bearer ") : "";
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access - Token not provided" });
  }

  try {
    const user =
      processedToken && processedToken[1]
        ? jwt.verify(processedToken[1], "khaair")
        : null;


    req.user = user; 
    return next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Unauthorized access - Invalid token" });
  }
};

module.exports = { isLoggedIn };
