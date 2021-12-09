import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment-timezone';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-qhistory',
  templateUrl: './qhistory.component.html',
  styleUrls: ['./qhistory.component.css']
})
export class QhistoryComponent implements OnInit {
  // today: number = Date.now();
  questionData: any;
  earlyHistory: any;
  standardName: any;
  subjectName: any;
  topicName: any;

  constructor(private _location:Location, private router : Router, private student: StudentService) { }
  questionHistoryObject:any=[];
  ngOnInit(): void {
    console.log(moment.tz.names());
    this.standardName=sessionStorage.getItem('standardName');
    this.subjectName=sessionStorage.getItem('subjectName');
    this.topicName=sessionStorage.getItem('topicName');
    let questionId=sessionStorage.getItem("questionsView");
    let userId=sessionStorage.getItem('userid');
    this.student.getQuestionById(questionId)
    .subscribe(
      data=>
      {
        console.log(data);
        this.questionData=data;
      }
    );
    this.student.getQuestionHistory(questionId,userId).subscribe(
      res => {
        console.log("Fetched history from db: ", res);
        this.questionHistoryObject = res;
        this.earlyHistory=this.questionHistoryObject.reverse();
      },
      err => console.log("Error occured while fetching history: ", err)
    )
  }
  
  pqd ;
  
  practise(events){
    console.log("Practice Description to get: ", events.target.value);
    // this.apiService.practise(events.target.value).subscribe(
    //   res => {
    //     console.log("got the description details from db. ", res);
    //     this.pqd = res;
    //   },
    //   err => console.log("Error occured while fetching description from db.")
    // )
  }

  goToQuestions(){
    this.router.navigate(['student/practise']);
  }

  goToStandards(){
    this.router.navigate(['student/study']);
  }

  goToSubjects(){
    this.router.navigate(['student/study']);
  }

  goToTopics(){
    this.router.navigate(['student/topics']);
  }


  goBack(){
    this._location.back();
  }
 
}
