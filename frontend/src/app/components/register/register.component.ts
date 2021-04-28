import { User } from './userInterface';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {

  //private user: User; 
  
  userRoles: any = ['admin', 'user'];

  constructor() {}

  ngOnInit() {
  }

}