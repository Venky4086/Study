import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-pages-details',
  templateUrl: './pages-details.component.html',
  styleUrls: ['./pages-details.component.css']
})
export class PagesDetailsComponent implements OnInit {

  constructor(private admin:AdminService) { }

  isInstitute:boolean;
  isTeacher:boolean;
  userId:any;
  userRoles: [];
  isAdmin:boolean = false;

  ngOnInit() {
    this.isInstitute = sessionStorage.getItem('userType') === '5' ? true : false ;
    this.isTeacher = sessionStorage.getItem('userType') === '6' ? true : false ;

    this.userId=sessionStorage.getItem('userid');
    
    this.admin.grabUserDetails(sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        this.userRoles=data.userRolesInfo;
        console.log(this.userRoles);
        this.userRoles.forEach((arrayItem:any)=>{
          var x = arrayItem.roleId;
          if(x == 3){
            this.isAdmin = true;
          }
          
          console.log(x);
        } )
      }
    );

  }

}
