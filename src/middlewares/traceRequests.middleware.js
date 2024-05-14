import fastuuid from "../utils/fastuuid.js";

export default (_req, res , next) => {
  res.locals.id_request = fastuuid();
  next();
}