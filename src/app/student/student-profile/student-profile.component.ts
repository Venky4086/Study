import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  userprofileinfo: any;
  standard: any;
  img: File;
  fileList: any;
  upRes:any;
  skills :any= [];
  achievements =[];
  isEdit : boolean =false;
  college : any;
  education : any;
  exp : any;
  subject : any;

  skill:any = {
    type:null,
    title : null,
    description :null,
    proficiency :null
  }
  achievement = {
    title : null,
    description :null,
  }

  @ViewChild('fileInput') el: ElementRef;
  stabId: any;
  userName: any;
  address: any;
  experience: any;
  // subject: any;
  dob: any;
  userIdFk: any;
  constructor(private _location:Location, private student:StudentService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    let userId=sessionStorage.getItem('userid');
    console.log(sessionStorage.getItem('standard'));
    this.student.getSpecificStandard(sessionStorage.getItem('standard'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.standard=data.standard;
      }
    );
    this.student.userProfile(userId).subscribe(
      data=>{
        console.log(data);
        this.userprofileinfo = data;
        this.college = this.userprofileinfo.teacherabout.college;
        this.education = this.userprofileinfo.teacherabout.education;
        this.subject = this.userprofileinfo.teacherabout.subject;
        this.exp = this.userprofileinfo.teacherabout.experience;
      }
    )
  }
  userId(userId: any) {
    throw new Error('Method not implemented.');
  }
  uploadPic(){
    if (this.fileList.length > 0){
        let file: File = this.fileList[0];
        var formData:FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('userId', sessionStorage.getItem('userid'));
        console.log(formData);
      
      //   for (var pair of formData.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]); 
      // }

        this.student.uploadProfilePic(formData).subscribe(
          res =>{
            console.log(res);
            this.upRes=res;
            if(this.upRes.status==200)  {
              this.snackbar.open('Uploaded Successfully' , 'close', {duration: 3000});
              this.ngOnInit();
            }       
          }
        )
    }


  }
  onFileChange(event) {
    this.img = event.target.files[0];
     this.fileList = event.target.files;
     this.uploadPic();
  }

  SaveOrUpdate(){
    let userId=sessionStorage.getItem('userid');
    let about = {
      college : this.college,
      education : this.education
    }
    let newabout = {
      "stabId": this.userprofileinfo.teacherabout?.stabId || 0,
      "userIdFK": userId,
      "userName": this.userprofileinfo.userName,
      "address": this.userprofileinfo.userName,
      "education": this.education,
      "college": this.college,
      "experience": this.exp,
      "subject": this.subject
  };
  console.log(newabout);
    this.student.addAbout(newabout).subscribe(
      (data:any)=>
      {
        console.log(data);
        if(data){
          this.snackbar.open("Succesfully added",'close',{duration:3000})
        }
      }
    );
  }

  updateAbout(){
    let userIdFK=sessionStorage.getItem('userid');
    let payload={
      stabId:this.stabId,
      userIdFK:this.userIdFk,
      userName:this.userName,
      address:this.address,
      education:this.education,
      college:this.college,
      experience:this.experience,
      subject:this.subject,
      dob:this.dob

    }
  }
  addSKorCert(){
    console.log(this.skills);
  }
  add(string) {
    console.log(string);
    if (string == 'a'){
      this.achievements.push(this.achievement);
    }else{
      this.skills.push(this.skill);
      console.log(this.skills)
    }
  }
  remove(i,string){
    console.log(string);
    if (string == 'a'){
      this.achievements.splice(i,1);
    }else{
      this.skills.splice(i,1);
    }
  }

  goBack(){
    this._location.back();
  }


}
