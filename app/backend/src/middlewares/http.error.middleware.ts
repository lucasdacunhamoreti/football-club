import { ErrorRequestHandler } from 'express';

import HttpException from '../utils/http.exception';

const httpErrorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  if (err instanceof HttpException) {
    return res.status(status).json({
      message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default httpErrorMiddleware;
