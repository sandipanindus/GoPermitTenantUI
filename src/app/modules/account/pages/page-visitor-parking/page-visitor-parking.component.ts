import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Address } from '../../../../shared/interfaces/address';
@Component({
  selector: 'app-page-visitor-parking',
  templateUrl: './page-visitor-parking.component.html',
  styleUrls: ['./page-visitor-parking.component.scss']
})
export class PageVisitorParkingComponent implements OnInit {
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
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      this.GetVisitors(user.id);
      var details = JSON.parse(localStorage.getItem('userinfo'));
      //  document.getElementById("tenantname").innerHTML = details.firstName + " " + details.lastName;
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
    // this.service.GetVisitor(Id).subscribe((data: any) => {
    //   debugger;

    //   if (data.status == "200") {

    //     this.visitors = data.result;

    //   }

    // });
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
}
