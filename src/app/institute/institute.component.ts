import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.css']
})
export class InstituteComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  Roles : any;
  subjectExpert1 : any;
  subjectExpert2 : any;
  isExpanded =false;
  isShowing =false;
  name : any;

  constructor(private router:Router) { }

  sideNavData = [
    { icon:'people' , name : 'Teachers', path:'/institute/teachers'},
    { icon:'people' , name : 'Students', path:'/institute/students'},
    { icon:'event' , name : 'Time Table', path:'/institute/time-table'},
    { icon:'event' , name : 'Timings', path:'/institute/add-timings'}
  ];

  ngOnInit(): void {
    this.name = sessionStorage.getItem('username');
    this.Roles = JSON.parse(sessionStorage.getItem('Roles'));
    console.log(this.Roles);
    this.Roles.forEach(element => {
      if(element.roleId == '10' || element.roleId == '12' || element.roleId == '14' || element.roleId == '16' || element.roleId == '24' || element.roleId == '26'){
        this.subjectExpert1 = true;
      }
      if(element.roleId == '11' || element.roleId == '13'|| element.roleId == '15' || element.roleId == '17' || element.roleId == '25' || element.roleId == '27'){
        this.subjectExpert2 = true;
      }
    });
    if(this.subjectExpert1){
      this.sideNavData.push({ icon: 'science' , name :'Subject Expert 1' , path :'/student/subject-expert1' })
    }
    if(this.subjectExpert2){
      this.sideNavData.push({ icon: 'science' , name :'Subject Expert 2' , path :'/student/subject-expert2' })
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login/user-login']);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
