import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.css"],
})
export class AllUsersComponent implements OnInit {
  constructor(private admin: AdminService, private router: Router) {}
  Users: any;

  ngOnInit() {
    this.admin.grabUsers().subscribe((data: any) => {
      console.log(data);
      this.Users = data;
    },(error)=>{
      console.error(error);
    });
  }

  routeToUserDetails(id) {
    this.router.navigate(["admin/user-details", id]);
  }
}
