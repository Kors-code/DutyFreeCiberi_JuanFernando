import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GLOBAL } from '../global';
import { AdminPvconfigFacElectronica } from '../models/facturacionElectronica';

interface token{
    token:any
  }

  interface getNumericRange{
    ResponseDian:{
        Envelope:{
            Body:{
                GetNumberingRangeResponse:{
                    GetNumberingRangeResult:{
                        OperationCode:string,
                        OperationDescription:string,    
                        ResponseList:{
                            NumberRangeResponse:[
                                {
                                    FromNumber:string, 
                                    Prefix:string,  
                                    ResolutionDate:string,
                                    ResolutionNumber:string,
                                    TechnicalKey:string,
                                    ToNumber:string,
                                    ValidDateFrom:string,
                                    ValidDateTo:string,  
                                }
                            ] 
                        }
                    }
                }
            }
        }
    }

  }

  interface ValidacionCufe{
    ResponseDian:{
        Envelope:{
            Body:{
              GetStatusResponse:{
                GetStatusResult:{
                  ErrorMessage:{},
                  IsValid:string,
                  StatusCode:string,
                  StatusDescription:string,
                  StatusMessage:string,
                  XmlBase64Bytes:string
                  XmlBytes:{
                    _attributes:{
                      nil:true
                    }
                  }
                  XmlDocumentKey:string,
                  XmlFileName:string
  
                }
              }
            
            }
        }
    }
  
  }

// import * as sha384 from 'crypto-js/sha384'

@Injectable({
    providedIn:'root'
})

export class FacturaElectronicaService {
    
    // public identity;
    // public token;
    public token:any
    public url: string;
    public url_fact: string;
    constructor(private _http: HttpClient){

        this.url_fact = GLOBAL.url_fact;
        this.url = GLOBAL.url_app;
    }

    registrarOperacion(register:any){
        // console.log(register)
        let identification_number =register._id;
        let dv = register.dv;
        
        let paramas = JSON.stringify(register.data);

            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                }
            );
            // console.log(paramas);    
            return this._http.post<token>(this.url_fact+'config/'+identification_number +'/'+dv, paramas,{headers:headers})
    }

    putSoftware(update:any){
        let token = update.token
        // console.log(token)
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/software',
                params, {headers:headers})
                        
    }

    putLogo(update:any){
        let token = update.token
        // console.log(token)
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/logo',
                params, {headers:headers})
                        
    }

    putSoftwarepayroll(update:any){
        let token = update.token
        // console.log(token)
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/softwarepayroll',
                params, {headers:headers})
                        
    }

    putResolucionpayrollNote(update:any){
        let token = update.token
        // console.log(token)
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/resolution',
                params, {headers:headers})
                        
    }

    putResolucionpayroll(update:any){
        let token = update.token
        // console.log(token)
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/resolution',
                params, {headers:headers})
                        
    }


    putSertificado(update:any){
        let token = update.token
        // console.log(token)
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/certificate',
                params, {headers:headers})
                        
    }

    getCertificado(update:any){
        let token = update.token
        console.log(token)
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate',
            'accept': 'application/json',
            'X-CSRF-TOKEN': '',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'certificate-end-date', 
        {headers:headers})
    }



    putResolucion(update:any){
        let token = update.token
        // console.log(token);
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/resolution',
                params, {headers:headers})
                        
    }


    putNotasCredito(update:any){
        let token = update.token
        // console.log(token);
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/resolution',
                params, {headers:headers})
                        
    }


    putNotasDebito(update:any){
        let token = update.token
        console.log(token);
        let params = JSON.stringify(update.data);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': 'Bearer '+ token
          });
    
        return this._http.put(this.url_fact +'config/resolution',
                params, {headers:headers})
                        
    }

    registrarFacturaPruebas(register:any){
        let token = register.token
        let set = register.set
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas); 'invoice/'+set    
            return this._http.post(this.url_fact + 'invoice/'+set , paramas,{headers:headers})
                        
    }

    statusDocumentCufe(register:any){
        let token = register.token
        let set = register.cufe
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas); 'invoice/'+set    
            return this._http.post<ValidacionCufe>(this.url_fact + 'status/document/'+set , paramas,{headers:headers})
                        
    }

    registrarFactura(register:any){
        console.log(register)
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'invoice', paramas,{headers:headers})
                        
    }

    registrarDocumentoSoporte(register:any){
        console.log(register)
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'support-document', paramas,{headers:headers})
                        
    }

    registrarNotaCredito(register:any){
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'credit-note', paramas,{headers:headers})
                        
    }

    registrarNotaDebito(register:any){
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'debit-note', paramas,{headers:headers})
                        
    }

    // descargarPdf(id,doc, token){
        
    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': 'Bearer '+ token
    //     });
    //     return this._http.get(this.url_fact + 'invoice/'+id+'/'+doc,{headers:headers})
    //              
    // }

    registrarNomina(register:any){
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'payroll', paramas,{headers:headers})
                        
    }

    registrarNominaPruebas(register:any){
        let token = register.token
        let set = register.set
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'payroll/'+set, paramas,{headers:headers})
                        
    }

    registrarNominaDeAjuste(register:any){
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );
            // console.log(paramas);    
            return this._http.post(this.url_fact+'payroll-adjust-note', paramas,{headers:headers})
                        
    }

    
    getStatuszip(register:any){
        let token = register.token
        let paramas = JSON.stringify(register.data);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );   
            return this._http.post(this.url_fact+'status/zip/'+register.zip, paramas,{headers:headers})
                        
    }

    getNumericRange(register:any, token:string){
        let paramas = JSON.stringify(register);
            let headers = new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': 'Bearer '+ token
                }
            );   
            return this._http.post<getNumericRange>(this.url_fact+'numbering-range', paramas,{headers:headers})
                        
    }

    getFacturaElectronicasFecha(data:any){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ data.token
        });
    
        return this._http.get<any>(this.url_fact+'information/'+data.id +'/'+data.fechaI +'/'+data.fechaF,
            {headers:headers})
           
    }


    // RUTAS ELECTRINICA

    saveElectronica(user_to_register:any){
        let paramas = JSON.stringify(user_to_register);
            let headers = new HttpHeaders({
                'content-Type':'application/json',
                'Authorization': this.getToken()
            });
    
            return this._http.post<AdminPvconfigFacElectronica>(this.url+'reg-electronica', paramas, {headers:headers});
    }
    
    deleteElectronica(id:string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
    
        return this._http.delete(this.url+'electronica/'+id,
            {headers:headers})
           
    }

  
    
    getElectronica(id:string){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
    
        return this._http.get<AdminPvconfigFacElectronica>(this.url+'electronica/'+id,
            {headers:headers})
           
    }
    
    
    
        updateElectronica(user_to_update:any){
            let params = JSON.stringify(user_to_update);
            let headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            });
    
            return this._http.put<AdminPvconfigFacElectronica>(this.url +'electronica/',
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