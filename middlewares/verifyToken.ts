import { Response, NextFunction } from 'express';
import Token from '../classes/token';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('Authorization') || '';

    Token.testToken(userToken)
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log('ERROR TOKEN INCORRECTO', err);

            res.status(500).json({
                error: 9999,
                msg: 'Token incorrecto',
            });
        });
};
