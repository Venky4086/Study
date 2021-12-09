import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/common/_helpers/must-match.validator';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  otpField = false;
  isShown:boolean;
  forgotPasswordForm : FormGroup;
  finalInterval:any;
  timeLeft: number = 60;

  constructor(private router:Router,private login:LoginService,private snackbar:MatSnackBar,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForgotForm();
  }

  initializeForgotForm(){
    this.forgotPasswordForm=this.fb.group({
      mobileNo:['',Validators.required]
    })
  }

  initializeForgotFullForm(mob){
    this.forgotPasswordForm = this.fb.group({
      mobileNo : [mob,Validators.required],
      newPassword:[''],
      confirmPw:[''],
      otp:['']
    }),
    {
      validator: MustMatch('newPassword', 'confirmPw')
    };
  }

  get f() : any{
    return this.forgotPasswordForm.controls;
  }

  sendOTP(){
    if(this.otpField==true){
      var verify={
        "mobileNo":'',
        "otp":'',
        "newPassword":'',
        "confirmPw":''
      };
      verify.mobileNo=this.forgotPasswordForm.get('mobileNo').value;
      verify.otp=this.forgotPasswordForm.get('otp').value;
      verify.newPassword=this.forgotPasswordForm.get('newPassword').value;
      verify.confirmPw=this.forgotPasswordForm.get('confirmPw').value;
      this.login.createNewPass(verify)
      .subscribe(
        (res:any)=>
        {
          console.log(res);
          if(res.status==200){
            this.snackbar.open("password updated successfully" , 'close', {duration: 3000});
            this.router.navigate(['login/user-login'])
          }else{
            this.snackbar.open(res.status,'close',{duration:3000})
          }
        }
      );
    }else{
      var mob={
        'mobileNo':''
      };
      mob.mobileNo=this.forgotPasswordForm.get('mobileNo').value;
      this.login.forgotPasswordOtp(mob)
      .subscribe(
        (res:any)=>
        {
          console.log(res);
          if(res.status==200){
            this.snackbar.open('OTP sent successfully' , 'close', {duration: 3000});
            this.initializeForgotFullForm(mob.mobileNo);
            this.otpField=true;
            this.finalInterval = setInterval(() => {
              if(this.timeLeft===0){
                clearInterval(this.finalInterval);
              }
              if (this.timeLeft >=1) {
                this.timeLeft--;
              }
            }, 1000)
          }
          if(res.status==400){
            this.snackbar.open('This mobilenumber not registered in STUDYAMAZE.','close',{duration: 3000})
          }
        }
      );
    }
  }

  resendOTP(){
    var mob={
      'mobileNo':''
    };
    mob.mobileNo=this.forgotPasswordForm.get('mobileNo').value;
    console.log(mob);
    this.login.forgotPasswordOtp(mob)
    .subscribe(
      (res:any)=>
      {
        console.log(res);
        if(res.status==200){
          this.snackbar.open('OTP sent successfully' , 'close', {duration: 3000});
          this.otpField=true;
          this.timeLeft=60;
          this.finalInterval = setInterval(() => {
            if(this.timeLeft===0){
              clearInterval(this.finalInterval);
            }
            if (this.timeLeft >=1) {
              this.timeLeft--;
            }
          }, 1000)
        }
      }
    );
  }

}
