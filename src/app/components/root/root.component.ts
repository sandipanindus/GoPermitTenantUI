import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropcartType } from '../../modules/header/components/dropcart/dropcart.component';

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  headerLayout: 'classic' | 'compact';
  dropcartType: DropcartType;

  constructor(
    public route: ActivatedRoute,
    private router: Router // Add Router here
  ) {
    this.route.data.subscribe(data => {
      this.headerLayout = data.headerLayout;
      this.dropcartType = data.dropcartType || 'dropdown';
    });
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
  
  
}
