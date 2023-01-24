import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public identity:any;
  public pOperacion:Operacion;
  constructor(private _router: Router,
    private _userService:UserService,) {
      this.pOperacion= this._userService.getPredetermidaOperacion();
   
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
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

      this.pOperacion =this._userService.getPredetermidaOperacion();

  }

  cancelarOperacion(){
    localStorage.removeItem('predeterminateOperacion');
    this._router.navigate(['/']);
    // window.location.reload();
  }

}
