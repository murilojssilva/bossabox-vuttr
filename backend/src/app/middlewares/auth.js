import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: "Token not provider" });
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    request.userId = decoded.id;
    return next();
  } catch (err) {
    return response.status(401).json({ error: "Token invalid" });
  }
  console.log(authHeader);
};
