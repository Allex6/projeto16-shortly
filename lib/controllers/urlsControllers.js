import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { createUrl, deleteUrlById, getUrl, getUrlById, getUrlByShortUrl, increaseViews } from '../repositories/urlsRepository.js';
dotenv.config();

async function shorten(req, res, next){

    const { idUser } = req.tokenData;
    const { url } = req.body;
    const shortUrl = nanoid(12);

    try {
        
        await createUrl({ idUser, url, shortUrl });
        res.status(201).send({ shortUrl });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

};

async function getById(req, res, next){

    const { id } = req.params;

    try {
        
        const urlData = await getUrlById(id);
        if(!urlData) return res.sendStatus(404);

        res.status(200).send(urlData);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

async function openUrl(req, res, next){

    const { shortUrl } = req.params;

    try {
        
        const urlData = await getUrlByShortUrl(shortUrl);
        if(!urlData) return res.sendStatus(404);

        await increaseViews(shortUrl);
        res.redirect(urlData.url);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

async function deleteUrl(req, res, next){

    const { id } = req.params;
    const { idUser } = req.tokenData;

    try {
        
        const urlData = await getUrl(id);
        if(!urlData) return res.sendStatus(404);

        if(urlData.idUser !== idUser) return res.sendStatus(401);

        await deleteUrlById(id);
        res.sendStatus(204);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export {
    shorten,
    getById,
    openUrl,
    deleteUrl
};