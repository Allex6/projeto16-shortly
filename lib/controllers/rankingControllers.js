import dotenv from 'dotenv';
import { getRankingList } from '../repositories/rankingRepository.js';
dotenv.config();

async function getRanking(req, res, next){

    try {
        
        const ranking = await getRankingList();
        res.status(200).send(ranking);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

export {
    getRanking
};