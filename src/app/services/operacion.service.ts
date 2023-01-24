import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { User } from '../models/user';
import { GLOBAL } from '../global';
import { Operacion } from '../models/operacion';

  @Injectable({
    providedIn:'root'
})
export class OperacionesService {
    public identity:any;
    public token:any
    public Pcompany:any;
    public Poperacion:any;
    public url: string;

constructor(private _http: HttpClient,
            private _router : Router){
        this.url = GLOBAL.url_app;
        
}

saveOperacion(user_to_register:any){
    let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });

        return this._http.post<Operacion>(this.url+'reg-operacion', paramas, {headers:headers});
}

deleteOperacion(id:string){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });

    return this._http.delete(this.url+'operacion/'+id,
        {headers:headers})
       
}

getOperaciones(){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });

    return this._http.get<Operacion[]>(this.url+'operaciones/',
        {headers:headers})
       
}



    updateOperacion(user_to_update:any){
        let params = JSON.stringify(user_to_update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put<Operacion>(this.url +'operacion/',
                params, {headers:headers})
    }


    getIdentity(){
            let strUser:any =  localStorage.getItem('identity');

            let identity = JSON.parse(strUser);
            if(identity != "undefined"){
                this.identity = identity;
            }else{
                this.identity = null;
            }
            return this.identity;
    }


    getToken(){
            let token = localStorage.getItem('token');
            if(token != "undefined"){
                this.token = token;
            }else{
                this.token = null;
            }
            return this.token;
    }
    
}