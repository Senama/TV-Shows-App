const { db } = require('./dbConnect');
const showService = {};

showService.getShows = () => {
    const sql = `
    SELECT *
    FROM shows
    `;
    return db.any(sql);
};

showService.getShowByGenre = (genreid) => {
    const sql = `
    SELECT *
    FROM shows
    WHERE genre_id = $[genreid]
    `;
    return db.any(sql, {genreid})
};

showService.getShowByUser = (userid) => {
    const sql = `
    SELECT *
    FROM shows
    WHERE user_id = $[userid]
    `;
    return db.any(sql, {userid})
};

showService.getShow = (id) => {
    const sql = `
    SELECT *
    FROM shows
    WHERE id = $[id]
    `;
    return db.one(sql, {id})
} ;

showService.postShow = (title, img_url, user_id, genre_id) => {
    const sql = `
    INSERT INTO shows (title, img_url, user_id, genre_id)
    VALUES ($[title], $[img_url], $[user_id], $[genre_id])
    RETURNING id
    `;
    return db.one(sql, {title, img_url, user_id, genre_id});
};

showService.getShowInfo = (id) => {
    const sql = `
    SELECT shows.*, genres.genre_name, users.username
    FROM shows
    JOIN genres ON shows.genre_id = genres.id
    JOIN users ON shows.user_id = users.id
    WHERE shows.id = $[id]
    `;
    return db.one(sql, {id});
};

showService.getUniqueShows = () => {
    const sql = `
    SELECT 
    DISTINCT title
    FROM shows
    `;
    return db.any(sql);
};

showService.getUsersOfShow = (title) => {
    const sql = `
    SELECT shows.*, users.username
    FROM shows
    JOIN users ON users.id = shows.user_id
    WHERE shows.title = $[title] 
    `;
    return db.any(sql, {title});
};

module.exports = showService;