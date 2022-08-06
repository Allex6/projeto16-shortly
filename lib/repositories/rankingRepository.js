import postgres from './../databases/postgres.js';

async function getRankingList(){

    const { rows } = await postgres.query(`
        SELECT
            users.id,
            users.name,
            COUNT(links.id) AS "linksCount",
            COALESCE(SUM(links.views) FILTER (WHERE links.views > 0), 0) AS "visitCount"
        FROM users
        LEFT JOIN links
        ON links."idUser" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `);

    return rows;

};

export {
    getRankingList
};