const express = require('express');
const commentRouter = express.Router();
const commentService = require('../services/comments');

commentRouter.get('/:showid', (req, res) => {
    const {showid} = req.params;

    commentService.getCommentsByShowID(showid)
        .then(data => res.status(200).json({data}))
        .catch(err => res.status(400).json({err}))
});

commentRouter.post('/post', async (req, res) => {
    const {comment_body, user_id, show_id} = req.body;

    try {
        const id = await commentService.postComment(comment_body, user_id, show_id);
        const allComments = await commentService.getCommentsByShowID(show_id);
        res.status(200).json({allComments});
    }

    catch(err) {
        res.status(400).json({err})
    };
    
});

module.exports = commentRouter;