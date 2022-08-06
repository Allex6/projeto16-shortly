import postgres from './../databases/postgres.js';

async function createUser({ name, email, password }){

    await postgres.query(`
        INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)
    `, [
        name,
        email,
        password
    ]);

};

async function getUserByEmail(email){

    const { rows: users } = await postgres.query(`
        SELECT * FROM users WHERE email = $1
        LIMIT 1
    `, [
        email
    ]);

    return users;

}

async function getUserById(id){

    const { rows: users } = await postgres.query(`
        SELECT
            users.id,
            users.name,
            COALESCE(SUM(links.views) FILTER (WHERE links.views > 0), 0) AS "visitCount",
            COALESCE(JSON_AGG(links) FILTER (WHERE links."idUser" IS NOT NULL), '[]') AS "shortenedUrls"
        FROM users
        LEFT JOIN links
        ON links."idUser" = users.id
        WHERE users.id = $1
        GROUP BY users.id
        LIMIT 1;
    `, [
        id
    ]);

    return users;

}

export {
    createUser,
    getUserByEmail,
    getUserById
};