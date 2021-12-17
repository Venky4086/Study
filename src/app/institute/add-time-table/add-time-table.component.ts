import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstituteService } from 'src/app/services/institute.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-time-table',
  templateUrl: './add-time-table.component.html',
  styleUrls: ['./add-time-table.component.css']
})
export class AddTimeTableComponent implements OnInit {

  days : any = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  standard : any;
  standards : any;
  subjects : any;
  section : any;
  timetableForm : FormGroup;
  teachers : any ;
  monday:boolean = false;tuesday:boolean = false;wednesday:boolean = false;thursday:boolean = false;friday:boolean = false;saturday:boolean = false;
  constructor(private common:StudentService,private institute:InstituteService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getInstiTeachers();
    this.common.getStandards().subscribe(
      (data:any)=>{
        this.standards = data;
      }
    );
    this.timetableForm = new FormGroup({
      "instituteIdFK": new FormControl(sessionStorage.getItem('userid')),
      "period10_Subject": new FormControl('',Validators.required),
      "period10_Teacher": new FormControl('',Validators.required),
      "period1_Subject": new FormControl(Validators.required),
      "period1_Teacher": new FormControl(Validators.required),
      "period2_Subject": new FormControl('',Validators.required),
      "period2_Teacher": new FormControl('',Validators.required),
      "period3_Subject": new FormControl('',Validators.required),
      "period3_Teacher": new FormControl('',Validators.required),
      "period4_Subject": new FormControl('',Validators.required),
      "period4_Teacher": new FormControl('',Validators.required),
      "period5_Subject": new FormControl('',Validators.required),
      "period5_Teacher": new FormControl('',Validators.required),
      "period6_Subject": new FormControl('',Validators.required),
      "period6_Teacher": new FormControl('',Validators.required),
      "period7_Subject": new FormControl('',Validators.required),
      "period7_Teacher": new FormControl('',Validators.required),
      "period8_Subject": new FormControl('',Validators.required),
      "period8_Teacher": new FormControl('',Validators.required),
      "period9_Subject": new FormControl('',Validators.required),
      "period9_Teacher": new FormControl('',Validators.required),
      "section": new FormControl('',Validators.required),
      "standardId": new FormControl('',Validators.required),
      "weekDays": new FormControl('',Validators.required)
    });
  }

  getInstiTeachers(){
    this.institute.getTeachersByInstitute(sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.teachers=data;
      }
    );
  }

  getSubjects(){
    this.common.getSubjectsById(this.standard).subscribe(
    (data:any)=>{
      console.log(data);
      this.subjects = data;
    }
    );
  }

  addTimeTable(){
    let days : String[] = [];
    if(this.monday){
      days.push("monday");
      this.formWeekDays(days);
    }
    if(this.tuesday){
      days.push("tuesday");
      this.formWeekDays(days);
    }
    if(this.wednesday){
      days.push("wednesday");
      this.formWeekDays(days);
    }
    if(this.thursday){
      days.push("thursday");
      this.formWeekDays(days);
    }
    if(this.friday){
      days.push("friday");
      this.formWeekDays(days);
    }
    if(this.saturday){
      days.push("saturday");
      this.formWeekDays(days);
    }
    // console.log("time table",this.timetableForm.value);
    this.institute.postTimeTable(this.timetableForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.id){
          this.timetableForm.reset();
          this.snackbar.open('Time Table added successfully','close',{duration: 3000});
        }
      },(error)=>{
        console.error(error);
      });
  }

  formWeekDays(days){
    console.log(days);
    this.timetableForm.patchValue({
      weekDays : days.join(',')
    });
  }

  checkDays(eve:any){
    // console.log(eve,this.monday,this.tuesday,this.wednesday,this.thursday,this.friday,this.saturday);
  }

}
