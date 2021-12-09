import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TestPractise } from 'src/app/models/test-practise';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  standardName:any;
  subjectName:any;
  fetchedTopics:any;
  checking:any;
  topicTriggered:boolean=true;
  testPractise:TestPractise={};
  topicName: any;
  standard:any;
  subject:any;


  constructor(private _location:Location, private student:StudentService,private route:ActivatedRoute,private router:Router,private toastr:MatSnackBar) { }

  ngOnInit() { 
    this.getTopics(standardId,subjectId,this.standard,this.subject);
  }

  getTopics(standardId,subjectId,_standard,_subject){
    this.standardName = this.route.snapshot.params.standard;
    this.subjectName = this.route.snapshot.params.subject;
    if(this.route.snapshot.params.standardId && this.route.snapshot.params.subjectId){
      this.student.getTopicQuestions(this.route.snapshot.params.standardId,this.route.snapshot.params.subjectId)
      .subscribe(
        data=>
        {
          console.log(data);
          this.fetchedTopics=data;
        }
      )
    }else{
      this.standardName = sessionStorage.getItem('selectedStandard');
      this.subjectName = sessionStorage.getItem('subjectName');
      this.student.getTopicQuestions(sessionStorage.getItem('selectedStandardId'),sessionStorage.getItem('selectedSubjectId')).subscribe(
        res => {
          console.log("got the topics from db. ", res);
          this.fetchedTopics = res;
        }, 
        // err => console.log("Error occured while fetching topics from db."),
        (error:any) => {
          console.log(error);
          console.log(error.status)
          // if(error.status==500){
          //   this.toastr.warningToastr(error.status + ' - Internal Server Error');
          // }
    
        }
       
      )
    }
    
  }
  checkforqs(){
    this.standardName = sessionStorage.getItem('standardName');
    this.subjectName = sessionStorage.getItem('subjectName');
    this.topicName = sessionStorage.getItem('topicName');  

    this.testPractise.standardId=sessionStorage.getItem('standardId');
    this.testPractise.subjectId=sessionStorage.getItem('subjectId');
    this.testPractise.topicId=sessionStorage.getItem('topicId');
    this.testPractise.userId=sessionStorage.getItem('userid');
    this.student.getTestQuestions(this.testPractise).subscribe(
      (data:any)=>{
        console.log(data);
        if(data){
          // this.router.navigate(['/terms']);
        }
        else{
          // this.toastr.warningToastr("No questions exist");
        }
      }
    )
  }

  goToStandards(){
    this.router.navigate(['student/study'])
  }
  goBack(){
    this._location.back();
  }

  goToSubjects(){
    this.router.navigate(['student/study'])
  }

  practise(topicId,topic,status){
    console.log(topicId,topic)
    sessionStorage.setItem('topicId',topicId);
    sessionStorage.setItem('topicName',topic);
    sessionStorage.setItem('subjectId',this.route.snapshot.params.subjectId);
    sessionStorage.setItem('subjectName',this.route.snapshot.params.subject);
    sessionStorage.setItem('standardId',this.route.snapshot.params.standardId);
    sessionStorage.setItem('standardName',this.route.snapshot.params.standard);
    this.router.navigate(['student/p-or-t']);
    // if(status){
    //   this.router.navigate(['student/p-or-t'])
    // }else{
    //   this.toastr.open('Test not available','close',{duration: 3000})
    // }
    // this.router.navigate(['student/practice-or-test']);
   
  }

}
function subjectId(standardId: any, subjectId: any, standard: any, subject: any) {
  throw new Error('Function not implemented.');
}

function standardId(standardId: any, subjectId: (standardId: any, subjectId: any, standard: any, subject: any) => void, standard: any, subject: any) {
  throw new Error('Function not implemented.');
}

