import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,HostListener} from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-subject-expert1',
  templateUrl: './subject-expert1.component.html',
  styleUrls: ['./subject-expert1.component.css']
})
export class SubjectExpert1Component implements OnInit {

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
  adminId: any;
  approvalStatus: any;
  qId: any;
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
          if(x == 10){
            this.restrictRoles[0]=false;
          }
          if(x == 12){
            this.restrictRoles[1]=false;
          }
          if(x == 14){
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
    this.admin.getQuestionsForApprovalSE1(this.standardId,this.subjectId)
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
        if(this.questions.length == 0){
          this.static = true;
        }
       
      }
    );
  }

    approve(qId){
      let adminId = this.userId*1;
      let status = "FORWORDEDTOGE";
      const payload={};
      this.admin.dataApprovedBySE1(adminId,status,qId,payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
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
      );
    }
    edit(id){
      this.router.navigate(['student/edit-question',id]);
    }
    modify(qId){
      let adminId = this.userId*1;
      let status = " MODIFY";
      const payload={};
      this.admin.dataApprovedBySE1(adminId,status,qId,payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
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
      );
    
    }
    duplicate(qId){
      let adminId = this.userId*1;
      let status = "DUPLICATE";
      const payload={};
      this.admin.dataApprovedBySE1(adminId,status,qId,payload)
      .subscribe(
        (data:any)=>
        {
          console.log(data);
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
      );

    }

    goBack(){
      this._location.back();
    }

}
