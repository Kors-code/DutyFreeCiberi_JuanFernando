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

    remplazarInfo(user_to_register:any, tag:string){
        let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'replace-info-lote/'+tag, paramas, {headers:headers});
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

    
    getInformeCajeros(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<responseN>(this.url+'info-cajeros/'+tag, {headers:headers});
    
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

    getCollectionsInventarios(){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'collections-inv', {headers:headers});
    }

    offCollectionsInv(tag:string){
        let paramas = JSON.stringify({tag:'tag'});
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<any>(this.url+'off-inventario/'+ tag, paramas, {headers:headers});
    
    }

    renameCollectionsDB(tag:any){
        let paramas = JSON.stringify(tag);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<any>(this.url+'rename', paramas, {headers:headers});
    
    }

    deleteCollectionsInv(tag:string){
        let paramas = JSON.stringify({tag:'tag'});
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<any>(this.url+'delete-inventario/'+ tag, paramas, {headers:headers});
    }


    getDataCollections(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'data-collections/'+ tag, {headers:headers});
    
    }

    getDataCollectionsPaginate(tag:string, page:number){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'data-collections-paginate/'+ tag + '?page='+page, {headers:headers});
    
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

    getPresupuestos(id:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'presupuestos/'+id, {headers:headers});
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

    deletePresupuesto(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'presupuesto-delete/', paramas, {headers:headers});
    }


    agregarConfiguracion(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'configuracion/', paramas, {headers:headers});
    }

    getConfig(id:string){
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'configuracion/'+id, {headers:headers});
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
    updateClaveEmpleado(update:any){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put<response>(this.url +'config-clave-empleado/',
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


// INVENTARIOS

agregarConteo(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'master-conteo/'+tag, paramas, {headers:headers});
}

agregarScaneo(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'contar/'+tag, paramas, {headers:headers});
}

agregarScaneoSKU(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'contar-sku/'+tag, paramas, {headers:headers});
}

updateConteoD(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-d/'+tag, paramas, {headers:headers});
}

updateConteoDefinitivo(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-defi/'+tag, paramas, {headers:headers});
}

updateConteoJustificacion(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-justificacion/'+tag, paramas, {headers:headers});
}

updateConteoDefinitivoMany(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-defi-many/'+tag, paramas, {headers:headers});
}

updateConteo1(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-1/'+tag, paramas, {headers:headers});
}

updateConteo2(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-2/'+tag, paramas, {headers:headers});
}

updateConteo3(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-3/'+tag, paramas, {headers:headers});
}

updateConteo4(user_to_register:any, tag:string){
    let paramas = JSON.stringify(user_to_register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'update-conteo-4/'+tag, paramas, {headers:headers});
}

getConteoTag(tag:string){
    // let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.get<any>(this.url+'conteo-tag/'+tag, {headers:headers});
}


generarPDF(register:any, tag:string){
    let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'pdf-folio/'+ tag, paramas, {headers:headers});
}


// POS SERVICE

    agregarConsecutivo(register:any){
        let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.post<agregar>(this.url+'reg-consecutivo/', paramas, {headers:headers});
    }

    getConsecutivosperacion(tag:string){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.get<any>(this.url+'consecutivos-op/'+tag, {headers:headers});
    }


    updateConsecutivo(update:any){
        let params = JSON.stringify(update);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put<response>(this.url +'consecutivo/',
                params, {headers:headers})
    }

    deleteConsecutivo(register:any){
        // let paramas = JSON.stringify(register);
        let headers = new HttpHeaders({
            'content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.delete<agregar>(this.url+'consecutivo/'+register,  {headers:headers});
    }


    
// POS PRODUCTOS

getProducto(tag:string){
    // let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.get<any>(this.url+'producto/'+tag, {headers:headers});
}

// NOTAS DE VENTA

agregarNotaVenta(register:any){
    let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<agregar>(this.url+'nota-venta/', paramas, {headers:headers});
}

getNotasVentasPeriodo(register:any){
    let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        'content-Type':'application/json',
        'Authorization': this.getToken()
    });
    return this._http.post<any>(this.url+'notas-venta-date/', paramas, {headers:headers});
}


getNotasVentaUser(tag:string){
    // let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.get<any>(this.url+'notas-venta-user/'+tag, {headers:headers});
}

getNotasVentaOperacion(tag:string){
    // let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.get<any>(this.url+'notas-venta-op/'+tag, {headers:headers});
}

getNotasVentaActivaUser(tag:string){
    // let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.get<any>(this.url+'notas-venta-activa-user/'+tag, {headers:headers});
}

getNotasVentaActivaOperacion(tag:string){
    // let paramas = JSON.stringify(register);
    let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.get<any>(this.url+'notas-venta-activa-op/'+tag, {headers:headers});
}

updateNotaVenta(update:any){
    let params = JSON.stringify(update);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.put<response>(this.url +'nota-venta/',
            params, {headers:headers})
}

geTRM(){

    return this._http.get<any>('https://api.exchangeratesapi.io/latest?base=USD&symbols=MXN');
}





}