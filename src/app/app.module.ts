import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSharedModule } from './common/mat-shared/mat-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ForumsComponent } from './common/components/forums/forums.component';
import { ForumComponent } from './common/components/forum/forum.component';
import { KatexModule } from 'ng-katex';
import { PostAssignmentsDialogComponent } from './teacher/post-assignments-dialog/post-assignments-dialog.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AddDiscussionComponent } from './common/components/add-discussion/add-discussion.component';
import { AuthGuard } from './guards/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './services/loader.interceptor';
import { SwiperModule } from 'swiper/angular';
import { EditQuestionComponent } from './common/components/edit-question/edit-question.component';
@NgModule({
  declarations: [
    AppComponent,
    ForumsComponent,
    ForumComponent,
    AddDiscussionComponent,
    EditQuestionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSharedModule,
    HttpClientModule,
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
    AgGridModule,
    NgxSpinnerModule,
    SwiperModule
  ],
  exports: [
    MatSharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AgGridModule,
    NgxSpinnerModule,
    SwiperModule
  ],
  providers: [
    AuthGuard,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
