import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calender-manage-parking',
  templateUrl: './calender-manage-parking.component.html',
  styleUrls: ['./calender-manage-parking.component.scss']
})
export class CalenderManageParkingComponent implements OnInit {
  mindate = new Date()
  maxDate = new Date()
  selectedClass
  dateSelected


  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  onbaynoset(event){

  }

  back(){
    this.route.navigateByUrl('/account/AddVehicleRegistration')
  }

}
