import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { StudentService } from "src/app/services/student.service";
import { TeacherService } from "src/app/services/teacher.service";
import AOS from 'aos'
declare var $: any;


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  alert: boolean = false;
  contactSubmitted = false;
  isShown: boolean;
  registerForm: FormGroup;
  useloginForm: FormGroup;
  submitted: false;
  login: boolean = true;
  registration: boolean = false;
  regForm: boolean = false;
  forgotPass: boolean = false;
  mobileNum: any;
  otp: any;

  otpObj = {
    mobileNo: "",
    otp: "",
  };

  isStudent: boolean;
  mobileNo: string;
  emailId: string;
  password: string;
  errMsg = [];
  standards: any = [];
  public err: any;
  forgotMobileNum: any;
  forgotOtp: any;
  otpField: boolean = false;
  loading: boolean;
  yesterday: any;
  forgotPasswordForm: FormGroup;

  // RESEND OTP VARIABLES
  finalInterval: any;
  timeLeft: number = 60;
  getAllTeachers: any = [];
  onlyTeachers: any;

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  constructor(
    private http: HttpClient,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,
    private student: StudentService,
    private teacher: TeacherService
  ) {}
  userloginForm = new FormGroup({
    mobileNo: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  contactForm = new FormGroup({
    fullName: new FormControl("", Validators.required),
    email: new FormControl(""),
    message: new FormControl("", Validators.required),
  });
  ngOnInit(): void {
    AOS.init();
    // this.student.testRoom().subscribe(
    //   (data)=>{
    //     console.log(data)
    //   }
    // );

    $(window).scroll(() => {
      var sticky = $("#header"),
        scroll = $(window).scrollTop();

      if (scroll >= 100) sticky.addClass("header-scrolled");
      else sticky.removeClass("header-scrolled");
    });

    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    this.yesterday = this.datepipe.transform(dte, "yyyy-MM-dd");
    console.log(this.yesterday);
    console.log(this.standards);
    this.student.getStandards().subscribe((data) => {
      this.standards = data;
    });
    // this.registerForm = this.fb.group({
    //   userType: ['', Validators.required],
    //   userName: ['', Validators.required],
    //   mobileNo: ['', Validators.required],
    //   password: ['', Validators.required],
    //   // password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    //   confirmPassword: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   gender: ['', Validators.required],
    //   // schoolOrCollege: ['', Validators.required],
    //   // std: ['', Validators.required],
    //   address: ['', Validators.required],
    //   dob: ['', Validators.required],
    // },
    // {
    //   validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    // }
    // );
    // console.log(this.userloginForm.value.mobileNo);
    // console.log(this.registerForm.valid);

    //  All Teachers list dispaly
    this.teacher.getTeachers().subscribe((data) => {
      console.log("get all teachers list from DB", data);
      this.onlyTeachers = data;
      this.getAllTeachers = this.onlyTeachers.slice(0, 4);
      console.log(this.getAllTeachers);
    });
  }

  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log("slide change");
  }

  goPostUser() {
    this.router.navigate(["/view-user-profile"]);
  }
  goPostTeacher1(userId) {
    this.router.navigate(["/view-teacher-profile", userId]);
    console.log(userId);
  }
  goPostTeacher() {
    this.router.navigate(["/view-teacher-profile"]);
  }
  standardspage() {
    this.router.navigate(["/standards"]);
  }

  signIn() {
    console.log(this.userloginForm.value);
    console.log(this.userloginForm);
    let data = this.userloginForm.value;
    const headers = new HttpHeaders({
      Authorization: "Barer my-token",
      "My-Custom-Header": "test",
    });
    const payload = {
      mobileNo: data.mobileNo,
      password: data.password,
    };

    console.log(payload);

    // this.student.signIn(payload).subscribe(
    //   res =>{
    //       console.log("Signin success!" , res);
    //       console.log("res",res.status);
    //       if(res.status==200)
    //       {

    //         this.toastr.successToastr('Sign in success' , null, {position: 'top-right'});
    //         console.log(res.result.result.userId);
    //         sessionStorage.setItem("loggedInUserName", res.result.result.userName);
    //         sessionStorage.setItem('userId',res.result.result.userId);
    //         sessionStorage.setItem('userType',res.result.result.userType);
    //         sessionStorage.setItem('std',res.result.result.std);
    //         this.router.navigate(['/standards']);
    //       }
    //       else
    //       {

    //         this.toastr.warningToastr('SIgn in Failed' , null, {position: 'top-right'});
    //       }

    //   },

    //   err =>

    //   {
    //   // this.loading  = false;
    //   console.log("Sign in failed", err);
    //   this.toastr.warningToastr('Sign in Failed', null, {position: 'top-right'});
    //   this.errMsg =err;
    //   }

    // );
  }

  onSubmit() {
    console.log(this.registerForm.value);
    let data = this.registerForm.value;
    const headers = new HttpHeaders({
      Authorization: "Bearer my-token",
      "My-Custom-Header": "test",
    });

    const payload = {
      userType: data.userType,
      userName: data.userName,
      mobileNo: data.mobileNo,
      password: data.password,
      emailId: data.email,
      gender: data.gender,
      schoolOrCollege: data.schoolOrCollege,
      std: data.std,
      address: data.address,
      dob: data.dob,
    };

    this.mobileNum = payload.mobileNo;
    console.log(payload);

    // this.student.signUp(payload).subscribe(
    //   (res:any) => {
    //     console.log("Registerd successfully. ", res);
    //     if(res.status==400){
    //       // this.loading=false;
    //       this.regForm=false;
    //       this.toastr.warningToastr('Mobile number already used', null, {position: 'top-right'});
    //     }
    //     if(res.status==200){
    //       // this.loading=false;
    //       this.registration=false;
    //       this.login=false;
    //       this.regForm=true;
    //       this.toastr.successToastr('Otp Sent Successfully' , null, {position: 'top-right'});
    //     }
    //     if(res.status!=200 && res.status!=400){
    //       this.toastr.warningToastr(res.status, null, {position: 'top-right'});
    //     }
    //   },
    //   err => {
    //     console.log("Error occured while registering the user. ", err);
    //     this.toastr.warningToastr('Error occured while registering the user', null, {position: 'top-right'});
    //   }
    // )
  }
  // selectedUserType(event) {
  //   console.log(event.target.value === '1');
  //   this.isStudent = event.target.value === '1';
  //   if(event.target.value==='1'){
  //     this.registerForm = this.fb.group({
  //       userType: [event.target.value, Validators.required],
  //       userName: ['', Validators.required],
  //       mobileNo: ['', Validators.required],
  //       // password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
  //       password: ['', Validators.required],
  //       confirmPassword: ['', [Validators.required]],
  //       email: ['', [Validators.required, Validators.email]],
  //       gender: ['', Validators.required],
  //       schoolOrCollege: ['', Validators.required],
  //       std: ['', Validators.required],
  //       address: ['', Validators.required],
  //       dob: ['', Validators.required],
  //     },
  //     {
  //       validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
  //     }
  //     );
  //   }
  // }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  get f(): any {
    return this.registerForm.controls;
  }

  get co(): any {
    return this.contactForm.controls;
  }
  contact() {
    this.contactSubmitted = true;
    let data = this.contactForm.value;
    console.log(data);
    const payload = {
      fullName: data.fullName,
      // MobileNumber :data.MobileNumber,
      email: data.email,
      message: data.message,
    };
    // this.student.contactUs(payload).subscribe(
    //   (res:any)=>{
    //     if(res.status==200){
    //       console.log("feedback submitted successfully.", res);
    //       this.toastr.successToastr('Thanks for your feedback..!' , null, {position: 'top-right'});
    //     }
    //   }
    // )
  }
}
