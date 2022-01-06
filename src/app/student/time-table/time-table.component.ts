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
  timetablearr = [];
  timeSlotsDTO: any;
  timeTableInfoDTO: any;
  listOfInfo_Monday: any;
  monday_even: any;
  monday_odd: any;
  monday_arr = [];
  monday_arr1 = [];
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
        this.timeSlotsDTO = data.timeSlotsDTO;
        console.log('timeslotsDTO',this.timeSlotsDTO);
        this.timeTableInfoDTO = data.timeTableInfoDTO;
        
        for (let index = 0; index < this.timeTableInfoDTO.length; index++) {
          this.weekdays = this.timeTableInfoDTO[index].weekDays;
          console.log(this.weekdays);
          for (let index = 0; index < this.weekdays.length; index++) {
            console.log(this.weekdays[index]);
            if(this.weekdays[index] == 'monday'){
              this.listOfInfo_Monday = this.timeTableInfoDTO[index].listOfInfo;
               for (let index = 0; index < this.listOfInfo_Monday.length;index ++) {
                console.log(this.listOfInfo_Monday);
                console.log(index+2);
                if(index+2){
                  this.monday_even = this.listOfInfo_Monday;
                  console.log(this.monday_even);
                }
                else{
                  this.monday_odd = this.listOfInfo_Monday;
                  console.log(this.monday_odd);
                }
                this.monday_arr.push({subject:this.monday_even,teacher:this.monday_odd});
                // this.monday_arr= this.monday_arr1.reduce((acc, current) => {
                //   const x = acc.find(item => item.teacher === current.id);
                //   if (!x) {
                //     return acc.concat([current]);
                //   } else {
                //     return acc;
                //   }
                // }, []);
               }
              console.log(this.listOfInfo_Monday);
            }
          }
        }

      return
        var data_test = data.timeTableInfoDTO;
        var testobj = {};
        var key = "test";
        testobj[key] = "";
        
        //console.log('testobj',testobj);
        for(var i=0 ; i<data_test.length; i++){
          var days = {};
          var day_key = data_test[i].weekDays;
          for(var j=0; j< day_key.length ; j++){  
            
            days[day_key[j]] = data_test[i].listOfInfo;
            //console.log('day_keys',days[day_key[j]]);
            // var subjectandteacher = {};
            // var st_key = "subject_teacher";
            for(var a=0; a<days[day_key[j]].length; a+=2){
              var subjectandteacher = {};
              var st_key = "subject_teacher";
              newarr.push({subject:days[day_key[j]][a],teacher:days[day_key[j]][a+1]});
              //console.log('newarr',newarr);
              newarr = newarr.filter((value, index, self) =>
              index === self.findIndex((t) => (
                t.subject === value.subject && t.teacher === value.teacher
              ))
)
              subjectandteacher[st_key]= newarr;
            }
            days[day_key[j]]=subjectandteacher;
          }
          
          //days[day_key] = data_test[i].listOfInfo;
          //console.log('daysobj',days);
          // console.log('data_test',data_test[i]);
          // console.log('subjectandteacher',subjectandteacher);
          // console.log('data_days_week_days',data_test[i].weekDays);
          // console.log('data_test_listOfInfo',data_test[i].listOfInfo);
        }
        this.timetablearr.push({time:data.timeSlotsDTO,teacherandsuject:days});
        console.log('timetable',this.timetablearr);
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
