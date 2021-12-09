import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-practice-maths-accuracy',
  templateUrl: './practice-maths-accuracy.component.html',
  styleUrls: ['./practice-maths-accuracy.component.css']
})
export class PracticeMathsAccuracyComponent implements OnInit {
  subjectId:any;
  userId:any;
  AllPractiseQns:any = [];
  QuestionDetails:any =[];
  subjectName:any;
  standard: any;
  topicName: any;
  // topicName: any;

  constructor(private _location:Location, private student: StudentService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.subjectId);
    console.log(this.route.snapshot.params.subject);
    // console.log(this.route.snapshot.params.topic);
    this.standard=this.route.snapshot.params.standard;
    this.subjectName=this.route.snapshot.params.subject;
    this.subjectId=this.route.snapshot.params.subjectId;
    this.topicName=this.route.snapshot.params.topic;

    this.userId=sessionStorage.getItem('userid');
  
    this.student.getAllPractiseQns(this.subjectId,this.userId).subscribe(
      data =>{
        console.log(data);
        this.AllPractiseQns = data;
        this.QuestionDetails = this.AllPractiseQns.historyPojo;
        
      }
    )

}
event;
getAllPractiseQnsid;
getAllPractiseQns(id){
    this.getAllPractiseQnsid=id;
    sessionStorage.setItem("questionsView", this.getAllPractiseQnsid);
    this.router.navigate(['student/practise-question',id]);
    sessionStorage.setItem('subjectName',this.route.snapshot.params.subject);
  }

  goBack(){
    this._location.back();
  }


}
