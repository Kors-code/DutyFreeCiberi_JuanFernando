import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { OperacionesService } from 'src/app/services/operacion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.css']
})
export class OperacionComponent implements OnInit {

  public identity:any;
  fadeDiv = 'listado';
  public pOperacion:Operacion;
  public operacion:Operacion;
  public operaciones:Operacion[]=[];
  constructor(private _router: Router,
    private _userService:UserService, private _operacionService:OperacionesService) {
      this.operacion = new Operacion();
      this.pOperacion = new Operacion();
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getOperaciones();
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

  passOperacion(item:Operacion){
    this.operacion=item;
    this.fadeDiv = 'register';
  }

  Register(){
    this.operacion.img = 'assets/airport.svg'
    this._operacionService.saveOperacion(this.operacion).subscribe(
      res=>{
        console.log(res)
        this.getOperaciones();
        
      }
    )
  }

  updateOperacion(){
    this.operacion.img = 'assets/airport.svg'
    this._operacionService.updateOperacion(this.operacion).subscribe(
      res=>{
        console.log(res)
        this.getOperaciones();
      }
    )
  }

  deleteOperacion(){
   
    this._operacionService.deleteOperacion(this.operacion._id).subscribe(
      res=>{
        console.log(res)
        this.getOperaciones();
      }
    )
  }

  getOperaciones(){
    this._operacionService.getOperaciones().subscribe(
      res=>{
        console.log(res)
        this.operacion = new Operacion();
        this.operaciones = res;
        this.fadeDiv = 'listado';
      }
    )
  }


}
