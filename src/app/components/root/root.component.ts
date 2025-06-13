import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropcartType } from '../../modules/header/components/dropcart/dropcart.component';
import { TenantserviceService } from 'src/app/shared/api/tenantservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy{
  headerLayout: 'classic' | 'compact';
  dropcartType: DropcartType;
  inactivityTimeout: any;
  maxInactivityTime = 45 * 60 * 1000; // 45 minutes

  constructor(
    private service: TenantserviceService,
    public route: ActivatedRoute,
    private router: Router // Add Router here
  ) {
    this.route.data.subscribe(data => {
      this.headerLayout = data.headerLayout;
      this.dropcartType = data.dropcartType || 'dropdown';
    });
  }


    ngOnInit(): void {
    this.resetInactivityTimer();
      const userInfo = localStorage.getItem('userinfo');
     const parsedUserInfo = JSON.parse(userInfo);
    this.getUserDetails(parsedUserInfo.id);
  }

  ngOnDestroy(): void {
    clearTimeout(this.inactivityTimeout);

  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  @HostListener('window:scroll')
  resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.logoutUser();
    }, this.maxInactivityTime);
  }

  logoutUser(): void {
    // Clear localStorage and navigate to login/home page
    localStorage.removeItem('userinfo');
    this.router.navigateByUrl('/');
  }

  isLoggedIn(): boolean {
  return localStorage.getItem('userinfo') !== null;
}

  // Function to show image only for AddVisitorRegistration route
//   shouldShowImage(): boolean {
//     // List of routes where the image should be displayed
//     const routesToShowImage = [
//       '/account/AddVisitorRegistration',
//       '/account/VisitorParking',
//       '/account/AddVehicleRegistration',
//       '/account/VehicleRegistration',
//       '/account/Support',
//       '/account/VisitorParkingAppointment',
      
//     ];
  
//     // Check if the current URL matches any of the routes
//     return routesToShowImage.some(route => this.router.url.includes(route));
//   }



shouldShowFormImage(): boolean {
    // List of routes where the form image should be displayed
    const routesToShowImage = [
      '/account/AddVisitorRegistration',
      '/account/VisitorParking',
      '/account/AddVehicleRegistration',
      '/account/VehicleRegistration',
      '/account/Support',
      '/account/VisitorParkingAppointment',
      '/account/DaySelection',
      '/account/password',
      '/account/profile'
    ];
  
    // Check if the current URL matches any of the routes
    const isCorrectRoute = routesToShowImage.some(route => this.router.url.includes(route));
  
    // Check if thankyoudiv is NOT displayed
    const thankYouDiv = document.getElementById('thankyoudiv');
    const isThankYouHidden = !thankYouDiv || thankYouDiv.style.display === 'none';
  
    return isCorrectRoute && isThankYouHidden;
  }

  
  shouldShowThankYouImage(): boolean {
    const thankYouDiv = document.getElementById('thankyoudiv');
    return !!thankYouDiv && thankYouDiv.style.display === 'block';
  }
  



  shouldApplyBodyStyles(): boolean {
    // List of routes where site__body styles should NOT be applied
    const routesToExcludeStyles = [
      '/account/dashboard'
    ];
  
    // Return true only if the current route is NOT in the excluded list
    return !routesToExcludeStyles.some(route => this.router.url.includes(route));
  }

  getUserDetails(id){
   this.service.GetProfileById(id).subscribe({
          next: (response: any) => {
            if (response?.status === "200" && response?.result) {
              if(!response.result.isActive){
             localStorage.removeItem('userinfo');
            this.router.navigateByUrl('/');
              }
            }
          }
        })
  }
  
  
}
