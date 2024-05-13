import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';

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
    fileName = ''
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

          nuevo(){
            this.proveedor=new Proveedor();
            this.proveedores = [];
            this.verListado = false;;
         
          }


    
          upload = [];
          onFileSelected(evt: any) {
            const target : DataTransfer =  <DataTransfer>(evt.target);
            
            if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        
            const reader: FileReader = new FileReader();
      
            reader.onload = (e: any) => {
              const bstr: string = e.target.result;
        
              const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
              const wsname : string = wb.SheetNames[0];
              const ws: XLSX.WorkSheet = wb.Sheets[wsname];
              this.upload = (XLSX.utils.sheet_to_json(ws));
            };
        
            reader.readAsBinaryString(target.files[0]);
        
          }

          register=0
          subirProveedores(){
            console.log(this.upload)
            this.register = 0
            for (let i = 0; i < this.upload.length; i++) {
              const element:any = this.upload[i];

              let Prov = new Proveedor()
                  Prov.nit = element.nit;
                  Prov.titulo = element.titulo;
                  Prov.contacto = element.contacto;
                  Prov.ciudad = element.ciudad;
                  Prov.telefono = element.telefono;
                  Prov.direccion= element.direccion;
                  Prov.email= element.email;

                  console.log(Prov)

                  this._proveedorService.registerProveedor(Prov).subscribe(
                    res=>{
                      this.register++
        
                      if(this.register === this.upload.length-1){
                       
                        let data = {titulo: 'Exito ', info:' Se Registraron los Proveedores' ,type: 'Confirm', icon:'done_all'}
                        let dialogRef = this.dialog.open(DialogConfirm,{
                          data: data
                        });
                        dialogRef.afterClosed().subscribe(result => {
                          window.location.reload();
                        })
           
                      }
                    }
                  )



            }

          



          }

          exportexcel() {
            /**passing table id**/
            let data = document.getElementById('table-proveedores');
            const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
        
            /**Generate workbook and add the worksheet**/
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        
            /*save to file*/
            XLSX.writeFile(wb,'FORMATO LISTADO PROVEEDORES.xlsx');
          }

          deleteProveedor(){
            this._proveedorService.deleteProveedor(this.proveedor._id).subscribe(
              res=>{
                this.getProveedores();
              }
            ) 
          }
        
  }