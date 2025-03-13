// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TenantserviceService } from '../../../../shared/api/tenantservice.service';

// @Component({
//   selector: 'app-page-edit-visitor-parking',
//   templateUrl: './page-edit-visitor-parking.component.html',
//   styleUrls: ['./page-edit-visitor-parking.component.scss']
// })
// export class PageEditVisitorParkingComponent implements OnInit {
//      vrm
//      startTime
//      endTime

//     visitorForm: FormGroup;
//   constructor(private formBuilder: FormBuilder,private route:Router,private approute:ActivatedRoute, private service: TenantserviceService,) { 

//       this.visitorForm = this.formBuilder.group({
//           //Vname: ['', Validators.required],
//         //  Vsurname: ['', Validators.required],
//           //Vvrm: ['', Validators.required],
//           //Vmobileno: ['', Validators.required],
//           Vemail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
//         });
      
//   }

//   visParid
//   ngOnInit(): void {
//     debugger
//     var userinfo = localStorage.getItem("userinfo");
//     var user = JSON.parse(userinfo);
//     this.approute.params.subscribe(params => {
//       this.visParid = params['id'];
//     });

//     this.getVistorParkingDetails(user.id,this.visParid)
//   }

//   back2(){
//     this.route.navigateByUrl('/account/VisitorParking');
//   }


//   visitorData
//   getVistorParkingDetails(tenantid,visParid){
//     debugger
//     this.service.getVistorParkingDetailsByid(tenantid.toString(),visParid.toString()).subscribe((data: any) => {
//       debugger;
//       if(data.status==200){
//         this.vrm=data.result[0].vrm
//         this.startTime=data.result[0].starttime 
//         this.endTime=data.result[0].endtime
//       }
//     })
//   }

//   isUpdated:boolean=false
//   update(){
//     debugger
//     var data={
//       id:this.visParid,
//       startTime:this.startTime,
//     endTime:this.endTime,
//     vRMNumber:this.vrm
//     }
//     this.service.updateVisitorParkingDet(data).subscribe((resp:any)=>{
//       if(resp.status){
//         this.isUpdated=true

//         setTimeout(() => {
//           this.back2()
//         }, 3000);
//       }
//     })

//   }

// }




















import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantserviceService } from '../../../../shared/api/tenantservice.service';

@Component({
  selector: 'app-page-edit-visitor-parking',
  templateUrl: './page-edit-visitor-parking.component.html',
  styleUrls: ['./page-edit-visitor-parking.component.scss']
})
export class PageEditVisitorParkingComponent implements OnInit {
  
  visitorForm: FormGroup;
  visParid: string;
  isUpdated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private approute: ActivatedRoute,
    private service: TenantserviceService
  ) { 
    // Initialize the form with validation rules
    this.visitorForm = this.formBuilder.group({
      vrm: ['', Validators.required],        // Vehicle Registration Mark
      startTime: ['', Validators.required],  // Start Time
      endTime: ['', Validators.required],    // End Time
    });
  }

  ngOnInit(): void {
    var userinfo = localStorage.getItem("userinfo");
    var user = JSON.parse(userinfo);
    
    this.approute.params.subscribe(params => {
      this.visParid = params['id'];
    });

    this.getVistorParkingDetails(user.id, this.visParid);
  }

  // Fetch visitor parking details
  getVistorParkingDetails(tenantid: string, visParid: string) {
    this.service.getVistorParkingDetailsByid(tenantid, visParid).subscribe((data: any) => {
      if (data.status == 200) {
        this.visitorForm.patchValue({
          vrm: data.result[0].vrm,
          startTime: data.result[0].starttime,
          endTime: data.result[0].endtime
        });
      }
    });
  }

  // Navigate back
  back2() {
    this.route.navigateByUrl('/account/VisitorParking');
  }

  // Update visitor parking details
  update() {
    if (this.visitorForm.invalid) return; // Prevent invalid submissions

    const data = {
      id: this.visParid,
      ...this.visitorForm.value // Get form values dynamically
    };

    this.service.updateVisitorParkingDet(data).subscribe((resp: any) => {
      if (resp.status) {
        this.isUpdated = true;
        setTimeout(() => this.back2(), 3000);
      }
    });
  }
}
