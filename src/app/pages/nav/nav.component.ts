import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public identity:any;
  constructor(private _router: Router,) { }

  ngOnInit(): void {
  }

  Logout(){

    localStorage.clear(); 
  
    this.identity = null;
    this._router.navigate(['/']);
  }

}
