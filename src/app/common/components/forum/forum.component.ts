import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { wholeDiscussionDetails } from 'src/app/models/discussion';
import { StudentService } from 'src/app/services/student.service';
import  { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  visibleIndex=-1;
  replyIndex=-1;
  img:File;
  fileList:any;
  comment:any;
  dQid: any;
  userId:any;
  type:any;
  discussionDetails=[];
  fullDiscussionDetails:wholeDiscussionDetails;
  commentDetails:any;
  noOfComments: any;
  LikesDislikesDTO=[];
  toggleCommentDiv:boolean=false;
  toggleReplyDiv:boolean=false;
  loading:boolean;
  comments:any=[];

  likePayload={
    liked:0,
    questionId:0,
    type:'DB',
    userId:sessionStorage.getItem('userid')
  };
  dislikePayload={
    disliked:0,
    questionId:0,
    type:'DB',
    userId:sessionStorage.getItem('userid')
  };
  replylikePayload={
    liked:0,
    questionId:0,
    type:'DBS',
    userId:sessionStorage.getItem('userid')
  }
  replydislikePayload={
    disliked:0,
    questionId:0,
    type:'DBS',
    userId:sessionStorage.getItem('userid')
  }
  myInputVariable: any;
  getRepliesDetails: any=[];
  helpMenuOpen: string;

  constructor(private _location:Location,private route:ActivatedRoute,private student:StudentService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.dQid=this.route.snapshot.params.id;
    this.userId=sessionStorage.getItem('userid');
    
    this.student.getSpecificDiscussionById(this.dQid)
    .subscribe(
      res=>
      {
        console.log(res);
        this.discussionDetails.push(res);
        console.log(this.discussionDetails);
      }
    );
    
    // this.findSolutions();
    this.type="DB";
    this.getAllDiscussion();
  }

  calculateDiff(data:any){
    let date = new Date(data.insertedDate);
    let currentDate = new Date();
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }
  calculateDiffsecond(data:any){
    console.log(data);
    let date = new Date(data.inDateTime);
    let currentDate = new Date();
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }
  // findSolutions(){
  //   this.student.getSolutionsOfDiscussion(this.dQid)
  //   .subscribe(
  //     (res:any)=>
  //     {
  //       console.log(res);
  //       res.reverse();
  //       this.commentDetails=res;
  //       this.noOfComments=this.commentDetails.length;
  //     }
  //   );
  // }

  editDiscussion(id){
    this.router.navigate(['/edit-discussion',id]);
  }

  deleteDiscussion(qid,userid){
    this.student.discussionDelete(qid,userid)
    .subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          // this.toastr.successToastr("Deleted Successfully");
          this.router.navigate(['/alldiscussions'])
        }
      }
    );
  }

  getAllDiscussion(){
    this.student.getDiscussionLikesandComments(this.dQid,this.userId,this.type)
    .subscribe(
      (res:any)=>
      {
        console.log(res);
        this.fullDiscussionDetails=res;
        console.log(this.fullDiscussionDetails);
        this.commentDetails = this.fullDiscussionDetails.boardSolutionDTOs;
        this.LikesDislikesDTO=[];
        this.LikesDislikesDTO.push(this.fullDiscussionDetails.questionLikeDisLikesInfoDTO);
        console.log(this.LikesDislikesDTO);
      }
    );
  }

  giveReplyLike(value){
    console.log("disliked",value);
    if(value === 1){
      this.replydislikePayload.disliked=1;
      this.replydislikePayload.questionId=this.dQid;
      this.student.postDisLike(this.replydislikePayload)
      .subscribe(
        res=>
        {
          console.log(res);
          this.replylikePayload.liked=1;
          this.replylikePayload.questionId=this.dQid;
          this.student.postLike(this.replylikePayload)
          .subscribe(
            res=>{
              console.log(res);
              this.getAllDiscussion();
            }
          )
        }
      )
    }
  }

  giveLike(value){
    console.log("disliked",value);
    if(value===1){
      this.dislikePayload.disliked=1;
      this.dislikePayload.questionId=this.dQid;
      this.student.postDisLike(this.dislikePayload)
      .subscribe(
        res=>
        {
          console.log(res);
          this.likePayload.liked=1;
          this.likePayload.questionId=this.dQid;
          this.student.postLike(this.likePayload)
          .subscribe(
          res=>
          {
            console.log(res);
            this.getAllDiscussion();
         
          }
          );
        }
      );
    }
    else
    {
      this.likePayload.liked=1;
      this.likePayload.questionId=this.dQid;
      this.student.postLike(this.likePayload)
      .subscribe(
      res=>
        {
          console.log("directly in else block",res);
          this.getAllDiscussion();
        }
      );
    }
  }

  giveDislike(value){
    console.log("liked",value); 
    if(value===1){
      this.likePayload.liked=1;
      this.likePayload.questionId=this.dQid;
      this.student.postLike(this.likePayload)
      .subscribe(
        res=>
          {
            console.log(res);
            this.dislikePayload.disliked=1;
            this.dislikePayload.questionId=this.dQid;
            this.student.postDisLike(this.dislikePayload)
            .subscribe(
              res=>
              {
                console.log(res);
                this.getAllDiscussion();
              }
            );
          }
        );
    }
    else
    {
      this.dislikePayload.disliked=1;
      this.dislikePayload.questionId=this.dQid;
      this.student.postDisLike(this.dislikePayload)
      .subscribe(
        res=>
        {
          console.log("directly in else block",res);
          this.getAllDiscussion();
        }
      );
    }
  }

  onFileChange(event) {
    this.img = event.target.files[0];
     this.fileList = event.target.files;
  }

  toggle(){
    this.toggleCommentDiv=!this.toggleCommentDiv;
  }
 

  addComment(){
    if(!this.comment){
      this.snackbar.open('Please enter something','close',{duration: 3000});
      return ;
    }else{
      this.loading=true;
    var formData:FormData = new FormData();
    if(this.fileList){
      let file: File = this.fileList[0];
      formData.append('file', file, file.name);
      formData.append('solution',this.comment);
      formData.append('dQid',this.dQid);
      formData.append('userId',sessionStorage.getItem('userid'));
    }
    else
    {
      formData.append('solution',this.comment);
      formData.append('dQid',this.dQid);
      formData.append('userId',sessionStorage.getItem('userid'));
    }
    this.student.postSolutionOnDiscussionQuestion(formData)
    .subscribe(
      (res:any)=>
      {
        console.log(res);
        this.loading=false;
        if(res.status){
          this.comment='';
          this.myInputVariable = "";
          this.toggleCommentDiv=false;
          // this.toastr.successToastr('Comment added' , null, {position: 'top-right'});
        }else{
          // this.toastr.warningToastr(res.status)
        }
        // this.findSolutions();
      }
    );
    }
  }

  postReply(id,index){
    this.loading=true;
    if(!this.comments[index]){
      this,this.snackbar.open('Please enter something','close',{duration: 3000});
      return;
    }else{
      const payload={
        'comment':this.comments[index],
        'solutionId':id,
        'userId':sessionStorage.getItem('userid')
      }
      this.student.postReplay(payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.status){
            this.loading=false;
            this.comments[index]="";
            // this.toastr.successToastr("replay added ... !")
          }
          this.loading=false;
        }
      );
    }
  }

  getReplies(id,ind){
    console.log(ind);
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
    this.student.getReplies(id)
    .subscribe(
      (data:any)=>
      {
        this.getRepliesDetails=data;
        console.log(data);
      }
    );
  }

  replyToggle(ind){
    if (this.replyIndex === ind) {
      this.replyIndex = -1;
    } else {
      this.replyIndex = ind;
    }
    this.toggleReplyDiv=!this.toggleReplyDiv; 
  }

  userprofile(){
    this.router.navigate(['/post-user-profile'])
  }

  goBack(){
    this._location.back();
  }

  giveupVote(sid){
    let vote = {
      "solutionId":sid,
      "upvote":1,
      "userId":sessionStorage.getItem('userid')
    }
    this.student.postVotes(vote).subscribe(
      (data:any)=>{
        console.log(data);
        if(data){
          this.getAllDiscussion();
        }else{
          this.snackbar.open('Something went wrong','close',{duration:3000});
        }
      }
    );
  }

  givedownVote(sid){
    let vote = {
      "solutionId":sid,
      "downVote":1,
      "userId":Number(sessionStorage.getItem('userid'))
    }
    this.student.postVotes(vote).subscribe(
      (data:any)=>{
        console.log(data);
        if(data){
          this.getAllDiscussion();
        }else{
          this.snackbar.open('Something went wrong','close',{duration:3000});
        }
      }
    );
  }

}
