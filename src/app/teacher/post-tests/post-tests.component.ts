import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { PostTestsDialogComponent } from '../post-tests-dialog/post-tests-dialog.component';

@Component({
  selector: 'app-post-tests',
  templateUrl: './post-tests.component.html',
  styleUrls: ['./post-tests.component.css']
})
export class PostTestsComponent implements OnInit {

  Questions=[];
  question:any;
  showForm:boolean=false;
  standards = [];
  subjects = [];
  topics = [];
  Tests=[];
  standard:any='';
  subject:any='';
  topic:any='';
  isEditable = true;
  testForm : FormGroup;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private student:StudentService,private teacher:TeacherService,private dialog:MatDialog) {  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnInit() {
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
    this.getTestsByItId();
    this.student.getStandards()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.standards=data;
      }
    );
  }

  openDialog(teacher?:any): void {
    const dialogRef = this.dialog.open(PostTestsDialogComponent, {
      width: '950px',
      height:'600px',
      data: teacher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      this.getTestsByItId();
    });
  }

  fetchSubejcts(){
    console.log(this.testForm.value)
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

  getTestsByItId(){
    this.teacher.getPostTestsByITId(5,4)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Tests = data;
      }
    );
  }

  addTestForm(){
    console.log(this.testForm.value);
    this.teacher.addTest(this.testForm.value)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          // this.toastr.successToastr("added successfully");
          this.stepper.next();
        }
      }
    );
  }

  ViewOrEditAssignment(id){
    this.openDialog(id);
  }

  addQuestion(){
    this.Questions.push(this.question);
    console.log(this.Questions);
    this.question='';
  }

  deleteQuestion(i){
    this.Questions.splice(i,1);
  }

}
