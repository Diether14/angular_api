import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import user_routes from './routes/users.routes.js';
import emoticon_routes from './routes/emoticons.routes.js';
import posts_routes from './routes/posts.routes.js'
import chats_routes from './routes/chats.routes.js'
import webServer from './services/websocket.service.js'

const version = "v1";
const port = 3414;
const app = express();
app.use(express.json())
app.use(helmet.xssFilter());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// console.log(optn.getCon())



app.use(`/api/${version}/auth`, user_routes)
app.use(`/api/${version}/emoticons`, emoticon_routes)
app.use(`/api/${version}/posts`, posts_routes)
app.use(`/api/${version}/chats`, chats_routes)
// app.use(`/api/${version}/emoticons`, require('./routes/emoticons.routes'))
// app.use(`/api/${version}/notifications`, require('./routes/notifications.routes'))

const server = app.listen(port, () => {
    console.log(`server started at port ${port}`)
})

server.on('upgrade', (request,socket,head)=>{
    webServer.handleUpgrade(request,socket,head,socket =>{
        webServer.emit('connection',socket, request);
    });
});