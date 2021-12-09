import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dc-report',
  templateUrl: './dc-report.component.html',
  styleUrls: ['./dc-report.component.css']
})
export class DcReportComponent implements OnInit {

  report :any;

  constructor(private _location:Location, private student:StudentService,private router: Router,private route:ActivatedRoute,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getDcReport();
  }

  getDcReport(){
    this.student.getDcReportByUserId(this.route.snapshot.params.id,sessionStorage.getItem('userid')).subscribe(
      (data:any)=>{
        console.log(data);
        this.report  = data;
      }
    );
  }

  goBack(){
    this._location.back();
  }

}
