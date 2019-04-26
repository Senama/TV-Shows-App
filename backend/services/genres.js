const {db} = require('./dbConnect');
const genreService = {};

genreService.getGenres = () => {
    const sql =`
    SELECT *
    FROM genres
    `;
    return db.any(sql);
}

module.exports = genreService;
