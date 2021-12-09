import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-daily-challenges',
  templateUrl: './add-daily-challenges.component.html',
  styleUrls: ['./add-daily-challenges.component.css']
})
export class AddDailyChallengesComponent implements OnInit {

  constructor(private admin:AdminService,private snackbar:MatSnackBar) { }

  Questions:any;
  postDate=<any>[];

  ngOnInit() {
    
    this.admin.getChallengeQas()
    .subscribe(
      (data:any)=>
      {
        this.Questions=data;
        console.log(data);
      }
    );
  }

  clearDate(id){
    this.postDate[id]="";
  }

  postQuestion(id,index){
    console.log(this.postDate[index]);
    let postChallengeQuestion={
        'intime':'',
        'qid':0
      }
    postChallengeQuestion.intime=this.postDate[index];
    postChallengeQuestion.qid=id;
    this.admin.postDailyChallenge([postChallengeQuestion])
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data.status){
          this.postDate[index]="";
          this.snackbar.open("Data Submitted Succesfully",'close')
        }
      }
    );
  }

}
