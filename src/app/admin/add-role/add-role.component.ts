import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  constructor(private fb:FormBuilder,private admin:AdminService,private snackbar:MatSnackBar) { }
  role:boolean=true;
  usertype:boolean=false;
  roleName:any;
  usertypeName:any;
  AddRole:FormGroup;
  UserType:FormGroup;
  submitted = false;
  typesubmitted = false;
  ngOnInit() {
  this.AddRole = this.fb.group({
    rolename:['', Validators.required],
  });
  this.UserType = this.fb.group({
    usertype:['', Validators.required]
  });
  }
  get n(){
    return this.AddRole.controls
  }
  get t(){
    return this.UserType.controls
  }

  addRole(){
    this.submitted = true;
    if(this.roleName.invalid){
      return
    }
    else{
      let role={
        "roleName":'',
        "status":1
      }
      role.roleName=this.roleName;
      console.log(role);
      this.admin.addNewRole(role)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.status){
            this.snackbar.open("Role Added",'close');
            this.roleName='';
          }
        }
      );
    }
  }

  addUsertype(){
   this.typesubmitted = true;
   if(this.UserType.invalid){
     return
   }
   else{
    let usertype={
      "roleName":'',
      "status":3
    }
    usertype.roleName=this.usertypeName;
    console.log(usertype);
    this.admin.addNewUsertype(usertype)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status){
          this.snackbar.open("Role Added",'close');
          this.usertypeName='';
        }
      }
    );
   }
  }

  roleView(){
    this.usertype=false;
      this.role=true;
  }

  usertypeView(){
    this.role=false;
    this.usertype=true;
  }

}
