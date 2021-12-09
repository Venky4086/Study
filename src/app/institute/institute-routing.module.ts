import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AddTimeTableComponent } from './add-time-table/add-time-table.component';
import { AddTimingsComponent } from './add-timings/add-timings.component';
import { InstituteDashboardComponent } from './institute-dashboard/institute-dashboard.component';
import { InstituteComponent } from './institute.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  { path: '', component: InstituteComponent,
  children:[   
    {path: 'dashboard', component: InstituteDashboardComponent,canActivate:[AuthGuard]},
    {path: 'teachers', component: TeachersComponent,canActivate:[AuthGuard]},
    {path: 'students', component: StudentsComponent,canActivate:[AuthGuard]}, 
    {path: 'time-table', component: AddTimeTableComponent,canActivate:[AuthGuard]},
    {path: 'add-timings', component: AddTimingsComponent,canActivate:[AuthGuard]}, 
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
