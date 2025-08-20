import jwt from "jsonwebtoken";
import User from "../models/User.js"; // added .js

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
