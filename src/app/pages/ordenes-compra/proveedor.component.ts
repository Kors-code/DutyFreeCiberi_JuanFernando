import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';


@Component({
    selector: 'proveedor.component-dialog',
    templateUrl: './proveedor.component.html',
    styleUrls: ['./ordenes-compra.component.css']
  })

  export class DialogProveedor {
    verListado=false;
    proveedor:Proveedor
    proveedores:Proveedor[]=[]
    search = ''
    constructor(public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
        public dialogRef: MatDialogRef<DialogProveedor>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _userService:UserService, private _proveedorService:ProveedorService){
            this.proveedor=new Proveedor();
            console.log(this.proveedor)
        }

        cancelar(){
            this.dialogRef.close();
          }
          
          confirmar(){
            this.dialogRef.close(this.proveedor);
          }

          save(){
            console.log(this.proveedor)
            if(!this.proveedor._id){
              this._proveedorService.registerProveedor(this.proveedor).subscribe(
                res=>{
                  console.log(res)
                  this.proveedor = res;
                  this.verListado = false;
                  let data = {titulo: 'Exito ', info:'Proveedor Guardado Correctamente' ,type: 'Confirm', icon:'done_all'}
                  let dialogRef = this.dialog.open(DialogConfirm,{
                    data: data
                  });
                  dialogRef.afterClosed().subscribe(result => {
            
                  })
                }
              )
            }else{
              this._proveedorService.updateProveedor(this.proveedor).subscribe(
                res=>{
                  console.log(res)
                  this.proveedor = res
                  let data = {titulo: 'Exito ', info:'Proveedor Actualizado Correctamente' ,type: 'Confirm', icon:'done_all'}
                  let dialogRef = this.dialog.open(DialogConfirm,{
                    data: data
                  });
                  dialogRef.afterClosed().subscribe(result => {
            
                  })
                })
            }
           
          }

          getProveedores(){
            this._proveedorService.getProveedores().subscribe(
              res=>{
                console.log(res)
                this.proveedor=new Proveedor();
                this.proveedores = res;
                this.verListado = true;
              }
            )
          }

          pasProveedor(item:Proveedor){
            this.proveedor = item
            this.verListado = false;
            this.search = ''
          }


          buscarProveedor(){
            console.log(this.search)
            if(this.search != ''){
              this._proveedorService.getProveedorTitulo(this.search).subscribe(
                res=>{
                  if(res.length != 0){
                    this.proveedor=new Proveedor();
                    this.proveedores = res;
                    this.verListado = true;
                  }
                
                  console.log(res)
                }
              )
            }
            
          }
  }