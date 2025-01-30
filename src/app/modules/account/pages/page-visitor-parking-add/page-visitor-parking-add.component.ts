import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'

@Component({
  selector: 'app-page-visitor-parking-add',
  templateUrl: './page-visitor-parking-add.component.html',
  styleUrls: ['./page-visitor-parking-add.component.scss']

})
export class PageVisitorParkingAddComponent implements OnInit {
  visitorForm: FormGroup;
  visitorsubmitted = false;
  vehiclelists: any = [];
  vehiclelistsobj:any=[];
  baynos: any = [];
  firstname: string;
  lastname: string;
  address: string;
  tenantname: string;
  city: string;
  state: string;
  zipcode: string;
  mobileno: string;
  email: string;
  sitename: string;
  id: number;
  avoidid: number;
  baynonew: number;
  mindate=new Date();
  myDate=new Date();
  constructor(private approute: ActivatedRoute, private toast: ToastrService, private router: Router, private formBuilder: FormBuilder, private service: TenantserviceService) {
    this.visitorForm = this.formBuilder.group({
      Vfirstname: ['', Validators.required],
      Vlastname: ['', Validators.required],
      Vaddress: ['', Validators.required],
      Vcity: ['', Validators.required],
      Vstate: ['', Validators.required],
      Vzipcode: ['', Validators.required],
      Vmobileno: ['', Validators.required],
      Vemail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
    });
  }
  get v() { return this.visitorForm.controls; }
  ngOnInit(): void {
    debugger;
    var element=document.getElementById("loader") as HTMLDivElement;
    element.style.display='block';
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      this.tenantname = user.firstName + " " + user.lastName;

    }
    this.GetVisitorBayNos(user.siteId);
    this.GetSite(user.siteId);
    this.id = 1;
    this.vehiclelists.push({
      id: this.id,
      bayid: '',
      make: '',
      model: '',
      vrm: '',
      startdate: '',
      starttime:'',
      enddate: '',
      endtime:'',
    })
  }
  AddNewRow() {
    debugger;
    this.avoidid = this.id - 1;
    var id = this.id + 1;
    this.id = id;
    this.vehiclelists.push({
      id: id,
      bayid: '',
      make: '',
      model: '',
      vrm: '',
      startdate: '',
      starttime:'',
      enddate: '',
      endtime:'',
    })
    setTimeout(() => {
      this.AvoidDuplicate(this.vehiclelists[this.avoidid].bayid, this.vehiclelists[this.avoidid].id);
    }, 1000);

  }
  canceladdvisitor() {
    this.router.navigate(['account/VisitorParking']);
  }
  GetVisitorBayNos(Id) {
    this.service.GetVisitorBayNo(Id).subscribe((data: any) => {
      debugger;
      //var finalresult = JSON.parse(result);
      if (data.status == "200") {

        this.baynos = data.result;

      }

    });
  }
  GetSite(Id) {
    var element=document.getElementById("loader") as HTMLDivElement;
    element.style.display='block';
    this.service.GetSite(Id).subscribe((data: any) => {
      debugger;

      if (data.status == "200") {
        element.style.display='none';
        this.sitename = data.result.siteName;

      }
      element.style.display='none';
    });
  }
  AvoidDuplicate(Id, indexid) {

    debugger;
    var bayno = '';
    if (Id != "") {
      for (var i = 0; i < this.vehiclelists.length; i++) {
        if (this.vehiclelists[i].bayid == Id) {
          bayno = this.vehiclelists[i].bayid;
        }
      }
      this.baynonew = parseInt(bayno);
      for (var i = 0; i < this.vehiclelists.length; i++) {
        if (this.vehiclelists[i].id != indexid) {
          for (var j = 0; j < this.baynos.length; j++) {
            if (this.baynos[j].id == bayno) {
              (document.getElementById("txtoptionbay_" + this.baynonew + "" + this.vehiclelists[i].id + "") as HTMLInputElement).disabled = true;
            }
            else {
              (document.getElementById("txtoptionbay_" + this.baynos[j].id + "" + this.vehiclelists[i].id + "") as HTMLInputElement).disabled = false;
            }
          }

        }
        else if (this.vehiclelists[i].id == indexid) {

          for (var j = 0; j < this.baynos.length; j++) {

            (document.getElementById("txtoptionbay_" + this.baynonew + "" + this.vehiclelists[i].id + "") as HTMLInputElement).disabled = false;

          }

        }
      }

    }
    else {
      for (var i = 0; i < this.vehiclelists.length; i++) {

        if (this.vehiclelists[i].id == indexid) {
          this.vehiclelists[i].bayid = "";
          for (var j = 0; j < this.baynos.length; j++) {

            (document.getElementById("txtoptionbay_" + this.baynonew + "" + this.vehiclelists[i].id + "") as HTMLInputElement).disabled = false;

          }

        }
      }

    }
  }
  AddVisitor() {
    var element=document.getElementById("loader") as HTMLDivElement;
    element.style.display='block';
    this.visitorsubmitted = true;
    if (this.visitorForm.invalid) {
      return;
    }

    debugger
    var loginId = '';
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      loginId = user.id;
    }
    for (var i = 0; i < this.vehiclelists.length; i++) {
      if (this.vehiclelists[i].bayid == "") {
        element.style.display='none';
        this.toast.warning("please fill the required fields");
        return;
      }
     
      if (this.vehiclelists[i].make == "") {
        element.style.display='none';
        this.toast.warning("please fill the make field");
        return;
      }
      if (this.vehiclelists[i].model == "") {
        element.style.display='none';
        this.toast.warning("please fill the model field");
        return;
      }
      if (this.vehiclelists[i].vrm == "") {
        element.style.display='none';
        this.toast.warning("please fill the vrm field");
        return;
      }
      if (this.vehiclelists[i].startdate == "") {
        element.style.display='none';
        this.toast.warning("please fill the startdate field");
        return;
      }
      else{
      //  this.vehiclelists[i].startdate=this.vehiclelists[i].startdate.getFullYear()+"-"+this.vehiclelists[i].startdate.getDate()+"-"+this.vehiclelists[i].startdate.getMonth();
      //  this.vehiclelists[i].starttime=this.vehiclelists[i].starttime.getHours()+"-"+this.vehiclelists[i].starttime.getMinutes();
      }
      // if (this.vehiclelists[i].startdatetime == "") {
      //   this.toast.warning("please fill the startdatetime field");
      //   return;
      // }
      if (this.vehiclelists[i].enddate == "") {
        element.style.display='none';
        this.toast.warning("please fill the enddate field");
        return;
      }
      else{
      //  this.vehiclelists[i].enddate=this.vehiclelists[i].enddate.getFullYear()+"-0"+this.vehiclelists[i].enddate.getMonth()+"-"+this.vehiclelists[i].enddate.getDate();
       // this.vehiclelists[i].endtime=this.vehiclelists[i].endtime.getHours()+":"+this.vehiclelists[i].endtime.getMinutes();
      }
      // if (this.vehiclelists[i].enddatetime == "") {
      //   this.toast.warning("please fill the enddatetime field");
      //   return;
      // }
    }
    this.vehiclelistsobj=[];
    for(var i=0;i<this.vehiclelists.length;i++){
      var startdate='';
      if(this.vehiclelists[i].starttime.getMinutes()<10){
         startdate=this.vehiclelists[i].startdate.toJSON().split('T')[0]+" "+this.vehiclelists[i].starttime.getHours()+":0"+this.vehiclelists[i].starttime.getMinutes();
      }else{
        startdate=this.vehiclelists[i].startdate.toJSON().split('T')[0]+" "+this.vehiclelists[i].starttime.getHours()+":"+this.vehiclelists[i].starttime.getMinutes();
      }
      var enddate='';
      if(this.vehiclelists[i].endtime.getMinutes()<10){
       enddate=this.vehiclelists[i].enddate.toJSON().split('T')[0]+" "+this.vehiclelists[i].endtime.getHours()+":0"+this.vehiclelists[i].endtime.getMinutes();
      }
      else{
        enddate=this.vehiclelists[i].enddate.toJSON().split('T')[0]+" "+this.vehiclelists[i].endtime.getHours()+":"+this.vehiclelists[i].endtime.getMinutes();
      }
      this.vehiclelistsobj.push({
        id: this.vehiclelists[i].id,
        bayid: this.vehiclelists[i].bayid,
        make: this.vehiclelists[i].make,
        model: this.vehiclelists[i].model,
        vrm: this.vehiclelists[i].vrm,
        startdate: startdate,
        enddate: enddate,
      })
    }
    var data = ({
      TenantId:user.id,
      SiteId:user.siteId,
      FirstName:this.firstname,
      LastName:this.lastname,
      Email:this.email,
      MobileNumber:this.mobileno,
      Address:this.address,
      City:this.city,
      State:this.state,
      Zipcode:this.zipcode,
      vehiclelists:this.vehiclelistsobj
    });

    this.service.AddVisitor(data).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {
        element.style.display='none';
        this.toast.success("visitor added successfully")

       this.router.navigateByUrl('account/VisitorParking');

      }
      else {
        element.style.display='none';
        this.toast.warning(data.message)
      }

    })
  }
}
