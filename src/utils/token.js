import jwt from jsonwebtoken;
import { jwtConfig } from "../config/jwt";

export const signAccessToken = (payload) => {
    return jwt.sign(payload, jwtConfig.accessTokenSecret,
        {
            expiresIn: jwtConfig.accessTokenExpiry,
        }
    );
};


export const verifyAccessToken = async (token) => {
    return jwt.verify(token, jwtConfig.accessTokenSecret);
}