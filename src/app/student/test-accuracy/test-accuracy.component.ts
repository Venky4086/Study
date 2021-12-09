import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-test-accuracy',
  templateUrl: './test-accuracy.component.html',
  styleUrls: ['./test-accuracy.component.css']
})
export class TestAccuracyComponent implements OnInit {

  standardId: any;
  subjectId: any;
  userId: any;
  subjectName:any;
  SubjectPercentages: any =[];
  SubjectPercentage: any=[];
  standard: any;
 

  constructor(private _location:Location, private student: StudentService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.subjectId);
    console.log(this.route.snapshot.params.subject);
    this.standardId =3;
    this.standard=this.route.snapshot.params.stId;
    this.subjectName=this.route.snapshot.params.subject;
    this.subjectId =this.route.snapshot.params.subjectId;
    console.log(this.subjectId);
   this.userId = sessionStorage.getItem('userid');
   this.student.getSubjectPercentage(this.standardId,this.subjectId,this.userId).subscribe(
     data=>{
       console.log(data);
       this.SubjectPercentages = data;
       this.SubjectPercentage = this.SubjectPercentages.testInfo;

     }
   )
}
event;
getSubjectPercentageid;
getSubjectPercentage(id){
    this.getSubjectPercentageid=id;
    console.log("event from tq: ", id);
    console.log("Selected test ID: ", this.getSubjectPercentageid);
    sessionStorage.setItem("questionsView", this.getSubjectPercentageid);
    this.router.navigate(['/student/testsubmit',id])
  }

  goBack(){
    this._location.back();
  }

}
