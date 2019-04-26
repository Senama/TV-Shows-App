const { db } = require('./dbConnect');
const userService = {};

userService.getAllUsers = () => {
    const sql = `
    SELECT *
    FROM users
    `;
    return db.any(sql);
};

userService.getUser = (id) => {
    const sql = `
    SELECT *
    FROM users
    WHERE id = $[id]
    `;
    return db.one(sql, {id});
};

userService.postUser = (username) => {
    const sql = `
    INSERT INTO users (username) 
    VALUES ($[username])
    RETURNING id
    `;
    return db.one(sql, {username});
};

userService.getAllInfo = (id) => {
    const sql = `
    SELECT shows.id AS show_id, shows.title, shows.img_url, shows.user_id, 
    shows.genre_id, genres.genre_name 
    FROM shows 
    JOIN genres on shows.genre_id = genres.id 
    WHERE shows.user_id = $[id]
    `
    return db.any(sql, {id});
};

module.exports = userService;