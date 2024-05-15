import jwt, { Secret } from 'jsonwebtoken';
import { AccountContoller, UserController } from '../controllers';
import { ITokenPayload, IDecodedTokenPayload } from '../interfaces';

export const generateAuthToken = (payload: ITokenPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET! as Secret, { expiresIn: '10h' });
  return token;
};

export const verifyAuthToken = (token: string): Promise<IDecodedTokenPayload> => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ code: 'TOKEN_REQUIRED', message: 'Authorization token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET! as Secret, async (err, decoded) => {
      if (err) {
        reject({ code: 'INVALID_TOKEN', message: 'Invalid token' });
      }
      
      const account = await AccountContoller.getAccountById(decoded.accountId);
      const user = await UserController.getUserById(decoded.userId); 
      const decodedToken = { user, account };

      resolve(decodedToken as IDecodedTokenPayload);
    });
  });
};
