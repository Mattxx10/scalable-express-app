import jwt, { Secret } from 'jsonwebtoken';
import { controllers } from '../controllers';

interface TokenPayload {
  userId: string;
  accountId: string;
}

interface DecodedTokenPayload {
  user: object;
  account: object;
}

export const generateAuthToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET! as Secret, { expiresIn: '1h' });
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
      
      const account = await controllers.getAccountById(decoded.accountId);
      const decodedToken = { user: {}, account };

      resolve(decodedToken as DecodedTokenPayload);
    });
  });
};
