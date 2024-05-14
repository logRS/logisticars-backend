import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt.js";

export default (req, res, next) => {
  // Bearer xxxx
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: "No token provided",
    });

  try {
    const data = jwt.verify(token);
    res.locals.payload = data;
    res.caller = [data?.id_usuario, res.id_request];
    return next();
  } catch (_err) {
    return next({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
  }
};
