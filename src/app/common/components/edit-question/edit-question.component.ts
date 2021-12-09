import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  standards:any;
  fetchedSubjects:any;
  alert : boolean=false;
  registerForm: FormGroup;
  submitted = false;
  initialFormValues;
  yearsArray = [2000, 2001, 2002, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  correctOptionsArray = [];
  showMyContainer;
  showMyContainerA;
  showMyContainerB;
  showMyContainerC;
  showMyContainerD;
  showMyContainerS;
  showMyContainerSoln;
  questionId;
  apiqid;
  questionObject;
  fetchedAuthors:any=[];
  constructor(private route:ActivatedRoute,private formBuilder: FormBuilder, private student: StudentService,private teacher: TeacherService, private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getStandards();
        // retrive authors list
      this.teacher.getTeachers().subscribe(
        res=>{
          console.log("got the authors from db",res);
          this.fetchedAuthors = res;
        }
        );
    // this.getTopicById();
   

    // console.log(this.f.standardId.value);
    // console.log(this.f.subjectId.value);
      this.route.params.subscribe(param => {
          //this.questionId = param['id'];
          this.apiqid = param['id'];
          console.log("Retrived param id from routes: "+this.apiqid);
          
          this.student.getQuestionById(this.apiqid).subscribe(
              res => {
                  console.log("retrived question detail from server: ", res);
                  this.questionObject = res;
                  console.log("data from object: ", this.questionObject);
                  let stId = this.questionObject.standardId;
                  let subId = this.questionObject.subjectId;
                    if(stId !== "" && subId !==""){
                      this.student.getTopicById(stId, subId).subscribe(
                        res => {
                        
                          console.log("got the topics from db. ", res);
                          this.fetchedTopics = res;
                        },
                        err => console.log("Error occured while fetching topics from db.")
                      )
                    }
              },
              err => console.log("Error occured while retriving question form server. please try again later.", err)
          )
      });
    this.registerForm = this.formBuilder.group({
      qid: ['', Validators.required],
      userId: [sessionStorage.getItem('userid'), Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      level: ['', Validators.required],
      standardId: ['', Validators.required],
      subjectId: ['', Validators.required],
      topicId: ['', Validators.required],
      concept: ['', Validators.required],
      chapter: [''],
      question: ['',Validators.required],
      // description: ['', Validators.required],
      option_A: ['', Validators.required],
      option_B: ['', Validators.required],
      option_C: ['', Validators.required],
      option_D: ['', Validators.required],
      quality: ['',Validators.required],
      solutionDesc: ['', Validators.required],
      examsAppeared: [''],
      authorID:[0,Validators.required],
      appYear: [''],
      correctOption : ['',Validators.required]
      
      // syllabus: ['', Validators.required],
      // reference: ['', Validators.required]
    });
    this.initialFormValues = this.registerForm.value;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  showMsg: boolean = false;


  onSubmit(event){
    this.alert = true;
      console.log(this.registerForm.value);
      console.log(this.registerForm.get('authorID').value);
      if(this.registerForm.get('authorID').value==0){
        this.snackbar.open("select author",'close');
      }else{
        this.teacher.updateQuestion(this.registerForm.value)
      .subscribe(
          (data:any)=>
          {
              console.log(data);
             if(data.status){
              this.snackbar.open('Question Updated Successfully' , 'close', {duration: 3000});
             }
          }
      );
      }
  }

closeAlert(){
  this.alert = false
}
  onReset() {
    this.submitted = false;
    this.registerForm.reset(this.initialFormValues);
  }
 
getSubjectsById(){
  let stId = this.registerForm.get('standardId').value;
  if(stId !==""){
    this.student.getSubjectsById(stId).subscribe(
      res =>{
        console.log("got the subjects from db.",res);
        this.fetchedSubjects = res;
      },
      err => console.log("Error occured while fetching subjects from db.")
    )
  }
}

getStandards(){
  this.student.getStandards()
  .subscribe(
    data=>
    {
      console.log(data);
      this.standards=data;
    }
  );
}

fetchedTopics = <any>[];
getTopicById(){
  let stId = this.f.standardId.value;
  let subId = this.f.subjectId.value;
  // let stId = this.questionObject.standardId;
  // let subId = this.questionObject.subjectId;
    if(stId !== "" && subId !==""){
      this.student.getTopicById(stId, subId).subscribe(
        res => {
        
          console.log("got the topics from db. ", res);
          this.fetchedTopics = res;
        },
        err => console.log("Error occured while fetching topics from db.")
      )
    }
  }


}
