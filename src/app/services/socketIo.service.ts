import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber, Subscription } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SocketIOService {
    socket:any;
   
    // public url: string = 'ws://localhost:28081';
    public url: string = '';
    
constructor(){
    this.url='localhost:1165'
    this.socket = io.connect(this.url);   
      console.log(this.url)
};

listeners:any = [];
listen2(eventName:never){
    // console.log(eventName)
    let pos = this.listeners.map(function(e:any) { return e; }).indexOf(eventName);
    // console.log(pos)
    if(pos == -1 ){
        this.listeners.push(eventName)
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data: unknown) => {
                subscriber.next(data);
                // console.log(data);
            })
        })
    }else{
        return new Observable((subscriber) => { 1 + 2})
    }
}

listen(eventName: string){
    this.listeners.push(eventName)
    return new Observable((subscriber) => {
        this.socket.on(eventName, (data: unknown) => {
            subscriber.next(data);
            // console.log(data);
        })
    })
}


    emit(eventName:string, data:any){
        // console.log('emit', eventName)
        this.socket.emit(eventName, data) 
    }

}