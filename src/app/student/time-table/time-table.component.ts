import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  weekdays : any;timeslots : any;timetable : any;
  MainData: any;

  constructor(private _location:Location, private student:StudentService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('instituteId'));
    console.log(sessionStorage.getItem('standard'));
    let section = "A";
    if(sessionStorage.getItem('section')){
      section = sessionStorage.getItem('section');
    }
    this.student.getTimeTable(sessionStorage.getItem('instituteId'),sessionStorage.getItem('standard'),section).subscribe(
      (data:any)=>{
        console.log(data);
        this.MainData = data;
        console.log(data.timeSlotsDTO);
        console.log(data.timeTableInfoDTO);
        this.weekdays = data.weekDays;
        this.timeslots = data.timeSlotsDTO;
        this.timetable = data.timeTableInfoDTO[0];
      }
    );
  }

  goBack(){
    this._location.back();
  }

}
