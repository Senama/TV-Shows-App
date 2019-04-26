const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const userRouter = require('./routes/user');
const commentRouter = require('./routes/comments');
const genreRouter = require('./routes/genres');
const showRouter = require('./routes/shows');


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/genre', genreRouter);
app.use('/comment', commentRouter);
app.use('/show', showRouter);


module.exports = {app,}  