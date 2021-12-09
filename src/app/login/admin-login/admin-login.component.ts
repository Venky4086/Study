import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm : FormGroup;

  constructor(private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.adminLoginForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    });
  }

  login(){
    if(this.adminLoginForm.value.username == 'admin' && this.adminLoginForm.value.password == 'admin@123'){
      this.router.navigate(['admin/dashboard'])
    }else{
      this.snackbar.open('Incorrect Credentials','close')
    }
  }

}
