import express from 'express';
import cors from 'cors';
import user_routes from './routes/users.routes.js';
// const express = require('express'),
//     cors = require('cors'),
// require('./config/database.config')
const version = "v1";
const port = 3414;
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(`/api/${version}/auth`, user_routes)
// app.use(`/api/${version}/community`, require('./routes/community.routes'))
// app.use(`/api/${version}/posts`, require('./routes/posts.routes'))
// app.use(`/api/${version}/emoticons`, require('./routes/emoticons.routes'))
// app.use(`/api/${version}/notifications`, require('./routes/notifications.routes'))

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})