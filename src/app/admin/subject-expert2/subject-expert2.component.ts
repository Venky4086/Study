import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-subject-expert2',
  templateUrl: './subject-expert2.component.html',
  styleUrls: ['./subject-expert2.component.css']
})
export class SubjectExpert2Component implements OnInit {

  userId:any;
  Standards:any;
  Subjects:any;
  standardId:any=0;
  subjectId:any=0;
  questions:any=[];
  userRoles:[];
  payload={
    standardId:0,
    subjectId:0
  }
  restrictRoles:any=[true,true,true];
  static:boolean=false;

  filterMetadata = { count: 0 };
  topics=<any>[];
  topic:any="";
  noDupTopics=[];

  constructor(private _location:Location,private admin:AdminService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.userId=sessionStorage.getItem('userid');
    this.admin.getStandards()
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Standards=data;
      }
    );
    this.admin.grabUserDetails(sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        this.userRoles=data.userRolesInfo;
        console.log(this.userRoles);
        this.userRoles.forEach((arrayItem:any)=>{
          var x = arrayItem.roleId;
          if(x == 11){
            this.restrictRoles[0]=false;
          }
          if(x == 13){
            this.restrictRoles[1]=false;
          }
          if(x == 15){
            this.restrictRoles[2]=false;
          }
          console.log(x);
          console.log(this.restrictRoles)
        } )
      }
    );
  }

  onStandardChange(){
    console.log(this.standardId);
    this.admin.getSubjectsById(this.standardId)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Subjects=data;
      }
    ); 
  }

  onSubjectChange(){
    this.payload.standardId= this.standardId;
    this.payload.subjectId=this.subjectId;
    console.log(this.payload);
    this.admin.getQuestionsForApprovalSE2(this.standardId,this.subjectId)
    .subscribe(
      data=>
        {
          console.log(data);
          this.questions=data;

          for(let i of this.questions){        
            this.topics.push(i.topic);        
          }
          console.log(this.topics);
          this.noDupTopics=Array.from(new Set(this.topics));
          console.log(this.noDupTopics);

          this.questions.reverse();
          if(this.questions.length ==0){
            this.static = true;
          }
        }
    );
  }

  approve(qId){
    let adminId = this.userId*1;
    let status = "FORWORDEDTOSA";
    const payload={};
    this.admin.dataApprovedBySE2(adminId,status,qId,payload)
    .subscribe(
      (data:any) =>{
          console.log(data);
          this.questions=data;
          if(data.status){
            console.log("200");
            this.snackbar.open("Question Approved",'close');
          }
      },
      (error:any) => {
        console.log(error);
        console.log(error.status)
        if(error.status==500){
          this.snackbar.open(error.status + ' - Internal Server Error','close');
        }
        if(error.status == 417){
          this.snackbar.open(error.status + ' - You can not approve your question','close');
        }
      }
    )
  }  


  // approve(a,b,c,d,correctOption,concept,chapter,description,level,qId,question,solutionDesc,title,type,userId){
  //   console.log(a,b,c,d,correctOption,concept,chapter,description,level,qId,question,solutionDesc,title,type,userId);
  //   const payload={
  //     adminId:this.userId*1,
  //     info:{},
  //   };
  //   // payload.adminId=sessionStorage.getItem('userid');
  //   payload.info['approvalStatus']="FORWORDEDTOSA";
  //   payload.info['a']=a;
  //   payload.info['b']=b;
  //   payload.info['c']=c;
  //   payload.info['d']=d;
  //   payload.info['description']=description;
  //   payload.info['correctOption']=correctOption;
  //   payload.info['concept']=concept;
  //   payload.info['chapter']=chapter;
  //   payload.info['level']=level;
  //   payload.info['qId']=qId;
  //   payload.info['question']=question;
  //   payload.info['solutionDesc']=solutionDesc;
  //   payload.info['title']=title;
  //   payload.info['type']=type;
  //   payload.info['userId']=userId;
  //   console.log(payload);
  //   this.admin.submitSe2Approval(payload)
  //   .subscribe(
  //     (data:any)=>
  //     {
  //       console.log(data);
  //       if(data.status){
  //         this.toastr.successToastr("Question Approved")
  //       }else{
  //         this.toastr.warningToastr("Question not approved")
  //       }
  //       this.admin.getQuestionsForApprovalSE2(this.standardId,this.subjectId)
  //       .subscribe(
  //         data=>
  //           {
  //             console.log(data);
  //             this.questions=data;
  //           }
  //       );
  //     },
  //     (error:any) => {
  //       console.log(error);
  //       console.log(error.status)
  //       if(error.status==500){
  //         this.toastr.warningToastr(error.status + ' - Internal Server Error');
  //       }
  //       if(error.status==417){
  //         this.toastr.warningToastr(error.status + ' - You can not approve your question');
  //       }
  //     }
  //   );
  // }

  // oneMoreReview(a,b,c,d,correctOption,concept,chapter,description,level,qId,question,solutionDesc,title,type,userId){
  //   console.log(a,b,c,d,correctOption,concept,chapter,description,level,qId,question,solutionDesc,title,type,userId);
  //   const payload={
  //     adminId:2,
  //     info:{},
  //     remarks:""
  //   };
  //   // payload.adminId=sessionStorage.getItem('userid');
  //   payload.info['approvalStatus']="ONEMORE_REVIEW_IS_REQUIRED";
  //   payload.info['a']=a;
  //   payload.info['b']=b;
  //   payload.info['c']=c;
  //   payload.info['d']=d;
  //   payload.info['description']=description;
  //   payload.info['correctOption']=correctOption;
  //   payload.info['concept']=concept;
  //   payload.info['chapter']=chapter;
  //   payload.info['level']=level;
  //   payload.info['qId']=qId;
  //   payload.info['question']=question;
  //   payload.info['solutionDesc']=solutionDesc;
  //   payload.info['title']=title;
  //   payload.info['type']=type;
  //   payload.info['userId']=userId;
  //   payload.remarks="Question is perfect"
  //   console.log(payload);
  //   this.admin.submitSe1Approval(payload)
  //   .subscribe(
  //     data=>
  //     {
  //       console.log(data);
  //       this.admin.getQuestionsForApproval(this.payload)
  //       .subscribe(
  //         data=>
  //           {
  //             console.log(data);
  //             this.questions=data;
  //           }
  //       );
  //     }
  //   );
  // }

  edit(id){
    this.router.navigate(['/student/edit-question',id]);
  }

  modify(qId){

    let adminId = this.userId*1;
    let status = "MODIFY";
    const payload={};
    this.admin.dataApprovedBySE2(adminId,status,qId,payload)
    .subscribe(
      (data:any) =>{
          console.log(data);
          this.questions=data;
          if(data.status){
            console.log("200");
            this.snackbar.open("Question Approved",'close');
          }
      },
      (error:any) => {
        console.log(error);
        console.log(error.status)
        if(error.status==500){
          this.snackbar.open(error.status + ' - Internal Server Error','close');
        }
        if(error.status == 417){
          this.snackbar.open(error.status + ' - You can not approve your question','close');
        }
      }
    )
   
  }

  duplicate(a,b,c,d,correctOption,concept,chapter,description,level,qId,question,solutionDesc,title,type,userId){
    let adminId = this.userId*1;
    let status = "DUPLICATE";
    const payload={};
    this.admin.dataApprovedBySE2(adminId,status,qId,payload)
    .subscribe(
      (data:any) =>{
          console.log(data);
          this.questions=data;
          if(data.status){
            console.log("200");
            this.snackbar.open("Question Approved",'close');
          }
      },
      (error:any) => {
        console.log(error);
        console.log(error.status)
        if(error.status==500){
          this.snackbar.open(error.status + ' - Internal Server Error','close');
        }
        if(error.status == 417){
          this.snackbar.open(error.status + ' - You can not approve your question','close');
        }
      }
    )
   
  }
goBack(){
  this._location.back();
}

}
