import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/notaVenta';


@Component({
    selector: 'app-clientes-dialog',
    templateUrl: './clientes.component.html',
    styleUrls: ['./pos.component.css']
  })
  export class DialogClienteDetail {
    motivos:any;
    consecutivo:any;
    cliente:Cliente
    scan:any;
    constructor(
      public dialogRef: MatDialogRef<DialogClienteDetail>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

        this.cliente =new Cliente();
        console.log(this.cliente)
       }
  
    onNoClick(): void {
      
    }

    saveScan(){
      console.log(this.scan)
    }
  
    cancelar(){
      this.dialogRef.close();
    }
    
    confirmar(){
      this.dialogRef.close(this.cliente);
    }

    badCliente(){
      this.cliente.STEB_BAG="STEB BAG"
      this.cliente.TipoIdentificacion="PASTPORT";
      this.cliente.NIdentificacion="456669987";
      this.cliente.Pasajero="CAMILO SUAREZ";
      this.cliente.Direccion="RIO ANT";
      this.cliente.Origen="COL";
      this.cliente.Aerolinea="AVIANCA";
      this.cliente.Asiento="b36";
      this.cliente.Fecha = new Date().toLocaleDateString();
      this.cliente.Correo="correociente@clkiente.com";

      this.cliente.Destino="New York";
      this.cliente.Vuelo="v4556";
      this.cliente.Nacionalidad ="COL";
      this.cliente.Sexo="MASC";

    }
  


    
  
  }