import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';



@Component({
  selector: 'app-daily-challenge-question-view',
  templateUrl: './daily-challenge-question-view.component.html',
  styleUrls: ['./daily-challenge-question-view.component.css']
})
export class DialyChallengeQuestionViewComponent implements OnInit {

  TodayChallengeQuestion: any;
  qid: any;
  userId:any;
  selectedOption:any;
  uid: any;
  constructor(private router:Router , private student:StudentService,private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.uid=sessionStorage.getItem('userid');
    this.qid = this.route.snapshot.params.qid;
    this.student.questionData(this.qid,this.uid).subscribe(
      (data:any) =>{
        console.log(data);
        this.TodayChallengeQuestion = data;
       
      },
      (err:any) => {
        console.log(err);
       // check error status code is 500, if so, do some action
       if(err.status == 500){
        this.snackbar.open("Internal Server Error",'close',{duration: 3000});
      }
      }
    )
  }

  onChoose(){
    console.log(this.selectedOption);
  }

  validateAndProcess() {
    this.userId=sessionStorage.getItem('userid');
    let iscorrect;   
    let payload = {
                  "qId": this.qid*1,
                  "userId":  this.userId*1,
                  "userOption": this.selectedOption
                }

    console.log(payload);
    this.student.postUserAnswer(payload).subscribe(
      (res:any) =>{
        console.log("Option Submitted Successfully",res);
        if(res.status){
          this.snackbar.open('Answer Submitted..','close',{duration: 3000});
          this.router.navigate(['student/daily-challenge']);
        }
        
      },
      (err:any)=>{
        this.snackbar.open('Something went wrong..','close',{duration: 3000});
      }
    )

    // this.student.submitSolution(payload).subscribe(
    //   res => {
    //     console.log("data posted successfully", res);
    //     this.router.navigate(['/qhistory']);
    //   },
    //   err => console.log("Error occured while submiting solution.", err)
    // );
  }

}
