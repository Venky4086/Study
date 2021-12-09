import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-assess-user',
  templateUrl: './assess-user.component.html',
  styleUrls: ['./assess-user.component.css']
})
export class AssessUserComponent implements OnInit {

  uploadData : any;
  marks : any;
  feedback : any;

  constructor(private teacherservice:TeacherService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.teacherservice.getUserFiles(this.route.snapshot.params.id,this.route.snapshot.params.userid).subscribe(
      (data:any)=>{
        console.log(data);
        this.uploadData = data;
      }
    );
  }

  giveUserReport(){
    let payload = {
      assignmentIdfk : this.uploadData.assignmentIdfk,
      marks : this.marks,
      feedBack : this.feedback,
      userId : this.uploadData.userId
    };
    console.log(payload);
    this.teacherservice.postUserMarks(payload).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.router.navigate(['teacher/assignment-report',this.uploadData.assignmentIdfk])
        }
      }
    );
  }

}
