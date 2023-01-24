import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UserInfo } from 'os';
import { Config } from 'src/app/models/config';
import { Operacion } from 'src/app/models/operacion';
import { UserService } from 'src/app/services/user.service';
import { InfoService } from '../../services/info.service';
import { SiigoService } from '../../services/siigo.service';
import { DialogDataJson } from '../data-base/data-base.component';

interface pagination{
  page: number,
  page_size: number,
  total_results: number,
}

interface data{
  id: string,
  name: string,
  date: string,
  total:number,
  items:any[],
  number:number,
  observations: string,
}


@Component({
  selector: 'app-siigo',
  templateUrl: './siigo.component.html',
  styleUrls: ['./siigo.component.css']
})
export class SiigoComponent implements OnInit {
  displayedColumns: string[] = ['id','document', 'number', "name" ,"date", "customer","cost_center", "seller", "total","balance","items","payments", "mail","metadata"];
  dataSource:data[] = [];
  paginacion:any;
  paginacion2:any;
  log=false;
  config:any;
  pOperacion:Operacion
  constructor(public _infoService:InfoService,
    _userService:UserService,
    public _siigoService:SiigoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
      this.config = new Config();
      this.pOperacion=_userService.getPredetermidaOperacion();
  }
  
  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          // localStorage.setItem('categ',JSON.stringify(this.config.categorias))
          this.getFacturasSiigo(1);
          this.getComprobantesSiigo(1)
          //console.log(this.config)
        }
       
      }
    )
  }


  // authSiigo(){
  //   this._siigoService.sendInvoicesPeriodo('ENE-22').subscribe(
  //     res => {
  //       // //console.log(res)
  //     }
  //   )
  // }

  getFacturasSiigo(n:number){
    this.log = true
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }
    this._siigoService.getFacturasSiigo(credenciales, n).subscribe(
      res => {
        console.log(res)
        this.paginacion= res.pagination
        this.dataSource =  res.results;
        if(this.dataSource.length !=0){
          this.displayedColumns =  Object.keys(this.dataSource[0]);
        }
      

        //console.log(this.displayedColumns)
        
        //console.log(res)
        // this.log = false
      }
    )
  }

  dataSourceComprobantes:data[] = [];
  getComprobantesSiigo(n:number){
    this.log = true
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }
    this._siigoService.getComprobantesSiigo(credenciales,n).subscribe(
      res => {
        console.log(res)
        this.paginacion2= res.pagination
        this.dataSourceComprobantes =  res.results;
        // if(this.dataSource.length !=0){
        //   this.displayedColumns =  Object.keys(this.dataSource[0]);
        // }
      
        //console.log(this.displayedColumns)
        
        //console.log(res)
        this.log = false
      },err=>{
        console.log(err)
        this.log = false
      }
    )
  }


  length = 0;
  pageSize = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent:PageEvent = new PageEvent();

  pageEventC(event:any){
    console.log(event)
    this.getComprobantesSiigo(event.pageIndex + 1);
  }

  pageEventCompo(event:any){
    console.log(event)
    this.getFacturasSiigo(event.pageIndex +1);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  verRegistro(item:any){
    //console.log(item)
    let registro = {reg:item, coll:'noting'} 
    let dialogRef = this.dialog.open(DialogDataJson,{
      data: registro
    
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }


  pasRegistro(item:string){
    this.log = true
    this._siigoService.getDataCollectionsEstado('FEB',item).subscribe(
      res=>{
        this.log = false;
        console.log(res)
        if(res.length != 0){
          this.verRegistro(res);
        }
      }
    )
  }

 }
