import * as jwt from "jsonwebtoken";
const authConfig = require('../config/auth')

export  const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}


export class Authenticator {
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
      },
      authConfig.secret as string,
      {
        expiresIn: 86400,
      }
    );
    return token;
  }
  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, authConfig.secret as string) as any;
    const result = {
      id: payload.id,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
}
