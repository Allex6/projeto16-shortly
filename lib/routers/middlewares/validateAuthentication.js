import getTokenFromHeader from "../../utils/getTokenFromHeader.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default async function(req, res, next){

    const token = getTokenFromHeader(req);
    if(!token) return res.sendStatus(401);

    try {
        
        const tokenData = jwt.verify(token, JWT_SECRET);
        req.tokenData = tokenData;
        next();

    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }

};