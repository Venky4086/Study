import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-editdiscussion',
  templateUrl: './editdiscussion.component.html',
  styleUrls: ['./editdiscussion.component.css']
})
export class EditdiscussionComponent implements OnInit {

  adddiscussionform: FormGroup;
  add:boolean;
  edit:boolean;
  editdiscussionform: FormGroup;
  img: File;
  fileList: any;
  subjects: any;
  topics: any;
  standards: any;
  userId: any;
  response:any;
  discussionDetails:any;
  loading:boolean=false;
  result: any;
  Quid: any;
  Totalpoints: any;
  userImageUri: any;
  user_Id: any;
  Username: any;
  View: any;
  InserteDate: any;
  Question: any;
  standardId: any;
  subjectId: any;
  title: any;
  topicId: any;


  constructor(private teacherservice:TeacherService,private _location:Location,private student:StudentService,private router:Router,private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit() {

    this.adddiscussionform=new FormGroup({
      'question':new FormControl('',Validators.required),
      'standardId':new FormControl('',Validators.required),
      'subjectId':new FormControl('',Validators.required),
      'title':new FormControl('',Validators.required),
      'topicId':new FormControl('',Validators.required),
      'image':new FormControl('')
    });

    this.userId=sessionStorage.getItem('userid');
    this.student.getStandards()
    .subscribe(
      data=>
      {
        console.log(data);
        this.standards=data;
      }
    );
    this.adddiscussionform=new FormGroup({});
  
    console.log(this.route.snapshot.params.id);
    if(this.route.snapshot.params.id)
    {
    this.student.getSpecificDiscussionById(this.route.snapshot.params.id)
    .subscribe(
      res=>
      {
        console.log(res);
        this.discussionDetails=res;
        this.Quid = this.discussionDetails.dQid;
        this.title = this.discussionDetails.title;
        this.Question = this.discussionDetails.question;
        this.standardId = this.discussionDetails.standardId;
        this.subjectId = this.discussionDetails.subjectId;
        this.topicId = this.discussionDetails.topicId;
        this.InserteDate = this.discussionDetails.insertedDate;
        this.Totalpoints = this.discussionDetails.totalpoints;
        this.Username = this.discussionDetails.username;
        this.user_Id = this.discussionDetails.userId;
        this.View = this.discussionDetails.view;
        this.student.getSubjectsById(this.discussionDetails.standardId)
        .subscribe(
          (data:any)=>
          {
            console.log(data);
            this.subjects=data;
            this.student.getTopicById(this.discussionDetails.standardId,this.discussionDetails.subjectId)
            .subscribe(
              (data:any)=>
              {
                console.log(data);
                this.topics=data;
              }
            );
              }
            );
          }
        );
    }else{
    }
    console.log(this.img);
    this.userId=sessionStorage.getItem('userid');
  }
  

  onFileChange(event) {
    this.img = event.target.files[0];
    console.log(this.img)
     this.fileList = event.target.files;
     for(var i=0;i < this.fileList.length;i++){
      this.result +='FileName:'+this.fileList[i].name;
     }
     console.log(this.fileList);

  }

  onStandardChange(){
    if(this.add){
      this.student.getSubjectsById(this.adddiscussionform.get('standardId').value)
      .subscribe(
        data=>
        {
          console.log(data);
          this.subjects=data;
        }
      );
    }else{
      this.student.getSubjectsById(this.editdiscussionform.get('standardId').value)
      .subscribe(
        data=>
        {
          console.log(data);
          this.subjects=data;
        }
      );
    }
   
    
  }

  onSubjectChange(){
    if(this.add){
      this.student.getTopicById(this.adddiscussionform.get('standardId').value,this.adddiscussionform.get('subjectId').value)
    .subscribe(
      data=>
      {
        console.log(data);
        this.topics=data;
      }
    );
    }else{
      this.student.getTopicById(this.editdiscussionform.get('standardId').value,this.editdiscussionform.get('subjectId').value)
    .subscribe(
      data=>
      {
        console.log(data);
        this.topics=data;
      }
    );
    }
  }
  
  onUpdate(){
    console.log('Edit');
    let adminId = +this.userId;
    let file: File = this.fileList[0];
    const data = {
          "adminId": adminId,
          "questionDTO": {
            "dQid":this.Quid,
            "imageUri": file.name,
            "insertedDate": this.InserteDate,
            "question": this.Question,
            "standardId": this.standardId,
            "subjectId": this.subjectId,
            "title": this.title,
            "topicId": this.topicId,
            "totalpoints": this.Totalpoints,
            "userId": this.user_Id,
            "userImageUri": this.userImageUri,
            "username": this.Username,
            "view": this.View
          },
          "status": "EDIT"
        }
   console.log(data);
   this.teacherservice.discussionUpdate(data)
   .subscribe(
     res=>
     {
       this.response=res;
       console.log(this.response);
       this.loading=false;
       if(this.response.status){
         this.snackbar.open("Edit sucessful done",'close',{duration:3000});
         // this.router.navigate(['student/forums']);
       }
     },
     (error:any)=>
     {
       console.error(error);
       this.loading=false;
       this.snackbar.open("Something went wrong");
     }
   );
  }

  goBack(){
    this._location.back();
  }

}
