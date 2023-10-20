import { Request, Response, Router } from 'express';
import Token from '../classes/token';
import bcrypt from 'bcrypt'
import { STATUSES } from '../constants/statuses';
require('dotenv').config();

const authRoute = Router();


authRoute.post('/get-token', (req: Request, res: Response) => {
    const hashedPassword = String(req.query.password);
    const secretKey = process.env.SECRET_KEY!

    if (bcrypt.compareSync(secretKey, hashedPassword)) {
        let token = generarToken();
        res.status(STATUSES[200].code).json({
            status: STATUSES[200].status,
            body: token
        })
    } else {
        res.status(STATUSES[500].code).json({
            status: STATUSES[500].status,
            msg: STATUSES[500].msg
        });
    }
})



//Funcion para generar token.
const generarToken = () => {
    const token = Token.getJwtToken({
        time: new Date(),
    });

    return token;
};


export default authRoute;