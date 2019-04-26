const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost/tvwatchlistapp');

module.exports = {
    db,
}
