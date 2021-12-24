import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { MatSharedModule } from '../common/mat-shared/mat-shared.module';
import { PostAssignmentsComponent } from './post-assignments/post-assignments.component';
import { PostAssignmentsDialogComponent } from './post-assignments-dialog/post-assignments-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostTestsDialogComponent } from './post-tests-dialog/post-tests-dialog.component';
import { PostTestsComponent } from './post-tests/post-tests.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssignmentReportComponent } from './assignment-report/assignment-report.component';
import { AssessUserComponent } from './assess-user/assess-user.component';
import { FormusApprovalComponent } from './formus-approval/formus-approval.component';


@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDashboardComponent,
    TeacherProfileComponent,
    PostAssignmentsComponent,
    PostAssignmentsDialogComponent,
    PostTestsComponent,
    PostTestsDialogComponent,
    AddQuestionComponent,
    AssessmentComponent,
    AssignmentReportComponent,
    AssessUserComponent,
    FormusApprovalComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatSharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
