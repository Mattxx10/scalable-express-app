import jwt, { Secret } from 'jsonwebtoken';
import { controllers } from '../controllers';
import { TokenPayload, DecodedTokenPayload } from './interfaces';

export const generateAuthToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET! as Secret, { expiresIn: '10h' });
  return token;
};

export const verifyAuthToken = (token: string): Promise<DecodedTokenPayload> => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ code: 'TOKEN_REQUIRED', message: 'Authorization token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET! as Secret, async (err, decoded) => {
      if (err) {
        reject({ code: 'INVALID_TOKEN', message: 'Invalid token' });
      }
      
      const account = await controllers.accounts.getAccountById(decoded.accountId);
      const user = await controllers.users.getUserById(decoded.userId);
      const decodedToken = { user, account };

      resolve(decodedToken as DecodedTokenPayload);
    });
  });
};

export const generatePasswordToken = (payload: string): string => {
  const token = jwt.sign(payload, process.env.JWT_PASSWORD_SECRET! as Secret);
  return token;
};

