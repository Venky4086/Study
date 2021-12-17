import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit {

  standards:any;
  subjects:any;
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
  fetchedAuthors:any=[];

  constructor(private formBuilder: FormBuilder, private teacher: TeacherService, private student:StudentService, private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit(): void {

    // retrive authors list
    this.teacher.getTeachers().subscribe(
      res=>{
        console.log("got the authors from db",res);
        this.fetchedAuthors = res;
      }
      );


    this.student.getStandards()
    .subscribe(
      data=>
      {
        console.log(data);
        this.standards=data;
      }
    );
    

    this.registerForm = this.formBuilder.group({
      userId:[sessionStorage.getItem('userid')],
      title: ['', Validators.required],
      type: ['', Validators.required],
      level: ['', Validators.required],
      standardId: ['', Validators.required],
      subjectId: ['', Validators.required],
      topicId: ['', Validators.required],
      concept: ['', Validators.required],
      chapter: [''],
      authorID:[0,Validators.required],
      question: ['',Validators.required],
      // description: ['', Validators.required],
      option_A: ['', Validators.required],
      option_B: ['', Validators.required],
      option_C: ['', Validators.required],
      option_D: ['', Validators.required],
      quality: ['',Validators.required],
      solutionDesc: ['', Validators.required],
      examsAppeared: [''],
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



  onSubmit(event) {
    this.alert = true;
    event.preventDefault();
    this.submitted = true;
    const postObject = {
      ...this.registerForm.value
      // "correctOption" : this.correctOptionsArray.toString(),
    }
    console.log(postObject);
    console.log("complete post object is: ", this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid || this.registerForm.get('authorID').value==0) {
      return;
    }else {
      console.log("All the validations are valid, please wait posting the question to server...");
      this.teacher.postQuestion(postObject).subscribe(
        (res:any) => {
          console.log(res);
          this.registerForm.reset();
          this.submitted = false;
          // this.router.navigate(['/pqtable']);
          this.showMsg= true;
          if(res.status){
            this.snackbar.open('Question Added Successfully..' , 'close', {duration: 3000});
          }

        },
        err => console.log("Error occured while posting question to server: ", err) 
      );
      this.registerForm.reset();
      this.submitted = false;   
    }

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
closeAlert(){
  this.alert = false
}
  onReset() {
    this.submitted = false;
    this.registerForm.reset(this.initialFormValues);
  }
 
fetchedSubjects = <any>[];

getSubjectsById(){
  let stId=this.registerForm.get('standardId').value;
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

fetchedTopics = <any>[];
getTopicById(){
  let stId=this.registerForm.get('standardId').value;
  let subId=this.registerForm.get('subjectId').value;
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

  

//   updateCorrectOptions(event) {
//     console.log(event);
//     event.target.checked ? this.correctOptionsArray.push(event.target.id) : this.correctOptionsArray.splice(this.correctOptionsArray.indexOf(event.target.id), 1);
//     console.log(this.correctOptionsArray.toString());
// }
}