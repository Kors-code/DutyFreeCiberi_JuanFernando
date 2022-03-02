import { Injectable } from '@angular/core';
import { MongoClient } from 'mongodb';
import { Observable, Subscriber, Subscription } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MongoDbService {

     url = 'mongodb://localhost:27017';
     client = new MongoClient(this.url);
  
    
constructor(){
   
 
};

 main() {
    // Use connect method to connect to the server
     this.client.connect();
    console.log('Connected successfully to server');
    const db = this.client.db('pruebaDatos');
    const collection = db.collection('documents');
  
    return 'done.';
  }




}