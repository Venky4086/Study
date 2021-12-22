import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDailyChallengesComponent } from './add-daily-challenges/add-daily-challenges.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AdminComponent } from './admin.component';
import { AllQasInfoComponent } from './all-qas-info/all-qas-info.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormusapprovalComponent } from './formusapproval/formusapproval.component';
import { GeneralAdminComponent } from './general-admin/general-admin.component';
import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
import { PagesDetailsComponent } from './pages-details/pages-details.component';
import { SubjectExpert1Component } from './subject-expert1/subject-expert1.component';
import { SubjectExpert2Component } from './subject-expert2/subject-expert2.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { UserApprovalComponent } from './user-approval/user-approval.component';
import { UserDetailsComponent } from './user-details/user-details.component';
// import { AddDailyChallengesComponent } from './add-daily-challenges/add-daily-challenges.component';
// import { AddRoleComponent } from './add-role/add-role.component';
// import { AllQasInfoComponent } from './all-qas-info/all-qas-info.component';
// import { AllUsersComponent } from './all-users/all-users.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { GeneralAdminComponent } from './general-admin/general-admin.component';
// import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
// import { PagesDetailsComponent } from './pages-details/pages-details.component';
// import { SubjectExpert1Component } from './subject-expert1/subject-expert1.component';
// import { SubjectExpert2Component } from './subject-expert2/subject-expert2.component';
// import { SuperAdminComponent } from './super-admin/super-admin.component';
// import { UserApprovalComponent } from './user-approval/user-approval.component';
// import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
  children:[   
    {path: 'dashboard', component: DashboardComponent},
    {path: 'all-users', component: AllUsersComponent},
    {path: 'add-daily-challenge', component: AddDailyChallengesComponent},
    {path: 'add-role', component: AddRoleComponent},
    {path: 'all-qas-info', component: AllQasInfoComponent},
    {path: 'all-users', component: AllUsersComponent},
    {path: 'general-admin', component: GeneralAdminComponent},
    {path: 'manage-institutes', component: ManageInstitutesComponent},
    {path: 'pages-details', component: PagesDetailsComponent},
    {path: 'subject-expert1', component: SubjectExpert1Component},
    {path: 'subject-expert2', component: SubjectExpert2Component},
    {path: 'super-admin', component: SuperAdminComponent},
    {path: 'user-approval', component: UserApprovalComponent},
    {path: 'user-details/:id', component: UserDetailsComponent},
    {path: 'formus-approval', component: FormusapprovalComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
