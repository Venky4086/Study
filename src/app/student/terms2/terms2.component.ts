import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-terms2',
  templateUrl: './terms2.component.html',
  styleUrls: ['./terms2.component.css']
})
export class Terms2Component implements OnInit {
  termsForm: FormGroup;
  submitted = false;
  checked: boolean = false;
  standardName: any;
  subjectName: any;
  topicName: any;
  toggleBool: boolean=true;
  constructor(private router : Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.standardName = sessionStorage.getItem('standardName');
    this.subjectName = sessionStorage.getItem('subjectName');
    this.topicName = sessionStorage.getItem('topicName');

    this.termsForm = this.formBuilder.group({
      termscheckbox: ['', Validators.required]
  });
  

 
}

goToStandards(){
  this.router.navigate(['/standards'])
}

goToSubjects(){
  this.router.navigate(['/subjects'])
}

goToTopics(){
  // this.router.navigate(['/topics'])
  this.router.navigate(['/practice/all-topics-list',sessionStorage.getItem('standardId'),sessionStorage.getItem('subjectId'),sessionStorage.getItem('topicId'),sessionStorage.getItem('subjectName')]);

}

changeEvent(event) {
  if (event.target.checked) {
      this.toggleBool= false;
  }
  else {
      this.toggleBool= true;
  }
}
checkforqs(){
  this.router.navigate(['/student/test']);
}
}