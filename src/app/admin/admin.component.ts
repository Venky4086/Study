import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  name: any;
  icon: any;

  constructor(private router: Router) {}

  sideNavData = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "border_all",
    },
    { name: "All Users", path: "/admin/all-users", icon: "people_outline" },
    { name: "All Questions", path: "/admin/all-qas-info", icon: "help_outline" },
    { name: "Add Roles", path: "/admin/add-role", icon: "plus_one" },
    {
      name: "Daily Challenge",
      path: "/admin/add-daily-challenge",
      icon: "memory",
    },
    { name: "General Admin", path: "/admin/general-admin", icon: "perm_identity" },
    { name: "Subject Expert1", path: "/admin/subject-expert1", icon: "filter_1" },
    { name: "Subject Expert2", path: "/admin/subject-expert2", icon: "filter_2" },
    { name: "Super Admin", path: "/admin/super-admin", icon: "portrait" },
    { name: "User Approval", path: "/admin/user-approval", icon: "approval" },
    // {name : 'User Details', path:'/admin/user-details'}
  ];

  ngOnInit(): void {
    this.name = sessionStorage.getItem("username");
    this.icon = sessionStorage.getItem("icon");
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["login/admin-login"]);
  }
}
