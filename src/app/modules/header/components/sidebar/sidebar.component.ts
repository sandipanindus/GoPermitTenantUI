import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showManageParking: boolean = false;
  showVisitorParking: boolean = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
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

}
