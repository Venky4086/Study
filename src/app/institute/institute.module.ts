import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteRoutingModule } from './institute-routing.module';
import { InstituteComponent } from './institute.component';
import { InstituteDashboardComponent } from './institute-dashboard/institute-dashboard.component';
import { MatSharedModule } from '../common/mat-shared/mat-shared.module';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherInfoDialogComponent } from './teacher-info-dialog/teacher-info-dialog.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students/students.component';
import { StudentInfoDialogComponent } from './student-info-dialog/student-info-dialog.component';
import { AddTimeTableComponent } from './add-time-table/add-time-table.component';
import { AddTimingsComponent } from './add-timings/add-timings.component';


@NgModule({
  declarations: [
    InstituteComponent,
    InstituteDashboardComponent,
    TeachersComponent,
    TeacherInfoDialogComponent,
    StudentsComponent,
    StudentInfoDialogComponent,
    AddTimeTableComponent,
    AddTimingsComponent
  ],
  imports: [
    CommonModule,
    InstituteRoutingModule,
    MatSharedModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstituteModule { }
