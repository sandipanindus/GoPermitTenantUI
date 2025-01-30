import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-thankyou',
  templateUrl: './page-thankyou.component.html',
  styleUrls: ['./page-thankyou.component.scss']
})
export class PageThankyouComponent implements OnInit {
  success1: string;
  success2: string;
  success3: string;
  constructor(private approute: ActivatedRoute) { }

  ngOnInit(): void {
    document.getElementById('ulmenu').style.display = 'none';
    var status = this.approute.snapshot.queryParamMap.get('status')
    if (status == "set") {
      this.success1 = "Password generated successfully";
      this.success2 = "Please login here";
      this.success3 = "to continue";
    }
    else if (status == "forget") {
      this.success1 = "Mail sent successfully";
      this.success2 = "Please check your email";
      this.success3 = "for reset password link";
    }
    else if (status == "reset") {
      this.success1 = "Password changed successfully";
      this.success2 = "Please login here";
      this.success3 = "to continue";
    }
  }

}
