import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  malekey : any;
  femalekey : any;

  constructor(private http:HttpClient,private student:StudentService) { }

  ngOnInit(): void {
    
  }

  save(){
    let payload : any ={
      'male_Word':this.malekey,
      'female_Word':this.femalekey,
      'createdBy':'',
      'modifiedBy':'',
      'isActive':'',
      'actionStatus':true,
      'errorMessage':'string',
      'fromDate':'date',
      'providerID':'',
      'userId':'',
      'catergoryID':'',
      'scribeID':'',
      'encounterNumber':'',
      'clientCode':'',
      'digits':'',
      'setOnOff': true,
      'departmentId':'string',
      'distributionType':''
    }
    console.log(payload);
    // In component 
    this.http.post("http://localhost:8000/post/genderkey",payload).subscribe(
      (data:any)=>{
        console.log(data);
      }
    );
    // Service layer
    this.student.postLike(payload).subscribe(
      (data:any)=>{
        console.log(data);
      }
    );
  }

  reset(){
    this.malekey='';
    this.femalekey = '';
  }

}
