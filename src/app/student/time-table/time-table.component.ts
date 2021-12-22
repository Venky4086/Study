import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Location } from '@angular/common';
var newarr = [];
@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  weekdays : any;timeslots : any;timetable : any;
  MainData: any;
  listOfInfo: any;

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
        var data_test = data.timeTableInfoDTO;
        var testobj = {};
        var key = "test";
        testobj[key] = "";
        
        console.log('testobj',testobj);
        for(var i=0 ; i<data_test.length; i++){
          var days = {};
          var day_key = data_test[i].weekDays;
          for(var j=0; j< day_key.length ; j++){  
            
            days[day_key[j]] = data_test[i].listOfInfo;
            console.log('day_keys',days[day_key[j]]);
            // var subjectandteacher = {};
            // var st_key = "subject_teacher";
            for(var a=0; a<days[day_key[j]].length; a+=2){
              var subjectandteacher = {};
              var st_key = "subject_teacher";
              newarr.push({subject:days[day_key[j]][a],teacher:days[day_key[j]][a+1]});
              console.log('newarr',newarr);
              newarr = newarr.filter((value, index, self) =>
              index === self.findIndex((t) => (
                t.subject === value.subject && t.teacher === value.teacher
              ))
)
              subjectandteacher[st_key]= newarr;
              
            }
          }
          
          //days[day_key] = data_test[i].listOfInfo;
          console.log('day_keys',days);
          console.log('data_test',data_test[i]);
          console.log('subjectandteacher',subjectandteacher);
          console.log('data_days_week_days',data_test[i].weekDays);
          console.log('data_test_listOfInfo',data_test[i].listOfInfo);
        }
        return;
        this.timeslots = data.timeSlotsDTO;
        this.timetable = data.timeTableInfoDTO;
        for (let index = 0; index < this.timetable.length; index++) {
          this.weekdays = this.timetable[index].weekDays;
          console.log(this.weekdays);
          this.listOfInfo = this.timetable[index].listOfInfo;
          console.log(this.listOfInfo);
        }
        // this.weekdays = data.weekDays;
      }
    );
  }

  goBack(){
    this._location.back();
  }

}
