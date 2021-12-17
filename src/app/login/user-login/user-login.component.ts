import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { StudentService } from "src/app/services/student.service";
declare var $:any;
@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  userRoles: [];
  isAdmin: boolean = false;
  isShown: boolean;
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  constructor(
    private router: Router,
    private loginService: LoginService,
    private student: StudentService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mobileNo: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    $(window).scroll(() => {
      var sticky = $("#header"),
        scroll = $(window).scrollTop();

      if (scroll >= 100) sticky.addClass("header-scrolled");
      else sticky.removeClass("header-scrolled");
    });
  }

  get l() {
    return this.loginForm.controls;
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.setItem('institution',data.result.result.institution);
        if (data.status) {
          this.snackbar.open("Login Success", "close", { duration: 3000 });
          sessionStorage.setItem("userid", data.result.result.userId);
          sessionStorage.setItem("username", data.result.result.userName);
          sessionStorage.setItem("usertype", data.result.result.userType);
          sessionStorage.setItem("standard", data.result.result.std);
          sessionStorage.setItem("school", data.result.result.schoolOrCollege);
          sessionStorage.setItem("points", data.result.result.registerPoints);
          sessionStorage.setItem("mobile", data.result.result.mobileNo);
          sessionStorage.setItem("image", data.result.result.imageUri);
          sessionStorage.setItem("gender", data.result.result.gender);
          sessionStorage.setItem("email", data.result.result.emailId);
          sessionStorage.setItem("birthday", data.result.result.dob);
          sessionStorage.setItem("token", data.result.token);
          this.student
            .getUserRoleDetails(data.result.result.userId)
            .subscribe((data: any) => {
              this.userRoles = data.userRolesInfo;
              sessionStorage.setItem("Roles", JSON.stringify(this.userRoles));
              console.log(this.userRoles);
              this.userRoles.forEach((arrayItem: any) => {
                var x = arrayItem.roleId;
                if (x == 3) {
                  this.isAdmin = true;
                }
                console.log(x);
              });
            });
          if (sessionStorage.getItem("usertype") === "5") {
            this.router.navigate(["/institute/teachers"]);
            console.log("insti");
          }
          if (sessionStorage.getItem("usertype") === "6") {
            this.router.navigate(["/teacher/assignments"]);
            console.log("teacher");
          }
          if (
            sessionStorage.getItem("usertype") != "6" &&
            sessionStorage.getItem("usertype") != "5"
          ) {
            this.router.navigate(["/student/dashboard"]);
            console.log("student");
          }
        } else {
          this.snackbar.open("Login Failed", "close", { duration: 3000 });
        }
      },
      (error: any) => {
        this.snackbar.open("Login Failed", "close", { duration: 3000 });
      }
    );
  }
}
