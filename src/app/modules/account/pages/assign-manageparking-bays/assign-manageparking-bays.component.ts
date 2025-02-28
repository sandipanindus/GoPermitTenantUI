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
 


}
