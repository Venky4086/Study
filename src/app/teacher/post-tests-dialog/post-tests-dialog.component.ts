import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-post-tests-dialog',
  templateUrl: './post-tests-dialog.component.html',
  styleUrls: ['./post-tests-dialog.component.css']
})
export class PostTestsDialogComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  constructor( public dialogRef: MatDialogRef<PostTestsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private student:StudentService,private teacher:TeacherService) { }

  public title : any ;
  public teacherInfo : any= {
    instiId : 16,
    teacherId : null,
    teacherName : null,
    subject : null,
    exp : null
  }
  public teacherDetails : any ;
  public Teachers : any = [];
  isForEdit : boolean = false;
  testForm : FormGroup;
  standards = [];
  subjects = [];
  topics = [];
  testInfo : any;
  Questions=[];
  question: any;
  QuestionData: FormGroup;
  isEditable :boolean;
  postTest : boolean = false;

  ngOnInit(): void {
    console.log(this.data)
    this.QuestionData = new FormGroup({
      question:new FormControl('',Validators.required),
      correctOption:new FormControl('',Validators.required),
      option_A:new FormControl('',Validators.required),
      option_B:new FormControl('',Validators.required),
      option_C:new FormControl('',Validators.required),
      option_D:new FormControl('',Validators.required),
      testIdfk:new FormControl(this.data,Validators.required),
      tqId:new FormControl(0,Validators.required)
    });
    if(this.data){
      console.log("edit");
      this.isForEdit = true;
      this.isEditable = true;
      this.teacher.getTestById(this.data)
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.testInfo = data;
          this.Questions = data['Test Questions'];
          console.log(data['Post Test Info'].noOfQuestions);
          console.log(data['Test Questions'].length);
          if(data['Post Test Info'].noOfQuestions != data['Test Questions'].length){
            this.postTest = true;
          }
          console.log(this.Questions)
          this.student.getSubjectsById(data['Post Test Info'].stdId)
          .subscribe(
            (data:any)=>{
              this.subjects=data;
            }
          );
          this.student.getTopicById(data['Post Test Info'].stdId,data['Post Test Info'].subjectId)
          .subscribe(
            (data:any)=>{
              this.topics=data;
            }
          );
          this.testForm = new FormGroup({
            title:new FormControl(data['Post Test Info'].title,Validators.required),
            stdId:new FormControl(data['Post Test Info'].stdId,Validators.required),
            subjectId:new FormControl(data['Post Test Info'].subjectId,Validators.required),
            topic:new FormControl(data['Post Test Info'].topic,Validators.required),
            section:new FormControl(data['Post Test Info'].section,Validators.required),
            noOfQuestions:new FormControl(data['Post Test Info'].noOfQuestions,Validators.required),
            marks:new FormControl(data['Post Test Info'].marks,Validators.required),
            startDate:new FormControl(data['Post Test Info'].startDate,Validators.required),
            endDate:new FormControl(data['Post Test Info'].endDate,Validators.required),
            teacherIdFk:new FormControl(sessionStorage.getItem('userid'),Validators.required),
            instiIdFk:new FormControl(5,Validators.required)
          });
        }
      );
    }
    else
    {
      this.isEditable = true;
      console.log("add");
      this.postTest = true;
    }
    this.testForm = new FormGroup({
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
      instiIdFk:new FormControl(5,Validators.required)
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
    console.log(this.testForm.value);
    this.student.getSubjectsById(this.testForm.get('stdId').value)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.subjects=data;
      }
    );
  }

  fetchTopics(){
    this.student.getTopicById(this.testForm.get('stdId').value,this.testForm.get('subjectId').value)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.topics=data;
      }
    );
  }

  addTest(){
    console.log(this.testForm.value);
    this.teacher.addTest(this.testForm.value)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          // this.toastr.successToastr("Added Successfully");
          this.stepper.next();
        }else{
          // this.toastr.errorToastr("Something went wrong")
        }
      }
    );
  }

  addQuestion(){
    console.log(this.QuestionData.value);
    this.teacher.addTestQuestions(this.QuestionData.value)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          // this.toastr.successToastr("Question Added");
          this.teacher.getTestById(this.data)
          .subscribe(
            (data:any)=>{
              this.Questions = data['Test Questions'];
              if(data['Post Test Info'].noOfQuestions != data['Test Questions'].length){
                this.postTest = true;
              }
            }
          );
        }else{
          // this.toastr.errorToastr("Something went wrong")
        }
      }
    );
  }

  hitOption(i){
    console.log(i);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
