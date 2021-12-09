import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatSharedModule } from '../common/mat-shared/mat-shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddDailyChallengesComponent } from './add-daily-challenges/add-daily-challenges.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AllQasInfoComponent } from './all-qas-info/all-qas-info.component';
import { GeneralAdminComponent } from './general-admin/general-admin.component';
import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
import { PagesDetailsComponent } from './pages-details/pages-details.component';
import { SubjectExpert1Component } from './subject-expert1/subject-expert1.component';
import { SubjectExpert2Component } from './subject-expert2/subject-expert2.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { UserApprovalComponent } from './user-approval/user-approval.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PipesModule } from '../common/pipes/pipes.module';
import { KatexModule } from 'ng-katex';
// import { AddDailyChallengesComponent } from './add-daily-challenges/add-daily-challenges.component';
// import { AddRoleComponent } from './add-role/add-role.component';
// import { AllQasInfoComponent } from './all-qas-info/all-qas-info.component';
// import { UserDetailsComponent } from './user-details/user-details.component';
// import { AllUsersComponent } from './all-users/all-users.component';
// import { GeneralAdminComponent } from './general-admin/general-admin.component';
// import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
// import { PagesDetailsComponent } from './pages-details/pages-details.component';
// import { SubjectExpert1Component } from './subject-expert1/subject-expert1.component';
// import { SubjectExpert2Component } from './subject-expert2/subject-expert2.component';
// import { SuperAdminComponent } from './super-admin/super-admin.component';
// import { UserApprovalComponent } from './user-approval/user-approval.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AllUsersComponent,
    AddDailyChallengesComponent,
    AddRoleComponent,
    AllQasInfoComponent,
    GeneralAdminComponent,
    ManageInstitutesComponent,
    PagesDetailsComponent,
    SubjectExpert1Component,
    SubjectExpert2Component,
    SuperAdminComponent,
    UserApprovalComponent,
    UserDetailsComponent,
    // AddDailyChallengesComponent,
    // AddRoleComponent,
    // AllQasInfoComponent,
    // AllUsersComponent,
    // GeneralAdminComponent,
    // ManageInstitutesComponent,
    // PagesDetailsComponent,
    // SubjectExpert1Component,
    // SubjectExpert2Component,
    // SuperAdminComponent,
    // UserApprovalComponent,
    // UserDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSharedModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    KatexModule
  ]
})
export class AdminModule { }
