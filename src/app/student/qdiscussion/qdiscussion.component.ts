import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-qdiscussion',
  templateUrl: './qdiscussion.component.html',
  styleUrls: ['./qdiscussion.component.css']
})
export class QdiscussionComponent implements OnInit {
  showMyContainer;
  replyIndex=-1;
  toggleReplyDiv:boolean=false;

  showMyContainer1;
 visibleIndex = -1;
 loading:boolean;
 questionData:any;
 toggleCommentDiv:boolean=false;
 discussionDetails: any;
 discussionComments:any=[];

 qDiscussion : any=[];

 comments:any=[];
 commentStatus:any;
 solution:any;
 commentsToggle:boolean;

 // comments payload
 commentspayload={
   comments:undefined,
   userId:undefined
 }
 // add discussion payload
 discussionpayload={
   questionId:undefined,
   solution:undefined,
   userId:undefined
 }
 standardName: any;
 subjectName: any;
 topicName: any;
 static: boolean = false;
 panelOpenState : boolean =false;

 constructor(private router : Router, private student: StudentService,private snackbar:MatSnackBar) { }

 

 ngOnInit() {
   this.toggleCommentDiv=false;
   this.standardName=sessionStorage.getItem('standardName');
   this.subjectName=sessionStorage.getItem('subjectName');
   this.topicName=sessionStorage.getItem('topicName');
   this.commentsToggle=false;
   let qid = sessionStorage.getItem("questionsView");
   console.log(qid);
   this.student.getQuestionById(qid)
   .subscribe(
     data=>
     {
       console.log(data);
       this.questionData=data;
     }
   );
   this.student.getQuestionDiscussions(qid).subscribe(
     res => {
       console.log("fetched qdescussion from db: ", res);
       this.qDiscussion=res;
     },
     err => console.log("Error occured while fetching the qdiscussion: ", err)
   )
 }

 pdiscussion = [];
 practise(events){
   console.log("Practice Discussion to get: ", events.target.value);
 }

 toggle(){
   this.toggleCommentDiv=!this.toggleCommentDiv;
 }

 comment(dId,index){
   this.loading=true;
   console.log(this.comment);
   this.commentspayload.comments=this.comments[index];
   this.commentspayload.userId=sessionStorage.getItem('userid');
   console.log(this.commentspayload);
   this.student.postComment(dId,this.commentspayload)
   .subscribe(
     res=>
     {
       console.log(res);
       this.commentStatus=res;
       if(this.commentStatus.status==true){
         this.loading=false;
         this.snackbar.open('Comment added' , 'close', {duration: 3000});
         this.student.getQuestionDiscussions(sessionStorage.getItem("questionsView")).subscribe(
          res => {
            console.log("fetched qdescussion from db: ", res);
            this.qDiscussion=res;
          },
          err => console.log("Error occured while fetching the qdiscussion: ", err)
        )
       }
       else{
         this.snackbar.open('Comment is not added', "close", {duration: 3000});
       }
       this.comments=[];
       this.student.getCommentsBydiscussionId(dId)
       .subscribe(
           data=>
             {
               console.log(data);
               this.discussionDetails=data;
               this.discussionComments=this.discussionDetails.commentDTO;
               console.log(this.discussionComments);
             }
           );
     },
     err=>{
       console.log("API error");
     }
   );
 }

 getComments(dId,ind){
   if (this.visibleIndex === ind) {
     this.visibleIndex = -1;
   } else {
     this.visibleIndex = ind;
   }
   this.commentsToggle=!this.commentsToggle;
   this.student.getCommentsBydiscussionId(dId)
   .subscribe(
     data=>
     {
       console.log(data);
       this.discussionDetails=data;
       this.discussionComments=this.discussionDetails.commentDTO;
       console.log(this.discussionComments);
       console.log(this.discussionComments.length);
       if(this.discussionComments.length == 0){
        this.static=true;
       }
     }
   );
 }
 
 addDiscussion(){
   this.loading=true;
   let qid = sessionStorage.getItem("questionsView");
   this.discussionpayload.questionId=qid;
   this.discussionpayload.userId=sessionStorage.getItem('userid');
   this.discussionpayload.solution=this.solution;
   this.student.postDiscussion(this.discussionpayload)
   .subscribe(
     (data:any)=>
     {
       console.log(data);
       if(data.status){
         this.loading=false;
         this.solution='';
         console.log(this.panelOpenState)
         this.panelOpenState = false;
         console.log(this.panelOpenState)
         this.snackbar.open('Comment added', 'close', {duration: 3000});
       }
       this.student.getQuestionDiscussions(qid).subscribe(
         res => {
           console.log("fetched qdescussion from db: ", res);
           this.qDiscussion=res;
         },
         err => console.log("Error occured while fetching the qdiscussion: ", err)
       );
     }
   );
   
 }

 goToQuestions(){
   this.router.navigate(['student/practise']);
 }

 goToStandards(){
   this.router.navigate(['student/study']);
 }

 goToSubjects(){
   this.router.navigate(['student/study']);
 }study1

 goToTopics(){
   this.router.navigate(['student/topics']);
 }
 
 replyToggle(ind){
  if (this.replyIndex === ind) {
    this.replyIndex = -1;
  } else {
    this.replyIndex = ind;
  }
  this.toggleReplyDiv=!this.toggleReplyDiv; 
}
}
