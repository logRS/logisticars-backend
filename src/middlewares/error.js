import { isCelebrateError } from 'celebrate';
import { StatusCodes } from 'http-status-codes';
import logger from '../lib/logger.js';

export default (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  if (isCelebrateError(err)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: err.message,
      details: err.details
        .values()
        .next()
        .value.details.map((error) => ({
          message: error.message,
          path: error.path,
        })),
    });
  }
  logger.child({ id: res?.locals?.payload?.id_usuario }).error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};
