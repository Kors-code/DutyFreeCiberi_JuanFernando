import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { User } from '../models/user';
import { GLOBAL } from '../global';

interface response{
    doc:any
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
export class InfoService {
    public identity:any;
    public token:any
    public url: string;
    constructor(private _http: HttpClient,
        private _router : Router){
    this.url = GLOBAL.url_app;
    
}
    saveInfo(user_to_register:any){
        let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
    
        return this._http.post<response>(this.url+'info', paramas, {headers:headers});
    }

    agregarInfo(user_to_register:any, tag:string){
        let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'info-lote/'+tag, paramas, {headers:headers});
    }

    getRegistros(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<responseN>(this.url+'info-paginate', paramas, {headers:headers});
    
          
    }

    getInformeVendedor(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<responseN>(this.url+'info-vendedor/'+tag, {headers:headers});
    
    }

    getInformePresupuestoVendedor(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<responseN>(this.url+'info-vendedor-ppto/'+tag, {headers:headers});
    
    }

    getCollections(){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'info-collections', {headers:headers});
    
    }

   


    

    getDataCollections(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'data-collections/'+ tag, {headers:headers});
    
    }

    getHeadersCollections(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'headers-collections/'+ tag, {headers:headers});
    
    }

    getDataCollectionsKey(obj:any, tag:string){
        let paramas = JSON.stringify(obj);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<any>(this.url+'key-collections/'+ tag, paramas, {headers:headers});
    
    }

    getDataCollectionsVendedor(obj:any, tag:string){
        let paramas = JSON.stringify(obj);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<any>(this.url+'cumplimiento-vendedor/'+ tag, paramas, {headers:headers});
    
    }

    getfacturacionSiigo(tag:string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'facturacion-siigo/'+ tag, {headers:headers}); 
    }
   

    getInformeCategorias(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<responseN>(this.url+'info-categrias/'+ tag, {headers:headers});
    
    }

    getInformeCategoriasTienda(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<responseN>(this.url+'info-categrias-tienda/'+ tag, {headers:headers});
    
    }


    getInformeFolio(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<responseN>(this.url+'info-folio/'+ tag, {headers:headers});
    
    }

    

    getInfoSearch(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
    
        return this._http.post<response>(this.url+'info-search', paramas, {headers:headers});
    }

    updateRegistro(update:any, tag:string){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<response>(this.url +'update-document/'+ tag,
                params, {headers:headers})
    }

    updateRegistroVendedor(update:any, tag:string){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<response>(this.url +'update-document-vendedor/'+ tag,
                params, {headers:headers})
    }

    deleteRegistro(del:any, tag:string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.delete<response>(this.url +'info/'+ tag +'/'+del, {headers:headers})
    }


    // PRESUPUESTO

    agregarPresupuesto(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'presupuesto/', paramas, {headers:headers});
    }

    getPresupuestos(){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'presupuestos', {headers:headers});
    }

    getPresupuestoTag(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'presupuestos-tag/'+tag, {headers:headers});
    }

    updatePresupuesto(update:any){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put<response>(this.url +'presupuesto/',
                params, {headers:headers})
    }


    agregarConfiguracion(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'configuracion/', paramas, {headers:headers});
    }

    getConfig(){
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'configuracion/', {headers:headers});
    }

    updateConfiguracion(update:any){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put<response>(this.url +'configuracion/',
                params, {headers:headers})
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