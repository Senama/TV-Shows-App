const { db } = require('./dbConnect');
const commentService = {};

commentService.getCommentsByShowID = (showid) => {
    const sql = `
    SELECT comments.*, users.username
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.show_id = $[showid]
    `;
    return db.any(sql , {showid});
};

commentService.postComment = (comment_body, user_id, show_id) => {
    const sql = `
    INSERT INTO comments (comment_body, user_id, show_id)
    VALUES ($[comment_body], $[user_id], $[show_id])
    RETURNING id
    `;
    return db.any(sql, {comment_body, user_id, show_id})
};

module.exports = commentService;