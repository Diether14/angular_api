import express from 'express';
import cors from 'cors';
import user_routes from './routes/users.routes.js';
import user_settings_routes from './routes/user_settings.routes.js';
import ExpressSession from 'express-session';
import { v4 as uuidv4 } from 'uuid';

// const express = require('express'),
//     cors = require('cors'),
// require('./config/database.config')
const version = "v1";
const port = 3414;
const app = express();
const session = new ExpressSession({
    genid: (req) => {
      return uuidv4();
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: 'nodaq'
  });

app.use(session);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(`/api/${version}/auth`, user_routes)
app.use(`/api/${version}/user-settings`, user_settings_routes)
// app.use(`/api/${version}/community`, require('./routes/community.routes'))
// app.use(`/api/${version}/posts`, require('./routes/posts.routes'))
// app.use(`/api/${version}/emoticons`, require('./routes/emoticons.routes'))
// app.use(`/api/${version}/notifications`, require('./routes/notifications.routes'))

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})