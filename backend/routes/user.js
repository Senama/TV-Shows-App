const express = require('express');
const userRouter = express.Router();
const userService = require('../services/users');

userRouter.get('/allUsers', (req, res) => {
    
    userService.getAllUsers()
        .then(data => res.status(200).json({data}))
        .catch(err => res.status(400).json({err}))
});

userRouter.get('/:id', (req, res) => {
    const {id} = req.params;

    userService.getUser(id)
        .then(data => res.status(200).json({data}))
        .catch(err => res.status(400).json({err}))
});

userRouter.get('/profile/:id', async(req, res) => {
    const {id} = req.params;

    try {
        const showInfo = await userService.getAllInfo(id);
        const userInfo = await userService.getUser(id);
        const allInfo = {
            showInfo,
            userInfo
        }
        res.status(200).json(allInfo)
    }

    catch (e) {
        res.status(400).json({e})
    }
});

userRouter.post('/post', (req, res) => {
    const {username} = req.body;

    userService.postUser(username)
        .then(data => res.status(200).res.json({data}))
        .catch(err => res.status(400).json({err}))
});

module.exports = userRouter;