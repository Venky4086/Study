import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  * as APIConfig  from './endPoint';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  
  headers = new HttpHeaders({
    'My-Custom-Header': 'test',
    'Access-Control-Allow-Origin':`*`
  });

  login(userCreds){
    return this.http.post<any>(APIConfig.END_POINT1+"users/authenticate",userCreds, {headers: this.headers});
  }

  signUp(signUpObj){
    return this.http.post<any>(APIConfig.END_POINT1+"users/user", signUpObj, {headers: this.headers});
  }

  postOtp(otpObj){
    return this.http.post<any>(APIConfig.END_POINT1+"users/checkRegOtp", otpObj, {headers: this.headers});
  }

  forgotPasswordOtp(payload){
    return this.http.post(APIConfig.END_POINT1+"users/forgotPw",payload)
  }

  otpVerifyOnForgotPass(payload){
    return this.http.post(APIConfig.END_POINT1+"users/checkForgotPwOtp",payload)
  }

  createNewPass(payload){
    return this.http.post(APIConfig.END_POINT1+"users/checkForgotPwOtp",payload);
  }

}
