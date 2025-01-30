import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-change-password',
  templateUrl: './page-change-password.component.html',
  styleUrls: ['./page-change-password.component.scss']
})
export class PageChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('ulmenu').style.display='block' 

  }

}
