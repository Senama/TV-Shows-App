const express = require('express');
const genreRouter = express.Router();
const genreService = require('../services/genres');

genreRouter.get('/allgenres', (req, res) => {
    genreService.getGenres()
        .then(data => res.status(200).json({data}))
        .catch(err => res.status(200).json({err}))
});

module.exports = genreRouter;