import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../errors/custom.error";
import { JwtToken } from "../../token/jwt.token";

export const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const headerAuth = request.headers.authorization;

  if (!headerAuth)
    return response.status(401).json({ ERROR: "Token is missing!" });

  const [, token] = headerAuth.split(" ");

  if (!token) return response.status(401).json({ ERROR: "Token is missing!" });

  const verifyToken = new JwtToken().validate(token);

  if (verifyToken) return next();

  return response.status(401).json({
    ERROR: "Token invalid!",
  });
};
