import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-header',
  templateUrl: './practice-header.component.html',
  styleUrls: ['./practice-header.component.css']
})
export class PracticeHeaderComponent implements OnInit {
  isShown:boolean;
  answerLocked : boolean;
  qid : any;
  constructor(private student: StudentService) { }

  ngOnInit(): void {
    this.qid = sessionStorage.getItem('questionsView');
    this.student.getQuestionHistory(sessionStorage.getItem('questionsView'),sessionStorage.getItem('userid')).subscribe(
      (res:any) => {
        console.log("Fetched history from db: ", res);
        if(res.length === 0){
          this.answerLocked = true;
        }
      },
      err => console.log("Error occured while fetching history: ", err)
    )
  }

  }

