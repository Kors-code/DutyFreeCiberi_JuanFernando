import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-mediosPagokss-dialog',
    templateUrl: './mediosPago.component.html',
    styleUrls: ['./pos.component.css']
  })
  
  export class DialogMediosPagoDetail {
    motivos:any;
  
    constructor(
      public dialogRef: MatDialogRef<DialogMediosPagoDetail>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        ////console.log(this.data)
       }
  
    onNoClick(): void {
      
    }
  
    cancelar(){
      this.dialogRef.close();
    }
    
    confirmar(){
      this.dialogRef.close('ok');
    }
  
    confirmarDelete(motivos:any){
      this.dialogRef.close(motivos);
    }

    
  
  }