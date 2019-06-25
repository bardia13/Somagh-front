import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { NbAuthOAuth2Token } from '@nebular/auth';


import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class OperationsService {

  
  private baseUrl_panel = 'http://localhost:8000/'
  private myUrls: {} = {
    userInfo: this.baseUrl_panel + 'user/detail/',
    createCase: this.baseUrl_panel + 'case/create/',
    departmentsList: this.baseUrl_panel + 'department/all/',
    caseList: this.baseUrl_panel + 'case/list/',
    companyInvoiceUpdate: this.baseUrl_panel + 'apiadmin/company/invoice/update/',
    companyInvoiceList: this.baseUrl_panel + 'apiadmin/company/invoice/list/',
    companyInvoiceReport: this.baseUrl_panel + 'apiadmin/company/invoice/report/',

  }

  userSubject = new BehaviorSubject({});
  companyListSubject = new BehaviorSubject({}) ;
  productListSubject = new BehaviorSubject([]) ;
  fullProductListSubject = new BehaviorSubject([]) ;


  private httpOptions;
  
  loadCompelete = new BehaviorSubject(false);

  constructor(private http: HttpClient, private authService: NbAuthService) { 
    
  }

  setHttpHeader(token: NbAuthOAuth2Token) {
    console.log("update token : " + token.getType() + ' ' + token.getValue());
    this.httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        'Authorization': token.getType() + ' ' + token.getValue()
      })
    }
  }

  userInfoGet() {
    return this.http.get(this.myUrls['userInfo'], this.httpOptions).pipe(map(response => {
      console.log("profile : ");
      console.log(response);
      this.setUserInfo(response);
    }))
  }

  getUserInfo() {
    let user = this.userSubject.asObservable();
    return user;
  }

  setUserInfo(userInfo) {
    console.log("user info : ");
    console.log(userInfo);
    this.userSubject.next(userInfo);
  }


  departmentsListGet(): Observable<{}>{
    return this.http.get(this.myUrls['departmentsList'], this.httpOptions)
  }

  createCase(form : any):Observable<{}>{
    return this.http.post(this.myUrls['createCase'], form, this.httpOptions)
  }

  caseListGet(): Observable<{}>{
    return this.http.get(this.myUrls['caseList'], this.httpOptions)
  }



}