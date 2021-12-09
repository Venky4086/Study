import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discusiionboard-accuracy',
  templateUrl: './discusiionboard-accuracy.component.html',
  styleUrls: ['./discusiionboard-accuracy.component.css']
})
export class DiscusiionboardAccuracyComponent implements OnInit {
  userId: any;
  discussAccuracy: any=[];
  tableDiscussions: any=[];

  constructor(private _location:Location, private router:Router, private student:StudentService) { }

  ngOnInit(): void {
      this.userId = sessionStorage.getItem("userid");
      this.student.getQuestionsByUser(this.userId).subscribe(
        data =>{
          console.log(data);
          this.discussAccuracy = data;

          this.tableDiscussions = this.discussAccuracy.discussionData;
        }
      )

  }
  detailedDiscussions(dQid){
    this.router.navigate(['student/forum',dQid]);
  }

  goBack(){
    this._location.back();
  }

  

}
