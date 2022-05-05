import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoService } from 'src/app/services/info.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { ChangePass } from './change-pass';

@Component({
  selector: 'app-cumplimiento',
  templateUrl: './cumplimiento.component.html',
  styleUrls: ['./cumplimiento.component.css']
})

export class CumplimientoComponent implements OnInit {

  public user:ChangePass;
  // public identity;
  public token:any;
  public errorMessage:any;
  public log: boolean = false;
  public company: string = '';
  public confirmNewpass:string = '';
  public id:string = '';
  invalidError:any;

  identidad:any;
  codigo:any;
  // public global: GlobalOffline;

  constructor(private _InfoService:InfoService,
              private _router: Router,
              public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
             ) {
      //  this.identity = this._userService.getIdentity();
       this.user = new ChangePass();
   }

  ngOnInit() {
    // this.token = this._userService.getToken();
    // console.log(this.identity);
    // this.user._id = this.identity._id;
    // this.user.email = this.identity.email;
  }

  getDataCollectionVendedor(){
    console.log(this.identidad)
    console.log(this.codigo)
    this._InfoService.getDataCollectionsVendedor({id : this.identidad, cod : this.codigo},'FEB-22').subscribe(
      res=>{
        console.log(res)
      }
    )
  }




}