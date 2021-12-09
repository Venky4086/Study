import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralAdminComponent } from '../admin/general-admin/general-admin.component';
import { SubjectExpert1Component } from '../admin/subject-expert1/subject-expert1.component';
import { SubjectExpert2Component } from '../admin/subject-expert2/subject-expert2.component';
import { SuperAdminComponent } from '../admin/super-admin/super-admin.component';
import { AddDiscussionComponent } from '../common/components/add-discussion/add-discussion.component';
import { EditQuestionComponent } from '../common/components/edit-question/edit-question.component';
import { ForumComponent } from '../common/components/forum/forum.component';
import { ForumsComponent } from '../common/components/forums/forums.component';
import { AuthGuard } from '../guards/auth.guard';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ChallengeAccuracyComponent } from './challenge-accuracy/challenge-accuracy.component';
import { DialyChallengeQuestionViewComponent } from './daily-challenge-question-view/daily-challenge-question-view.component';
import { DailyChallengeComponent } from './daily-challenge/daily-challenge.component';
import { DcReportComponent } from './dc-report/dc-report.component';
import { DiscusiionboardAccuracyComponent } from './discusiionboard-accuracy/discusiionboard-accuracy.component';
import { PracticeMathsAccuracyComponent } from './practice-maths-accuracy/practice-maths-accuracy.component';
import { PracticeTestComponent } from './practice-test/practice-test.component';
import { PractiseQuestionComponent } from './practise-question/practise-question.component';
import { PractiseComponent } from './practise/practise.component';
import { QdiscussionComponent } from './qdiscussion/qdiscussion.component';
import { QhistoryComponent } from './qhistory/qhistory.component';
import { QsolutionComponent } from './qsolution/qsolution.component';
import { SolutionsDashboardComponent } from './solutions-dashboard/solutions-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentComponent } from './student.component';
import { StudyComponent } from './study/study.component';
import { TaskComponent } from './task/task.component';
import { TestAccuracyComponent } from './test-accuracy/test-accuracy.component';
import { TestSubmitComponent } from './test-submit/test-submit.component';
import { TestComponent } from './test/test.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  { path: '', component: StudentComponent,
  children:[   
    {path: 'dashboard', component: StudentDashboardComponent,canActivate:[AuthGuard]},
    {path: 'profile', component: StudentProfileComponent,canActivate:[AuthGuard]},
    {path: 'study', component: StudyComponent,canActivate:[AuthGuard]} ,
    {path: 'topics/:standardId/:subjectId/:standard/:subject',component:TopicsComponent,canActivate:[AuthGuard]},
    {path: 'p-or-t', component: PracticeTestComponent,canActivate:[AuthGuard]},
    {path: 'topics',component:TopicsComponent,canActivate:[AuthGuard]},
    {path: 'practise', component: PractiseComponent,canActivate:[AuthGuard]},
    {path: 'practise-question/:id', component: PractiseQuestionComponent,canActivate:[AuthGuard]},
    {path: 'dc-report/:id', component: DcReportComponent,canActivate:[AuthGuard]},
    {path: 'qhistory', component: QhistoryComponent,canActivate:[AuthGuard]},
    {path: 'qsolution', component: QsolutionComponent,canActivate:[AuthGuard]},
    {path: 'qdiscussion', component: QdiscussionComponent,canActivate:[AuthGuard]},
    {path: 'test', component: TestComponent,canActivate:[AuthGuard]},
    {path: 'forums' , component: ForumsComponent,canActivate:[AuthGuard]},
    {path: 'forum/:id' , component: ForumComponent,canActivate:[AuthGuard]},
    {path: 'edit-question/:id' , component: EditQuestionComponent,canActivate:[AuthGuard]},
    {path: 'add-discussion' , component: AddDiscussionComponent,canActivate:[AuthGuard]},
    {path : 'pmathsaccuracy/:subjectId/:subject/:standard', component:PracticeMathsAccuracyComponent,canActivate:[AuthGuard]},
    {path : 'testaccuracy/:subjectId/:subject/:stId',component:TestAccuracyComponent,canActivate:[AuthGuard]},
    {path : 'challenge-accuracy/:subjectId/:subject/:stId',component:ChallengeAccuracyComponent,canActivate:[AuthGuard]},
    {path : 'solutions-report',component:SolutionsDashboardComponent,canActivate:[AuthGuard]},
    {path : 'discussionaccuracy' ,component:DiscusiionboardAccuracyComponent,canActivate:[AuthGuard]},
    {path : 'assignments' ,component:AssignmentsComponent,canActivate:[AuthGuard]},
    {path : 'assignment/:id' ,component:AssignmentComponent,canActivate:[AuthGuard]},
    {path : 'daily-challenge' ,component:DailyChallengeComponent,canActivate:[AuthGuard]},
    {path : 'dchallengeqview/:qid' ,component:DialyChallengeQuestionViewComponent,canActivate:[AuthGuard]},
    {path : 'subject-expert1' ,component:SubjectExpert1Component,canActivate:[AuthGuard]},
    {path : 'general-admin' ,component:GeneralAdminComponent,canActivate:[AuthGuard]},
    {path : 'super-admin' ,component:SuperAdminComponent,canActivate:[AuthGuard]},
    {path : 'subject-expert2' ,component:SubjectExpert2Component,canActivate:[AuthGuard]},
    {path : 'testsubmit/:sptrId' ,component:TestSubmitComponent,canActivate:[AuthGuard]},
    {path : 'task' ,component:TaskComponent,canActivate:[AuthGuard]},
    {path : 'time-table' ,component:TimeTableComponent,canActivate:[AuthGuard]},
  ]
  
  
  
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
