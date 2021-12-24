import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})
export class AddDiscussionComponent implements OnInit {

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

  constructor(private _location:Location,private student:StudentService,private router:Router,private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.student.getStandards()
    .subscribe(
      data=>
      {
        console.log(data);
        this.standards=data;
      }
    );
    this.adddiscussionform=new FormGroup({});
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
    console.log(this.route.snapshot.params.id);
    if(this.route.snapshot.params.id)
    {
    this.add=false;
    this.edit=true;
    this.student.getSpecificDiscussionById(this.route.snapshot.params.id)
    .subscribe(
      res=>
      {
        console.log(res);
        this.discussionDetails=res;
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
            this.editdiscussionform.setValue({
              dQid:this.discussionDetails.dQid,
              question:this.discussionDetails.question,
              standardId:this.discussionDetails.standardId,
              subjectId:this.discussionDetails.subjectId,
              topicId:this.discussionDetails.topicId,
              title:this.discussionDetails.title,
              image:'',
              totalpoints:this.discussionDetails.totalpoints,
              userId:this.discussionDetails.userId,
              username:this.discussionDetails.username
            });
              }
            );
          }
        );
    }else{
      this.add=true;
      this.edit=false;
      this.adddiscussionform=new FormGroup({
        'question':new FormControl('',Validators.required),
        'standardId':new FormControl('',Validators.required),
        'subjectId':new FormControl('',Validators.required),
        'title':new FormControl('',Validators.required),
        'topicId':new FormControl('',Validators.required),
        'image':new FormControl('')
      });
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

  onSubmit(){
    this.loading=true;
    console.log(this.adddiscussionform.value);
    var formData:FormData = new FormData();
    let file: File = this.fileList[0];
    formData.append('file', file, file.name);
    formData.append('standardId',this.adddiscussionform.get('standardId').value);
    formData.append('subjectId',this.adddiscussionform.get('subjectId').value);
    formData.append('topicId',this.adddiscussionform.get('topicId').value);
    formData.append('question',this.adddiscussionform.get('question').value);
    formData.append('title',this.adddiscussionform.get('title').value);
    formData.append('userId',sessionStorage.getItem('userid'));
    this.student.postDiscussionBoard(formData)
    .subscribe(
      res=>
      {
        console.log(res);
        this.response=res;
        console.log(this.response.status);
        this.loading=false;
        if(this.response.status){
          this.snackbar.open("Discussion Added",'close',{duration:3000});
          this.router.navigate(['student/forums']);
        }
      },
      (error:any)=>
      {
        this.loading=false;
        this.snackbar.open("Something went wrong");
      }
    );
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
    this.student.discussionUpdate(formData)
    .subscribe(
      (data:any)=>
      {
        console.log(data);
      }
    );
  }

  goBack(){
    this._location.back();
  }

}
