import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { wholeDiscussionDetails } from '../models/discussion';
import  * as APIConfig  from './endPoint';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  headers = new HttpHeaders({
    'My-Custom-Header': 'test',
    'Access-Control-Allow-Origin':`*`
  });

  getStudentDetails(userId){
    return this.http.get(APIConfig.END_POINT + "qas/insti/getStudentDetails/" + userId)
  }
  
  getStudents(){
    return this.http.get("https://studyamaze.com/login/users/getStudents")
  }
  getSubjectWisePercentage(userId,standardId){
    return this.http.get(APIConfig.END_POINT + "qas/practice/subjectwisepercentage/" + userId+ "/"+standardId);
  }

  getStandwisePercentages(standardId,userId){
    return this.http.get(APIConfig.END_POINT+ "userPractiseTest/standardWisePercentages?standardId="+standardId+"&userId="+userId);
  }

  getUserPoints(userId){
    return this.http.get(APIConfig.END_POINT+"test/points/"+userId)
  }

  getSolutionByUser(userId){
    return this.http.get(APIConfig.END_POINT + "db/discussionBoard/solutionsDashboard/" + userId);
  }

  getQuestionsCount(userId){
    return this.http.get(APIConfig.END_POINT + "db/discussionBoard/getDiscussionCount/" + userId);
  }

  getQuestionsByUser(userId){
    return this.http.get(APIConfig.END_POINT + "db/discussionBoard/questionsDasboard/" + userId);
  }

  userProfile(userId){  
    return this.http.get(APIConfig.END_POINT1 + "users/info/"+userId);
  }

  getSubjectsById(id){
    return this.http.get(APIConfig.END_POINT+'qas/subjects/retriveSubject?standardIdFk='+id);
  }

  getStandards(){
    return this.http.get<any>(APIConfig.END_POINT+"qas/standards/");
  }

  getTopicById(id1,id2){
    return this.http.get(APIConfig.END_POINT+"qas/topics/basedOnStandardIdAndSubjectId?standardId="+id1 +"&subjectId="+id2);
  }

  getTopicQuestions(id1,id2){
    return this.http.get(APIConfig.END_POINT+"qas/topics/totalQuestionsOnTopic?standardId="+id1 +"&subjectId="+id2); 
  }

  getTestQuestions(payload):Observable<any>{
    return this.http.post(APIConfig.END_POINT + "userPractiseTest/retriveQuestions/", payload );
  }

  practise(standardId,subjectId,topicId,pageno,pagesize){
    let userId=sessionStorage.getItem('userid');
    return this.http.get<any>(APIConfig.END_POINT+"qas/practise/sort/"+userId+"/"+standardId+"/"+subjectId+"/"+topicId+"/"+pageno+"/"+pagesize+"/"+"newest", {headers: this.headers});
  }

  submitUserAns(payload):Observable<any>{
    return this.http.post(APIConfig.END_POINT + "userPractiseTest/answersSubmition",payload)
  }

  // FORUMS

  getNewDiscussions(page,pageSize){
    return this.http.get(APIConfig.END_POINT + "db/discussionBoard/getNewDiscussions/"+ page + "/" + pageSize);
  }

  postViews(payload){
    return this.http.post(APIConfig.END_POINT+"view/",payload)
  }


// contacts

contactUs(payload){
  return this.http.post(APIConfig.END_POINT+"giveFeedback",payload)
}

  getSpecificDiscussionById(id){
    return this.http.get(APIConfig.END_POINT +"db/discussionBoard/getDiscussionQuestion/"+id+"");
  }

  // https://studyamaze.com/qas/db/discussionBoard/getDiscussionQuestion/{forumId}

  getSolutionsOfDiscussion(id){
    return this.http.get(APIConfig.END_POINT + "db/discussionBoard/"+id+"")
  }

  discussionDelete(dQid,userId){
    return this.http.delete(APIConfig.END_POINT+"db/discussionBoard/delete/"+dQid+"/"+userId);
  }

  getDiscussionLikesandComments(id,userId,type):Observable<wholeDiscussionDetails>{
    return this.http.get<wholeDiscussionDetails>(APIConfig.END_POINT +"db/discussionBoard/getDiscussionQuestion/"+id+"/"+userId+"/"+type+"");
  }

  postLike(postObject){
    return this.http.post(APIConfig.END_POINT + "qas/likeDislike/", postObject);
  }

  postDisLike(postObject){
    return this.http.post(APIConfig.END_POINT + "qas/likeDislike/", postObject);
  }

  postSolutionOnDiscussionQuestion(payload){
    return this.http.post(APIConfig.END_POINT +"db/discussionBoard/solution/",payload);
  }

  postReplay(payload){
    return this.http.post(APIConfig.END_POINT+"qas/addReply",payload);
  }
  
  getReplies(solutionId){
    return this.http.get(APIConfig.END_POINT+"qas/allReplies/"+solutionId);
  }

  // Practise Question

  getQuestionHistory(qid,userid){
    return this.http.get(APIConfig.END_POINT+"qas/questionHistory/"+qid+"/"+userid, {headers:this.headers});
  }

  checkIfWhishListed(qid,userid){
    return this.http.get(APIConfig.END_POINT + "qas/iswishlisted/"+userid+"/"+qid );
  }

  getLikesDislikes(qid,userid,usertype){
    return this.http.get(APIConfig.END_POINT+"qas/getLikesDislikesInfo/"+qid+"/"+userid+"/"+usertype, {headers:this.headers});
  }

  getQuestionById(id){
    return this.http.get(APIConfig.END_POINT + 'qas/question/' + id);
  }

  getQuestionData(id){
    return this.http.get(APIConfig.END_POINT + 'qas/getQuestionData/' + id);
  }

  submitSolution(solObject){
    return this.http.post(APIConfig.END_POINT+"qas/submitSolution", solObject, {headers:this.headers});
  }

  postTagForQuestion(payload){
    return this.http.post(APIConfig.END_POINT + "qas/addingQuestionTags",payload);
  }

  // Whishlist
  addToWishList(postObject){
    return this.http.post(APIConfig.END_POINT + "qas/addToList/", postObject);
  }

  removeFromWishList(postObject){
    return this.http.get(APIConfig.END_POINT + "qas/removeSpecificQnById/"+postObject.userId+"/"+postObject.qid );
  }

  //Discussion in Practice
  getAllQuestionDiscussions(questionId){
    return this.http.get(APIConfig.END_POINT+"qas/discussion/"+ questionId);
  }

  getQuestionDiscussions(dId){
    return this.http.get(APIConfig.END_POINT+"qas/discussion/"+ dId);
  }

  postDiscussion(postobj){
    return this.http.post(APIConfig.END_POINT + "qas/discussion/add",postobj);
  }

  postComment(dId,postobj){
    return this.http.post(APIConfig.END_POINT + "qas/addComment/"+dId,postobj);
  }

  getCommentsBydiscussionId(dId){
    return this.http.get(APIConfig.END_POINT + "qas/discussion/getBy/"+dId);
  }

  getSolution(qid){
    return this.http.get(APIConfig.END_POINT+"qas/ans/"+qid, {headers:this.headers});
  }

  //  DASHBOARD
  getAllPractiseQns(subId,userId){
    return this.http.get(APIConfig.END_POINT + "qas/getAllPractiseQnDetails/" + subId + "/" + userId);
  }

  // Assignments
  getAssignmentsByInstTeacherStandardId(){
    return this.http.get( APIConfig.END_POINT + "qas/insti/getAssignmentsByITStandard/5/4/3");
  }

  getAssignmentsByInstStandardUser(inst,standard,user){
    return this.http.get(APIConfig.END_POINT + "qas/insti/getAssignmentsByITStandard/" + inst +"/" + standard + "/" + user)
  }

  getAssignmentQuestionsByAssignmentId(assignmentId,userid){
    return this.http.get(APIConfig.END_POINT + "qas/insti/getAssignmentQuestions/" + assignmentId + "/" + userid)
  }

  assignmentSubmission(payload){
    return this.http.post( APIConfig.END_POINT + "qas/insti/postUserData",payload)
  }

  discussionUpdate(payload){
    return this.http.put(APIConfig.END_POINT+"db/discussionBoard/update",payload);
  }

  postDiscussionBoard(payload){
    console.log(payload);
    return this.http.post(APIConfig.END_POINT + "db/discussionBoard/post",payload);
  }

  // Daily challenge 
  retriveQuestionsBasedOnDate(date,userId){
        return this.http.get(APIConfig.END_POINT + "getDCQuestions/" + date + "/"+userId); 
  }

  questionData(qid,uid){
    return this.http.get(APIConfig.END_POINT + "getQuestionInfo/"+ qid+"/"+uid);
  }
  
  postUserAnswer(payload){
    return this.http.post(APIConfig.END_POINT + "postUserAnswer",payload);
  }

  // profile page

  getSpecificStandard(std){
    return this.http.get<any>(APIConfig.END_POINT+"qas/standards/getSpecific/"+ std)
  }

  uploadProfilePic(payload){
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+sessionStorage.getItem('token')
  });
    return this.http.post(APIConfig.END_POINT1 + "users/uploadProfilePic",payload,{headers:headers});
  }

  addAbout(about){
    const headers = new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        // 'Authorization':'Bearer '+sessionStorage.getItem('token')
    });
     return this.http.post(APIConfig.END_POINT1 + "teacher/addAbout/",about,{headers:headers})
 }

 getUserRoleDetails(userId){
  let headers = new HttpHeaders();
  // headers = headers.set('Authorization', 'Bearer '+sessionStorage.getItem('token'));
  return this.http.get(APIConfig.END_POINT1+"users/particularUserDetails?userId="+userId,{ headers:headers })
}

// TEST submission

getTestReport(sptrid,standardid,subjectid,topicid,userid):Observable<any>{
  let params = new HttpParams();
  params = params.append('sptrId',sptrid );
  params = params.append('standardId', standardid);
  params = params.append('subjectId', subjectid);
  params = params.append('topicId', topicid);
  params = params.append('userId',userid);
      return this.http.get(APIConfig.END_POINT + "userPractiseTest/report/",{params: params});
  }

  postData(payload){
    return this.http.post(APIConfig.END_POINT1 + "teacher/addAbout/",payload)
  }

  // dashboard test
  
  getSubjectPercentage(standardId,subjectId,userId){
    return this.http.get(APIConfig.END_POINT + "userPractiseTest/subjectPercentages?standardId= "+standardId+"&subjectId="+subjectId+"&userId="+userId);
  }

  dashboardReport(sptrid){
    return this.http.get(APIConfig.END_POINT + "userPractiseTest/dashboardReport?sptrId= "+sptrid);
  }

  // Votes
  postVotes(payload){
    return this.http.post(APIConfig.END_POINT + "db/upordownvote",payload);
  }

  // get timetable info
  getTimeTable(instiId,stdId,section){
    return this.http.get(APIConfig.END_POINT + "qas/insti/studentTimeTable/"+instiId+"/"+stdId+"/"+section);
  }

  getDailyChallengeReports(userid){
    return this.http.get(APIConfig.END_POINT + "dashboardDCfullReport/"+userid);
  }

  getDcReportByUserId(qid,userid){
    return this.http.get(APIConfig.END_POINT + "getUserAnswers/"+qid+"/"+userid);
  }

  getChallengeAccuracy(subjectid,userid){
    return this.http.get(APIConfig.END_POINT + "getAllQnDetails/"+subjectid+"/"+userid);
  }

  getAssigmentFeedback(aid,userid){
    return this.http.get(APIConfig.END_POINT + "qas/insti/getFullReport/"+aid+"/"+userid)
  }

  getHistory(userid){
    return this.http.get("https://studyamaze.com/login/users/info/getUserPointsHistory/"+userid)
  }
}
