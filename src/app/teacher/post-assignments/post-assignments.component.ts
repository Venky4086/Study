import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';
import { PostAssignmentsDialogComponent } from '../post-assignments-dialog/post-assignments-dialog.component';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-post-assignments',
  templateUrl: './post-assignments.component.html',
  styleUrls: ['./post-assignments.component.css']
})
export class PostAssignmentsComponent implements OnInit {

  Questions=[];
  question:any;
  showForm:boolean=false;
  standards = [];
  subjects = [];
  topics = [];
  assignments=[];
  standard:any='';
  subject:any='';
  topic:any='';
  isEditable = true;
  assignmentForm : FormGroup ;

  // FILTER variables
  institute : any;
  Teachers : any;
  teacher : any;
  Standards : any;
  filterStandard : any;
  Subjects :any;
  filterSubject : any;
  // boolean to check filters
  // filterApplied : boolean = false;
  uncompletedAssignments = [];
  expiredAssignments = [];
  filterApplied : boolean = false;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private teacherservice:TeacherService,private student: StudentService,private dialog:MatDialog) {  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnInit() {
    this.getAssignments();
    this.getAllTeachers();
    this.getAllStandards();
  }

  styleObject(sub): Object {
    if (sub == 'Mathematics'){
        return {background : "#80000026 "}
    }
    if (sub == 'Physics'){
      return {background : "#3a13b326"}
    }
    if (sub == 'Chemistry'){
      return {background : "#00ffff26"}
    }
  }

  openDialog(teacher?:any): void {
    const dialogRef = this.dialog.open(PostAssignmentsDialogComponent, {
      width: '950px',
      height:'600px',
      data: teacher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      this.getAssignments();
    });
  }

  getAssignments(){
    this.teacherservice.getAssignmentsByInstituteTeacher(sessionStorage.getItem('InstituteId'),sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.assignments=data.reverse();
        this.filterApplied = false;
      }
    );
    this.teacherservice.getUncompletedAssignments(sessionStorage.getItem('InstituteId'),sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.uncompletedAssignments=data;
        this.filterApplied = false;
      }
    );
    this.teacherservice.getExpiredAssignments(sessionStorage.getItem('InstituteId'),sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.expiredAssignments = data;
        console.log(this.expiredAssignments);
        this.filterApplied = false;
      }
    );
  }

  getAllTeachers(){
    this.teacherservice.getTeachers()
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.Teachers = data;
      }
    );
  }

  getAllStandards(){
    this.student.getStandards()
    .subscribe(
      (data:any)=>{
        this.Standards = data;
        console.log(data)
      }
    );
  }

  filterBy(value){
    console.log(value);
    if(this.filterStandard){
      this.student.getSubjectsById(this.filterStandard)
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.Subjects = data;
        }
      );
    }
  }

  filterAssignments(){
    if(!this.teacher || !this.filterStandard || !this.filterSubject){
      // this.toastr.warningToastr("please select missing fields");
    }else{
      this.teacherservice.getAssignmentsByITSS('5',this.teacher,this.filterSubject,this.filterStandard)
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.assignments = data;
        this.filterApplied = true;
      }
    );
    }
  }

  clearFilters(){
    this.teacher = '';
    this.filterStandard = '';
    this.filterSubject = '';
    this.getAssignments();
  }

  ViewOrEditAssignment(id){
    this.openDialog(id);
  }

  addQuestion(){
    this.Questions.push(this.question);
    console.log(this.Questions);
    this.question='';
  }


}
