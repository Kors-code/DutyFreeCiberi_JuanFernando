import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Config } from 'src/app/models/config';
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
  items:any[]
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
  log=false;
  config:any;
  constructor(public _infoService:InfoService,
    public _siigoService:SiigoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
      this.config = new Config();

  }
  
  ngOnInit(): void {
   
    this.getConfig();
  }


  getConfig(){
    this._infoService.getConfig().subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          // localStorage.setItem('categ',JSON.stringify(this.config.categorias))
 this.getFacturasSiigo(1);
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
        this.paginacion= res.pagination
        this.dataSource =  res.results;
        this.displayedColumns =  Object.keys(this.dataSource[0]);

        //console.log(this.displayedColumns)
        
        //console.log(res)
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
    //console.log(event)
    this.getFacturasSiigo(event.pageIndex);
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
        //console.log(res)
        if(res.length != 0){
          this.verRegistro(res);
        }
      }
    )
    //console.log(item)
  }

 }
