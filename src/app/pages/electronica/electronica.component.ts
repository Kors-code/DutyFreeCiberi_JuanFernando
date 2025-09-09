import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPvconfigFacElectronica, FactResolucion } from 'src/app/models/facturacionElectronica';
import { Operacion } from 'src/app/models/operacion';
import { municipialities, type_document_id, type_document_identification_id, type_liability_id, type_organization_id, type_regime_id } from 'src/app/models/type_document_identification_id';
import { FacturaElectronicaService } from 'src/app/services/facturacionElectronica.service';
import { OperacionesService } from 'src/app/services/operacion.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-electronica',
  templateUrl: './electronica.component.html',
  styleUrls: ['./electronica.component.css']
})
export class ElectronicaComponent implements OnInit {

  public identity:any;
  fadeDiv = 'listado';
  public pOperacion:Operacion;
  public operacion:Operacion;
  public operaciones:Operacion[]=[];

  public Type_document_identification_id:any;
  public Type_organization_id:any;
  public Type_regime_id:any;
  public Type_liability_id:any;
  public Type_document_id:any;
  public municipialities:any;

  public facturacionElectronica:AdminPvconfigFacElectronica;
  constructor(private _router: Router, private _factElecService:FacturaElectronicaService,
    private _userService:UserService, public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
      this.operacion = new Operacion();
      this.pOperacion = this._userService.getPredetermidaOperacion();
      this.facturacionElectronica = new AdminPvconfigFacElectronica();

      this.Type_document_identification_id = type_document_identification_id;
      this.Type_organization_id = type_organization_id;
      this.Type_regime_id = type_regime_id;
      this.Type_liability_id =  type_liability_id;
      this.Type_document_id =type_document_id;
      this.municipialities = municipialities;
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getElectronica()

  }

  Logout(){

    localStorage.clear(); 
  
    this.identity = null;
    this._router.navigate(['/']);
  }


  ngDoCheck() {
    this.onLine();
  }

  Online: boolean = false
  onLine(){
    if(navigator.onLine){
      this.Online = true;
      // this.identity = this._userService.getIdentity();
      }else {
        this.Online = false;
        // this.identity = this._userService.getIdentity();
      }

  }

  fade(item: string): void {
    this.fadeDiv = item;
  }

  ActualizarSertificado(){
    let soft = {
      data:{
        certificate: this.facturacionElectronica.factCertificado.certificate,
        password: this.facturacionElectronica.factCertificado.password
      },
      token: this.facturacionElectronica.token
    }
    
    this._factElecService.putSertificado(soft).subscribe(
      res =>{
        console.log(res);
        if(res){

          let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
          let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
          // this._factElecService.updateConfig(this.facturacionElectronica).subscribe(
          //   result =>{ 
          //    let data = {titulo: 'Exito', info:res.message, type: 'Confirm', icon:'done_all'}
    
          //     let dialogRef = this.dialog.open(DialogConfirm,{
          //       data: data
              
          //     });
    
          //     dialogRef.afterClosed().subscribe(result => {
          //       if(result){ 
          //       }
          //     })
    
  
          //   })
        }
      },err =>{
        let data: Object
        console.log(err);
            data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
    
              let dialogRef = this.dialog.open(DialogConfirm,{
                data: data
              
              });
    
              dialogRef.afterClosed().subscribe(result => {
                if(result){ 
                }
              })
           
        
      });
  
  }

  ActualizarResolucionFacturacion(){
    let resol = {
      data:{
        type_document_id: this.facturacionElectronica.factResolucion.type_document_id,
        prefix: this.facturacionElectronica.factResolucion.prefix,
        resolution: this.facturacionElectronica.factResolucion.resolution,
        resolution_date: this.facturacionElectronica.factResolucion.resolution_date,
        technical_key: this.facturacionElectronica.factResolucion.technical_key,
        from: this.facturacionElectronica.factResolucion.from,
        to: this.facturacionElectronica.factResolucion.to,
        generated_to_date:this.facturacionElectronica.factResolucion.generated_to_date,
        date_from: this.facturacionElectronica.factResolucion.date_from,
        date_to: this.facturacionElectronica.factResolucion.date_to,
      },
      token: this.facturacionElectronica.token
    }
    
    this._factElecService.putResolucion(resol).subscribe(
      res =>{
        console.log(res);
        this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
          result =>{ 
           let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
              let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
  

          })
      },err =>{
        let data: Object

            data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
    
              let dialogRef = this.dialog.open(DialogConfirm,{
                data: data
              
              });
    
              dialogRef.afterClosed().subscribe(result => {
                if(result){ 
                }
              })
      });

  }

  ActualizarResolucionFacturacionDS(){
    let resol = {
      data:{
        type_document_id: this.facturacionElectronica.factResolucionDS.type_document_id,
        prefix: this.facturacionElectronica.factResolucionDS.prefix,
        resolution: this.facturacionElectronica.factResolucionDS.resolution,
        resolution_date: this.facturacionElectronica.factResolucionDS.resolution_date,
        from: this.facturacionElectronica.factResolucionDS.from,
        to: this.facturacionElectronica.factResolucionDS.to,
        generated_to_date:this.facturacionElectronica.factResolucionDS.generated_to_date,
        date_from: this.facturacionElectronica.factResolucionDS.date_from,
        date_to: this.facturacionElectronica.factResolucionDS.date_to,
      },
      token: this.facturacionElectronica.token
    }
    
    this._factElecService.putResolucion(resol).subscribe(
      res =>{
        //console(res);
        this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
          result =>{ 
           let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
              let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
  

          })
      },err =>{
        let data: Object

            data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
    
              let dialogRef = this.dialog.open(DialogConfirm,{
                data: data
              
              });
    
              dialogRef.afterClosed().subscribe(result => {
                if(result){ 
                }
              })
      });
  }


registrarCompanyFcturacion(){
  //(this.facturacionElectronica.factOperacion);
  let reg ={
    data :{
      type_document_identification_id: this.facturacionElectronica.factOperacion.type_document_identification_id,
      type_organization_id: this.facturacionElectronica.factOperacion.type_organization_id,
      type_regime_id: this.facturacionElectronica.factOperacion.type_regime_id,
      type_liability_id: this.facturacionElectronica.factOperacion.type_liability_id,
      business_name: this.facturacionElectronica.factOperacion.business_name,
      merchant_registration: this.facturacionElectronica.factOperacion.merchant_registration,
      municipality_id: this.facturacionElectronica.factOperacion.municipality_id,
      address: this.facturacionElectronica.factOperacion.address,
      phone: this.facturacionElectronica.factOperacion.phone,
      email: this.facturacionElectronica.factOperacion.email
    },
    _id :  this.facturacionElectronica.factOperacion.identification_number,
    dv :  this.facturacionElectronica.factOperacion.dv,
  }

  this._factElecService.registrarOperacion(reg).subscribe(
    res =>{
      //console(res);
      let token = res.token
      //console(token);
      
      if(token){
        this.facturacionElectronica.token = token;
        this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
          result =>{ 
           let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
              let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
  

          })
      }
     
     
    },err =>{
      let data: Object
      //(err);
          data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
         
      
    });
}

ActualizarSoftwre(){
  let soft = {
    data:{
      id: this.facturacionElectronica.factSoftware.id,
      pin: this.facturacionElectronica.factSoftware.pin
    },
    token: this.facturacionElectronica.token
  }
  
  this._factElecService.putSoftware(soft).subscribe(
    res =>{
      if(res){
        //console(res)
        // this.facturacionElectronica.token = token;
        this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
          result =>{ 
           let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
              let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
  

        })
        
      }
      //(res);
    },err =>{
      let data: Object
      //(err);
          data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
         
      
    });

}

ActualizarResolucionNotasCredito(){
  let soft = {
    data:{
        type_document_id: this.facturacionElectronica.factNotaCredito.type_document_id,
        from: this.facturacionElectronica.factNotaCredito.from,
        to: this.facturacionElectronica.factNotaCredito.to,
        prefix: this.facturacionElectronica.factNotaCredito.prefix
    },
    token: this.facturacionElectronica.token
  }
  
  this._factElecService.putNotasCredito(soft).subscribe(
    res =>{
      //(res);
      if(res){
        this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
          result =>{ 
           let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
              let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
  

        })
      }
    },err =>{
      let data: Object
      //(err);
          data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
    });

}

ActualizarResolucionNotasDebito(){
  let soft = {
 
    data:{
        type_document_id: this.facturacionElectronica.factNotaDebito.type_document_id,
        from: this.facturacionElectronica.factNotaDebito.from,
        to: this.facturacionElectronica.factNotaDebito.to,
        prefix: this.facturacionElectronica.factNotaDebito.prefix
    },
    token: this.facturacionElectronica.token
  }
  
  this._factElecService.putNotasDebito(soft).subscribe(
    res =>{
      this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
        result =>{ 
         let data = {titulo: 'Exito', info:'Actualizado correctamente', type: 'Confirm', icon:'done_all'}
            let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result){ 
            }
          })


      })
    },err =>{
      let data: Object
      //(err);
          data = {titulo: 'ERROR', info:err._body, type: 'Confirm', icon:'bug_report'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            
            });
  
            dialogRef.afterClosed().subscribe(result => {
              if(result){ 
              }
            })
    });

}

getElectronica(){
  this._factElecService.getElectronica(this.pOperacion._id).subscribe(
    res=>{
      if(res._id){
        this.facturacionElectronica = res;
        this.facturacionElectronica.factResolucion = new FactResolucion();
        //console(res)
      }
    }
  )
}

verAgregar(){
  if(this.facturacionElectronica.factResoluciones.length != 0){
    let pos = this.facturacionElectronica.factResoluciones.map(function(e) { return e.resolution; }).indexOf(this.facturacionElectronica.factResolucion.resolution);
    if(pos == -1){
      return true
    }else{
      return false
    }
  }else{
    return true
  }

}

agregarResolucion(){
  if(!this.facturacionElectronica.factResoluciones){
    this.facturacionElectronica.factResoluciones = [];
  }
  this.facturacionElectronica.factResoluciones.push(this.facturacionElectronica.factResolucion);
  this.facturacionElectronica.factResolucion = new FactResolucion();
}

nuevaResoucion(){
  this.facturacionElectronica.factResolucion = new FactResolucion();
}

deleteResolucion(i:number){
  this.facturacionElectronica.factResoluciones.splice(i,1);
}

passResolucion(item:FactResolucion){
  this.facturacionElectronica.factResolucion = item;
}

RegisterElectronica(){
  this.facturacionElectronica.operacion = this.pOperacion._id;
  this._factElecService.saveElectronica(this.facturacionElectronica).subscribe(
    res=>{
      this.facturacionElectronica = res;
      //console(res)
      let data = {titulo: 'Exito', info:'Procesado Correctamente', type: 'Confirm', icon:'done_all'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            
            });

    }
  )

}

updateElectronica(){
  this.facturacionElectronica.factResolucion = new FactResolucion();
  this.facturacionElectronica.operacion = this.pOperacion._id;
  console.log(this.facturacionElectronica)
  this._factElecService.updateElectronica(this.facturacionElectronica).subscribe(
    res=>{
      let data = {titulo: 'Exito', info:'Actualizado Correctamente', type: 'Confirm', icon:'done_all'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            
            });
    }
  )

}

deleteElectronica(){
  this._factElecService.deleteElectronica(this.facturacionElectronica._id).subscribe(
    res=>{
      let data = {titulo: 'Exito', info:'Elimindo Correctamente', type: 'Confirm', icon:'done_all'}
  
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      
      });
    }
  )
}

getNumericRange(){
  this._factElecService.getNumericRange({IDSoftware: this.facturacionElectronica.factSoftware.id}, this.facturacionElectronica.token).subscribe(
    res=>{

      //console(res)
      let msg = res.ResponseDian.Envelope.Body.GetNumberingRangeResponse.GetNumberingRangeResult.OperationDescription;
      let rangos = JSON.stringify(res.ResponseDian.Envelope.Body.GetNumberingRangeResponse.GetNumberingRangeResult.ResponseList.NumberRangeResponse)
      let data = {titulo: 'Consulta', info:msg + ' Rangos '+rangos, type: 'Confirm', icon:'search'}
  
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      
      });
    }
  )
}


}
