import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/common/_helpers/must-match.validator';
import { LoginService } from 'src/app/services/login.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  
  registerForm: FormGroup;
  isShown:boolean;
  isStudent: boolean;
  usertypes : any;
  Standards : any;

  constructor(private router:Router, private fb:FormBuilder,private login:LoginService,private student:StudentService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    
    this.usertypes = [
      { value : 1 , name : "Student" },
      { value : 6 , name : "Teacher" },
      { value : 4 , name : "Parent" },
      { value : 5 , name : "Institute" },
      { value : 7 , name : "Learner" },
    ];

    this.student.getStandards().subscribe(
      (data:any)=>{
        this.Standards = data;
      }
    );

    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      userType: ['', Validators.required],
      userName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: [''],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', [Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f(): any {
    return this.registerForm.controls;
  }

  selectedUserType(event) {
    console.log(event);
    console.log(event.value == '1');
    this.isStudent = event.value == '1';
    if(event.value == '1'){
      this.registerForm = this.fb.group({
        userType: [event.value, Validators.required],
        userName: ['', Validators.required],
        mobileNo: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        email: [''],
        gender: ['', Validators.required],
        schoolOrCollege: ['', Validators.required],
        std: ['', Validators.required],
        address: ['', Validators.required],
        dob: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
      );
    }
  }

  onReset() {
    this.registerForm.reset();
    this.initializeForm();
  }

  onSubmit(){ 
    // this.loading=true;
    // this.submitted=true;
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid)
    let data = this.registerForm.value;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'test'
    })

    if(this.registerForm.valid){
      this.login.signUp(this.registerForm.value).subscribe(
      (res:any) => {
        console.log("Registerd successfully. ", res);
        if(res.status==400){
          // this.loading=false;
          // this.regForm=false;
          this.snackbar.open('Mobile Number alredy Registerd','close')
        }
        if(res.status==200){
          // this.loading=false;
          // this.registration=false;
          // this.login=false;
          // this.regForm=true;
          // this.toastr.successToastr('Otp Sent Successfully' , null, {position: 'top-right'});
          // this.regSuccess=true;
          this.snackbar.open('Otp Send Successfully','close');
          this.router.navigate(['login/user-verification',this.registerForm.value.mobileNo])
        }
        if(res.status!=200 && res.status!=400){
          this.snackbar.open(res.status,'close');
        }
      },
      err => {
        console.log("Error occured while registering the user. ", err);
        // this.toastr.warningToastr('Error occured while registering the user', null, {position: 'top-right'});
      }
    )
    
    }else{
      return
    }
    
     // stop here if form is invalid
     if (this.registerForm.invalid) {
      return;
  }
 
  }

}
