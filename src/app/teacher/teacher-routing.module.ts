import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectExpert1Component } from '../admin/subject-expert1/subject-expert1.component';
import { SubjectExpert2Component } from '../admin/subject-expert2/subject-expert2.component';
import { AddDiscussionComponent } from '../common/components/add-discussion/add-discussion.component';
import { EditQuestionComponent } from '../common/components/edit-question/edit-question.component';
import { ForumComponent } from '../common/components/forum/forum.component';
import { ForumsComponent } from '../common/components/forums/forums.component';
import { AuthGuard } from '../guards/auth.guard';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AssessUserComponent } from './assess-user/assess-user.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssignmentReportComponent } from './assignment-report/assignment-report.component';
import { PostAssignmentsComponent } from './post-assignments/post-assignments.component';
import { PostTestsComponent } from './post-tests/post-tests.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  { path: '', component: TeacherComponent,
  children: [
    {path: 'assignments', component: PostAssignmentsComponent,canActivate:[AuthGuard]},
    {path: 'tests', component: PostTestsComponent,canActivate:[AuthGuard]},
    {path: 'forums' , component: ForumsComponent,canActivate:[AuthGuard]},
    {path: 'forum/:id' , component: ForumComponent,canActivate:[AuthGuard]},
    {path: 'add-discussion' , component: AddDiscussionComponent,canActivate:[AuthGuard]},
    {path: 'add-question' , component: AddQuestionComponent,canActivate:[AuthGuard]},
    {path: 'edit-question/:id' , component: EditQuestionComponent,canActivate:[AuthGuard]},
    {path: 'subject-expert1' , component: SubjectExpert1Component,canActivate:[AuthGuard]},
    {path: 'subject-expert2' , component: SubjectExpert2Component,canActivate:[AuthGuard]},
    {path: 'assessment' , component: AssessmentComponent,canActivate:[AuthGuard]},
    { path:'assignment-report/:id', component:AssignmentReportComponent,canActivate:[AuthGuard] },
    { path:'assess-user/:id/:userid', component:AssessUserComponent,canActivate:[AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
