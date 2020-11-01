const express = require('express'),
    cors = require('cors'),
    app = express(),
    port = 3414,
    version = "v1"

require('./config/database.config')
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


app.use(`/api/${version}/users`, require('./routes/users.routes'))
app.use(`/api/${version}/community`, require('./routes/community.routes'))
app.use(`/api/${version}/posts`, require('./routes/posts.routes'))
app.use(`/api/${version}/emoticons`, require('./routes/emoticons.routes'))
app.use(`/api/${version}/notifications`, require('./routes/notifications.routes'))

app.listen(port, () => {
    console.log(`Localhost server started at ${port}`)
})