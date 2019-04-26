const express = require('express');
const showRouter = express.Router();
const showService = require('../services/shows');

showRouter.get('/allshows', (req, res) => {
    showService.getShows()
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }));
});

showRouter.get('/genre/:genreid', (req, res) => {
    const { genreid } = req.params;

    showService.getShowByGenre(genreid)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }));
});

showRouter.get('/user/:userid', (req, res) => {
    const { userid } = req.params;

    showService.getShowByUser(userid)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }));
});

showRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    showService.getShow(id)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }));
});

showRouter.post('/post', (req, res) => {
    const { title, img_url, user_id, genre_id } = req.body;

    showService.postShow(title, img_url, user_id, genre_id)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }))
});

showRouter.get('/showinfo/:id', (req, res) => {
    const { id } = req.params;

    showService.getShowInfo(id)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }));

});

// showRouter.get('/shows/unique', async (req, res) => {
//     try {
//         let shows = await showService.getUniqueShows();

//             shows.map((e, i) => {
//                 let users = showService.getUsersOfShow(e.title);
//                 shows[i].users = users.data.data;
 
//         })
//         console.log(shows)
//         res.status(200).json({ shows })
//     }
//     catch (err) {
//         res.status(400).json({ err })
//     }
// });

showRouter.get('/shows/unique',  (req, res) => {
    showService.getUniqueShows()
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }))
});

showRouter.get('/shows/users/:title', (req, res) => {
    const { title } = req.params;
    showService.getUsersOfShow(title)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(400).json({ err }))
})

module.exports = showRouter;