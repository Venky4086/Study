import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-solutions-dashboard',
  templateUrl: './solutions-dashboard.component.html',
  styleUrls: ['./solutions-dashboard.component.css']
})
export class SolutionsDashboardComponent implements OnInit {
  solution: any=[];
  userId: any;
  tableSolutions: any=[];

  constructor(private _location:Location, private router:Router, private student:StudentService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userid");
    this.student.getSolutionByUser(this.userId).subscribe(
      data =>{
        console.log(data);
        this.solution = data;
        this.tableSolutions = this.solution.solutionsInfo;
      }
    )
  
  }
  detailedSolution(dQid){
    this.router.navigate(['student/forum',dQid]);
  }

  goBack(){
    this._location.back();
  }


  
}
