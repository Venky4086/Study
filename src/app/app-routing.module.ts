import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // {path: '',redirectTo:'login/user-login',pathMatch:'full' },

  { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule) },

  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },

  { path: 'institute', loadChildren: () => import('./institute/institute.module').then(m => m.InstituteModule) },

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },

  { path: '', redirectTo: 'login/home', pathMatch: 'full'},

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
