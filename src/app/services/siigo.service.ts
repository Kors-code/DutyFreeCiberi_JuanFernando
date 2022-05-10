import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { User } from '../models/user';
import { GLOBAL } from '../global';

interface response{
    doc:any
  }

  interface paginacion{
    pagination:any,
    results:any,
    _links:any,
   
  }


  interface responseN{
    docs:any
  }

interface agregar{
    insertedCount:number
  }

  @Injectable({
    providedIn:'root'
})
export class SiigoService {
  url=''
     public token:any
  constructor(private _http: HttpClient,
        private _router : Router){
    this.url = GLOBAL.url_app;
   }

    logginSiigo(user_to_register:any){
        let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<any>(this.url+'auth-siigo', paramas, {headers:headers});
    }

    sendInvoicesPeriodo(register:any,tag:string){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<responseN>(this.url+'up-invoice/'+ tag, paramas,{headers:headers});
    
    }


    getComprobantesSiigo(register:any,tag:number){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
      });
      return this._http.post<paginacion>(this.url+'journals-siigo/'+ tag,paramas, {headers:headers});
    }

    saveComprobantesSiigo(register:any,){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.getToken()
      });
      return this._http.post<any>(this.url+'journals',paramas, {headers:headers});
    }

    getFacturasSiigo(register:any,tag:number){
          let paramas = JSON.stringify(register);
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<paginacion>(this.url+'invoice-siigo/'+ tag,paramas, {headers:headers});
    }

    getDataCollectionsEstado(tag:string,estado:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'info-collection-estado/'+tag+'/'+estado, {headers:headers});
    
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