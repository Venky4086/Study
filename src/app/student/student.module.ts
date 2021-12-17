import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { MatSharedModule } from '../common/mat-shared/mat-shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudyComponent } from './study/study.component';
import { TopicsComponent } from './topics/topics.component';
import { PracticeTestComponent } from './practice-test/practice-test.component';
import { PractiseComponent } from './practise/practise.component';
import { TestComponent } from './test/test.component';
import { PractiseQuestionComponent } from './practise-question/practise-question.component';
import { KatexModule } from 'ng-katex';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PracticeHeaderComponent } from './practice-header/practice-header.component';
import { QdiscussionComponent } from './qdiscussion/qdiscussion.component';
import { QhistoryComponent } from './qhistory/qhistory.component';
import { QsolutionComponent } from './qsolution/qsolution.component';
import { BrowserModule } from '@angular/platform-browser';
import { PracticeMathsAccuracyComponent } from './practice-maths-accuracy/practice-maths-accuracy.component';
import { DiscusiionboardAccuracyComponent } from './discusiionboard-accuracy/discusiionboard-accuracy.component';
import { SolutionsDashboardComponent } from './solutions-dashboard/solutions-dashboard.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { PipesModule } from '../common/pipes/pipes.module';
import { DailyChallengeComponent } from './daily-challenge/daily-challenge.component';
import { TestSubmitComponent } from './test-submit/test-submit.component';
import { TaskComponent } from './task/task.component';
import { TestAccuracyComponent } from './test-accuracy/test-accuracy.component';
import { DialyChallengeQuestionViewComponent } from './daily-challenge-question-view/daily-challenge-question-view.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../services/loader.interceptor';
import { TimeTableComponent } from './time-table/time-table.component';
import { ChallengeAccuracyComponent } from './challenge-accuracy/challenge-accuracy.component';
import { DcReportComponent } from './dc-report/dc-report.component';
import { Terms2Component } from './terms2/terms2.component';


@NgModule({
  declarations: [
    StudentComponent,
    StudentDashboardComponent, 
    StudentProfileComponent, 
    StudyComponent, 
    TopicsComponent, 
    PracticeTestComponent, 
    PractiseComponent, 
    TestComponent, 
    PractiseQuestionComponent, 
    PracticeHeaderComponent, 
    QdiscussionComponent,
    QhistoryComponent,
    QsolutionComponent,
    PracticeMathsAccuracyComponent,
    DiscusiionboardAccuracyComponent,
    SolutionsDashboardComponent,
    AssignmentsComponent,
    AssignmentComponent,
    DailyChallengeComponent,
    DialyChallengeQuestionViewComponent,
    TestSubmitComponent,
    TaskComponent,
    TestAccuracyComponent,
    TimeTableComponent,
    ChallengeAccuracyComponent,
    DcReportComponent,
    Terms2Component
    // LoaderComponent
  ],
  imports:[
    CommonModule,
    StudentRoutingModule,
    MatSharedModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    KatexModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding":3,
      "radius": 20,
      "maxPercent": 200,
      "units": "%",
      "unitsFontSize": "14",
      "outerStrokeWidth": 5,
      "titleFontSize": "16",
      "titleFontWeight": "900",
      "subtitleColor": "#483500",
      "imageHeight": 141,
      "showSubtitle": false,
      "showUnits": true,
      "showInnerStroke": false,
      "startFromZero": false
    }),
    MatSnackBarModule,
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class StudentModule { }
