import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { wholeDiscussionDetails } from 'src/app/models/discussion';
import { StudentService } from 'src/app/services/student.service';
import { filter } from 'rxjs/operators';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

    // pagination variables for new discussion
 page=0;
 pageSize=10;
  queries: any = [];
  userId: any;
  currentUrl : any;
  currentDateTime: string;
  

  constructor(private _location:Location, private student:StudentService ,private router:Router ,private datepipe: DatePipe) {
    this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((data:any) => {
            console.log(data.url);
            this.currentUrl = data.url;
        });
   }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userid');
    this. getDiscussions();
     this.currentDateTime = this.datepipe.transform((new Date),);
    console.log(this.currentDateTime);
  }

  calculateDiff(data){
    let date = new Date(data.insertedDate);
    let currentDate = new Date();
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  getDiscussions(){
      this.student.getNewDiscussions(this.page,this.pageSize)
      .subscribe(
        data =>{
          console.log(data);
          this.queries = data;
        }

      );
  }

  next(){
    ++this.page;
    console.log(this.page);
    this.student.getNewDiscussions(this.page,this.pageSize)
    .subscribe(
      data=>
      {
        console.log(data);
        this.queries=data;
      }
    );
  }

  prev(){
    --this.page;
    console.log(this.page);
    this.student.getNewDiscussions(this.page,this.pageSize)
    .subscribe(
      data=>
      {
        console.log(data);
        this.queries=data;
      }
    );
  }
  
  goToDiscussion(id){
    let todayDate=new Date();
    console.log(todayDate);

    let postView={
      "moduleType": "DB",
      'inDateTime':todayDate,
      "questionId": id,
      "userId": this.userId
    }

    this.student.postViews(postView)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
      }
    );
    

    if(this.currentUrl == '/teacher/forums'){
      this.router.navigate(['teacher/forum',id]);
    }else{
      this.router.navigate(['student/forum',id]);
    }

  }

  addForum(){
    if(this.currentUrl == '/teacher/forums'){
      this.router.navigate(['teacher/add-discussion']);
    }else{
      this.router.navigate(['student/add-discussion']);
    }
  }

  goBack(){
    this._location.back();
  }

}
