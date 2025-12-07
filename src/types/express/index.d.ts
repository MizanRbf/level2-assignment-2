// Type declaring file
// This is jwtPayload
// {
//   name: 'Mah',
//   email: 'mizan@gmail.com',
//   iat: 1765095033,
//   exp: 1765699833
// }

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
