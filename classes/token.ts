import jwt from 'jsonwebtoken';
require('dotenv').config();


export default class Token {
    private static seed: string = process.env.TOKEN_SEED!;
    private static caucidad: string = '30d';

    constructor() { }

    static getJwtToken(user: any): string {
        return jwt.sign(
            {
                usuario: user,
            },
            this.seed,
            { expiresIn: this.caucidad }
        );
    }

    static testToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.seed, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}
