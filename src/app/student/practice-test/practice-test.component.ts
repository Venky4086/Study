import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TestPractise } from 'src/app/models/test-practise';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-practice-test',
  templateUrl: './practice-test.component.html',
  styleUrls: ['./practice-test.component.css']
})
export class PracticeTestComponent implements OnInit {

  submitted = false;
  checked: boolean = false;
  standardName: any;
  subjectName: any;
  topicName: any;
  toggleBool: boolean=true;
  testPractise:TestPractise={};
  constructor(private _location:Location, private student:StudentService,private router : Router,private formBuilder: FormBuilder,private toastr:MatSnackBar) { }

  ngOnInit(): void {
    this.standardName = sessionStorage.getItem('selectedStandard');
    this.subjectName = sessionStorage.getItem('selectedSubject');
    this.topicName = sessionStorage.getItem('topicName');

  }
  checkforqs(){
    this.standardName = sessionStorage.getItem('standardName');
    this.subjectName = sessionStorage.getItem('subjectName');
    this.topicName = sessionStorage.getItem('topicName');  

    this.testPractise.standardId=sessionStorage.getItem('standardId');
    this.testPractise.subjectId=sessionStorage.getItem('subjectId');
    this.testPractise.topicId=sessionStorage.getItem('topicId');
    this.testPractise.userId=sessionStorage.getItem('userid');
    console.log(this.testPractise);
    this.student.getTestQuestions(this.testPractise).subscribe(
      (data:any)=>{
        console.log(data);
        console.log(data.questions.length);
        if(data.questions.length){
          this.router.navigate(['/student/test-instruction']);
          // this.router.navigate(['/terms']);
        }
        else{
          this.toastr.open("No questions exist",'close',{duration: 3000});
        }
      },
      (err:any)=>{
        console.log(err);
        if(err.error.message =='points are not available to take test'){
          this.toastr.open(err.error.message,'close',{duration: 3000});
        }
        else{
          console.log(err);
          this.toastr.open('No Questions Exist','close',{duration: 3000});
        }
      }
    )
  }

  goToStandards(){
    this.router.navigate(['/study'])
  }
  
  goToTopics(){
    this._location.back();
  }

  goBack(){
    this._location.back();
  }


}
