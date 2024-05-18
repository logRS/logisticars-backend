import fastuuid from '../utils/fastuuid.js';

export default (_req, res, next) => {
  res.id_request = fastuuid();
  next();
};
