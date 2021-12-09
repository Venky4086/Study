import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-student-info-dialog',
  templateUrl: './student-info-dialog.component.html',
  styleUrls: ['./student-info-dialog.component.css']
})
export class StudentInfoDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<StudentInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private institute:InstituteService,private snackbar:MatSnackBar) { }

  public title : any ;
  public studentInfo : any= {
    instiId : sessionStorage.getItem('userid'),
    userId : null,
    studentName : null,
    standard : null,
    section : null,
  }
  public studentDetails : any ;
  public Students : any = [];
  isForEdit : boolean = false;

  ngOnInit(): void {
    this.institute.getStudents()
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.Students = data;
      }
    );
    if(this.data){
      this.isForEdit = true;
      this.title = "Edit student";
      this.setData(this.data);
    }else{
      this.title = "Add student";
    }
  }

  setData(student?:any){
    this.studentInfo.studentName = student.studentName;
    this.studentInfo.section = student.section;
    this.studentInfo.standard = student.standard;
  }

  onSelectstudent(){
    console.log(this.studentDetails);
    this.studentInfo.userId = this.studentDetails.userId;
    this.studentInfo.studentName = this.studentDetails.userName;
  }

  addstudent(){
    this.institute.addStudents(this.studentInfo)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status){
          this.onNoClick();
          this.snackbar.open("student added succesfully",'close');
        }else{
          this.snackbar.open("Some problem adding student",'close')
        }
      }
    );
  }

  deletestudent(i){
    console.log("service not given");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
