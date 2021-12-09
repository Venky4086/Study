import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { InstituteService } from 'src/app/services/institute.service';
import { StudentInfoDialogComponent } from '../student-info-dialog/student-info-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit,AfterViewInit {
  
  dataSource = new MatTableDataSource();
  displayedColumns = ['isId', 'studentName', 'standard', 'section'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Students : [] ;

  constructor(private dialog:MatDialog,private institute:InstituteService) { }

  ngOnInit(): void {
    this.institute.getStudentsByInstitute(sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Students=data;
        this.dataSource = new MatTableDataSource(this.Students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(teacher?:any): void {
    const dialogRef = this.dialog.open(StudentInfoDialogComponent, {
      width: '950px',
      height:'300px',
      data: teacher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      this.institute.getStudentsByInstitute(sessionStorage.getItem('userid'))
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.Students = data;
          this.dataSource = new MatTableDataSource(this.Students);
        }
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
