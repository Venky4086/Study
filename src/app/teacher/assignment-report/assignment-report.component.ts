import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-assignment-report',
  templateUrl: './assignment-report.component.html',
  styleUrls: ['./assignment-report.component.css']
})
export class AssignmentReportComponent implements OnInit {

  assignment : any;
  report : any
  submissionsInfo : any;

  constructor(private teacherservice:TeacherService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.teacherservice.getAssignmentById(this.route.snapshot.params.id,sessionStorage.getItem('userid')).subscribe(
      (data:any) => {
        this.assignment = data.assignmentInfo;
      }
    );
    this.teacherservice.getAssignmentReport(this.route.snapshot.params.id,sessionStorage.getItem('userid')).subscribe(
      (data:any) => {
        this.report = data;
      }
    );
    this.teacherservice.getSubmittedUsersList(this.route.snapshot.params.id).subscribe(
      (data : any) => {
        this.submissionsInfo = data;
    });
  }

  goToAssess(userid){
    this.router.navigate(['teacher/assess-user',this.route.snapshot.params.id,userid])
  }

}
