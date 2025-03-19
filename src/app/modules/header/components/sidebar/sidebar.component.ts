import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showManageParking: boolean = false;
  showVisitorParking: boolean = false;

  showTermsModal = false;
  showPolicyModal = false;

  constructor(private route: Router, private modalService: ModalService) { }
username
  ngOnInit(): void {
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    this.username=user.firstName
  }

  movetohome()
  {
      this.route.navigateByUrl('/account/dashboard');
  }


  dropdownOpen = false;
  toggleDropdown(event: Event) {
    console.log("Dropdown clicked!"); // Debugging
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }
  

  
  Logout()
  {
      debugger
      localStorage.clear()
      this.route.navigateByUrl('/account/login');
  }



  openTermsModal() {
    this.modalService.openTermsModal();
  }

  openPolicyModal() {
    this.modalService.openPolicyModal();
  }

}
