import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  standards:any=[];
  images=[ "10th icon.png","9th icon.png","8th icon.png"];
  // colors=["rgb(152 110 226)","rgb(222 99 54)","rgb(58 169 134)"];
  colors=["#ab47bc","#ff9800","#8bc34a"];
  // borders=["13px solid #8359ce","13px solid rgb(212 74 22 / 53%)","13px solid #348e72"];
  borders=["13px solid #b667c3","13px solid rgb(212 74 22 / 24%)","13px solid #85af55"];
  // subColors=["radial-gradient(#ef4b82 50%, #ed1e64 50%)","#cb88cb","#f8a680"];
  // subColors=['linear-gradient(to right, #ef4b82 50%, #ed1e64 50%)',"radial-gradient(#d610cb, rgb(58 19 179 / 82%))","radial-gradient(rgb(10 113 121), cyan)"];
  subColors=["rgb(128,0,0)","radial-gradient(#0000ff, rgb(58 19 179 / 82%))","radial-gradient(rgb(10 113 121), cyan)"]

  pageBgcolors=["#ab47bc33","#f591002e","#8bc34a42"]
  // subColors=[""];
  // colors=["../../assets/azure.jpg","../../assets/class9.jpg","../../assets/class10.jpg"];rgb(0 157 108 / 72%),rgb(253 171 0 / 72%),rgb(103 58 183 / 81%)
  standardName: string;
  subjects: any=[];
  standardId: any;
  wantedStandards: any=[];
  isOpen=[false,false,false];
  fetchedTopics: any=[];
  subjectId: any;
  stName: string;
  sName: any;
  subjectName: any;
  standard: any;
  subject: any;
  selectedStandard:any;
  classes: any;

  constructor(private _location:Location, private student:StudentService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getStandards();
    // this.getSubjects(this.standardId);
    // this.getTopics(this.standardId,this.subjectId,this.standard,this.subject);
    
  }

  getStandards(){
  
    this.student.getStandards()
    .subscribe(
      data=>
      {
        // this.classes=data;
        // this.standards = this.classes.slice(2, 5);
        this.standards=data;
        // this.wantedStandards=this.standards.splice(2).reverse();
        console.log(this.standards)
        console.log(this.wantedStandards)
        // this.snackBar.open( 'Success','close',{
        //   duration:3000
        // } )
      },

      (error:any) => {
        console.log(error);
        console.log(error.status)
        if(error.status==500){
          this.snackBar.open(error.status,'close',{
          duration:3000
        })
        }
  
      }
    );
  }
  showSubjects(sid,sname,i){
    this.selectedStandard=sname;
    this.standardId = sid;
    console.log(i,sid);
    this.isOpen[i] = !this.isOpen[i];
    if(i==0){
      this.isOpen[1]=false;
      this.isOpen[2]=false;
    }
    if(i==1){
      this.isOpen[0]=false;
      this.isOpen[2]=false;
    }
    if(i==2){
      this.isOpen[0]=false;
      this.isOpen[1]=false;
    }
    this.getSubjects(sid);

  }

  
  getSubjects(standardId){
    console.log(standardId);
    sessionStorage.setItem('standard_Id',standardId);
    this.student.getSubjectsById(standardId)
    .subscribe(
      data=>
      {
        console.log(data);
        this.subjects=data;

        // this.subject=data;
        // this.subjects = this.subject.slice(0, 3);
      }
      );
    }
    
    getTopics(standardId,subjectId,standard,subject){
      sessionStorage.setItem('selectedStandardId',standardId);
      sessionStorage.setItem('selectedSubjectId',subjectId);
      sessionStorage.setItem('selectedStandard',standard);
      sessionStorage.setItem('selectedSubject',subject);
      this.router.navigate(['student/topics',standardId,subjectId,standard,subject])
      console.log(standardId,subjectId,standard,subject);
     
    }

    goToStandards(){
        this.router.navigate(['/student/study'])                                                                             
      }

 goBack(){
  this._location.back();
}
}