import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-add-timings',
  templateUrl: './add-timings.component.html',
  styleUrls: ['./add-timings.component.css']
})
export class AddTimingsComponent implements OnInit {

  totalPeriods = [1,2,3,4,5,6,7,8,9,10]; 
  startTimes = [];
  endTimes = [];
  isTimetable : boolean = false;
  timetable : any;

  constructor(private institute:InstituteService,private snackbar:MatSnackBar) { }

  startTime : any;
  endTime : any;

  ngOnInit(): void {
    this.institute.getTimings(sessionStorage.getItem('userid')).subscribe(
      (data:any)=>{
        console.log(data);
        if(data){
          this.isTimetable = true;
          this.timetable = data[0];
        }
      }
    );
  }

  createTimings(){
    console.log(this.startTimes,this.endTimes);
    let data = {
      "instiId_FK": sessionStorage.getItem('userid'),
      "period1": this.startTimes[0]+ '-' +this.endTimes[0],
      "period10": this.startTimes[9]+ '-' +this.endTimes[9],
      "period2": this.startTimes[1]+ '-' +this.endTimes[1],
      "period3": this.startTimes[2]+ '-' +this.endTimes[2],
      "period4": this.startTimes[3]+ '-' +this.endTimes[3],
      "period5": this.startTimes[4]+ '-' +this.endTimes[4],
      "period6": this.startTimes[5]+ '-' +this.endTimes[5],
      "period7": this.startTimes[6]+ '-' +this.endTimes[6],
      "period8": this.startTimes[7]+ '-' +this.endTimes[7],
      "period9": this.startTimes[8]+ '-' +this.endTimes[8],
    };
    let array : any[] = [
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[0]+ '-' +this.endTimes[0],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[1]+ '-' +this.endTimes[1],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[2]+ '-' +this.endTimes[2],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[3]+ '-' +this.endTimes[3],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[4]+ '-' +this.endTimes[4],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[5]+ '-' +this.endTimes[5],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[6]+ '-' +this.endTimes[6],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[7]+ '-' +this.endTimes[7],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[8]+ '-' +this.endTimes[8],
     },
     {
      "instiId_FK": sessionStorage.getItem('userid'),"timeSlot": this.startTimes[9]+ '-' +this.endTimes[9],
     },
    ]
    console.log(data);
    console.log(array);
    this.institute.postTimings(array).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status){
          this.snackbar.open("Created successfully",'close',{duration: 3000})
        }
      },(error)=>{
        console.error(error);
      });
  }

  getTime(i){
    switch (i) {
      case 1:
        return this.timetable.period1;
      case 2:
        return this.timetable.period2;
      case 3:
        return this.timetable.period3;
      case 4:
        return this.timetable.period4;
      case 5:
        return this.timetable.period5;
      case 6:
        return this.timetable.period6;
      case 7:
        return this.timetable.period7;
      case 8:
        return this.timetable.period8;
      case 9:
        return this.timetable.period9;
      case 10:
        return this.timetable.period10;
    }
  }

}
