import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-approvalemail',
  templateUrl: './page-approvalemail.component.html',
  styleUrls: ['./page-approvalemail.component.scss']
})
export class PageApprovalemailComponent implements OnInit {

  constructor(private approute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    debugger;
    this.SetPassword();
    this.ValidatePassword();
  }
  SetPassword() {
    var Id = this.approute.snapshot.queryParamMap.get('SetPassword')
    if (Id != null) {
      localStorage.setItem("EmailCode", Id);
      this.router.navigateByUrl('account/setpassword');
    }
  }
  ValidatePassword() {
    var Id = this.approute.snapshot.queryParamMap.get('ForgetId')
    if (Id != null) {
      localStorage.setItem("EmailCode", Id);
      
      this.router.navigateByUrl('account/resetpassword');
    }
  }
}
