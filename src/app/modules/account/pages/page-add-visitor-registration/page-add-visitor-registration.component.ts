import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Address } from '../../../../shared/interfaces/address';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { TenantserviceService } from 'src/app/shared/api/tenantservice.service';

@Component({
  selector: 'app-page-add-visitor-registration',
  templateUrl: './page-add-visitor-registration.component.html',
  styleUrls: ['./page-add-visitor-registration.component.scss']
})
export class PageAddVisitorRegistrationComponent implements OnInit {
  Address = [];
  tenantid: string;
  showtable = false;
  address: Address
  modalRef: BsModalRef;
  visitors: any = [];
  visitorsessions: any = [];
  visitorparkings: any = [];
  visitorparkingid: number;
  constructor(private approute: ActivatedRoute, private toast: ToastrService, private modalService: BsModalService, private router: Router, private formBuilder: FormBuilder, private service: TenantserviceService) { }
  ngOnInit(): void {
    var userinfo = localStorage.getItem("userinfo");
    this.GetSiteDetails();
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      this.GetVisitors(user.id);
      var details = JSON.parse(localStorage.getItem('userinfo'));
      this.Address = [
        {
          default: true,
          firstName: details.firstName + " " + details.lastName,
          lastName: details.lastName,
          email: details.email,
          phone: details.mobileNumber,
          country: '',
          city: details.city,
          postcode: details.zipCode,
          address: details.address,
          State: details.state

        }]
      this.tenantid = details.id;
      this.GetVisitorSessions(details.siteId);
      this.GetVisitorParkings();
    }

  }
  openModal(template: TemplateRef<any>, id) {
    this.visitorparkingid = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }
  showdurationdiv() {
    document.getElementById("durationdiv").style.display = 'flex';
    document.getElementById("visitorlist").style.display = 'none';
    document.getElementById("addnewdiv").style.display = 'none';
    document.getElementById("canceldiv").style.display = 'block';
  }
  canceldurationdiv() {
    document.getElementById("durationdiv").style.display = 'none';
    document.getElementById("visitorlist").style.display = 'flex';
    document.getElementById("addnewdiv").style.display = 'block';
    document.getElementById("canceldiv").style.display = 'none';
  }
  RedirectToAppoint(duration, sessionunit) {
    localStorage.setItem("Duration", duration);
    localStorage.setItem("SessionUnit", sessionunit);
    this.router.navigateByUrl('/account/VisitorParkingAppointment');
  }
  GetVisitorSessions(Id) {
    this.service.GetVisitorSessions(Id).subscribe((data: any) => {
      debugger;

      if (data.status == "200") {

        this.visitorsessions = data.result;

      }

    });
  }
  GetVisitorParkings() {
    this.service.GetVisitorParkings(this.tenantid).subscribe((data: any) => {
      debugger;

      if (data.status == "200") {

        this.visitorparkings = data.result;
        if (this.visitorparkings.length > 0) {
          this.showtable = true;
        }
console.log(this.visitorparkings);

      }

    });
  }
  editvisitor(Id, value) {
    if (value == 1) {
      value = "edit";
    }
    else {
      value = "view";
    }
    localStorage.setItem("VisitorParkingId", Id);
    localStorage.setItem("value", value);
    this.router.navigateByUrl('/account/VisitorParkingEdit');
  }
  showAddNewModal() {
    this.router.navigate(['account/VisitorParkingAdd']);
  }
  GetVisitors(Id) {

  }


  confirm(): void {
    this.deleteVisitorParking(this.visitorparkingid)
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  deleteVisitorParking(Id) {
    var element = (document.getElementById("loader") as HTMLDivElement);
    element.style.display = 'block';
    this.service.DeleteVisitor(Id).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {
        element.style.display = 'none';
        this.toast.success("Visitor parking slot cancelled successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else {
        element.style.display = 'none';
        this.toast.warning(data.message);
      }

    });
  }


  sitename
  siteaddress
  sitecity
  sitestate
  sitezipcode

  GetSiteDetails() {
    var details = JSON.parse(localStorage.getItem('userinfo'));
    var id = details.siteId;
    this.service.GetSite(id).subscribe((data: any) => {
      // debugger;
      if (data.status == "200") {
        this.sitename = data.result.siteName;
        this.siteaddress = data.result.siteAddress;
        this.sitecity = data.result.city;
        this.sitestate = data.result.state;
        this.sitezipcode = data.result.zipcode;
      }
    });
  }


}
