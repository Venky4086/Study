import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  Roles : any;
  subjectExpert1 : any;
  subjectExpert2 : any;
  isExpanded = false;
  isShowing =false;
  name : any;

  constructor(private router:Router,private teacher:TeacherService) { }

  sideNavData = [
    { icon:'assignment' , name : 'Assignments', path:'/teacher/assignments' },
    { icon:'quiz' , name : 'Tests', path:'/teacher/tests' },
    { icon:'forum' , name : 'Forums' , path:'/teacher/forums' },
    { icon:'add' , name : 'Add Question' , path:'/teacher/add-question' },
    { icon:'analytics' , name : 'Assessment' , path:'/teacher/assessment' },
    { name: "Formus Approval", path: "/teacher/formusapproval", icon: "forum" },
  ];

  ngOnInit(): void {
    this.name = sessionStorage.getItem('username');
    console.log(sessionStorage.getItem('userid'));
    this.teacher.getTeacherDetails(sessionStorage.getItem('userid')).subscribe(
      (data:any)=>{
        console.log(data);
        sessionStorage.setItem('ItId',data[0].itId);
        sessionStorage.setItem('InstituteId',data[0].instiId)
      }
    );
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
      this.sideNavData.push({ icon:'science' , name :'Subject Expert 1' , path :'/student/subject-expert1' })
    }
    if(this.subjectExpert2){
      this.sideNavData.push({ icon:'science' , name :'Subject Expert 2' , path :'/student/subject-expert2' })
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
