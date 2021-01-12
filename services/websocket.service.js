
import wss from 'ws';
import chats_controller from '../controllers/chats.controller.js'
import chatfile_controller from '../controllers/chatfile.controller.js'
import crypto from '../services/crypto.service.js'
import fs from 'fs'
import { parse } from 'path';

const webServer = new wss.Server({noServer:true, path: "/chatws"});

webServer.clientID = ()=>{
    const s4 =()=> {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
}
function heartbeat(){
    this.isAlive = true;
}
function parseCookies (cookie) {
    var list = {},
        rc = cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
function noop(){}
webServer.setMaxListeners(15)
webServer.on('connection', socket=>{
    socket.id = webServer.clientID();
    // socket.isAlive =true;
    // socket.on('pong',heartbeat);
    console.log(socket.id)
    socket.on('message', message=> {
        
        const cookie=socket.reqHead.cookie
        var user =parseCookies(cookie)
        if(Buffer.isBuffer(message)){
            
            new Promise (async()=>{
            var file = await chatfile_controller.newFile(message)
            var newFile={
                type:"file",
                id: file.data.insertId
            }
            
            console.log(file)
            webServer.clients.forEach(function each(client){
                if(client.readyState ===  wss.OPEN){
                    client.send(JSON.stringify(newFile))
                }
            })
            } )
            
        }
        else if(Buffer.isBuffer(message)===false && message!="undefined"){
            console.log(typeof JSON.parse(message).file)

        }
        const m =JSON.parse(message)
        console.log( m)
        if(m[0]){
            if(m[0].type==="newgroup"){
                chats_controller.createNewGroup(JSON.parse(message))
            }
        }
        else{
            if(m.type ==="message"){
                const newdata = JSON.parse(message)
                newdata["sender_id"]=user["id"]
                // console.log(newdata)
                chats_controller.newMessage(newdata)
                if(m.room_id){
                    const d = new Date();
                    chats_controller.updateTime({"curtime": d ,"room_id": m.room_id})
                }
            }
            else if(m.type==="file"){
                chatfile_controller.newMessageFile(JSON.parse(message))
                if(m.room_id){
                    const d = new Date();
                    chats_controller.updateTime({"curtime": d ,"room_id": m.room_id})
                }
            }
        }
    });
    socket.on('message',data=>{
        const cookie=socket.reqHead.cookie
        var user =parseCookies(cookie)
        const m =JSON.parse(data)
        console.log(m)
        if(!m[0]){
            if(m.type ==="message"){
                webServer.clients.forEach(function each(client){
                    if(client.readyState ===  wss.OPEN){
                        console.log("sending")
                        // console.log(m)
                        const newdata = m;
                        newdata['sender_id']= user['id']
                        client.send(JSON.stringify(newdata))
                    }
                })
            }
        }
        if(m.type ==="rooms"){
            new Promise (async()=>{
                const newdata = JSON.parse(data)
                newdata["currentUser"]=user["id"]
                var rooms = await chats_controller.getRoomsByUserID(newdata)
                const m =[JSON.parse(data)]
                m.push(rooms.data)
                webServer.clients.forEach(function each(client){
                    if(client.readyState ===  wss.OPEN){
                        console.log(m)
                        console.log(parseCookies(client.reqHead.cookie)['id'])
                        client.send(JSON.stringify(m))
                    }
                })
             } )
        }
    })
});

const interval = setInterval(function ping(){
    webServer.clients.forEach( function each(socket){
        if (socket.isAlive === false) return socket.terminate();
        socket.isAlive = false;
        socket.ping(noop);
    });
},30000)

webServer.on('request',function (req){
    console.log(req)
    
})
webServer.on('close',function close(){
})

export default webServer
