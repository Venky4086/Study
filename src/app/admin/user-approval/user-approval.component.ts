import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-approval',
  templateUrl: './user-approval.component.html',
  styleUrls: ['./user-approval.component.css']
})
export class UserApprovalComponent implements OnInit {

  Users:[];
  info={
    userId:0,
    userName:'',
    emailId:'',
    mobileNo:'',
    std:0,
    schoolOrCollege:'',
    gender:'',
    dob:'',
    address:'',
    cd:'',
};  
  approvePayload={
    info:{},
    adminId:0,
    reason:'',
    auth:''
  };
  totalRecords: any;
  page:any=1;
  count:any = 5;
  constructor(public admin:AdminService,private router:Router) { }

  ngOnInit() {
    this.admin.getUsers()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Users = data;
        this.totalRecords = data.length
      }
    );
  }

  Approve(id,name,email,mobile,std,school,gender,dob,address,cd){
    console.log("yes");
    console.log(id,name,email,mobile,std,school,gender,dob,address,cd);
    this.info.userId=id;
    this.info.userName=name;
    this.info.emailId=email;
    this.info.mobileNo=mobile;
    this.info.std=std;
    this.info.schoolOrCollege=school;
    this.info.gender=gender;
    this.info.dob=dob;
    this.info.address=address;
    this.info.cd=cd;
    console.log(this.info)
    this.approvePayload.info=this.info;
    this.approvePayload.adminId=1;
    this.approvePayload.reason="user details are verified";
    this.approvePayload.auth="VERIFY"
    console.log(this.approvePayload);
    this.admin.approveUsers(this.approvePayload)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
      }
    );
  }

  Decline(id,name,email,mobile,std,school,gender,dob,address,cd){
    console.log("no");
    console.log(id,name,email,mobile,std,school,gender,dob,address,cd);
    this.info.userId=id;
    this.info.userName=name;
    this.info.emailId=email;
    this.info.mobileNo=mobile;
    this.info.std=std;
    this.info.schoolOrCollege=school;
    this.info.gender=gender;
    this.info.dob=dob;
    this.info.address=address;
    this.info.cd=cd;
    console.log(this.info)
    this.approvePayload.info=this.info;
    this.approvePayload.adminId=1;
    this.approvePayload.reason="user details are not verified";
    this.approvePayload.auth="NOT_VERIFY"
    console.log(this.approvePayload);
    this.admin.approveUsers(this.approvePayload)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
      }
    );
  }

  userDetails(id){
    console.log(id);
    this.router.navigate(['/admin/user-details',id])
  }

}
