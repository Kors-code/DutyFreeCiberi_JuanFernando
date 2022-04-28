import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public identity:any;
  constructor(private _router: Router,
    private _userService:UserService,) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
  }

  Logout(){

    localStorage.clear(); 
  
    this.identity = null;
    this._router.navigate(['/']);
  }

}
