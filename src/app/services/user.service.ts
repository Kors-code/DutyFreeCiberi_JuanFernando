import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params, Router } from '@angular/router';
import { User } from '../models/user';
import { GLOBAL } from '../global';
import { Operacion } from '../models/operacion';

interface userRes{
    user:User,
  }
  interface usersRes{
    usuarios:any
  }

interface tokenRes{
    token:string,
    _id:string
  }

  interface userRes{
    user:User,
    token:string
  }

  interface MyObj {
    myString: string;
    myNumber: number;
}

  @Injectable({
    providedIn:'root'
})
export class UserService {
    public identity:any;
    public token:any
    public Pcompany:any;
    public Poperacion:any;
    public url: string;

constructor(private _http: HttpClient,
            private _router : Router){
        this.url = GLOBAL.url_app;
        
}

singup(user_to_login:any, gethash:any = null){
    if(gethash != null){
        user_to_login.gethash = true;
    }
    let json = JSON.stringify(user_to_login);
    let paramas = json;

    let headers = new HttpHeaders({'content-Type':'application/json'});

    return this._http.post<userRes>(this.url+'login', paramas, {headers:headers})
              
}

singupCel(user_to_login:any){
    // console.log(user_to_login);
    let json = JSON.stringify(user_to_login);
    let paramas = json;
    let headers = new HttpHeaders({'content-Type':'application/json'});
    return this._http.post<tokenRes>(this.url+'login-cel', paramas, {headers:headers})
}

sinToken(user_to_login:any){
    
        user_to_login.gethash = true;
    let json = JSON.stringify(user_to_login);
    let paramas = json;
    let headers = new HttpHeaders({'content-Type':'application/json'});
    return this._http.post<tokenRes>(this.url+'login', paramas, {headers:headers})
}

getUsers(){
    return this._http.get<usersRes>(this.url + 'users')
             
}


saveUser(user_to_register:any){
    let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({'content-Type':'application/json'});

        return this._http.post<userRes>(this.url+'save-user', paramas, {headers:headers});
}

deleteUser(id:string){
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });

    return this._http.delete(this.url+'user-delete/'+id,
        {headers:headers})
       
}

reenvairCodigoUser(user_to_register:any){
    let paramas = JSON.stringify(user_to_register);
        let headers = new HttpHeaders({'content-Type':'application/json'});

        return this._http.post<userRes>(this.url+'reenvio-user', paramas, {headers:headers});
}


getUserId(id:any){
      let headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': this.getToken()
        });
    return this._http.get<userRes>(this.url + 'userId/'+ id,{headers:headers}) 
}

updateUser(user_to_update:any){
    let params = JSON.stringify(user_to_update);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });

    return this._http.put<userRes>(this.url +'update-user/'+ user_to_update._id,
            params, {headers:headers})
}

AdminUpdateUser(user_to_update:any){
    let params = JSON.stringify(user_to_update);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });

    return this._http.put(this.url +'admin-update-user/'+ user_to_update._id,
            params, {headers:headers})
}

changePass(user_changePass:any){
    let params = JSON.stringify(user_changePass);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
    });
    return this._http.put<userRes>(this.url +'change-pass/',
            params, {headers:headers})
}

restablecerPassword(id:any){
    console.log(id)
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.getToken()
    });
    return this._http.put(this.url +'restablecer-password/'+ id,'',
                     {headers:headers})
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

isIdentity(): boolean {
        return this.getIdentity() !== null;
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



    Logout(){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.removeItem('predeterminateCompany');
        localStorage.removeItem('predeterminateOperacion');
      }

    
    
    
    
    getPredetermidaOperacion(){
        
        let Poperacion = JSON.parse(localStorage.getItem('predeterminateOperacion') || '');
        if(Poperacion != null){
            this.Poperacion = Poperacion;
        }else{
               
                let identity:User = JSON.parse(localStorage.getItem('identity') || '');
               
                if(identity != null){
                //     if(this.getPredetermidaCompany() != undefined){
                //     this.Poperacion = new Operacion(); 
                //    var idComp = this.getPredetermidaCompany()._id;
                // // console.log({'idComp':idComp});
                //     for(var i = 0;i < identity.operaciones.length; i++){
                //         let comp = identity.operaciones[i].company;
                //         // console.log({'comp':comp});
                //         if(idComp == comp ){
                //             this.Poperacion = identity.operaciones[i]; 
                //           break;  
                //         } 
                //     }
                // }   
                 }else{
                     this.Poperacion = new Operacion();  
                 }
                //  console.log({'operaciones':operaciones})
                //  console.log({'Poperacion':this.Poperacion});
            }
            return this.Poperacion;
    }


}