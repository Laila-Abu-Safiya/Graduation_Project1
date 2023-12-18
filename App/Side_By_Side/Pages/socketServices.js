import { io } from "socket.io-client";

const SOCKET_URL = 'http://192.168.0.119:3000';

class wssService {
initializeSocket = async () => {
    try{
        this.socket = io(SOCKET_URL, {
            transports: ['websocket']
        })
        console.log('initialize socket', this.socket)

        this.socket.on('connect', (data)=>{
            console.log('=== socket connected ===')
        })
        this.socket.on('disconnect', (data)=>{
            console.log('=== socket disconnected ===')
        })
        this.socket.on('error', (data)=>{
            console.log('=== socket error ===')
        })

    }catch(error){
       console.log('socket is not init',error) 
    }
}

emit(event,data = {}){
    this.socket.emit(event,data)
}

on(event,cb = {}){
    this.socket.on(event,cb)
}

removeListener(listenerName){
    this.socket.removeListener(listenerName)
}
}

const socketServices = new wssService();

export default socketServices;