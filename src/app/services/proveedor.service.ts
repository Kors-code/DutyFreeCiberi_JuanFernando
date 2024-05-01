import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL} from '../global';
import { Proveedor } from '../models/proveedor';


@Injectable({
    providedIn:'root'
})

export class ProveedorService {
    public identity:any;
    public token:any;

    public url: string;
    
    constructor(private _http: HttpClient){

        this.url = GLOBAL.url_app
    }


    registerProveedor(register:any){
        // console.log(register);
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({'content-Type':'application/json','Authorization': this.getToken()});

        return this._http.post<Proveedor>(this.url+'proveedor/', paramas, {headers:headers});
    
    }

    getProveedores(){
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<Proveedor[]>(this.url + 'proveedores/',{headers:headers})
    }

    getProveedoresParametro(search:any, id:any){
        // console.log(register);
        let paramas = JSON.stringify(search);
        let headers = new HttpHeaders({'content-Type':'application/json','Authorization': this.getToken()});

        return this._http.post(this.url+'proveedor/'+ id, paramas, {headers:headers})
          
    
    }

    getProveedor(id:string){
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<Proveedor>(this.url + 'proveedor/'+id,{headers:headers})
            
    }

    getProveedorTitulo(id:string){
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<Proveedor[]>(this.url + 'proveedor-titulo/'+id,{headers:headers})
    }


    updateProveedor(update:any){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put<Proveedor>(this.url +'proveedor/',
                params, {headers:headers})
    }

    deleteProveedor(id:string){
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

        return this._http.delete(this.url+'proveedor/'+id,
            {headers:headers})
         
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