import postgres from './../databases/postgres.js';

async function createUrl({ idUser, url, shortUrl }){

    await postgres.query(`
        INSERT INTO links ("idUser", "url", "shortUrl") VALUES ($1, $2, $3)
    `, [
        idUser,
        url,
        shortUrl
    ]);

};

async function getUrlById(id){

    const { rows: urls } = await postgres.query(`
        SELECT
            links.id,
            links."shortUrl",
            links.url
        FROM links 
        WHERE id = $1
        LIMIT 1
    `, [
        id
    ]);

    return (urls.length > 0) ? urls[0] : null;

}

async function getUrlByShortUrl(shortUrl){

    const { rows: urls } = await postgres.query(`
        SELECT
            links.id,
            links."shortUrl",
            links.url
        FROM links 
        WHERE "shortUrl" = $1
        LIMIT 1
    `, [
        shortUrl
    ]);

    return (urls.length > 0) ? urls[0] : null;

}

async function increaseViews(shortUrl){

    await postgres.query(`
        UPDATE links
        SET views = views + 1
        WHERE "shortUrl" = $1
    `, [
        shortUrl
    ]);

}

async function deleteUrlById(id){

    await postgres.query(`
        DELETE FROM links
        WHERE id = $1
    `, [
        id
    ]);

}

async function getUrl(id){

    const { rows: urls } = await postgres.query(`
        SELECT *
        FROM links 
        WHERE id = $1
        LIMIT 1
    `, [
        id
    ]);

    return (urls.length > 0) ? urls[0] : null;

}

export {
    createUrl,
    getUrlById,
    getUrlByShortUrl,
    increaseViews,
    deleteUrlById,
    getUrl
};