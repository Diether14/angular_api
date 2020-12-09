import wss from 'ws';
import chats_controller from '../controllers/chats.controller.js'
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
webServer.on('connection', socket=>{
    socket.id = webServer.clientID();
    socket.isAlive =true;
    socket.on('pong',heartbeat);
    console.log(socket.id)
    socket.on('message', message=> {
        socket.on('pong',heartbeat);
        const m =JSON.parse(message)
        console.log(m[0].type)
        // chats_controller.newMessage(JSON.parse(message))
    });
    socket.on('message',data=>{
        socket.on('pong',heartbeat);
        // console.log(JSON.parse(data))
        webServer.clients.forEach(function each(client){
            if(client.readyState ===  wss.OPEN){
                // client.send(data)
            }
        })
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