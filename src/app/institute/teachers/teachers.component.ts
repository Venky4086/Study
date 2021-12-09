import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { InstituteService } from 'src/app/services/institute.service';
import { TeacherInfoDialogComponent } from '../teacher-info-dialog/teacher-info-dialog.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit,AfterViewInit {

  dataSource = new MatTableDataSource();
  displayedColumns = ['itId', 'teacherName', 'exp'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Teachers : [] ;
  tname : any ;
  tsubject : any ;
  texperience : any ;
  selectedData = [] ;

  constructor(private router:Router,private institute:InstituteService,private snackbar:MatSnackBar,public dialog: MatDialog,private http:HttpClient) { }

  ngOnInit() {
    this.institute.getTeachersByInstitute(sessionStorage.getItem('userid'))
    .subscribe(
      (data:any)=>
      {
        console.log(data);
        this.Teachers=data;
        this.dataSource = new MatTableDataSource(this.Teachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(teacher?:any): void {
    const dialogRef = this.dialog.open(TeacherInfoDialogComponent, {
      width: '950px',
      height:'300px',
      data: teacher
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      this.institute.getTeachersByInstitute(sessionStorage.getItem('userid'))
      .subscribe(
        (data:any)=>{
          console.log(data);
          this.Teachers = data;
          this.dataSource = new MatTableDataSource(this.Teachers);
        }
      );
    });
  }

  viewTeacher(){
    this.router.navigate(['/teacher-details'])
  }

}
