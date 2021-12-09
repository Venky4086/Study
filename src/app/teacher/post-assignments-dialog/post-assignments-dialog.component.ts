import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-post-assignments-dialog',
  templateUrl: './post-assignments-dialog.component.html',
  styleUrls: ['./post-assignments-dialog.component.css']
})
export class PostAssignmentsDialogComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  constructor( public dialogRef: MatDialogRef<PostAssignmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private teacherservice:TeacherService,private student:StudentService,private snackbar:MatSnackBar) { }

  public title : any ;
  public teacherInfo : any= {
    instiId : 16,
    teacherId : null,
    teacherName : null,
    subject : null,
    exp : null
  }
  generatedId : any ;
  public teacherDetails : any ;
  public Teachers : any = [];
  isForEdit : boolean = false;
  assignmentForm : FormGroup;
  standards = [];
  subjects = [];
  topics = [];
  assignmentInfo : any;
  Questions = [];
  question: any;
  isEditable :boolean;
  postAssignment : boolean =false;
  reviewAssignment : any;
  notFulFilled : boolean =true;

  ngOnInit(): void {
    console.log(this.data)
    if(this.data){
      this.teacherservice.getAssignmentById(this.data,sessionStorage.getItem('userid')).subscribe(
        (data:any)=>{
          this.reviewAssignment = data;
        }
      );
      console.log("edit");
      this.isForEdit = true;
      this.isEditable = true;
      this.teacherservice.getAssignmentById(this.data,sessionStorage.getItem('userid'))
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.assignmentInfo = data;
          if(data.assignmentInfo.noOfQuestions != data.questions.length){
            this.postAssignment = true;
          }
          this.student.getSubjectsById(data.assignmentInfo.stdId)
          .subscribe(
            (data:any)=>{
              this.subjects=data;
            }
          );
          this.student.getTopicById(data.assignmentInfo.stdId,data.assignmentInfo.subjectId)
          .subscribe(
            (data:any)=>{
              this.topics=data;
            }
          );
          this.assignmentForm = new FormGroup({
            aid:new FormControl(data.assignmentInfo.aid,Validators.required),
            title:new FormControl(data.assignmentInfo.title,Validators.required),
            stdId:new FormControl(data.assignmentInfo.stdId,Validators.required),
            subjectId:new FormControl(data.assignmentInfo.subjectId,Validators.required),
            topic:new FormControl(data.assignmentInfo.topic,Validators.required),
            section:new FormControl(data.assignmentInfo.section,Validators.required),
            noOfQuestions:new FormControl(data.assignmentInfo.noOfQuestions,Validators.required),
            marks:new FormControl(data.assignmentInfo.marks,Validators.required),
            startDate:new FormControl(data.assignmentInfo.startDate,Validators.required),
            endDate:new FormControl(data.assignmentInfo.endDate,Validators.required),
            teacherIdFk:new FormControl(sessionStorage.getItem('userid'),Validators.required),
            instiIdFk:new FormControl(sessionStorage.getItem('InstituteId'),Validators.required)
          });
          this.Questions = data.questions;
          if(data.questions.length == data.assignmentInfo.noOfQuestions){
            this.notFulFilled = false;
          }else{
            this.notFulFilled = true;
          }
        }
      );
    }
    else
    {
      console.log("add");
    }
    this.assignmentForm = new FormGroup({
      title:new FormControl('',Validators.required),
      stdId:new FormControl('',Validators.required),
      subjectId:new FormControl('',Validators.required),
      topic:new FormControl('',Validators.required),
      section:new FormControl('',Validators.required),
      noOfQuestions:new FormControl('',Validators.required),
      marks:new FormControl('',Validators.required),
      startDate:new FormControl('',Validators.required),
      endDate:new FormControl('',Validators.required),
      teacherIdFk:new FormControl(sessionStorage.getItem('userid'),Validators.required),
      instiIdFk:new FormControl(sessionStorage.getItem('InstituteId'),Validators.required)
    });
    this.student.getStandards()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.standards=data;
      }
    );
  }

  fetchSubjects(){
    console.log(this.assignmentForm.value);
    this.student.getSubjectsById(this.assignmentForm.get('stdId').value)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.subjects=data;
      }
    );
  }

  fetchTopics(){
    this.student.getTopicById(this.assignmentForm.get('stdId').value,this.assignmentForm.get('subjectId').value)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.topics=data;
      }
    );
  }

  addAssignment(){
    // this.teacherservice.addAssignment()
  }

  addorUpdateAssignment(){
    console.log(this.assignmentForm.value);
    if(this.isForEdit){
      this.teacherservice.addAssignment(this.assignmentForm.value)
      .subscribe(
        (data:any)=>{
          console.log(data);
          if(data.status){
            this.snackbar.open('Updated successfully','close',{duration: 3000});
            this.dialogRef.close();
          }else{
            this.snackbar.open('Something went wrong','close',{duration: 3000});
          }
        }
      );
    }else{
    this.teacherservice.addAssignment(this.assignmentForm.value)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.id){
          this.generatedId = data.id
          this.snackbar.open("Added Successfully",'close',{duration: 3000});
          this.stepper.next();
        }else{
          this.snackbar.open("Something went wrong",'close',{duration: 3000})
        }
      }
    );
    } 
  }

  getAssignmentInfo(){
    if(this.data){
      this.generatedId = this.data;
    }
    this.teacherservice.getAssignmentById(this.generatedId,sessionStorage.getItem('userid')).subscribe(
      (data:any)=>{
        console.log(data);
        this.reviewAssignment = data;
        if(data.assignmentInfo.noOfQuestions == data.questions.length){
          this.notFulFilled = false;
          console.log(this.notFulFilled)
        }
      }
    );
  }

  addQuestion(){
    let question = {
      // "aqId":0,	
      "assignmentIdfk":this.generatedId,
      "question":this.question
    }
    this.teacherservice.addAssignmentQuestions(question)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.snackbar.open("Question Added",'close',{duration: 3000});
          this.teacherservice.getAssignmentById(this.generatedId,sessionStorage.getItem('userid'))
          .subscribe(
            (data:any)=>{
              this.Questions = data.questions;
              if(data.assignmentInfo.noOfQuestions != data.questions.length){
                this.postAssignment = true;
              }
            }
          );
          this.question = "";
        }else{
          this.snackbar.open("Something went wrong",'close',{duration:3000})
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  publishAssignment(i){
    console.log(i.assignmentInfo);
    let payload ={
      "aid": i.assignmentInfo.aid,
      "endDate": i.assignmentInfo.endDate,
      "instiIdFk": i.assignmentInfo.instiIdFk,
      "marks": i.assignmentInfo.marks,
      "noOfQuestions": i.assignmentInfo.noOfQuestions,
      "section": i.assignmentInfo.section,
      "startDate": i.assignmentInfo.startDate,
      "stdId": i.assignmentInfo.stdId,
      "subjectId": i.assignmentInfo.subjectId,
      "teacherIdFk": i.assignmentInfo.teacherIdFk,
      "title": i.assignmentInfo.title,
      "topic": i.assignmentInfo.topic
    };
    this.teacherservice.rolloutAssignment(payload).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.snackbar.open('Assignment published','close',{duration: 3000});
          this.dialogRef.close();
        }
      }
    );
  }

}
