import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { DatePipe, Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formus-approval',
  templateUrl: './formus-approval.component.html',
  styleUrls: ['./formus-approval.component.css']
})
export class FormusApprovalComponent implements OnInit {

  AllFormus: Object;
  editdiscussionform: FormGroup;
  img: File;
  fileList: any;
  result: string;
  loading:boolean=false;
  response: any;
  userId:any;
  constructor(private datepipe: DatePipe,private router:Router,private teacherservice:TeacherService,private location:Location,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userid');
    this.editdiscussionform=new FormGroup({
      'dQid':new FormControl(),
      'question':new FormControl('',Validators.required),
      'standardId':new FormControl(0,Validators.required),
      'subjectId':new FormControl(0,Validators.required),
      'topicId':new FormControl(0,Validators.required),
      'title':new FormControl('',Validators.required),
      'image':new FormControl(''),
      'totalpoints':new FormControl(0),
      'userId':new FormControl(0),
      'username':new FormControl('')
    });

    this.getForms();
  }
  getForms(){
    this.teacherservice.getAllFormus().subscribe((res)=>{
      if(res){
        console.log(res);
        this.AllFormus = res;
      }
      else{
        console.warn(res)
      }
    },(error)=>{
      console.error(error);
    });
  }

  // go back

  goBack(){
    this.location.back();
  }

// approval

  Approval(DqId:any,Image:any,InsertDate:any,StandardId:any,SubjectId:any,TopicId:any,Question:any,Title:any,Totalpoints:any,userId:any,userImageUri:any,Username:any,View:any){
    console.log("Approval");
    let adminId = +this.userId;
    const data = {
          "adminId": adminId,
          "questionDTO": {
            "dQid":DqId,
            "imageUri": Image,
            "insertedDate": InsertDate,
            "question": Question,
            "standardId": StandardId,
            "subjectId": SubjectId,
            "title": Title,
            "topicId": TopicId,
            "totalpoints": Totalpoints,
            "userId": userId,
             "userImageUri": userImageUri,
            "username": Username,
            "view": View
          },
        
          "status": "APPROVED"
        }
    console.log(data);
    this.teacherservice.discussionUpdate(data)
    .subscribe(
      res=>
      {
        this.response=res;
        console.log(this.response.status);
        this.loading=false;
        if(this.response.status){
          this.snackbar.open("Approval sucessful done",'close',{duration:3000});
          // this.router.navigate(['student/forums']);
        }
       this.getForms();
      },
      (error:any)=>
      {
        console.error(error);
        this.loading=false;
        this.snackbar.open("Something went wrong");
      }
    );
  }

 DisApproval(DqId:any,Image:any,InsertDate:any,StandardId:any,SubjectId:any,TopicId:any,Question:any,Title:any,Totalpoints:any,userId:any,userImageUri:any,Username:any,View:any){
  console.log('DisApproval');
  let adminId = +this.userId;
  const data = {
        "adminId": adminId,
        "questionDTO": {
          "dQid":DqId,
          "imageUri": Image,
          "insertedDate": InsertDate,
          "question": Question,
          "standardId": StandardId,
          "subjectId": SubjectId,
          "title": Title,
          "topicId": TopicId,
          "totalpoints": Totalpoints,
          "userId": userId,
           "userImageUri": userImageUri,
          "username": Username,
          "view": View
        },
      
        "status": "DISAPPROVED"
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
         this.snackbar.open("DisApproval sucessful done",'close',{duration:3000});
         // this.router.navigate(['student/forums']);
       }
    this.getForms();
     },
     (error:any)=>
     {
       console.error(error);
       this.loading=false;
       this.snackbar.open("Something went wrong");
     }
   );
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

  // edit

  Edit(id:any){
   console.log(id);
  //  this.router.navigate(['/teacher/edit-disscusion']);
   this.router.navigate(['/teacher/edit-disscusion',id]);
  }

  calculateDiff(data:any){
    let date = new Date(data.insertedDate);
    let currentDate = new Date();
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

}
