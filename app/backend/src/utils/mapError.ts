import { IStatusCode } from '../interfaces/IStatusCode';

const statusCode: IStatusCode = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  unprocessable: 422,
};

const mapError = (type: string): number => {
  const result = statusCode[type] || 500;
  return result;
};

export default mapError;
