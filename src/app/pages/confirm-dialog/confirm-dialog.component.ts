import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class DialogConfirm {
  motivos:any;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    
  }

  cancelar(){
    this.dialogRef.close();
  }
  
  confirmar(){
    this.dialogRef.close('ok');
  }

  confirmarDelete(motivos:any){
    this.dialogRef.close('ok');
  }

}
