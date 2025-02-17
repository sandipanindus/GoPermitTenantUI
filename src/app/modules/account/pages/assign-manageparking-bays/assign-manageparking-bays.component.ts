import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantserviceService } from 'src/app/shared/api/tenantservice.service';

@Component({
  selector: 'app-assign-manageparking-bays',
  templateUrl: './assign-manageparking-bays.component.html',
  styleUrls: ['./assign-manageparking-bays.component.scss']
})
export class AssignManageparkingBaysComponent implements OnInit {
  tenantid
  bayno
  selDate
  constructor( private service: TenantserviceService,private routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.tenantid = params['tenantid'];
      this.bayno = params['bayno'];
      this.selDate=params['date'];
    });
  }

  multiplebays
  vechiclemake
  model
  vrmno
  isFromGrid:boolean
  // Bindbasedondate(date) {
  //   debugger;
  //   // this.ismultivehicel=true
  //   this.service.getvehiclestimedetailsbydate(this.tenantid, this.bayno, date).subscribe((data: any) => {
  //     if (data.status == "200") {

  //       if (data.result.length == 1) {
  //         //alert('single bay')
  //         this.multiplebays = 'none'
  //         this.vechiclemake = data.result[0].make;
  //         this.model = data.result[0].model;
  //         this.vrmno = data.result[0].vrm;
  //         if (!this.isFromGrid) {
  //           this.parkingvalidfrom = new Date(data.result[0].startDate)
  //           this.parkingvalidfromtime = new Date(data.result[0].startDate)
  //           this.parkingvalidTo = new Date(data.result[0].endDate)
  //           this.parkingvalidTotime = new Date(data.result[0].endDate)
  //         } else {
  //           this.parkingvalidfrom = new Date(this.gridEditedObject.startdate);
  //           this.parkingvalidfromtime = new Date(this.gridEditedObject.startdate);
  //           this.parkingvalidTo = new Date(this.gridEditedObject.endate);
  //           this.parkingvalidTotime = new Date(this.gridEditedObject.endate);
  //           this.isFromGrid = false;
  //         }
  //         this.selectingbay1();
  //         this.vehiclesinglelist = 1
  //         this.vehiclecountobj = 1;
  //         this.cycleno = this.vehilsdatalist.result.data[0][0].maxissavecount + 1

  //       }
  //       else if (data.result.length > 0) {
  //         console.log(data);
  //         this.multiplebays = 'block'
  //         this.single = 'none';
  //         this.customdateblockdisplay = "block"

  //         this.selectedClass1 = this.selectedClass;
  //         this.dateSelected1 = this.dateSelected;
  //         this.cycleno = this.vehilsdatalist.result.data[0][0].maxissavecount + 1

  //         this.rbtnchoosestatus = true

  //         this.bindingmultiplecustomdates(data.result);
  //         this.vehiclemultiplelist = 0;

  //       }
  //       else {
  //         this.openmultpledatesetModal(this.template2)
  //       }
  //     }

  //   })
  // }


}
