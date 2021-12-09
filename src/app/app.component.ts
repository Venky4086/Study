import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from "rxjs";
import { LoaderService } from "./services/loader.service";
import AOS from "aos";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  title = "study-amaze";
  events: string[] = [];
  isLoggedIn: boolean = false;
  isLoading: Subject<boolean> = this.loader.isLoading;
  sideNavData = [
    { name: "Dashboard", path: "/teacher/dashboard" },
    { name: "Forums", path: "/student/dashboard" },
    { name: "Study", path: "/institute/dashboard" },
    { name: "Practise", path: "/teacher/dashboard" },
    { name: "Test", path: "/teacher/dashboard" },
  ];
  constructor(
    private spinner: NgxSpinnerService,
    private loader: LoaderService
  ) {}

  ngOninit() {
    this.spinner.show();
    AOS.inti();
  }
}
