import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Address } from '../../../../shared/interfaces/address';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-page-visitorparking-appoint',
  templateUrl: './page-visitorparking-appoint.component.html',
  styleUrls: ['./page-visitorparking-appoint.component.scss'],
  providers: [
    [DatePipe]
  ]
})
export class PageVisitorparkingAppointComponent implements OnInit {
  duration: string;
  name: string;
  mobileno: string;
  vrm: string;
  email: string;
  make: string;
  model: string;
  starttime: string;
  endtime: string;
  visitorForm: FormGroup;
  visitorsubmitted = false;
  modalRef: BsModalRef;
  surname: string;
  cctome: boolean;
  sessionunit: string;
  siteid: number;
  date: string;
  selecteddate: Date;
  timeslotid: number;
  Address = []
  address: Address
  timeslot: string;
  tenantid: number;
  timeslots: any = [];
  bayno: string;
  bayid: string;
  @ViewChild('template1') template1: any;
  modalRefpopup: BsModalRef;
  constructor(private datePipe: DatePipe,private approute: ActivatedRoute, private toast: ToastrService, private modalService: BsModalService, private router: Router, private formBuilder: FormBuilder, private service: TenantserviceService) {
    this.visitorForm = this.formBuilder.group({
      //Vname: ['', Validators.required],
    //  Vsurname: ['', Validators.required],
      //Vvrm: ['', Validators.required],
      //Vmobileno: ['', Validators.required],
      Vemail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
    });
  }
  get v() { return this.visitorForm.controls; }

  mindate = new Date();
  bsInlineValue = new Date();
  ngOnInit(): void {
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {

      var details = JSON.parse(localStorage.getItem('userinfo'));
      document.getElementById("tenantname").innerHTML = details.firstName + " " + details.lastName;
      this.Address = [
        {
          default: true,
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          phone: details.mobileNumber,
          country: '',
          city: details.city,
          postcode: details.zipCode,
          address: details.address,
          State: details.state

        }]
      this.siteid = details.siteId;
      this.tenantid = details.id;
      this.duration = localStorage.getItem("Duration");
      this.sessionunit = localStorage.getItem("SessionUnit");
    }
  }
  BindTimeSlots(event) {
    debugger;
    this.timeslots = [];
    (document.getElementById("detailsdiv") as HTMLDivElement).style.display = 'none';
    this.selecteddate = new Date(event);
    this.date = this.selecteddate.toDateString();
    var element = document.getElementById("loader") as HTMLDivElement;
    element.style.display = 'block';
    ((document).getElementById("timeslotdiv") as HTMLDivElement).style.display = 'none';
    this.service.GetTimeSlots(this.duration, this.sessionunit, this.selecteddate.toJSON(), this.siteid).subscribe((data: any) => {
      debugger;

      if (data.status == "200") {
        element.style.display = 'none';
        ((document).getElementById("timeslotdiv") as HTMLDivElement).style.display = 'block';
        this.timeslots = data.result;

      }
      else {
        this.toast.warning("No data");
        element.style.display = 'none';
      }

    });

  }
  ShowDiv(id, time) {
    debugger;
    var element = document.getElementById("loader") as HTMLDivElement;
    element.style.display = 'block';
    if (this.timeslotid == 0 || this.timeslotid == undefined) {

      ((document).getElementById("timeslotandiv_" + id + "") as HTMLDivElement).style.display = 'none';
      ((document).getElementById("timebtndiv_" + id + "") as HTMLDivElement).style.display = 'flex';
    }
    else {
      ((document).getElementById("timeslotandiv_" + this.timeslotid + "") as HTMLDivElement).style.display = 'block';
      ((document).getElementById("timebtndiv_" + this.timeslotid + "") as HTMLDivElement).style.display = 'none';
      ((document).getElementById("timeslotandiv_" + id + "") as HTMLDivElement).style.display = 'none';
      ((document).getElementById("timebtndiv_" + id + "") as HTMLDivElement).style.display = 'flex';
    }
    this.timeslotid = id;
    var newdate = this.datePipe.transform(this.selecteddate, "yyyy-MM-dd");
    this.service.GetVisitorBayNoTime(time, this.siteid.toString(), newdate).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {
        element.style.display = 'none';
        if (data.result == null) {
          this.bayid = "0";
          this.bayno = "0";

          this.toast.info("there is no bays for that site");
        } else {
          this.bayno = data.result.bayName;
          this.bayid = data.result.id;
        }
        // this.toast.success("visitor slot booked successfully")
        //  window.location.reload();
        //this.router.navigateByUrl('account/VisitorParking');

      }
      else {
        this.bayid = "0";
        element.style.display = 'none';
        // this.modalRef.hide();
        //  this.toast.warning(data.message)
      }

    })

  }
  ShowPopup(template: TemplateRef<any>) {
    this.modalRefpopup = this.modalService.show(template, { class: 'modal-sm' });
  }
  ShowModal(timeslot) {
    this.timeslot = timeslot;
    if (this.bayid == "0") {
      this.toast.info("there is no bayid for that site");
    }
    else {
      (document.getElementById("detailsdiv") as HTMLDivElement).style.display = 'flex';
    }
    //this.modalRef = this.modalService.show(template, { class: 'modal-sm modalwidth', });
  }
  cancel(): void {
    this.modalRef.hide();
  }
  ProceedPopup() {
    this.modalRefpopup.hide();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  AddVisitor() {
    debugger;
    var element = document.getElementById("loader") as HTMLDivElement;
    element.style.display = 'block';
    if (this.bayid == "0") {
      element.style.display = 'none';
      this.toast.info("there is no bayid for that site");
    }
    else {
      this.visitorsubmitted = true;
      if (this.visitorForm.invalid) {
        element.style.display = 'none';
        return;
      }
      var chkcc = document.getElementById("chkcc") as HTMLInputElement;
      if (chkcc.checked == true) {
        this.cctome = true;
      }
      else {
        this.cctome = false;
      }

      var data = ({
        TenantId: this.tenantid,
        SiteId: this.siteid,
        Name: this.name,
        Make: this.make,
        Email: this.email,
        MobileNumber: this.mobileno,
        Model: this.model,
        VRM: this.vrm,
        StartTime: this.timeslot,
        Duration: this.duration,
        SessionUnit: this.sessionunit,
        VisitorBayNoId: this.bayid,
        cctome: this.cctome,
        Surname: this.surname,
        Date: this.selecteddate.toJSON()
      });
      if (this.bayno != "0" && this.bayid != "0") {
        this.service.AddVisitor(data).subscribe((data: any) => {
          debugger;
          if (data.status == "200") {
            element.style.display = 'none';
            // this.modalRef.hide();
            //this.toast.success("visitor slot booked successfully")
            this.starttime = this.timeslot;
            this.endtime = data.result.endTime;
            // this.ShowPopup(this.template1);
            (document.getElementById("schedulediv") as HTMLDivElement).style.display = 'none';
            (document.getElementById("thankyoudiv") as HTMLDivElement).style.display = 'block';
            //this.router.navigateByUrl('account/VisitorParking');

          }
          else {
            element.style.display = 'none';
            this.modalRef.hide();
            this.toast.warning(data.message)
          }

        })
      }
      else {
        this.toast.info("there is no baynos for that site ");
      }
    }
  }
  Refresh() {
    this.router.navigateByUrl('/account/VisitorParking');
  }
}
