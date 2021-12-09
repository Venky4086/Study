import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {

  verificationForm : FormGroup;

  constructor(private router:Router,private route:ActivatedRoute,private login:LoginService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.phone)
    this.verificationForm = new FormGroup({
      mobileNo : new FormControl(this.route.snapshot.params.phone,Validators.required),
      otp : new FormControl('',Validators.required)
    });
  }

  verifySignUp(){
    console.log(this.verificationForm.value)
    this.login.postOtp(this.verificationForm.value)
    .subscribe(
      data=>
      {
        console.log(data);
        if(data.status==200)
          {
            this.snackbar.open('Otp Verified' , 'close', {duration:3000});
            this.router.navigate(['login/user-login']);
          }
          if(data.status!=200)
          {
            this.snackbar.open('Invalid Otp' , 'close', {duration:3000});
          }
      }
    );
  }

}
