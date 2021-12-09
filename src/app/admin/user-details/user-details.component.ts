import { likesDislikesDTO } from './../../models/discussion';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private admin:AdminService,private snackbar:MatSnackBar) { }

  User=[];
  addRole=[];
  delRole=[];
  Roles:any;
  userRoles:any;
  userPrecedingRoles:any;
  mode=[];

  ngOnInit() {
    this.getUserInfo();
    this.allRoles();
    this.getPreviousRoles();
    console.log(this.route.snapshot.params.id);
  }

  getUserInfo(){
    this.User=[];
    this.admin.grabUserDetails(this.route.snapshot.params.id)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.User.push(data);
        this.userRoles=data.userRolesInfo;
        console.log(this.userRoles);
        this.userRoles.forEach((userRoles, index) => {
          console.log(userRoles.roleId); 
          this.mode.push(userRoles.roleId);
        });
        console.log(this.mode);
      }
    );
  }

  allRoles(){
    this.admin.getAllRoles()
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.Roles=data;
      }
    );
  }

  getPreviousRoles(){
    this.admin.getPrecedingRoles(this.route.snapshot.params.id)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.userPrecedingRoles=data;
      }
    );
  }

  updateCheckedOptions(option, event){
    console.log('rId', option.rId );
    console.log('event', event );
    let role={
      'rId':0,
      'userId':sessionStorage.getItem('userid')
    };
    role.rId=option.rId;
    console.log("role",role);
    this.addRole.push(role);
    console.log("addRole",this.addRole);
    let result = this.addRole.reduce((arr, item) => {
      let exists = !!this.addRole.find(x => x.rId === item.rId);
      if(!exists){
          arr.push(item);
      }
      return arr;
  }, []);
  }

  deleteRole(rId){
    console.log(rId);
    let role={
      'rId':0,
      'userId':this.route.snapshot.params.id * 1
    };
    role.rId=rId;
    this.delRole.push(role);
    console.log("delRole",this.delRole);
    this.admin.delUserRole(this.delRole)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status==200){
          this.snackbar.open('Role Deleted Succesfully','close',{duration: 3000})
          this.delRole=[];
        }
        this.getUserInfo();
        this.allRoles();
      }
    );
    this.delRole=[];
  }

  updateRole(rId){
    console.log(rId);
    let role={
      'rId':0,
      'userId':this.route.snapshot.params.id
    };
    role.rId=rId;
    this.addRole.push(role);
    console.log("addRole",this.addRole);
    this.admin.assignUserRole(this.addRole)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status==200){
          this.snackbar.open('Role Added Succesfully','close',{duration: 3000})
          this.addRole=[];
        }
        this.getUserInfo();
        this.allRoles();
      }
    );
    this.addRole=[];
  }

}
