import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { DatePipe, Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formusapproval',
  templateUrl: './formusapproval.component.html',
  styleUrls: ['./formusapproval.component.css']
})
export class FormusapprovalComponent implements OnInit {
  AllFormus: Object;
  editdiscussionform: FormGroup;
  img: File;
  fileList: any;
  result: string;
  loading:boolean=false;
  response: any;
  userId:any;
  constructor(private datepipe: DatePipe,private teacherservice:TeacherService,private location:Location,private snackbar:MatSnackBar) { }

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

  Approval(DqId:any,Image:any,StandardId:any,SubjectId:any,TopicId:any,Question:any,Title:any,Totalpoints:any,userId:any,userImageUri:any,Username:any,View:any){
    console.log("Approval");
    let adminId = this.userId;
    const data = {
       "adminId":adminId,
       "questionDTO":{
         "dQid":DqId,
         "imageUri":Image,
         "question":Question,
         "standardId":StandardId,
         "subjectId":SubjectId,
         "title":Title,
         "topicId":TopicId,
         "totalpoints":Totalpoints,
         "userId":userId,
         "userImageUri":userImageUri,
         "username":Username,
         "view":View,
       },
       "status":"APPROVED",
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
      },
      (error:any)=>
      {
        console.error(error);
        this.loading=false;
        this.snackbar.open("Something went wrong");
      }
    );
  }

 DisApproval(DqId:any,Image:any,StandardId:any,SubjectId:any,TopicId:any,Question:any,Title:any,Totalpoints:any,userId:any,userImageUri:any,Username:any,View:any){
  console.log('DisApproval');
  let adminId = this.userId;
  const data = {
      "adminId":adminId,
      "questionDTO":{
        "dQid":DqId,
        "imageUri":Image,
        "question":Question,
        "standardId":StandardId,
        "subjectId":SubjectId,
        "title":Title,
        "topicId":TopicId,
        "totalpoints":Totalpoints,
        "userId":userId,
        "userImageUri":userImageUri,
        "username":Username,
        "view":View,
      },
      "status":"DISAPPROVED",
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
         this.snackbar.open("DisApproval sucessful done",'close',{duration:3000});
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

  Edit(Qid:any){
   console.log(Qid);
  }


  onUpdate(){
    console.log(this.editdiscussionform.value);
    var formData:FormData = new FormData();
    let file: File = this.fileList[0];
    formData.append('file', file, file.name);
    formData.append('dQid',this.editdiscussionform.get('dQid').value);
    formData.append('userId',this.editdiscussionform.get('userId').value);
    formData.append('username',this.editdiscussionform.get('username').value);
    formData.append('totalpoints',this.editdiscussionform.get('totalpoints').value);
    formData.append('standardId',this.editdiscussionform.get('standardId').value);
    formData.append('subjectId',this.editdiscussionform.get('subjectId').value);
    formData.append('topicId',this.editdiscussionform.get('topicId').value);
    formData.append('question',this.editdiscussionform.get('question').value);
    formData.append('title',this.editdiscussionform.get('title').value);
    console.log(formData);
    this.teacherservice.discussionUpdate(formData)
    .subscribe(
      (data:any)=>
      {
        console.log(data)
        this.snackbar.open("Formus Sucessfull Updated",'close',{duration:3000});

      },(error)=>{
        console.error(error);
        this.loading=false;
        this.snackbar.open("Something went wrong");
      })
  }

  calculateDiff(data:any){
    let date = new Date(data.insertedDate);
    let currentDate = new Date();
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

}
