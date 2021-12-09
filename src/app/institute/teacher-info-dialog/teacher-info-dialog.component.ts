import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstituteService } from 'src/app/services/institute.service';


@Component({
  selector: 'app-teacher-info-dialog',
  templateUrl: './teacher-info-dialog.component.html',
  styleUrls: ['./teacher-info-dialog.component.css']
})
export class TeacherInfoDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<TeacherInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private institute:InstituteService,private snackbar:MatSnackBar) { }

  public title : any ;
  public teacherInfo : any= {
    instiId : sessionStorage.getItem('userid'),
    userId : null,
    teacherName : null,
    subject : null,
    exp : null
  }
  public teacherDetails : any ;
  public Teachers : any = [];
  isForEdit : boolean = false;

  ngOnInit(): void {
    this.institute.getTeachers()
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.Teachers = data;
      }
    );
    console.log(this.data);
    if(this.data){
      this.isForEdit = true;
      this.title = "Edit Teacher";
      this.setData(this.data);
    }else{
      this.title = "Add Teacher";
    }
  }

  setData(teacher?:any){
    this.teacherInfo.teacherName = teacher.teacherName;
    this.teacherInfo.exp = teacher.exp;
  }

  onSelectTeacher(){
    console.log(this.teacherDetails);
    this.teacherInfo.userId = this.teacherDetails.userId;
    this.teacherInfo.teacherName = this.teacherDetails.userName;
  }

  addTeacher(){
    this.institute.addTeachers(this.teacherInfo)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status){
          this.onNoClick();
          this.snackbar.open("Teacher added succesfully",'close');
        }else{
          this.snackbar.open("Some problem adding teacher",'close')
        }
      }
    );
  }

  deleteTeacher(i){
    console.log("service not given");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
