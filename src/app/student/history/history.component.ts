import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  History: Object;

  constructor(private studentservice:StudentService) { }
 userId = sessionStorage.getItem('userid')
  ngOnInit(): void {
    this.GetHistory();
  }
  GetHistory(){
    this.studentservice.getHistory(this.userId).subscribe((res)=>{
      console.log(res);
      this.History = res;
    },(error)=>{
      console.error(error);
    })
  }
}
