import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestPractise } from 'src/app/models/test-practise';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  showMyContainer=-1;
  alert:boolean=false;
  testPractise:TestPractise={};
  TestQuestions = <any>[];
  isCorrect: boolean = false;
  preRec=300;
  timeLeft: number = 300;
  individualTimer:number=0;
  finalInterval;
  indInterval;
  testPayload: any;
  TotalQuestions: any;
  questions: any[];
  public question:Array<any>=[];
  i: number=0;
  prevButton: boolean;
  nextButton:boolean;
  userChoice={};
  duration:any;
  answers=[];
  trackStatus=[];
  matchedIndex:any;
  matchedTimeId:any;
  sptrId: any;
  standardName: any;
  subjectName: any;
  topicName: any;
  hideTime:boolean=true;

  constructor(private route : Router, private student: StudentService) {
    // window.location.hash="no-back-button";
    // window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
  //   window.onhashchange=function()
  //   {window.location.hash="no-back-button";}
   }

  ngOnInit() {
      // disable refresh button in key f5 eyboard
    window.addEventListener("keyup", disableF5);

    window.addEventListener("keydown", disableF5);
    function disableF5(e) {

     if ((e.which || e.keyCode) == 116) e.preventDefault(); 

  };
    
    this.standardName = sessionStorage.getItem('standardName');
    this.subjectName = sessionStorage.getItem('subjectName');
    this.topicName = sessionStorage.getItem('topicName');
    if(this.i==1){ 
      this.prevButton=true;
    }
    this.start();
    console.log(sessionStorage.getItem('questionsTopic'));
    this.testPayload=sessionStorage.getItem('questionsTopic')
    this.testPractise.standardId=sessionStorage.getItem('standardId');
    this.testPractise.subjectId=sessionStorage.getItem('subjectId');
    this.testPractise.topicId=sessionStorage.getItem('topicId');
    this.testPractise.userId=sessionStorage.getItem('userid');
    this.student.getTestQuestions(this.testPractise)
    .subscribe(
      data=>
      {
        console.log("Data from service",data);
        this.TestQuestions=data;
        this.questions=this.TestQuestions.questions;
        console.log("questions",this.questions);
        for(var question of this.questions){
          this.answers.push({'qId':question.qId,'userAns':'','durationInSec':0});
          this.trackStatus.push({'id':question.sequenceNor,'qId':question.qId,'visited':false,'userAns':'','review':0})
        }
        console.log("On intialize answers",this.answers);
        console.log("On intialize trackStatus",this.trackStatus);
        this.TotalQuestions=this.TestQuestions.questions.length;
        this.question.push(this.questions[0]);
        this.trackStatus[0].visited=true;
      }
    );
  }

  start() {
    this.startTimer();
    this.startIndividualTimer();
  }

 startTimer() {
  //  ALL TIMER
   this.finalInterval = setInterval(() => {
     if(this.timeLeft===0){
      this.submitTest(this.question[0].qId);
    }
     if (this.timeLeft >=1) {
       this.timeLeft--;
     } else {
       this.timeLeft = 300;
     }
   }, 1000)
 }

 startIndividualTimer(){
    clearInterval(this.indInterval);
  //  INDIVIDUAL TIMER
  this.individualTimer=0;
  console.log("individual time",this.individualTimer);
  this.indInterval = setInterval(() => {
  if(this.individualTimer < 300) {
    this.individualTimer++;
  } else {
    this.individualTimer = 0;
  }
},1000)
}

 prev(qId,sequenceNor){
  console.log(this.userChoice);
  console.log(qId,sequenceNor);
  this.matchedTimeId = this.answers.findIndex(function(obj){return obj.qId === qId});
  console.log("Time to be pushed",this.individualTimer);
  if(this.answers[this.matchedTimeId].durationInSec==0){
    this.answers[this.matchedTimeId].durationInSec = this.individualTimer;
  }else{
    const prevTime=this.answers[this.matchedTimeId].durationInSec;
    let TotalIndTime=prevTime+this.individualTimer;
    this.answers[this.matchedTimeId].durationInSec = TotalIndTime;
  }
  console.log(this.answers);
  this.startIndividualTimer();
   console.log(this.i);
   --this.i;   
   console.log("prev i",this.i);
   if(this.i==0){
    this.prevButton=true;
  }else{
    this.prevButton=false;
    this.nextButton=false;
  }
   this.question=[];
  this.question.push(this.questions[this.i]);
  console.log(this.question);
  }

 next(qId,sequenceNor){
   console.log(this.userChoice);
   console.log(qId,sequenceNor);
   this.matchedTimeId = this.answers.findIndex(function(obj){return obj.qId === qId});
   console.log("Time to be pushed",this.individualTimer,this.answers[this.matchedTimeId].durationInSec);
   if(this.answers[this.matchedTimeId].durationInSec==0){
      this.answers[this.matchedTimeId].durationInSec = this.individualTimer;
    }else{
      const prevTime=this.answers[this.matchedTimeId].durationInSec;
      let TotalIndTime=prevTime+this.individualTimer;
      this.answers[this.matchedTimeId].durationInSec = TotalIndTime;
    }
   console.log(this.answers);
   this.startIndividualTimer();
   ++this.i;
   console.log("next i",this.i);
   this.trackStatus[this.i].visited=true;
   if(this.i==this.questions.length-1){
    this.nextButton=true;
    this.prevButton=false;
  }else{
    this.nextButton=false;
    this.prevButton=false;
  }
   this.question=[];
   this.question.push(this.questions[this.i]);
   console.log(this.question);
 }

 checkIndex(element) {
  return element.label == this.question[0].qId;
}

 getQuestion(i){
   --i;
   this.i=i;
   this.trackStatus[i].visited=true;
   if(this.i==0){
    this.prevButton=true;
  }else{
    this.prevButton=false;
    this.nextButton=false;
  }
  if(this.i==this.questions.length-1){
    this.nextButton=true;
  }
  this.matchedTimeId = this.answers.findIndex(obj=> obj.qId === this.question[0].qId);
  console.log(this.matchedTimeId,this.answers,this.individualTimer)
  if(this.answers[this.matchedTimeId].durationInSec==0){
    this.answers[this.matchedTimeId].durationInSec = this.individualTimer;
  }else{
    const prevTime=this.answers[this.matchedTimeId].durationInSec;
    let TotalIndTime=prevTime+this.individualTimer;
    this.answers[this.matchedTimeId].durationInSec = TotalIndTime;
  }
  this.startIndividualTimer();
   console.log("button i",i);
   this.question=[];
   this.question.push(this.questions[i]);
 }

 onItemChange(index,qId,value){
   console.log("index",index);
   console.log("qId",qId);
   console.log("value",value);
   console.log(this.userChoice[qId]);
   this.matchedIndex = this.answers.findIndex(function(obj){return obj.qId === qId});
   this.answers[this.matchedIndex].qId = qId;
   this.answers[this.matchedIndex].userAns = value;
  //  this.answers[this.matchedIndex].durationInSec = 0;
  //  this.matchedIndex=this.answers.findIndex((obj => obj.qId == qId));
   this.trackStatus[this.matchedIndex].qId = qId;
   this.trackStatus[this.matchedIndex].userAns = value;
   console.log("answers",this.answers);
   console.log("trackStatus",this.trackStatus);
}
 

 trackByIndex(index: number): any {
  return index;
}

getColor(){
  let done=true;
  return done ? 'primary' : 'danger';
}

clear(id,qId){
  this.userChoice[qId]="";
  console.log("clearence",this.userChoice);
  this.trackStatus[id-1].userAns="";
  this.answers[id-1].userAns="";
  console.log("check for clearence",this.trackStatus);
}

Review(id){
  console.log(id);
  this.trackStatus[id-1].review=1;
  console.log("check for review",this.trackStatus);
}

closeAlert(){
  console.log("Time");
  this.alert = false;
}

submitTest(qId){
  this.hideTime=false;
  if(this.individualTimer!=0){
  this.matchedTimeId = this.answers.findIndex(function(obj){return obj.qId === qId});
   console.log("Time to be pushed",this.individualTimer);
   if(this.answers[this.matchedTimeId].durationInSec==0)
    {
      this.answers[this.matchedTimeId].durationInSec = this.individualTimer;
    }else{
      const prevTime=this.answers[this.matchedTimeId].durationInSec;
      let TotalIndTime=prevTime+this.individualTimer;
      this.answers[this.matchedTimeId].durationInSec = TotalIndTime;
    }
    var Obj={
      sptrIdFk:undefined,
      standardId:'',
      subjectId:'',
      topicId:'',
      totalQuestions:'',
      userId:'',
      testDurationInMin:0,
      testLevel:''
    };
      Obj.sptrIdFk=this.answers;
      console.log("array of questions and solutions :",Obj.sptrIdFk);
      Obj.standardId=sessionStorage.getItem('standardId');
      Obj.subjectId=sessionStorage.getItem('subjectId');
      Obj.topicId=sessionStorage.getItem('topicId');
      Obj.totalQuestions=this.TotalQuestions;
      Obj.testLevel='';
      Obj.testDurationInMin=300-this.timeLeft;
      Obj.userId=sessionStorage.getItem('userid');
      console.log('Final payload Obj',Obj);
  
      this.student.submitUserAns(Obj)
      .subscribe(
        data=>
        {
          console.log(data);
          this.sptrId=data.sptrId;
          this.route.navigate(['student/testsubmit',this.sptrId])
        }
      );
  }
  
}

ngOnDestroy() {
  if (this.finalInterval) {
    clearInterval(this.finalInterval);
  }
}


}
