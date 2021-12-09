import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})
export class PractiseComponent implements OnInit {

  
  pageno:any;
  pagesize:any;
  standardId: any;
  subjectId: any;
  topicId: any;
  standardName: any;
  subjectName: any;
  topicName: any;
  submition:boolean;
  studsTagDTO = []
  qDetailsId: any;
  fetchedQuestions=[];
  userId: string;
  usertype: string;
  static:boolean=false;
  

  constructor(private _location:Location, private student: StudentService, private router: Router,private route: ActivatedRoute) { }
 
  ngOnInit(){
    this.standardId=sessionStorage.getItem('standardId');
    this.standardName=sessionStorage.getItem('standardName');
    this.subjectId=sessionStorage.getItem('subjectId');
    this.subjectName=sessionStorage.getItem('subjectName');
    this.topicId=sessionStorage.getItem('topicId');
    this.topicName=sessionStorage.getItem('topicName');
    this.userId=sessionStorage.getItem("userid");
    this.usertype="PC";
    console.log(this.qDetailsId);
    

    console.log("studstag details");
    this.pageno=0;
    this.pagesize=10;

    this.student.practise(this.standardId,this.subjectId,this.topicId,this.pageno,this.pagesize).subscribe(
      res => {
        console.log("data fetched from db.", res);
        console.log(this.fetchedQuestions.length);
        this.fetchedQuestions = res;
        if(this.fetchedQuestions.length == 0){
          // this.toastr.warningToastr('No questions to show' , null, {position: 'top-center'}); 
          this.static=true;
        }else{
          this.static=false;
        }
      },
      (error:any) => {
        console.log(error);
        console.log(error.status);
       
        if(error.status==500){
          // this.toastr.warningToastr(error.status + ' - Internal Server Error');
        }
        
  
      }
    )
    
    
  }

  event;
  practiseid;
  practise(id){
    this.practiseid=id;
    console.log("event from pq: ", id);
    console.log("Selected Question ID: ", this.practiseid);
    sessionStorage.setItem("questionsView", this.practiseid);
    this.router.navigate(['student/practise-question',id]);
  }

  next(){
    ++this.pageno;
    console.log(this.pageno);
    this.student.practise(this.standardId,this.subjectId,this.topicId,this.pageno,this.pagesize).subscribe(
      res => {
        console.log("data fetched from db.", res);
        this.fetchedQuestions = res;
      },
      err => console.log("Error occured while retriving, ", err)
    )
  }

  prev(){
    --this.pageno;
    console.log(this.pageno);
    this.student.practise(this.standardId,this.subjectId,this.topicId,this.pageno,this.pagesize).subscribe(
      res => {
        console.log("data fetched from db.", res);
        this.fetchedQuestions = res;
      },
      err => console.log("Error occured while retriving, ", err)
    )
  }
 
  

  goToStandards(){
    this.router.navigate(['student/study']);
  }

  goToSubjects(){
    this.router.navigate(['student/study']);
  }

  goToTopics(){
    this.router.navigate(['student/topics',sessionStorage.getItem('selectedStandardId'),sessionStorage.getItem('selectedSubjectId'),sessionStorage.getItem('selectedStandard'),sessionStorage.getItem('selectedSubject')])
  }

  goBack(){
    this._location.back();
  }


}
