import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { User } from '../models/user';
import { GLOBAL } from '../global';
import { Operacion } from '../models/operacion';
import { Ordencompra } from '../models/compra';

  @Injectable({
    providedIn:'root'
})
export class ComprasService {
    public identity:any;
    public token:any
    public Pcompany:any;
    public Poperacion:any;
    public url: string;

constructor(private _http: HttpClient,
            private _router : Router){
        this.url = GLOBAL.url_app;
        
}

saveCompra(compra:any){
    let paramas = JSON.stringify(compra);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });

        return this._http.post<Ordencompra>(this.url+'reg-orden', paramas, {headers:headers});
}

// deleteOperacion(id:string){
//     let headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': this.getToken()
//     });

//     return this._http.delete(this.url+'operacion/'+id,
//         {headers:headers})
       
// }

getOrdenesOperacion(){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });

    return this._http.get<Ordencompra[]>(this.url+'ordenes/',
        {headers:headers})
       
}

    updateOrden(update:any){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put<Ordencompra>(this.url +'orden/',
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