import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  * as APIConfig  from './endPoint';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  headers = new HttpHeaders({
    'My-Custom-Header': 'test',
    'Access-Control-Allow-Origin':`*`
  });

  // DAILY CHALLENGE ADMIN API's
  getChallengeQas(){
    return this.http.get(APIConfig.END_POINT +"getAllQuestions");
  }

  postDailyChallenge(payload){
    return this.http.post(APIConfig.END_POINT+"postDataToDailyChallenge",payload);
  }

  retriveQuestionsBasedOnDate(date,userId){
    return this.http.get(APIConfig.END_POINT + "getDCQuestions/" + date + "/"+userId); 
  }

  questionData(qid,uid){
    return this.http.get(APIConfig.END_POINT + "getQuestionInfo/"+ qid+"/"+uid);
  }

  postUserAnswer(payload){
    return this.http.post(APIConfig.END_POINT + "postUserAnswer",payload);
  }

  // USER APPROVAL API'S

  getUsers(){
    return this.http.get(APIConfig.END_POINT1 + "admin/retrivingRegisteredDetails");
  }

  approveUsers(payload){
    return this.http.post(APIConfig.END_POINT1 + "admin/userAuth",payload);
  }

  // ADD A NEW ROLE
  addNewRole(payload){
    return this.http.post(APIConfig.END_POINT1+"role/add",payload)
  }

  // ADD NEW USERTYPE
  addNewUsertype(newUsertype){
    return this.http.post(APIConfig.END_POINT1+"role/add",newUsertype)
  }

  // PRECEDING ROLES
  getPrecedingRoles(userId){
    return this.http.get(APIConfig.END_POINT1+"rolesAuthentication/rolesHistory?userId="+userId);
  }

  // ASSIGN ROLES TO USER

  assignUserRole(newrole){
    return this.http.post(APIConfig.END_POINT1 +"rolesAuthentication/userRoleAdding",newrole);
  }

  // USER DETAILS FOR ADMIN
  grabUsers(){
    return this.http.get(APIConfig.END_POINT1+"users/getUserDetails");
  }

  grabUserDetails(userId){
    let headers = new HttpHeaders();
    // headers = headers.set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(APIConfig.END_POINT1+"users/particularUserDetails?userId="+userId,{ headers:headers })
  }

  getAllRoles(){
    return this.http.get(APIConfig.END_POINT1 + "role/getOnlyRoles");
  }

  // DELETE USER ROLE

  delUserRole(role){
    let httpData = {headers:this.headers, body: role};
    return this.http.delete(APIConfig.END_POINT1 +"rolesAuthentication/deleteRoles",httpData);
  }

  allQasInfo(){
    return this.http.get(APIConfig.END_POINT+"qas/allQuestionsInfo");
  }

  getSubjectsById(id){
    return this.http.get(APIConfig.END_POINT+'qas/subjects/retriveSubject?standardIdFk='+id);
  }

  getQuestionsForApproval(standardId,subjectId){
    return this.http.get(APIConfig.END_POINT+"questionDetailsForApproval?standardId="+standardId+"&subjectId="+subjectId)
  }

  dataApprovedByGE(adminId,approvalStatus,qId,payload){
    return this.http.post(APIConfig.END_POINT + "approvedDataByGE?adminId="+adminId+"&approvalStatus="+approvalStatus+"&qId="+qId,payload);
  }

  getStandards(){
    return this.http.get<any>(APIConfig.END_POINT+"qas/standards/");
  }

  // All institutes
  allInstiInfo(){
    return this.http.get(APIConfig.END_POINT + "qas/insti/");
  }   
  //addInstituteInfo
  addInstituteInfo(payload){
    return this.http.post(APIConfig.END_POINT + "qas/insti/add",payload);
  }

  //delete institute..
  deleteInstiInfo(id){
    return this.http.get(APIConfig.END_POINT + "qas/insti/delete/"+id);
  }

  // SUBJECT EXPERT 1 API'S

  getQuestionsForApprovalSE1(standardId,subjectId){
    return this.http.get(APIConfig.END_POINT+"questionDetails?standardId="+standardId+"&subjectId="+subjectId)
  }
  
  // (new api for se1)
  dataApprovedBySE1(adminId,approvalStatus,qId,payload){
    return this.http.post(APIConfig.END_POINT+"approvedDataBySE1?adminId="+adminId+"&approvalStatus="+approvalStatus+"&qId="+qId,payload);
  }

  submitSe1Approval(payload){
    return this.http.post(APIConfig.END_POINT + "postApprovedData",payload);
  }

  // SUBJECT EXPERT 2 API'S

  getQuestionsForApprovalSE2(standardId,subjectId){
    return this.http.get(APIConfig.END_POINT+"questionsData?standardId="+standardId+"&subjectId="+subjectId)
  }

  submitSe2Approval(payload){
    return this.http.post(APIConfig.END_POINT + "postSE2Approvals",payload);
  }

  // (new api for se2)
  dataApprovedBySE2(adminId,approvalStatus,qId,payload){
    return this.http.post(APIConfig.END_POINT + "approvedDataBySE2?adminId="+adminId+"&approvalStatus="+approvalStatus+"&qId="+qId,payload);
  }

  // SUPER ADMIN API'S

  getQuestionsForApprovalSA(standardId,subjectId){
    return this.http.get(APIConfig.END_POINT+"questionDetailsSA?standardId="+standardId+"&subjectId="+subjectId)
  }

  submitSAApproval(payload){
    return this.http.post(APIConfig.END_POINT + "postSAApprovals",payload); 
  }

  dataApprovedBySA(adminId,approvalStatus,qId,payload){
    return this.http.post(APIConfig.END_POINT + "approvedDataBySA?adminId="+adminId+"&approvalStatus="+approvalStatus+"&qId="+qId,payload);
  }

}
