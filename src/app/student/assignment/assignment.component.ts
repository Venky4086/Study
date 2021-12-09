import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  constructor(private _location:Location, private student : StudentService,private route:ActivatedRoute,private snackbar:MatSnackBar,private router:Router) { }

  assignmentInfo : any;
  Questions : any;
  payload : any;
  feedback : any = [];

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.student.getAssignmentQuestionsByAssignmentId(id,sessionStorage.getItem('userid')).subscribe((data:any)=>{
      console.log(data);
      this.assignmentInfo = data.assignmentInfo;
      this.Questions = data.questions; 
      console.log(this.assignmentInfo);
    });
    this.getFeedback();
  }

  getFeedback(){
    this.student.getAssigmentFeedback(this.route.snapshot.params.id,sessionStorage.getItem('userid')).subscribe(
      (data:any)=>{
        console.log(data);
        if(data){
          this.feedback = data;
        }
      }
    );
  }

  uploadFiles(){
    this.student.assignmentSubmission(this.payload).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.snackbar.open('File Uploaded Successfully','close');
          this.router.navigate(['student/assignments'])
        }
      }
    );
  }

  onSelectFile(event) {
    let fileList: FileList = event.target.files;
    let formData: FormData = new FormData();
    formData.append('assignmentIdfk',this.route.snapshot.params.id);
    formData.append('userId',sessionStorage.getItem('userid'));
    for (const file of fileList) {
      formData.append('files', file, file.name)
    }
    console.log(fileList);
    for (var value of formData.values()) {
      console.log(value);
   }
   this.payload =  formData;
  }

  goBack(){
    this._location.back();
  }



}
