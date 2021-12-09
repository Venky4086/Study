import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-challenge-accuracy',
  templateUrl: './challenge-accuracy.component.html',
  styleUrls: ['./challenge-accuracy.component.css']
})
export class ChallengeAccuracyComponent implements OnInit {
  subjectName:any;
  standard:any;
  AllPractiseQns : any;
  challengeInfo : any;
  QuestionDetails : any;

  constructor(private _location:Location, private student:StudentService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.student.getChallengeAccuracy(this.route.snapshot.params.subjectId,sessionStorage.getItem('userid')).subscribe(
      (data:any)=>{
        console.log(data);
        this.challengeInfo = data;
        this.QuestionDetails = data.historyPojo;
      }
    );
  }

  getchallengeInfo(id){
    sessionStorage.setItem("questionsView", id);
    this.router.navigate(['student/dc-report',id]);
  }

  goBack(){
    this._location.back();
  }

}
