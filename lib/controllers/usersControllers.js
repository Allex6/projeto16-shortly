import { createUser, getUserByEmail, getUserById } from "../repositories/usersRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_TOKEN_EXPIRATION = (60*60) * 1000;

async function signIn(req, res, next){

    const bodyData = req.body;

    try {
        
        const users = await getUserByEmail(bodyData.email);
        if(users.length === 0) return res.sendStatus(401);

        const user = users[0];
        const correctPassword = bcrypt.compareSync(bodyData.password, user.password);

        if(!correctPassword)  return res.sendStatus(401);

        const token = jwt.sign({ idUser: user.id }, JWT_SECRET, { expiresIn: DEFAULT_TOKEN_EXPIRATION });

        res.status(200).send({ token });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

async function signUp(req, res, next){

    const bodyData = req.body;

    try {
     
        const users = await getUserByEmail(bodyData.email);
        if(users.length > 0) return res.sendStatus(409);

        bodyData.password = bcrypt.hashSync(bodyData.password, 12);
        delete bodyData.confirmPassword;

        await createUser(bodyData);
        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

async function me(req, res, next){

    try {
        
        const { idUser } = req.tokenData;
        const users = await getUserById(idUser);

        if(users.length === 0) return res.sendStatus(404);

        res.send(users[0]);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

export {
    signIn,
    signUp,
    me
};