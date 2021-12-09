import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-manage-institutes',
  templateUrl: './manage-institutes.component.html',
  styleUrls: ['./manage-institutes.component.css']
})
export class ManageInstitutesComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebutton2') closebutton2;
  allInstitutes: any;
  uploadForm: FormGroup; 
  tName:any;
  iName:any;
  iDate:any;
  formInst: FormGroup;
  response: any;
  yesterday:any;
  alert:boolean=false;
  idToBeDeleted:any;

  constructor(private router:Router, private admin:AdminService,private formBuilder: FormBuilder,public datepipe:DatePipe,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    this.yesterday =this.datepipe.transform(dte, 'yyyy-MM-dd');
    this.admin.allInstiInfo().subscribe(
      data =>{
        this.allInstitutes = data;
        console.log('all institutes',data);
      }
    )

    this.formInst=new FormGroup({
      'hod':new FormControl('',Validators.required),
      'institutionName':new FormControl('',Validators.required),
      'estDate':new FormControl('',Validators.required)
    });
  }



  onSubmit(){
    console.log(this.formInst.value);
    this.admin.addInstituteInfo(this.formInst.value).subscribe(
      res=>{
        console.log('add institutes info',res);
        this.response=res;
        console.log(this.response.status);
        if(this.response.status){
          this.closebutton.nativeElement.click();
          this.snackbar.open('Instistute Added','close');
          this.formInst.reset();
          this.admin.allInstiInfo().subscribe(
            data =>{
              this.allInstitutes = data;
              console.log('all institutes',data);
            }
          )
        }

      }
    )
    
  }

  openModel(id){
    document.getElementById("openModalButton").click();
    console.log(id);
    this.idToBeDeleted=id;
  }

  deleteInst(){
    this.admin.deleteInstiInfo(this.idToBeDeleted).subscribe(
      (data:any)=>{
        console.log('data');
        console.log(data);
        if(data.status){
          this.closebutton2.nativeElement.click();
          this.snackbar.open("Institute deleted",'close');
        }
        this.admin.allInstiInfo().subscribe(
          data =>{
            this.allInstitutes = data;
            console.log('all institutes',data);
          }
        )
      }
    )
  }
  // onSubmit() {
  //   this.modalService.dismissAll();
  //   console.log("res:", this.editProfileForm.getRawValue());
  //  }
  //  openModal(targetModal, info) {
  //   this.modalService.open(targetModal, {
  //    centered: true,
  //    backdrop: 'static'
  //   });
  

}
