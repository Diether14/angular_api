import db from '../services/database.service.js'
import session from 'express-session'
import MySQLStore from 'express-mysql-session';
import mysql from 'mysql'
const expire = 60*60*2000
const optn = new db()
const sessionStore = MySQLStore(session)

const sessStore = new sessionStore({expiration:expire},mysql.createPool( optn.getCon()))
const user_session = session({
        secret: 'ZGVmYXVsdHNlY3JldA==',
        store: sessStore,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: true,
            maxAge: expire, // Time is in miliseconds
            expires: new Date(Date.now()+expire)
        },
        saveUninitialized:true,
        resave:false
    })

export default user_session;