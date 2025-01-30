import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-pages-visitor-confirm',
  templateUrl: './pages-visitor-confirm.component.html',
  styleUrls: ['./pages-visitor-confirm.component.scss'],
  providers: [
    [DatePipe]
  ]
})
export class PagesVisitorConfirmComponent implements OnInit {
  confirmform: FormGroup;
  confirmsubmitted = false;
  Id: string;
  vrm: string;
  result = false;
  logopath: string;
  propertyname: string;
  email: string;
  fromtime: string;
  totime: string;
  date: string;
  contact: string;
  surname: string;
  firstname: string;
  duration: string;
  starttime: string;
  endtime: string;
  bayno: number;
  bayname: string;
  constructor(private datePipe: DatePipe, private toast: ToastrService, private formBuilder: FormBuilder,
    private approute: ActivatedRoute, private router: Router, private service: TenantserviceService) {
    this.confirmform = this.formBuilder.group({
      Lvrm: ['', [Validators.required]],
      Lemail: ['', [Validators.required]],
      Lsname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
    });
  }
  get f() { return this.confirmform.controls; }
  ngOnInit(): void {
    document.getElementById('ulmenu').style.display = 'none';
    var Id = this.approute.snapshot.queryParamMap.get('Id');
    this.Id = Id;
    this.GetVisitorSlot(Id);
  }
  errortext
  GetVisitorSlot(Id) {
    this.service.GetVisitorSlot(Id).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {
        if (data.result != null) {
          if (data.result == false) {
            (document.getElementById("formdiv") as HTMLDivElement).style.display = 'none';
            (document.getElementById("linkdiv") as HTMLDivElement).style.display = 'block';
            //var linkdiv = (document.getElementById("showtext") as HTMLParagraphElement);
            this.errortext = "All parking slots booked for the selected time, please request admin to create another booking at a different time.";
            // linkdiv.innerHTML = "";
            //linkdiv.innerHTML = "All parking slots booked for the selected time, please request admin to create another booking at a different time.";
          }

          else {
            this.result = true;
            this.propertyname = data.result.propertyName;
            this.vrm = data.result.vrm;
            this.firstname = data.result.firstName;
            this.surname = data.result.surname;
            this.email = data.result.email;
            this.contact = data.result.contact;
            this.date = data.result.date;
            this.fromtime = data.result.startTime;
            this.starttime = data.result.startTime;
            this.totime = data.result.endTime;
            this.endtime = data.result.endTime;
            this.duration = data.result.duration;
            this.bayname = data.result.bayname;
            this.bayno = data.result.bayid;
            (document.getElementById("formdiv") as HTMLDivElement).style.display = 'block';
            (document.getElementById("linkdiv") as HTMLDivElement).style.display = 'none';
          }
        }

      }
      else if (data.status == "-100") {
        if (data.result == null) {
          this.logopath = 'assets/images/logo/cancel-48-primary.png'
          this.result = false;
          (document.getElementById("formdiv") as HTMLDivElement).style.display = 'none';
          (document.getElementById("linkdiv") as HTMLDivElement).style.display = 'block';
          var linkdiv = (document.getElementById("showtext") as HTMLParagraphElement);
          linkdiv.innerHTML = "";

          linkdiv.innerHTML = "Your booking is was cancelled";
        }
        else {
          this.logopath = 'assets/images/logo/check-48-primary.png'
          this.result = false;
          (document.getElementById("formdiv") as HTMLDivElement).style.display = 'none';
          (document.getElementById("linkdiv") as HTMLDivElement).style.display = 'block';
          var linkdiv = (document.getElementById("showtext") as HTMLParagraphElement);
          linkdiv.innerHTML = "";
          var date = data.result.startDate;
          var newdate = this.datePipe.transform(date, "MM-dd-yyyy");
          linkdiv.innerHTML = "Your booking is already confirmed on " + newdate + " from " + data.result.startTime + " to " + data.result.endTime + ". ";
        }
        // this.toast.warning("you already booked the slot")
      }

    })
  }
  UpdateVisitorSlot() {
    if (this.result == true) {
      var element = document.getElementById("loader") as HTMLDivElement;
      element.style.display = 'block';
      this.confirmsubmitted = true;
      if (this.confirmform.invalid) {
        element.style.display = 'none';
        return;
      }

      var chk = document.getElementById("chkcc") as HTMLInputElement;
      if (chk.checked == false) {
        element.style.display = 'none';
        this.toast.warning("agree the privacy policy")
        return;
      }

      var data = ({
        Id: parseInt(this.Id),
        vrm: this.vrm,
        visitorbayid: this.bayno,
        firstname: this.firstname,
        lastname: this.surname,
        contact: this.contact,
      });

      this.service.UpdateVisitorSlot(data).subscribe((data: any) => {
        if (data.status == "200") {
          element.style.display = 'none';
          this.toast.success("your slot booked successfully");
          (document.getElementById("formdiv") as HTMLDivElement).style.display = 'none';
          (document.getElementById("thankyoudiv") as HTMLDivElement).style.display = 'block';
          element.style.display = 'none';


        }
        else {
          element.style.display = 'none';
          this.toast.warning(data.message)
        }

      })
    }
    else {
      this.toast.warning("you already booked the slot");
    }
  }
  Refresh() {
    //this.router.navigateByUrl('/account/dashboard');
    window.location.href = 'https://gopermit.co.uk/';
  }
}
