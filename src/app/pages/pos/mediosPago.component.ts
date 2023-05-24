import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormaPago, MediosPago } from 'src/app/models/notaVenta';


@Component({
    selector: 'app-mediosPagokss-dialog',
    templateUrl: './mediosPago.component.html',
    styleUrls: ['./pos.component.css']
  })
  
  export class DialogMediosPagoDetail {
    motivos:any;
    mediosPago:MediosPago=new MediosPago()
    formaPago:FormaPago=new FormaPago();

    medios=['CASH USD']
  
    constructor(
      public dialogRef: MatDialogRef<DialogMediosPagoDetail>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        // console.log(this.data)
        this.mediosPago.total = this.data.total;
        this.mediosPago.trm = this.data.trm;
        this.mediosPago.trm_euro = this.data.trm_euro;
        this.mediosPago.restante = this.data.total;

        // console.log(this.mediosPago)
        if(!this.data.medioPago._id){
          for (let i = 0; i < this.mediosPago.formaPagos.length; i++) {
            const element = this.mediosPago.formaPagos[i];
            // console.log(element)
            element.ImportePago = this.data.total * this.data.trm;
            element.TipoCambio = 1
            if(element.Moneda == 'USD'){
              element.ImportePago = this.data.total;
              element.TipoCambio= this.data.trm
            }
            if(element.Moneda == 'EUR'){
              element.ImportePago = (this.data.total * this.data.trm) / this.data.trm_euro;
              element.TipoCambio= this.data.trm_euro
            }
            
          } 
        }else{

          this.mediosPago = this.data.medioPago;

        }
           
        
       }
  
    onNoClick(): void {
      
    }
  
    cancelar(){
      this.dialogRef.close();
    }
    
    confirmar(){
      this.mediosPago._id = new Date().getTime();
      this.dialogRef.close(this.mediosPago);
    }

    totalizar(){
      this.mediosPago.restante = this.data.total;
      this.mediosPago.recibido = 0;
      this.mediosPago.cambio = 0;
      for (let i = 0; i < this.mediosPago.formaPagos.length; i++) {
        const element = this.mediosPago.formaPagos[i];
        if(element.Importe != 0 && element.Moneda == 'USD'){
          this.mediosPago.recibido = this.mediosPago.recibido + element.Importe;

          if(this.mediosPago.recibido >=  this.mediosPago.total){
            this.mediosPago.cambio = this.mediosPago.recibido - this.mediosPago.restante;
            this.mediosPago.restante = 0;
          }else{
            this.mediosPago.restante = this.mediosPago.restante - element.Importe;
            this.mediosPago.cambio = 0;
          }

        }
        if(element.Importe != 0 && element.Moneda == 'EUR'){



          this.mediosPago.recibido = this.mediosPago.recibido + Math.round( (( element.Importe * element.TipoCambio)/this.mediosPago.trm));
          

          if(this.mediosPago.recibido >=  this.mediosPago.total){
            this.mediosPago.cambio = this.mediosPago.recibido - this.mediosPago.total;
            // console.log(this.mediosPago.cambio)
            this.mediosPago.restante = 0;
          }else{
            this.mediosPago.restante = Math.round(this.mediosPago.total - this.mediosPago.recibido) ;
            this.mediosPago.cambio = 0;
          }
        }

        if(element.Importe != 0 && element.Moneda == 'COP'){
          // console.log(element.Importe)
          this.mediosPago.recibido = this.mediosPago.recibido + Math.round(( element.Importe / this.mediosPago.trm));
          // console.log( this.mediosPago.recibido)
          if(this.mediosPago.recibido >=  this.mediosPago.total){
            this.mediosPago.cambio =  Math.round(this.mediosPago.recibido - this.mediosPago.total);
            this.mediosPago.restante = 0;
          }else{
            this.mediosPago.restante = this.mediosPago.restante - element.Importe;
            this.mediosPago.cambio = 0;
          }
        }


      }

  
    }


    restante(item:any){
      item.Importe = Math.round((this.mediosPago.restante * this.mediosPago.trm) / item.TipoCambio);
      this.totalizar()
    }


 
  
 

    
  
  }