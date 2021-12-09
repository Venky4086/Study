import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-test-submit',
  templateUrl: './test-submit.component.html',
  styleUrls: ['./test-submit.component.css']
})
export class TestSubmitComponent implements OnInit {

  name = 'Angular';
  result:any;
  sptrId: any;
  standardId:any;
  subjectId:any;
  topicId:any;
  userId:any;
  standardsubtopicId: string;
  visibleIndex=-1;
  testReport= {
    info:[],
    result:'',
    attempted:'',
    notAttempted:'',
    testDurationInMin:0
  };
  questions=[];
  correct:any;
  wrong:any;
  attempts: any;
  standardName: any;
  subjectName: any;
  topicName: any;
  solndiv: any;

  constructor(private _location:Location, private route:ActivatedRoute,private student:StudentService,private router:Router) { 
    // window.location.hash="no-back-button";
    // window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
    // window.onhashchange=function()
    // {window.location.hash="no-back-button";}
    

  }

  ngOnInit(): void {
  
    console.log(this.route.snapshot.params.sptrId);
    this.sptrId=this.route.snapshot.params.sptrId;
    this.standardId=sessionStorage.getItem('standardId');
    this.standardName=sessionStorage.getItem('standardName');
    this.subjectId=sessionStorage.getItem('subjectId');
    this.subjectName=sessionStorage.getItem('subjectName');
    this.topicId=sessionStorage.getItem('topicId');
    this.topicName=sessionStorage.getItem('topicName');
    this.userId=sessionStorage.getItem('userid');
    console.log(this.standardId,this.subjectId,this.topicId,this.userId,this.sptrId);
    this.student.dashboardReport(this.sptrId).subscribe(
      (data:any)=>{
        console.log(data);
        this.testReport=data;
        this.questions=this.testReport.info;
        this.attempts=this.testReport.attempted;
        this.correct=this.testReport.result[1];
        this.wrong=this.attempts-this.correct;
      }
    );
  }

  showSol(ind){
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
    this.solndiv=!this.solndiv; 
  }
  

  goToStandards(){
    this.router.navigate(['student/study']);
  }

  goToSubjects(){
    this.router.navigate(['student/study']);
  }

  goToTopics(){
    this.router.navigate(['student/topic']);
  }


  goBack(){
    this._location.back();
  }


}
