
import wss from 'ws';
import chats_controller from '../controllers/chats.controller.js'
import chatfile_controller from '../controllers/chatfile.controller.js'
import fs from 'fs'
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
function noop(){}
webServer.setMaxListeners(15)
webServer.on('connection', socket=>{
    socket.id = webServer.clientID();
    // socket.isAlive =true;
    // socket.on('pong',heartbeat);
    console.log(socket.id)
    socket.on('message', message=> {
        // socket.on('pong',heartbeat);
        console.log(message);
        
        // if(Buffer.isBuffer(message)){
            
        //     new Promise (async()=>{
        //     var file = await chatfile_controller.newFile(message)
        //     var newFile={
        //         type:"file",
        //         id: file.data.insertId
        //     }
            
        //     console.log(file)
        //     webServer.clients.forEach(function each(client){
        //         if(client.readyState ===  wss.OPEN){
        //             client.send(JSON.stringify(newFile))
        //         }
        //     })
        //     } )
            
        // }
        // else if(Buffer.isBuffer(message)===false && message!="undefined"){
        //     console.log(typeof JSON.parse(message).file)

        // }
        
// console.log(webServer.getMaxListeners());
        // if (message==="undefined"){
        //     console.log("this is undefined")
        // }
        // console.log(message )
        const m =JSON.parse(message)
        console.log( m)
        if(m[0]){
            if(m[0].type==="newgroup"){
                chats_controller.createNewGroup(JSON.parse(message))
                
                // console.log(m[0].type)
            }
        }
        else{
            if(m.type ==="message"){
                chats_controller.newMessage(JSON.parse(message))
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
                // console.log(m)
                // chatfile_controller.newFile(JSON.parse(message))

            }
        }
    });
    socket.on('message',data=>{
        // socket.on('pong',heartbeat);
        console.log(data)
        const m =JSON.parse(data)
        console.log(m)
        if(!m[0]){
            if(m.type ==="message"){
                new Promise (async()=>{
                    var test = await chats_controller.getRoomsByUserID(JSON.parse(data))
                    const m =[JSON.parse(data)]
                    m.push(test.data)
                    webServer.clients.forEach(function each(client){
                        if(client.readyState ===  wss.OPEN){
                            client.send(JSON.stringify(m))
                        }
                    })
                 } )
            }
        }
        if(m.type ==="rooms"){
            new Promise (async()=>{
                // console.log(data)
                var test = await chats_controller.getRoomsByUserID(JSON.parse(data))
                const m =[JSON.parse(data)]
                m.push(test.data)
                webServer.clients.forEach(function each(client){
                    if(client.readyState ===  wss.OPEN){
                        // console.log(data)
                        client.send(JSON.stringify(m))
                    }
                })
             } )
        }
        //test
        // webServer.clients.forEach(function each(client){
        //     if(client.readyState ===  wss.OPEN){
        //         // console.log(data)
        //         client.send(JSON.stringify(data))
        //     }
        // })
    })
});

const interval = setInterval(function ping(){
    webServer.clients.forEach( function each(socket){
        if (socket.isAlive === false) return socket.terminate();
        socket.isAlive = false;
        socket.ping(noop);
        // console.log(socket.isAlive)
    });
},30000)

webServer.on('close',function close(){
    clearInterval(interval);
})

export default webServer

// import wss from 'ws';
// import chats_controller from '../controllers/chats.controller.js'
// const webServer = new wss.Server({noServer:true, path: "/chatws"});

// webServer.clientID = ()=>{
//     const s4 =()=> {
//         return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//     }
//     return s4() + s4() + '-' + s4();
// }


// webServer.on('connection', socket=>{
//     socket.id = webServer.clientID();

//     console.log(socket.id)
//     socket.on('message', message=> {
//         chats_controller.newMessage(JSON.parse(message))
//     });
//     socket.on('message',data=>{
//         console.log(JSON.parse(data))
//         webServer.clients.forEach(function each(client){
//             if(client.readyState ===  wss.OPEN){
//                 client.send(data)
//             }
//         })
//     })
// });
// export default webServer