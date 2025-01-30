import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-page-support',
  templateUrl: './page-support.component.html',
  styleUrls: ['./page-support.component.scss']
})
export class PageSupportComponent implements OnInit {
  replytime: string;
  responsetime: string;
  replyres: string;
  supportform: FormGroup;
  replyform: FormGroup;
  supportsubmitted = false;
  replysubmitted = false;
  name: string;
  showsubject: string;
  email: string;
  issue: string;
  subject: string;
  tenantid: string;
  reply: string;
  response: string;
  dates: any = [];
  subjects: any = [];
  supports: any = [];
  supportlists: any = [];
  ticketid: number;
  constructor(private approute: ActivatedRoute, private toast: ToastrService, private route: Router, private formBuilder: FormBuilder, private service: TenantserviceService) {

    this.supportform = this.formBuilder.group({
      Lissue: ['', Validators.required],
      Lsubject: ['', Validators.required]
    });
    this.replyform = this.formBuilder.group({
      Rreply: ['', Validators.required],

    });
  }
  get f() { return this.supportform.controls; }
  get r() { return this.replyform.controls; }
  ngOnInit(): void {
    document.getElementById('ulmenu').style.display = 'block'

    debugger;
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      this.name = user.firstName + " " + user.lastName;
      this.email = user.email;
      this.tenantid = user.id;
    }
    this.supportlist();
  }
  openreply(id, ticketid) {
    debugger
    localStorage.setItem("Id", id);
    localStorage.setItem("TicketId", ticketid)
    var element = document.getElementById("loader") as HTMLDivElement;
    element.style.display = 'block';

    this.service.GetSupportById(id, ticketid, this.tenantid).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {
        (document).getElementById("responsereplydiv").style.display = 'block';
        (document).getElementById("arrowdiv").style.display = 'block';
        (document).getElementById("subjectdiv").style.display = 'block';
        (document).getElementById("formdiv").style.display = 'none';
        (document).getElementById("supportheaderdiv").style.display = 'none';

        element.style.display = 'none';
        if (data.result.length > 0) {
          this.supportlists = data.result;
          var length = this.supportlists.length;
          this.showsubject = this.supportlists[0].subject;
          if (this.supportlists[length - 1].createdBy == 1) {
            if (this.supportlists[0].status == "closed") {
              document.getElementById("replyareadiv").style.display = 'block';
            } else {
              document.getElementById("replyareadiv").style.display = 'block';
            }
            localStorage.setItem("ParentId", this.supportlists[length - 1].id);
            this.showsubject = this.supportlists[0].subject;
            this.ticketid = this.supportlists[0].id;
          }
          else {
            document.getElementById("replyareadiv").style.display = 'none';
          }
          // for(var i=0;i<this.supportlist.length;i++){
          //   if(id==this.supportlist[i].id){
          //     this.reply=this.supportlist[i].issue;
          //     this.showsubject=this.supportlist[i].subject;
          //     this.replytime=this.supportlist[i].createdOn.split('T')[1].substring(0,5);
          //   }
          //   else{
          //     this.response=this.supportlist[i].issue;
          //    // this.showsubject=this.supportlist[i].subject;
          //     this.responsetime=this.supportlist[i].createdOn.split('T')[1].substring(0,5);
          //   }
          // }
        }


      }
      else {
        element.style.display = 'none';
        //this.toast.warning(data.message)
      }

    })
  }
  openformdiv() {
    (document).getElementById("pastquerydiv").style.display = 'none';
    (document).getElementById("supportformdiv").style.display = 'block';
    (document).getElementById("supportheaderdiv").style.display = 'block';
  }
  closeformdiv() {
    (document).getElementById("pastquerydiv").style.display = 'block';
    (document).getElementById("supportformdiv").style.display = 'none';
    (document).getElementById("supportheaderdiv").style.display = 'block';
  }
  openform() {
    window.location.reload();
    (document).getElementById("responsereplydiv").style.display = 'none';
    (document).getElementById("arrowdiv").style.display = 'none';
    (document).getElementById("subjectdiv").style.display = 'none';
    (document).getElementById("formdiv").style.display = 'block';
    (document).getElementById("supportheaderdiv").style.display = 'block';
  }
  supportlist() {

    this.service.SupportList(this.tenantid).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {

        if (data.result.length > 0) {
          this.supports = data.result;
          console.log(this.supports)
        }


      }
      else {

        this.toast.warning(data.message)
      }

    })
  }
  support() {
    var element = document.getElementById("loader") as HTMLDivElement;
    element.style.display = 'block';
    this.supportsubmitted = true;
    if (this.supportform.invalid) {
      element.style.display = 'none';
      return;
    }
    // if (this.issue.length <= 20) {
    //   element.style.display = 'none';
    //   this.toast.warning("issue field atleast 20 characters");
    //   return;
    // }
    debugger
    var loginId = '';
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      loginId = user.id;
    }
    var data = ({
      tenantId: loginId,
      issue: this.issue,
      subject: this.subject
    });
    this.service.Support(data).subscribe((data: any) => {
      if (data.status == "200") {
        this.toast.success("your request send successfully")
        element.style.display = 'none';
        setTimeout(() => {
          location.reload();
        }, 1000);

      }
      else {
        element.style.display = 'none';
        this.toast.warning(data.message)
      }

    })
  }
  replysupport() {
    var element = document.getElementById("loader") as HTMLDivElement;
    element.style.display = 'block';
    this.replysubmitted = true;
    if (this.replyform.invalid) {
      element.style.display = 'none';
      return;
    }
    // if (this.replyres.length <= 20) {
    //   element.style.display = 'none';
    //   this.toast.warning("issue field atleast 20 characters");
    //   return;
    // }
    debugger
    var loginId = '';
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    if (userinfo != null || userinfo != undefined) {
      loginId = user.id;
    }


    var data = ({
      tenantId: loginId,
      id: parseInt(localStorage.getItem("ParentId")),
      ticketId: parseInt(localStorage.getItem("TicketId")),
      issue: this.replyres,
      subject: this.showsubject,

    });



    this.service.ReplySupport(data).subscribe((data: any) => {
      if (data.status == "200") {
        this.toast.success("your reply send successfully")
        element.style.display = 'none';
        setTimeout(() => {
          this.openreply(localStorage.getItem("Id"),
            localStorage.getItem("TicketId"))
        }, 1000);

      }
      else {
        element.style.display = 'none';
        this.toast.warning(data.message)
      }

    })
  }
}
