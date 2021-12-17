import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  * as APIConfig  from './endPoint';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  constructor(private http:HttpClient) { }

  addTeachers(teacherinfo){
    return this.http.post(APIConfig.END_POINT+"qas/insti/addTeachers",teacherinfo);
  }

  addStudents(studentinfo){
    return this.http.post(APIConfig.END_POINT+"qas/insti/addStudents",studentinfo);
  }

  getTeachersByInstitute(instId){
    return this.http.get(APIConfig.END_POINT+"qas/insti/getTeachersInfo/"+instId)
  }

  getStudentsByInstitute(instId){
    return this.http.get(APIConfig.END_POINT+"qas/insti/getStudents/"+instId)
  }

  getTeachers(){
    let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
    return this.http.get(APIConfig.END_POINT1 + "users/getUnAssignedTeachers",{headers: headers});
  }

  getStudents(){
    return this.http.get(APIConfig.END_POINT1 + "users/getUnAssignedStudents");
  }

  postTimeTable(tablePayload){
    return this.http.post(APIConfig.END_POINT + "qas/insti/timeTableAdding",tablePayload);
  }
  postTimings(timePayload){
      return this.http.post(APIConfig.END_POINT + "qas/insti/addInstitionTimeSlots",timePayload);
  }

  getTimings(instiId){
    return this.http.get(APIConfig.END_POINT + "qas/insti/getInstitonTimeSlots/" + instiId);
  }

}
