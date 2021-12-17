import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  assignments : any;

  constructor(private router:Router,private teacherservice:TeacherService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('InstituteId'));
    this.teacherservice.getAssignmentsByInstituteTeacher(sessionStorage.getItem('InstituteId'),sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.assignments=data;
      },(error)=>{
        console.error(error);
      });
  }

  styleObject(sub): Object {
    if (sub == 'Mathematics'){
        return {background : "#80000026 "}
    }
    if (sub == 'Physics'){
      return {background : "#3a13b326"}
    }
    if (sub == 'Chemistry'){
      return {background : "#00ffff26"}
    }
  }

  goToReport(id){
    this.router.navigate(['teacher/assignment-report',id])
  }

}
