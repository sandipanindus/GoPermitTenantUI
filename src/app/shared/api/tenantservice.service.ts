import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logindto } from './logindto';

@Injectable({
  providedIn: 'root'
})
export class TenantserviceService {
  baseUrl: string;
  header
  constructor(private http: HttpClient) {


   // this.baseUrl = "http://localhost:53846/api/";
  //this.baseUrl = "http://smartpermitapi.eisappserver.net/api/";
    this.baseUrl="http://goapi.fadelsoft.co.in/api/"

 // this.baseUrl = "https://api.gopermit.co.uk/api/";

    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

  }

  getparkingbays(id): Observable<any> {
    return this.http.get(this.baseUrl + "Tenant/baynobytenant?tenantid=" + id, { headers: this.header })

  }

  getvehiclestimedetails(id, bayno): Observable<any> {
    return this.http.get(this.baseUrl + "Tenant/getvehcilecounts?tenantid=" + id + "&bayno=" + bayno, { headers: this.header })

  }

  getvehiclestimedetailsbydate(id, bayno, date): Observable<any> {
    return this.http.get(this.baseUrl + "Tenant/getvehcilecountsbydates?tenantid=" + id + "&bayno=" + bayno + "&date=" + date, { headers: this.header })

  }

  SaveVehicle(obj): Observable<any> {
    return this.http.post(this.baseUrl + "Tenant/AddVehicles", obj, { headers: this.header })

  }
  getvehicles(id): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    return this.http.get(this.baseUrl + "Tenant/GetVehicleDetailsbytenant?tenantid=" + id, { headers: header })

  }

  getToken(data): Observable<any> {
    return this.http.post(this.baseUrl + "Login/Authenticate", data, { responseType: 'text' });
  }

  tokenchecking(): Observable<any> {

    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    return this.http.get(this.baseUrl + "Login/GetValue", { headers: header });

  }


  Login(email, paswrd): Observable<any> {
    let loginDto = new Logindto(email, paswrd);
    return this.http.post(this.baseUrl + "Tenant/TenantLogin", loginDto)
    //return this.http.get(this.baseUrl + "Tenant/TenantLogin?Email=" + email + "&Password=" + paswrd)

  }
  ChangePassword(password, loginid): Observable<any> {
    return this.http.get(this.baseUrl + "Tenant/ChangePassword?password=" + password + "&LoginId=" + loginid, { headers: this.header })
  }
  Support(data): Observable<any> {
    return this.http.post(this.baseUrl + "Tenant/AddSupport", data, { headers: this.header });
  }
  UpdateVisitorSlot(data): Observable<any> {
    return this.http.post(this.baseUrl + "Admin/UpdateVisitorSlot", data);
  }
  ReplySupport(data): Observable<any> {
    return this.http.post(this.baseUrl + "Tenant/ReplySupport", data, { headers: this.header });
  }
  SupportList(tenantid): Observable<any> {
    return this.http.get(this.baseUrl + "Tenant/GetSupportList?tenantid=" + tenantid, { headers: this.header });
  }
  GetVisitorSlot(Id): Observable<any> {
    return this.http.get(this.baseUrl + "Admin/GetVisitorSlot?Id=" + Id);
  }
  GetSupportById(id, ticketid, tenantid): Observable<any> {
    return this.http.get(this.baseUrl + "Tenant/GetSupportById?id=" + id + "&TicketId=" + ticketid + "&TenantId=" + tenantid, { headers: this.header });
  }
  GetSite(Id) {
    return this.http.get(this.baseUrl + "Admin/GetSiteById?Id=" + Id, { headers: this.header })
  }
  GetVisitor(Id) {
    return this.http.get(this.baseUrl + "Admin/GetVisitorParkings?TenantId=" + Id)
  }
  GetVisitorSessions(Id) {
    return this.http.get(this.baseUrl + "Admin/GetVisitorSessions?SiteId=" + Id)
  }
  GetTimeSlots(duration, sessionunit, date, siteid) {
    return this.http.get(this.baseUrl + "Admin/GetTimeSlots?duration=" + duration + "&sessionunit=" + sessionunit + "&date=" + date + "&siteid=" + siteid, { headers: this.header })
  }
  GetVisitorBayNo(Id) {
    return this.http.get(this.baseUrl + "Admin/GetVisitorBayNo?SiteId=" + Id)
  }
  GetVisitorBayNoForEdit(SiteId, UserId) {
    return this.http.get(this.baseUrl + "Admin/GetVisitorBayNoEdit?SiteId=" + SiteId + "&UserId=" + UserId, { headers: this.header })
  }
  AddVisitor(data) {
    return this.http.post(this.baseUrl + "Admin/AddVisitor", data, { headers: this.header });
  }
  UpdateVisitor(data) {
    return this.http.post(this.baseUrl + "Admin/UpdateVisitorParking", data, { headers: this.header });
  }
  setPassword(code, password) {
    return this.http.get(this.baseUrl + "Admin/SetPassword?EmailCode=" + code + "&Password=" + password, { headers: this.header })
  }
  GetVisitorParkingById(Id) {
    return this.http.get(this.baseUrl + "Admin/GetVisitorParkingById?Id=" + Id)
  }
  ForgetPassword(email) {
    return this.http.get(this.baseUrl + "Admin/ForgetPassword?email=" + email, { headers: this.header })
  }
  GetProfileById(Id) {
    return this.http.get(this.baseUrl + "Admin/GetTenantUserById?Id=" + Id, { headers: this.header })
  }
  ResetPassword(code, password) {
    return this.http.get(this.baseUrl + "Admin/VerifyForgetPassword?EmailCode=" + code + "&Password=" + password, { headers: this.header })
  }
  UpdateProfile(formdata) {
    return this.http.post(this.baseUrl + "Admin/UpdateProfile", formdata);
  }
  DeleteVisitor(Id) {
    return this.http.get(this.baseUrl + "Admin/VisitorParkingDelete?Id=" + Id, { headers: this.header })
  }
  DeleteManageParking(Id, bayno) {
    return this.http.get(this.baseUrl + "Admin/ManageParkingDelete?Id=" + Id + '&bayno=' + bayno, { headers: this.header })
  }
  GetVisitorBayNoTime(starttime, siteid, date) {
    return this.http.get(this.baseUrl + "Admin/GetVisitorBayNoTime?starttime=" + starttime + "&siteid=" + siteid + "&date=" + date);
  }
  GetVisitorParkings(Id) {
    return this.http.get(this.baseUrl + "Tenant/GetVisitorParkings?tenantid=" + Id)
  }


  _getManageParkings(Id) {
    return this.http.get(this.baseUrl + "Tenant/GetManageParkings?tenantid=" + Id)
  }
}
