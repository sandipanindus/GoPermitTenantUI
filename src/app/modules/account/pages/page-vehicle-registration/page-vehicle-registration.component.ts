import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
import { DatePipe } from '@angular/common';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import * as _moment from 'moment';
import { unitOfTime } from 'moment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { IfStmt } from '@angular/compiler';
import { ChangeDetectorRef } from '@angular/core';


let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}
@Component({
  selector: 'app-page-vehicle-registration',
  templateUrl: './page-vehicle-registration.component.html',
  styleUrls: ['./page-vehicle-registration.component.scss'],
  // encapsulation: ViewEncapsulation.None
  providers: [DatePipe]
})
export class PageVehicleRegistrationComponent implements OnInit {
  public isFromGrid: boolean = false;
  public gridEditedObject: any;
  @ViewChild('template2') template2: TemplateRef<any>;
  @ViewChild('template3') template3: TemplateRef<any>;
  @ViewChild('template4') template4: TemplateRef<any>;
  rbtnchoosestatus = false;
  singlevehicleForm: FormGroup;
  loader = false
  singlevehiclesubmitted = false;
  datepickershow = false;
  isshowblock;
  isshowblock1;
  single: string = 'none'
  multiple: string = 'none'
  multiplebays: string = 'none';
  confignumber: any;
  iterations: any = [];
  parkigbaydrp: any = [];
  visitorparkings: any = [];
  tenantid: string;
  showtable = false;
  myDateValue: Date;

  baynobj: any = ""
  bayno = ""
  vechiclemake = ""
  model = ""
  vrmno = ""
  parkingvalidfrom
  parkingvalidTo
  sitename: string;
  siteaddress: string;
  sitecity: string;
  sitestate: string;
  sitezipcode: string;
  vehiclecountobj
  vehiclecountlist = [

  ]
  bayconfigstyle = "none"
  mindate;
  maxDate;
  bsValue = new Date();
  tenentid
  disablePastDates = true;
  enteredDate: Date;
  private _isPickerOpen = false;
  bsconfig: Partial<BsDatepickerConfig>
  /**
   * multiple dates
   */
  dateselectscustomtop = []
  dateSelected = [];
  selectedClass = [];
  datedisable = [];
  dateSelected2 = [];
  dateSelected1 = [];
  selectedClass1 = [];







  getDateItem(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  onbaynoset(event) {
    debugger
    this.loader = true
    setTimeout(() => {
      this.loader = false

    }, 2000);
    if (typeof (event) != "string" && !this.isFromGrid) {
      this.Bindbasedondate(this.getDateItem(event))
    } else if (typeof (event) == "string" && this.isFromGrid) {
      this.Bindbasedondate(event);
    }

    //   this.dateSelected.forEach(element => {
    //    if(this.getDateItem(element)!=this.getDateItem(event))
    //    {
    //     this.confignumber = 0;
    //     this.configurebasedonNo();
    //     this.clear();
    //     this.multiplebays = 'none'
    //     this.vehiclecountobj = ''
    //     this.datepickershow=false;
    //     this.cycleno=this.vehilsdatalist.result.data[0][0].maxissavecount+1
    //    }
    //  });

  }
  isDisabledStateyes = false;
  isDisabledStateno = true;

  ismultivehicel = false;

  movetoaddmode() {
    debugger
    this.ismultivehicel = true;
    this.confignumber = 0;
    this.rbtncheck = 0;
    this.vehiclemultiplelist = 0;
    this.configurebasedonNo();
    this.clear();

    this.multiplebays = 'none'
    this.single = 'none'

    this.datepickershow = false;
    this.rbtnchoosestatus = true
    this.cycleno = this.vehilsdatalist.result.data[0][0].maxissavecount + 1
    this.isshowblock = true;
    this.isshowblock1 = false;
    this.declinemutlipledateset();
    if (this.vehiclecountobj == 1) {
      //this.showblocks();

    }
    else {
      this.vehiclecountobj = ''
    }
  }

  dataselected = []

  /***
   * BACKUP FOR DATEPICKER SELECT UNSELECT
   */
  // onValueChange(event) {
  //   debugger

  //   if (event.length === undefined || event.length === 1) {

  //     if (new Date(this.mindate) >= new Date(event) && new Date(this.maxDate) >= new Date(event)) {
  //       this.toast.warning('Select date in the range ');
  //       return false;
  //     }

  //     if (this.cycleno > 0) {



  //       //this.datedisable=this.dateSelected
  //       const date = this.getDateItem(event);


  //       const mainindex = this.dataselected.findIndex(item => {
  //         const testDate = this.getDateItem(item);
  //         return testDate === date;
  //       });

  //       if (mainindex < 0) {
  //         const index = this.dateSelected.findIndex(item => {
  //           const testDate = this.getDateItem(item);
  //           return testDate === date;
  //         });

  //         console.log('Date', date, index);

  //         if (index < 0) {
  //           //this.dateSelected.push(event);

  //           const index1 = this.dateselectscustomtop.findIndex(item => {
  //             const testDate = this.getDateItem(item);
  //             return testDate === date;
  //           });
  //           if (index1 < 0) {
  //             this.dateselectscustomtop.push(event);
  //           } else {
  //             this.dateselectscustomtop.splice(index, 1);
  //           }
  //         }
  //         else {
  //           this.dateSelected.splice(index, 1);

  //           const index1 = this.dateselectscustomtop.findIndex(item => {
  //             const testDate = this.getDateItem(item);
  //             return testDate === date;
  //           });
  //           if (index1 < 0) {
  //             this.dateselectscustomtop.push(event);
  //           } else {
  //             this.dateselectscustomtop.splice(index, 1);
  //           }

  //         }


  //         //$('.spanc span:contains('+"3"+')').css('color', 'red');

  //         if (this.dateselectscustomtop.length > 0) {
  //           var colorcustom1 = this.dateselectscustomtop.map(date => {
  //             return {
  //               date,
  //               classes: ['custom-gold']
  //             }
  //           })


  //         }

  //         if (this.dateSelected.length > 0) {
  //           var colorcustom2 = this.dateSelected.map(date => {
  //             return {
  //               date,
  //               classes: ['custom-selected-date']
  //             }
  //           })
  //         }

  //         if (this.dateselectscustomtop.length > 0) {
  //           if (index < 0) {
  //             this.dateSelected.push(event);
  //           }
  //           this.selectedClass = colorcustom1.concat(colorcustom2);
  //           //this.dateSelected=this.delet.concat(colorcustom2) ;
  //         }
  //         else {
  //           this.selectedClass = colorcustom2;
  //         }
  //       }
  //       else {
  //         return false
  //       }


  //     }
  //     else {
  //       this.datedisable = []
  //       const date = this.getDateItem(event);

  //       const index = this.dateSelected.findIndex(item => {
  //         const testDate = this.getDateItem(item);
  //         return testDate === date;
  //       });

  //       console.log('Date', date, index);

  //       if (index < 0) {
  //         this.dateSelected.push(event);

  //         const index1 = this.dateselectscustomtop.findIndex(item => {
  //           const testDate = this.getDateItem(item);
  //           return testDate === date;
  //         });
  //         if (index1 < 0) {
  //           this.dateselectscustomtop.push(event);
  //         } else {
  //           this.dateselectscustomtop.splice(index, 1);
  //         }
  //       }
  //       else {
  //         //this.dateSelected.push(event);
  //         this.dateSelected.splice(index, 1);

  //         const index1 = this.dateselectscustomtop.findIndex(item => {
  //           const testDate = this.getDateItem(item);
  //           return testDate === date;
  //         });
  //         if (index1 < 0) {
  //           this.dateselectscustomtop.push(event);
  //         } else {
  //           this.dateselectscustomtop.splice(index, 1);
  //         }

  //         // return false;

  //       }


  //       //$('.spanc span:contains('+"3"+')').css('color', 'red');

  //       if (this.dateselectscustomtop.length > 0) {
  //         var colorcustom1 = this.dateselectscustomtop.map(date => {
  //           return {
  //             date,
  //             classes: ['custom-gold']
  //           }
  //         })
  //       }

  //       if (this.dateSelected.length > 0) {
  //         var colorcustom2 = this.dateSelected.map(date => {
  //           return {
  //             date,
  //             classes: ['custom-selected-date']
  //           }
  //         })
  //       }

  //       if (this.dateselectscustomtop.length > 0) {

  //         this.selectedClass = colorcustom1.concat(colorcustom2);
  //         //this.dateSelected=this.delet.concat(colorcustom2) ;
  //       }
  //       else {
  //         this.selectedClass = colorcustom2;
  //       }
  //     }
  //   }

  // }



  onValueChange(event) {
    debugger

    if (event.length === undefined || event.length === 1) {
      var mindate = new Date(this.getDateItem(this.mindate));
      var evntdate = new Date(this.getDateItem(event));
      var maxdate = new Date(this.getDateItem(this.maxDate));
      if (mindate > evntdate) {
        var todaydate = new Date();

        if (todaydate > mindate) {
          this.toast.warning('Please select dates in between ' + this.datePipe.transform(todaydate, 'dd/MM/yyyy') + ' and ' + this.datePipe.transform(this.maxDate, 'MM/dd/yyyy') + '');
          return false;
        }
        else {
          this.toast.warning('Please select dates in between ' + this.datePipe.transform(this.mindate, 'dd/MM/yyyy') + ' and ' + this.datePipe.transform(this.maxDate, 'MM/dd/yyyy') + '');
          return false;

        }
      }


      if (maxdate < evntdate) {
        this.toast.warning('Please select dates in between ' + this.datePipe.transform(this.mindate, 'dd/MM/yyyy') + ' and ' + this.datePipe.transform(this.maxDate, 'MM/dd/yyyy') + '');

        // this.toast.warning('Please select dates in between Start Date and End Date');
        return false;
      }

      if (this.cycleno > 0) {



        //this.datedisable=this.dateSelected
        const date = this.getDateItem(event);





        const index = this.dateSelected1.findIndex(item => {
          const testDate = this.getDateItem(item);
          return testDate === date;
        });

        console.log('Date', date, index);

        if (index <= 0) {
          //this.dateSelected.push(event);

          const index1 = this.dateselectscustomtop.findIndex(item => {
            const testDate = this.getDateItem(item);
            return testDate === date;
          });
          if (index1 < 0) {
            this.dateselectscustomtop.push(event);
          } else {
            this.dateselectscustomtop.splice(index, 1);
          }
        }
        else {
          this.dateSelected1.splice(index, 1);
          this.isrecordsexisted = false;
          const index1 = this.dateselectscustomtop.findIndex(item => {
            const testDate = this.getDateItem(item);
            return testDate === date;
          });
          if (index1 < 0) {
            this.dateselectscustomtop.push(event);
          } else {
            this.dateselectscustomtop.splice(index, 1);
          }

        }


        //$('.spanc span:contains('+"3"+')').css('color', 'red');

        if (this.dateselectscustomtop.length > 0) {
          var colorcustom1 = this.dateselectscustomtop.map(date => {
            return {
              date,
              classes: ['custom-selected-yellow']
            }
          })


        }

        if (this.dateSelected1.length > 0) {
          var colorcustom2 = this.dateSelected1.map(date => {
            return {
              date,
              classes: ['custom-selected-date']
            }
          })
        }

        if (this.dateselectscustomtop.length > 0) {
          if (index < 0) {
            this.dateSelected1.push(event);
          }
          this.selectedClass1 = colorcustom1.concat(colorcustom2);
          //this.dateSelected=this.delet.concat(colorcustom2) ;
        }
        else {
          this.selectedClass1 = colorcustom2;
        }
      }




      else {
        this.datedisable = []
        const date = this.getDateItem(event);

        const index = this.dateSelected1.findIndex(item => {
          const testDate = this.getDateItem(item);
          return testDate === date;
        });

        console.log('Date', date, index);

        if (index < 0) {
          this.dateSelected1.push(event);

          const index1 = this.dateselectscustomtop.findIndex(item => {
            const testDate = this.getDateItem(item);
            return testDate === date;
          });
          if (index1 < 0) {
            this.dateselectscustomtop.push(event);
          } else {
            this.dateselectscustomtop.splice(index, 1);
          }
        }
        else {
          //this.dateSelected.push(event);
          this.dateSelected1.splice(index, 1);

          const index1 = this.dateselectscustomtop.findIndex(item => {
            const testDate = this.getDateItem(item);
            return testDate === date;
          });
          if (index1 < 0) {
            this.dateselectscustomtop.push(event);
          } else {
            this.dateselectscustomtop.splice(index, 1);
          }

          // return false;

        }


        //$('.spanc span:contains('+"3"+')').css('color', 'red');

        if (this.dateselectscustomtop.length > 0) {
          var colorcustom1 = this.dateselectscustomtop.map(date => {
            return {
              date,
              classes: ['custom-selected-yellow']
            }
          })
        }

        // if (this.dateSelected.length > 0) {
        //   var colorcustom2 = this.dateSelected.map(date => {
        //     return {
        //       date,
        //       classes: ['custom-selected-date']
        //     }
        //   })
        // }

        if (this.dateselectscustomtop.length > 0) {

          this.selectedClass1 = colorcustom1;
          //this.dateSelected=this.delet.concat(colorcustom2) ;
        }
        else {
          this.selectedClass1 = colorcustom2;
        }

      }
    }

  }
  onValueChange1(event) {

    if (event.length === undefined) {
      const date = this.getDateItem(event);

      const index = this.dateSelected.findIndex(item => {
        const testDate = this.getDateItem(item);
        return testDate === date;
      });

      console.log('Date', date, index);

      if (index < 0) {
        this.dateSelected.push(event);
        this.dataselected.push(event);
      }
      else {
        this.dateSelected.splice(index, 1);
      }
    }

    //$('.spanc span:contains('+"3"+')').css('color', 'red');

    if (this.dateSelected.length > 0) {
      this.selectedClass = this.dateSelected.map(date => {
        return {
          date,
          classes: ['custom-selected-date']
        }
      })
    }
  }


  bsConfig: any

  constructor(private datePipe: DatePipe, private approute: ActivatedRoute, private toast: ToastrService, private route: Router, private formBuilder: FormBuilder, private service: TenantserviceService, private _elementRef: ElementRef, private modalService: BsModalService) {

    this.bsconfig = Object.assign({},
    );

    //this.mindate = {year: 2020, month: 10, day: 1};

    // this.mindate = new Date();
    // this.maxDate = new Date();

    // this.mindate.setDate(this.mindate.getDate() - 1);
    // this.maxDate.setDate(this.maxDate.getDate() + 1);

    this.singlevehicleForm = this.formBuilder.group({
      //sbaynobj: ['', Validators.required],
      // svechiclemake: ['', Validators.required],
      // smodel: ['', Validators.required],
      svrmno: ['', Validators.required],
      sparkingvalidfrom: ['', Validators.required],
      sparkingvalidTo: ['', Validators.required],
      sparkingvalidfromtime: ['', Validators.required],
      sparkingvalidTotime: ['', Validators.required],
    });
  }

  get s() { return this.singlevehicleForm.controls; }

  ngOnInit(): void {
    var data = localStorage.getItem('userinfo');
    if (data == null) {
      setTimeout(() => {
        //<<<---using ()=> syntax
        this.toast.warning('Please login!..')
        this.route.navigateByUrl('/');

      }, 2000);
    }
    document.getElementById('ulmenu').style.display = 'block'

    this.myDateValue = new Date();
    this.parkingbayno();
    //this.getvehicledetails();
    this.GetManageParkings();
    this.GetSiteDetails();

  }

  ngAfterViewInit(): void {

  }

  numberOnly(event): boolean {

    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    // if(charCode>=50 )
    // {
    //   if(this.confignumber==undefined)
    //   {
    //     if(charCode<=60)
    //     {
    //       return true;
    //     }
    //   }
    //   else if(this.confignumber>=10)
    //   {
    //     return true;

    //   }
    // return false;
    // }
    return true;

  }




  keepdateOpen(id) {
    debugger

    document.getElementById('dvtodate').classList.remove('show')
    document.getElementById('dvfmdate').classList.remove('show')
    document.getElementById(id).classList.add('show')



  }
  // dateSelected(id) {
  //   debugger
  //   document.getElementById(id).classList.remove('show')

  // }



  asignbayno() {

  }

  //save chnages
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  decline(): void {
    this.modalRef.hide();
  }

  modalRef1: BsModalRef;
  openmultpleModal(template: TemplateRef<any>, id) {
    this.modalRef1 = this.modalService.show(template, { class: 'modal-sm' });
  }
  declinemutliple(): void {
    this.modalRef1.hide();
  }

  //top calender edit popup
  modalRef2: BsModalRef;
  openmultpledatesetModal(template: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(template, { class: 'modal-sm' });
  }
  declinemutlipledateset(): void {
    this.modalRef1.hide();
  }
  //save multiple

  modalRef3: BsModalRef;
  opensavechekModal(template: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(template, { class: 'modal-sm' });
  }
  declinesavecheck(): void {
    this.modalRef3.hide();
  }


  showblocks() {
    debugger

    // if (this.ismultivehicel != true) {
    //   this.cycleno = 0;
    // }
    this.loader = true
    setTimeout(() => {
      this.loader = false

    }, 2000);
    var today = new Date();
    if (today > this.mindate) {
      this.mindate = today;
    }
    else {
      this.mindate = new Date(this.baynobj.startdate);
    }

    this.parkingvalidTotime = new Date(this.maxDate.setHours(23, 59, 0))
    this.parkingvalidfromtime = new Date(this.mindate.setHours(0, 0, 0))

    this.parkingvalidfrom = this.mindate
    this.parkingvalidTo = this.maxDate

    this.multiplevehiclefromdate = this.mindate
    this.multiplevehicltodate = this.maxDate

    this.weekbasedfromdate = this.mindate
    this.weekbasedtodate = this.maxDate
    if (this.vehiclecountobj == 1) {
      this.vrmno = '';
      this.datepickershow = false;
      this.confignumber = 0;
      this.configurebasedonNo();
      this.multiplebays = 'none'
      this.selectingbay1();
      this.savevtnstatus = 1;
      this.infoexp = false;

    }
    else if (this.vehiclecountobj > 1) {
      this.infoexp = true;

      this.savevtnstatus = 2;

      this.selectingbay2()



      this.confignumber = +this.vehiclecountobj;
      this.configurebasedonNo();
      this.clear();
      this.vehiclemultiplelist = 0;
      this.datebtm = true;
      if (this.cycleno == 0) {
        this.datepickershow = false;

        this.rbtnchoosestatus = true
        this.regulardateblock();
        for (let i = 0; i < this.dateSelected.length; i++) {
          this.dateSelected.splice(i, this.dateSelected.length);
          this.selectedClass.splice(i, this.selectedClass.length);

        }

        for (let i = 0; i < this.dateselectscustomtop.length; i++) {
          this.dateselectscustomtop.splice(i, this.dateselectscustomtop.length);

        }
      }
      else if (this.cycleno > 0) {
        this.customdateblock();
      }

      // (document.getElementById("rbtyes")as HTMLInputElement).disabled = false;
      // (document.getElementById("rbtno")as HTMLInputElement).disabled = false;

    }
    else {
      this.multiplebays = 'none'
      this.single = 'none'
      this.multiple = 'none'
    }
  }
  clear() {

    this.vechiclemake = ''
    this.model = ''
    this.vrmno = ''
    this.parkingvalidfrom = ''
    this.parkingvalidfromtime = null
    this.parkingvalidTo = ''
    this.parkingvalidTotime = null
  }

  vehiclesinglelist = 0;
  vehiclemultiplelist = 0;
  baynamebj
  vehicleslistdates = []
  vehilsdatalist
  rbtncheck = 0;
  //selected bay having records or not
  isrecordsexisted = true

  //This param is is used only on edit from grid ..............else the param can be undefined or null 
  getvehicledetails(dateFormat: any) {
    debugger
    this.rbtnchoosestatus = false;
    this.isrecordsexisted = true;
    this.isshowblock = false;
    this.isshowblock1 = false;
    document.getElementById("parkingsession").style.display = 'none';

    this.cycleno = 0;
    // $("#rbtyes").prop("disabled", true);
    // $("#rbtno").prop("disabled", false);
    this.loader = true
    setTimeout(() => {
      this.loader = false

    }, 2000);
    this.datepickershow = false
    this.vehiclecountlist = []
    //this.selectedClass =[]
    // this.dateselectscustomtop=[]
    for (let i = 0; i < this.dateSelected.length; i++) {
      this.dateSelected.splice(i, this.dateSelected.length);
      this.selectedClass.splice(i, this.selectedClass.length);

    }

    for (let i = 0; i < this.dateselectscustomtop.length; i++) {
      this.dateselectscustomtop.splice(i, this.dateselectscustomtop.length);

    }


    this.bayconfigstyle = 'block'
    this.baynamebj = this.baynobj.BayName;
    this.maxDate = new Date(this.baynobj.endate);
    this.mindate = new Date(this.baynobj.startdate);




    // this.parkingvalidfromtime=this.maxDate.setHours(23,59,0)
    if (!this.isFromGrid) {
      var today = new Date();
      if (today > this.mindate) {
        this.mindate = today;
      }
      else {
        this.mindate = new Date(this.baynobj.startdate);
      }
      this.parkingvalidfrom = this.mindate
      this.parkingvalidTo = this.maxDate
      this.multiplevehiclefromdate = this.mindate
      this.multiplevehicltodate = this.maxDate

      this.weekbasedfromdate = this.mindate
      this.weekbasedtodate = this.maxDate
    }



    debugger
    var vehiclecount = this.baynobj.maxbayno;
    for (let i = 1; i <= vehiclecount; i++) {
      this.vehiclecountlist.push({
        Id: i,
        vehicles: i
      })
    }



    this.service.getvehiclestimedetails(this.tenentid.toString(), this.baynobj.bayNo.toString()).subscribe((data: any) => {
      debugger;
      if (data.status == "200") {
        this.isshowblock = false;
        //this.isshowblock1 = true;
        //this.isrecordsexisted = true
        console.log(data)
        this.vehilsdatalist = data
        this.confignumber = 0;
        this.configurebasedonNo();
        this.clear();
        this.multiplebays = 'none'
        this.vehiclecountobj = ''
        if (data.result.message == "mutilpledata") {
          // this.isrecordsexisted = false

          this.datepickershow = true
          this.single = 'none';


          this.rdbrepeat = 'no'
          this.customdateblock()

          // this.dateSelected =null
          for (let i = 0; i < data.result.data.length; i++) {
            if (data.result.data[i][0] != undefined) {
              for (let k = 0; k < data.result.data[i][0].selectedddates.length; k++) {

                this.onValueChange1(new Date(data.result.data[i][0].selectedddates[k].fromDate))
              }
            }

          }

          this.bindingmultiplecustomdates(data.result.data[0]);
          this.vehiclecountobj = +this.vehilsdatalist.result.data[0][0].configno
          this.multiplebays = 'none'
          this.single = 'none'
          this.multiple = 'none';
          //(document.getElementById("rbtyes") as HTMLInputElement).disabled = true;

        }
        else {


          // this.toast.success('vehicle added sucessfully')
          console.log(data.result)
          if (data.result.length == 1) {

            this.multiplebays = 'none'
            this.vechiclemake = data.result[0].make;
            this.model = data.result[0].model;
            this.vrmno = data.result[0].vrm;
            this.parkingvalidfrom = new Date(data.result[0].startDate)
            this.parkingvalidfromtime = new Date(data.result[0].startDate)
            this.parkingvalidTo = new Date(data.result[0].endDate)
            this.parkingvalidTotime = new Date(data.result[0].endDate)
            this.selectingbay1();
            this.vehiclesinglelist = 1
            this.vehiclecountobj = 1;
            // this.toast.success('single added sucessfully')

          }
          else if (data.result.length > 1) {
            // this.toast.success('multiple added sucessfully')
            // this.isDisabledState=false
            var configno = 0;
            this.rdbrepeat = 'yes'
            this.regulardateblock()

            this.selectingbay2()


            this.rbtnchoosestatus = true

            this.confignumber = data.result[0].configno;
            this.rbtncheck = 1;

            for (let i = 0; i < data.result[0].selectedddates.length; i++) {
              this.onValueChange1(new Date(data.result[0].selectedddates[i].fromDate))
            }
            this.vehiclecountobj = +this.confignumber;
            this.datebtm = true
            this.configurebasedonNo();
            this.vehiclemultiplelist = 1
            //this.multiple='display'
            //this.multiplebays='display'
            setTimeout(() => {
              this.bindingmultiplevehicles(data.result)
            }, 2000);

            // this.dateSelected =[]


            // for (let i = 0; i < data.result.length; i++) {

            // }
            //this.customdateblock()

            console.log(configno);
          }
          else {
            this.confignumber = 0;
            this.rbtncheck = 0;
            this.configurebasedonNo();
            this.clear();
            this.multiplebays = 'none'
            this.single = 'none'
            this.multiple = 'none'
            this.isshowblock = true;
            this.isshowblock1 = false;
          }
        }
        if (this.isFromGrid) {
          this.onbaynoset(dateFormat);
        }
      }
      else {
        // this.isrecordsexisted = false

        this.vehiclecountobj = ''
        this.confignumber = 0;
        this.rbtncheck = 0;
        this.configurebasedonNo();
        this.clear();
        this.multiplebays = 'none'
        this.single = 'none'
        this.multiple = 'none'
        this.isshowblock = true;
        this.isshowblock1 = false;
      }


      if (data.result == "") {
        setTimeout(() => {
          this.vehiclecountobj = 1;
          this.showblocks();
          this.infoexp = false;
        }, 2000);
      }

    })

    // setTimeout(() => {
    //   this.vehiclecountobj = 1;
    //   this.showblocks();
    //   this.infoexp=false;
    // }, 2000);

  }
  infoexp
  /**
   * binding shedule dates vise click on date
   * 
   */

  Bindbasedondate(date) {
    debugger;
    // this.ismultivehicel=true
    this.service.getvehiclestimedetailsbydate(this.tenentid.toString(), this.baynobj.bayNo.toString(), date).subscribe((data: any) => {
      if (data.status == "200") {
        this.isshowblock1 = true;

        if (data.result.length == 1) {
          //alert('single bay')
          this.multiplebays = 'none'
          this.vechiclemake = data.result[0].make;
          this.model = data.result[0].model;
          this.vrmno = data.result[0].vrm;
          if (!this.isFromGrid) {
            this.parkingvalidfrom = new Date(data.result[0].startDate)
            this.parkingvalidfromtime = new Date(data.result[0].startDate)
            this.parkingvalidTo = new Date(data.result[0].endDate)
            this.parkingvalidTotime = new Date(data.result[0].endDate)
          } else {
            this.parkingvalidfrom = new Date(this.gridEditedObject.startdate);
            this.parkingvalidfromtime = new Date(this.gridEditedObject.startdate);
            this.parkingvalidTo = new Date(this.gridEditedObject.endate);
            this.parkingvalidTotime = new Date(this.gridEditedObject.endate);
            this.isFromGrid = false;
          }
          this.selectingbay1();
          this.vehiclesinglelist = 1
          this.vehiclecountobj = 1;
          this.cycleno = this.vehilsdatalist.result.data[0][0].maxissavecount + 1

        }
        else if (data.result.length > 0) {
          console.log(data);
          this.multiplebays = 'block'
          this.single = 'none';
          this.customdateblockdisplay = "block"

          this.selectedClass1 = this.selectedClass;
          this.dateSelected1 = this.dateSelected;
          this.cycleno = this.vehilsdatalist.result.data[0][0].maxissavecount + 1

          // for (let i = 0; i < this.dateSelected.length; i++) {
          //   this.dateSelected.splice(i, this.dateSelected.length);
          //   this.selectedClass.splice(i, this.selectedClass.length);

          // }

          // for (let i = 0; i < this.dateselectscustomtop.length; i++) {
          //   this.dateselectscustomtop.splice(i, this.dateselectscustomtop.length);

          // }
          this.rbtnchoosestatus = true

          this.bindingmultiplecustomdates(data.result);
          this.vehiclemultiplelist = 0;

        }
        else {
          this.openmultpledatesetModal(this.template2)
        }
      }

    })
  }


  datebtm = false
  checkdatetostring() {
    debugger
    this.parkingvalidTo
  }

  bindingmultiplevehicles(data) {
    debugger

    var no = +this.confignumber;

    for (let i = 0; i < no; i++) {

      // (document.getElementById('make' + (i + 1)) as HTMLInputElement).value = data[i].make;
      //(document.getElementById('model' + (i + 1)) as HTMLInputElement).value = data[i].model;
      //(document.getElementById('vehicleno' + (i + 1)) as HTMLInputElement).value = data[i].vrm;
      this.multiplevehiclefromdate = new Date(data[i].startDate)
      this.multiplevehicltodate = new Date(data[i].endDate)
    }

    for (let t = 0; t < data.length; t++) {

      (document.getElementById('vehicleno' + (data[t].bayconfig)) as HTMLInputElement).value = data[t].vrm;


      var endate = new Date(data[t].endDate)
      var startdate = new Date(data[t].startDate)
      var diff = endate.getHours() - startdate.getHours()
      var loopcount = diff + startdate.getHours();
      console.log(diff)
      if (loopcount > 0) {
        for (let c = startdate.getHours(); c <= loopcount; c++) {
          this.selectingcolors(data[t].bayconfig, c)
        }
      }

      // var color = document.getElementById('spn' + t + '' + i).style.backgroundColor

      //this.selectingcolors(i,'')
    }


  }

  bindingmultiplecustomdates(data) {
    // var configno = 0;
    // this.rdbrepeat = 'yes'
    // this.regulardateblock()
    // this.selectingbay2();

    var res = Math.max.apply(Math, data.map(function (a) { return a.bayconfig; }))

    //alert('Max y = ' + res);
    this.confignumber = res;

    // for (let i = 0; i < data.result[0].selectedddates.length; i++) {
    //   this.onValueChange1(new Date(data.result[0].selectedddates[i].fromDate))
    // }
    this.vehiclecountobj = +this.confignumber;
    if (this.vehiclecountobj == 1) {

    } else {
      this.configurebasedonNo();

    }
    this.vehiclemultiplelist = 1
    //this.multiple='display'
    //this.multiplebays='display'
    setTimeout(() => {
      this.bindingmultiplevehicles(data)
    }, 2000);

    // this.dateSelected =[]


    // for (let i = 0; i < data.result.length; i++) {

    // }
    //console.log(configno);
  }

  savevehcile: any = []
  parkingvalidTotime
  parkingvalidfromtime
  savesinglevehicle() {
    debugger


    this.loader = true
    setTimeout(() => {
      this.loader = false

    }, 2000);
    this.savevehcile = []
    this.singlevehiclesubmitted = true;
    if (this.singlevehicleForm.invalid) {
      return;
    }
    if (this.cycleno < 1) {
      this.cycleno = 1
    }


    for (let i = 0; i < this.dateSelected.length; i++) {
      this.dateSelected.splice(i, this.dateSelected.length);
      this.selectedClass.splice(i, this.selectedClass.length);
    }

    for (let i = 0; i < this.dateselectscustomtop.length; i++) {
      this.dateselectscustomtop.splice(i, this.dateselectscustomtop.length);
    }
    if (this.cycleno > 0) {
      this.dateSelected = this.getDateslist(this.parkingvalidfrom, this.parkingvalidTo);
    }
    // if (this.baynobj == "") {
    //   document.getElementById('ddlbayno').innerText = "Choose bay no";
    //   document.getElementById('ddlbayno').style.color = "red";
    //   document.getElementById('ddlbayno').style.display = 'block'

    //   setTimeout(() => {
    //     document.getElementById('ddlbayno').style.display = 'none'

    //   }, 4000);
    //   return false
    // }
    // if (this.baynobj == "" || this.vechiclemake == "" || this.model == "" || this.vrmno == "" || this.parkingvalidfrom == undefined || this.parkingvalidTo == undefined || this.parkingvalidTotime == undefined || this.parkingvalidfromtime == undefined) {
    //   document.getElementById('Spnsinglemsg').innerText = "please fill all details";
    //   document.getElementById('Spnsinglemsg').style.color = "red";
    //   document.getElementById('Spnsinglemsg').style.display = 'block'

    //   setTimeout(() => {
    //     document.getElementById('Spnsinglemsg').style.display = 'none'

    //   }, 4000);

    //   return false


    // }



    this.savevehcile.push({
      Make: this.vechiclemake,
      Model: this.model,
      vrm: this.vrmno,
      bayno: this.baynobj.bayNo.toString(),
      StartDate: this.parkingvalidfrom.getFullYear() + '-' + (this.parkingvalidfrom.getMonth() + 1) + "-" + this.parkingvalidfrom.getDate() + " " + this.parkingvalidfromtime.getHours() + ":" + this.parkingvalidfromtime.getMinutes() + ":" + '00',
      EndDate: this.parkingvalidTo.getFullYear() + '-' + (this.parkingvalidTo.getMonth() + 1) + "-" + this.parkingvalidTo.getDate() + " " + this.parkingvalidTotime.getHours() + ":" + this.parkingvalidTotime.getMinutes() + ":" + '00',
      TenantId: +this.tenentid,
      id: 1,
      loginId: 0,
      dates: this.dateSelected.toString(),
      Issavecount: this.cycleno

    })

    this.service.SaveVehicle(this.savevehcile).subscribe((data: any) => {
      if (data.status == "200") {
        var a = this.modalRef
        if (a != undefined) {
          this.decline()

        }
        var b = this.modalRef3
        if (b != undefined) {
          this.declinesavecheck()
        }

        this.toast.success('Vehicle added sucessfully');
        window.location.reload();
        // this.route.navigateByUrl('/account/dashboard');



      }

    })

  }
  opendate() {
    document.getElementById('dtshow').style.display = 'block'
  }

  //getting dates from to Todate for save singlevehile with custom dates 
  //scenarios if cycleno is more we are passing dates list in datefield
  getDateslist(startDate, stopDate) {

    var dateArray = [];
    var currentDate = new Date(startDate.setHours(0, 0, 0));
    var endDate = new Date(stopDate.setHours(0, 0, 0));
    while (currentDate <= endDate) {
      dateArray.push(new Date(+currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }


  comparedates() {
    debugger

    this.dateSelected.forEach(a => {

      this.dateselectscustomtop.forEach(b => {

        if (this.getDateItem(a) === this.getDateItem(b)) {
          return true;
        }
      });
    });

  }
  multiplevehiclelist = []
  multiplevehicletimelist = []
  multiplevehiclefromdate;
  multiplevehicltodate;
  //saving for custom dates retrive and finding
  cycleno = 0;
  savemultiplevehicle() {

    if (this.cycleno > 0) {
      // var dates= this.comparedates();

      if (this.isrecordsexisted === false) {
        this.opensavechekModal(this.template3)
        return false;
      }
    }

    var msg = this.validation();
    if (msg == false) {
      return false
    }
    this.loader = true
    setTimeout(() => {
      this.loader = false

    }, 2000);
    this.multiplevehiclelist = []
    this.multiplevehicletimelist = []
    debugger
    if (this.baynobj.bayNo == "" || this.baynobj.bayNo == undefined || this.baynobj.bayNo == null) {
      document.getElementById('ddlbayno').innerText = "Choose bay no";
      document.getElementById('ddlbayno').style.color = "red";
      document.getElementById('ddlbayno').style.display = 'block'

      setTimeout(() => {
        document.getElementById('ddlbayno').style.display = 'none'

      }, 4000);
      return false
    }

    if (this.rdbrepeat == 'no') {

      if (this.cycleno < 1) {
        this.cycleno = 1
        this.multiplevehiclefromdate = new Date(Math.min.apply(null, this.dateSelected1));
        this.multiplevehicltodate = new Date(Math.max.apply(null, this.dateSelected1));
        //this.dateSelected =null;

      }
      else {
        if (this.dateselectscustomtop.length > 0) {
          this.multiplevehiclefromdate = new Date(Math.min.apply(null, this.dateselectscustomtop));
          this.multiplevehicltodate = new Date(Math.max.apply(null, this.dateselectscustomtop));

          this.dateSelected = this.dateselectscustomtop;
        }
        else {
          document.getElementById('multivalidate').innerText = "Please select dates you want to update.";
          document.getElementById('multivalidate').style.color = "red";
          document.getElementById('multivalidate').style.display = 'block'

          setTimeout(() => {
            document.getElementById('multivalidate').style.display = 'none'

          }, 4000);
          return false;
        }

      }

    } else if (this.rdbrepeat == 'custom') {
      if (this.cycleno < 1) {
        this.cycleno = 1
      }


      for (let i = 0; i < this.dateSelected.length; i++) {
        this.dateSelected.splice(i, this.dateSelected.length);
        this.selectedClass.splice(i, this.selectedClass.length);

      }

      for (let i = 0; i < this.dateselectscustomtop.length; i++) {
        this.dateselectscustomtop.splice(i, this.dateselectscustomtop.length);

      }

      this.multiplevehiclefromdate = this.weekbasedfromdate;
      this.multiplevehicltodate = this.weekbasedtodate;

      this.dateSelected = this.getlistbyweekname();
    }
    else {
      if (this.cycleno < 1) {
        this.cycleno = 1
      }
      for (let i = 0; i < this.dateSelected.length; i++) {
        this.dateSelected.splice(i, this.dateSelected.length);
        this.selectedClass.splice(i, this.selectedClass.length);

      }

      for (let i = 0; i < this.dateselectscustomtop.length; i++) {
        this.dateselectscustomtop.splice(i, this.dateselectscustomtop.length);

      }

      if (this.cycleno > 0) {
        this.dateSelected = this.getDateslist(this.multiplevehiclefromdate, this.multiplevehicltodate);
      }
    }




    var no = +this.confignumber;

    for (let i = 1; i <= no; i++) {
      this.multiplevehicletimelist = []
      var noshedulevehicle = 0;
      var starttimecount = 0;
      var starttime = 0;
      var endtime = 0;
      for (let t = 0; t < 24; t++) {
        var color = document.getElementById('spn' + t + '' + i).style.backgroundColor
        if (color == "grey") {
          noshedulevehicle++;
        }

        if (t == 23) {
          //save vehicle withouttime shedule
          if (noshedulevehicle == 24) {
            var vehiclestartdate = new Date(this.multiplevehiclefromdate)
            vehiclestartdate.setHours(0, 0, 0);
            var vehiclestartdate1 = vehiclestartdate.getFullYear() + '-' + (vehiclestartdate.getMonth() + 1) + "-" + vehiclestartdate.getDate() + " " + vehiclestartdate.getHours() + ":" + vehiclestartdate.getMinutes() + ":" + '00'
            var vehicleenddate = new Date(this.multiplevehicltodate)
            vehicleenddate.setHours(0, 0, 0);
            var vehicleenddate1 = vehicleenddate.getFullYear() + '-' + (vehicleenddate.getMonth() + 1) + "-" + vehicleenddate.getDate() + " " + vehicleenddate.getHours() + ":" + vehicleenddate.getMinutes() + ":" + '00'
            this.multiplevehiclelist.push({
              //  Make: (document.getElementById('make' + i) as HTMLInputElement).value,
              Make: '',
              //Model: (document.getElementById('model' + i) as HTMLInputElement).value,
              Model: '',
              vrm: (document.getElementById('vehicleno' + i) as HTMLInputElement).value,
              bayno: this.baynobj.bayNo.toString(),
              StartDate: vehiclestartdate1,
              EndDate: vehicleenddate1,
              TenantId: +this.tenentid,
              id: i,
              loginId: 0,
              dates: this.dateSelected.toString(),
              Issavecount: this.cycleno


            })
            noshedulevehicle = 0;
          }
        }
        if (color == "gold") {

          if (starttimecount == 0) {
            starttime = t;
          }
          endtime = t
          starttimecount++
          if (t == 23) {
            if (starttimecount != 0) {
              var vehiclestartdate = new Date(this.multiplevehiclefromdate)
              vehiclestartdate.setHours(starttime, 0, 0);
              var vehiclestartdate1 = vehiclestartdate.getFullYear() + '-' + (vehiclestartdate.getMonth() + 1) + "-" + vehiclestartdate.getDate() + " " + vehiclestartdate.getHours() + ":" + vehiclestartdate.getMinutes() + ":" + '00'
              var vehicleenddate = new Date(this.multiplevehicltodate)
              vehicleenddate.setHours(endtime, 59, 0);
              var vehicleenddate1 = vehicleenddate.getFullYear() + '-' + (vehicleenddate.getMonth() + 1) + "-" + vehicleenddate.getDate() + " " + vehicleenddate.getHours() + ":" + vehicleenddate.getMinutes() + ":" + '00'
              this.multiplevehiclelist.push({
                //  Make: (document.getElementById('make' + i) as HTMLInputElement).value,
                Make: '',
                //Model: (document.getElementById('model' + i) as HTMLInputElement).value,
                Model: '',
                vrm: (document.getElementById('vehicleno' + i) as HTMLInputElement).value,
                bayno: this.baynobj.bayNo.toString(),
                StartDate: vehiclestartdate1,
                EndDate: vehicleenddate1,
                TenantId: +this.tenentid,
                id: i,
                loginId: 0,
                dates: this.dateSelected.toString(),
                Issavecount: this.cycleno


              })
              starttimecount = 0;
              starttime = 0;
              endtime = 0;
            }


          }
        }
        else {
          if (starttimecount != 0) {
            var vehiclestartdate = new Date(this.multiplevehiclefromdate)
            vehiclestartdate.setHours(starttime, 0, 0);
            var vehiclestartdate1 = vehiclestartdate.getFullYear() + '-' + (vehiclestartdate.getMonth() + 1) + "-" + vehiclestartdate.getDate() + " " + vehiclestartdate.getHours() + ":" + vehiclestartdate.getMinutes() + ":" + '00'

            var vehicleenddate12 = new Date(this.multiplevehicltodate)
            vehicleenddate12.setHours(endtime, 59, 0);
            var vehicleenddate2 = vehicleenddate12.getFullYear() + '-' + (vehicleenddate12.getMonth() + 1) + "-" + vehicleenddate12.getDate() + " " + vehicleenddate12.getHours() + ":" + vehicleenddate12.getMinutes() + ":" + '00'

            this.multiplevehiclelist.push({
              // Make: (document.getElementById('make' + i) as HTMLInputElement).value,
              Make: '',
              // Model: (document.getElementById('model' + i) as HTMLInputElement).value,
              Model: '',
              vrm: (document.getElementById('vehicleno' + i) as HTMLInputElement).value,
              bayno: this.baynobj.bayNo.toString(),
              StartDate: vehiclestartdate1,
              EndDate: vehicleenddate2,
              TenantId: +this.tenentid,
              id: i,
              loginId: 0,
              dates: this.dateSelected.toString(),
              Issavecount: this.cycleno

            })
            starttimecount = 0;
            starttime = 0;
            endtime = 0;
          }
        }
      }
      console.log(this.multiplevehiclelist)
    }

    this.service.SaveVehicle(this.multiplevehiclelist).subscribe((data: any) => {
      if (data.status == "200") {
        var a = this.modalRef1
        if (a != undefined) {
          this.declinemutliple()
        }
        var b = this.modalRef3
        if (b != undefined) {
          this.declinesavecheck();

        }
        this.toast.success('vehicle added sucessfully')
        this.route.navigateByUrl('/account/dashboard');

      }
    })


  }


  validation() {
    debugger
    for (let i = 1; i <= this.confignumber; i++) {
      if ((document.getElementById('vehicleno' + i) as HTMLInputElement).value == undefined || (document.getElementById('vehicleno' + i) as HTMLInputElement).value == "") {

        //document.getElementById('multivalidate').style.display='block'
        //document.getElementById('multivalidate').style.display='block'
        document.getElementById('multivalidate').innerText = "Please enter VRM NO";
        document.getElementById('multivalidate').style.color = "red";
        document.getElementById('multivalidate').style.display = 'block'

        setTimeout(() => {
          document.getElementById('multivalidate').style.display = 'none'

        }, 4000);
        return false;
      }
    }
    for (let i = 0; i < 24; i++) {
      var color = document.getElementById('spn' + i + "1").style.backgroundColor
      if (color == "" || color == "white") {
        document.getElementById('multivalidate').innerText = "Please select all shedules time slots";
        document.getElementById('multivalidate').style.color = "red";
        document.getElementById('multivalidate').style.display = 'block'

        setTimeout(() => {
          document.getElementById('multivalidate').style.display = 'none'

        }, 4000);
        return false;

      }

    }

    if (this.rdbrepeat == 'yes') {
      if (this.multiplevehiclefromdate == undefined || this.multiplevehiclefromdate == '' || this.multiplevehicltodate == undefined || this.multiplevehicltodate == '') {
        document.getElementById('multivalidate').innerText = "Please select dates";
        document.getElementById('multivalidate').style.color = "red";
        document.getElementById('multivalidate').style.display = 'block'

        setTimeout(() => {
          document.getElementById('multivalidate').style.display = 'none'

        }, 4000);
        return false;
      }
    }

  }




  rdbrepeat
  mindateselection() {
    debugger
    this.dateSelected
    this.rdbrepeat
    var maxDate = new Date(Math.max.apply(null, this.dateSelected));
    var minDate = new Date(Math.min.apply(null, this.dateSelected));
  }









  mytime
  parkingbayno() {
    debugger
    this.parkigbaydrp = [];
    this.vehiclecountlist = [];

    var details = JSON.parse(localStorage.getItem('userinfo'));
    this.tenentid = details.id.toString();
    this.service.getparkingbays(this.tenentid).subscribe((data: any) => {
      //  debugger;
      this.parkigbaydrp = data.result;
      console.log(this.parkigbaydrp)

    })

    // var details = JSON.parse(localStorage.getItem('userinfo'));
    // var count = +details.parkingBay;
    // this.tenentid = +details.id
    // for (let i = 1; i <= count; i++) {
    //   this.parkigbaydrp.push(
    //     { id: i, value: i }
    //   )
    // }
    console.log(this.parkigbaydrp)
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }


  selectingbay2() {
    this.single = 'none';
    this.multiple = "block"
    this.multiplebays = "block"

  }

  selectingbay1() {
    this.single = 'block';
    this.multiple = "none"
    this.multiplebays = "none"
    this.customdateblockdisplay = "none"

  }
  configurebasedonNo() {
    debugger

    if ((this.confignumber >= 2 && this.confignumber <= 10) || this.confignumber == 0) {
    }
    else {
      this.toast.warning('Choose value 2 to 10');
      this.confignumber = ''
      return false;

    }
    this.iterations = [];
    this.multiplebays = "block"
    var no = +this.confignumber;

    for (let i = 1; i <= no; i++) {
      this.iterations.push(
        { iterrations: i }
      )
    }
    console.log("count", this.iterations)
  }








  regulardateblockdisplay = 'none'
  customdateblockdisplay = 'none'
  regulardateblock() {
    debugger

    // if (this.cycleno != 0) {

    //   document.getElementById('rbtnmsg').innerText = "please select 'NO' to move";
    //   document.getElementById('rbtnmsg').style.color = "red";
    //   document.getElementById('rbtnmsg').style.display = 'block'

    //   setTimeout(() => {
    //     document.getElementById('rbtnmsg').style.display = 'none'
    //     this.rdbrepeat = 'no'

    //   }, 2000);

    // }
    // else {
    this.regulardateblockdisplay = 'block'
    this.customdateblockdisplay = 'none'
    this.custommuldisaply = 'none'
    this.rdbrepeat = 'yes'

    // }

  }
  customdateblock() {
    debugger
    // if (this.cycleno > 0) {
    this.regulardateblockdisplay = 'none'
    this.customdateblockdisplay = 'block'
    this.custommuldisaply = 'none'

    this.rdbrepeat = 'no'
    // }
    // else if (this.cycleno == 0 && this.rbtncheck == 0) {
    //   this.regulardateblockdisplay = 'none'
    //   this.customdateblockdisplay = 'block'
    //   this.custommuldisaply = 'none'

    //   this.rdbrepeat = 'no'
    // }
    // else {
    //   document.getElementById('rbtnmsg').innerText = "please select 'YES' to move";
    //   document.getElementById('rbtnmsg').style.color = "red";
    //   document.getElementById('rbtnmsg').style.display = 'block'

    //   setTimeout(() => {
    //     document.getElementById('rbtnmsg').style.display = 'none'
    //     this.rdbrepeat = 'yes'

    //   }, 2000);
    // }

  }
  custommuldisaply = 'none'
  clickfulldates() {
    this.custommuldisaply = 'block'
    this.regulardateblockdisplay = 'none'
    this.customdateblockdisplay = 'none'
  }

  //**creating date list based on weeknames */

  getlistbyweekname() {
    var testlist = []
    debugger
    //var dayName = "wed"
    var start = new Date(this.weekbasedfromdate);
    var end = new Date(this.weekbasedtodate);
    this.weeknamelist.forEach(element => {
      var data = this.getDaysBetweenDates(start, end, element)
      testlist = testlist.concat(data);


    });

    return testlist;

    // var diff = Math.abs(date2.getTime() - date1.getTime());
    // var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    // for (let i = 0; i < diffDays; i++) {

    // }



  }


  getDaysBetweenDates(start, end, dayName) {
    debugger
    var result = [];
    var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    var day = days[dayName.toLowerCase().substr(0, 3)];
    // Copy start date
    var current = new Date(start);

    var current1 = new Date(start.setHours(0, 0, 0, 0));
    var enddate1 = new Date(end.setHours(0, 0, 0, 0));
    // Shift to next of required days
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
    current1.setDate(current1.getDate() + (day - current1.getDay() + 7) % 7);
    // While less than end date, add dates to result array
    // var startdate=this.getDateItem(current);

    // var endate1=this.getDateItem(end);
    while (current1 <= enddate1) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
      current1.setDate(current1.getDate() + 7);
    }
    console.log(result)
    return result;
  }

  /**
   * assigning week name for ng model
   * and checkbox select and unselect functionality
   */

  mon;
  tue;
  wed;
  thu;
  fri;
  sat;
  sun;
  weekbasedfromdate;
  weekbasedtodate;

  weeknamelist = []
  checkuncheckweeknames(name) {
    debugger
    const mainindex = this.weeknamelist.findIndex(item => {
      return item === name;
    })

    if (mainindex > 0) {
      this.weeknamelist.splice(mainindex, 1);
    }
    else {
      this.weeknamelist.push(name);
    }

    console.log(this.weeknamelist)
  }
  savevtnstatus;


  editsinglemultiple() {
    this.isrecordsexisted = true;
    this.savesinglevehicle();
  }

  editmultipletomultiple() {
    this.isrecordsexisted = true;
    this.savemultiplevehicle();
  }

  // editsingleomultiple() {
  //   this.isrecordsexisted = false;
  //   this.savesinglevehicle();
  // }


  /**
   * Mouse events
   * decalration variables
   * methods
   * 
   */

  down: boolean = false

  async mousedown(iiteration, id) {

    this.down = true
    // setTimeout(() => {
    //   this.loader = false

    // }, 3000);
    this.selectingcolorshover(iiteration, id);
    console.log('up', this.down);


  }

  async mouseup() {
    this.down = false

    console.log('down', this.down);
  }
  mousedown1fromtable(event) {
    debugger
    this.down = true;

  }


  async selectingcolorshover(iiteration, id) {


    if (this.down) {




      var no = +this.confignumber;


      for (let i = 1; i <= no; i++) {
        if (i == iiteration) {
          var data = document.getElementById('spn' + id + '' + i).style.backgroundColor
          if (data == 'grey') {

          }
          else if (data == 'gold') {
            for (let j = 1; j <= no; j++) {
              document.getElementById('spn' + id + '' + j).style.backgroundColor = 'white';
            }
          }
          else {
            document.getElementById('spn' + id + '' + i).style.backgroundColor = 'gold';
            for (let k = 1; k <= no; k++) {
              if (k == iiteration) {

              }
              else {
                document.getElementById('spn' + id + '' + k).style.backgroundColor = 'grey';
              }
            }
          }
        }
        else {
          var data = document.getElementById('spn' + id + '' + i).style.backgroundColor

          if (data == 'gold' || data == 'white') {

          }
          else {
            document.getElementById('spn' + id + '' + i).style.backgroundColor = 'grey';

          }

        }

      }
    }

  }

  selectingcolors(iiteration, id) {
    debugger
    var no = +this.confignumber;

    for (let i = 1; i <= no; i++) {
      if (i == iiteration) {
        var data = document.getElementById('spn' + id + '' + i).style.backgroundColor
        if (data == 'grey') {

        }
        else if (data == 'gold') {
          for (let j = 1; j <= no; j++) {
            document.getElementById('spn' + id + '' + j).style.backgroundColor = 'white';
          }
        }
        else {
          document.getElementById('spn' + id + '' + i).style.backgroundColor = 'gold';
          for (let k = 1; k <= no; k++) {
            if (k == iiteration) {

            }
            else {
              document.getElementById('spn' + id + '' + k).style.backgroundColor = 'grey';
            }
          }
        }
      }
      else {
        var data = document.getElementById('spn' + id + '' + i).style.backgroundColor

        if (data == 'gold' || data == 'white') {

        }
        else {
          document.getElementById('spn' + id + '' + i).style.backgroundColor = 'grey';

        }

      }

    }

  }

  getdateslist() {

    debugger
    var MS_PER_DAY = (1000 * 60 * 60 * 24);

    const start: number = this.parkingvalidfrom.getTime();
    const end: number = this.parkingvalidTo.getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);

    // The days array will contain a Date object for each day between dates (inclusive)
    const days: Date[] = Array.from(new Array(daysBetweenDates + 1),
      (v, i) => new Date(start + (i * MS_PER_DAY)));

  }
  GetManageParkings() {
    var id = +this.tenentid
    this.service._getManageParkings(id).subscribe((data: any) => {
      //  debugger;

      if (data.status == "200") {
        if (data.result.length > 0) {
          document.getElementById("parkingsessionsi").style.display = 'block';
          document.getElementById("messagediv").style.display = 'none';
        }
        else {
          document.getElementById("parkingsessionsi").style.display = 'none';
          document.getElementById("messagediv").style.display = 'block';
        }

        this.visitorparkings = data.result;

        console.log(this.visitorparkings)

      }

    });
  }
  GetSiteDetails() {
    var details = JSON.parse(localStorage.getItem('userinfo'));
    var id = details.siteId;
    this.service.GetSite(id).subscribe((data: any) => {
      // debugger;
      if (data.status == "200") {
        this.sitename = data.result.siteName;
        this.siteaddress = data.result.siteAddress;
        this.sitecity = data.result.city;
        this.sitestate = data.result.state;
        this.sitezipcode = data.result.zipcode;
      }




    });


  }

  confirmdeletevehicle(): void {
    debugger;
    this.deleteManageParking(this.tenantid, this.baynonew)
    this.modalRef.hide();
  }
  baynonew;
  declinedeletevehicle(): void {
    this.modalRef.hide();
  }
  deleteManageParking(Id, bayno) {
    this.loader = true;
    // element.style.display = 'block';
    this.service.DeleteManageParking(Id, this.baynonew).subscribe((data: any) => {
      //debugger;
      if (data.status == "200") {
        this.loader = false;
        this.toast.success("Manging parking deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else {
        this.loader = false;
        this.toast.warning(data.message);
      }

    });
  }
  openModalManage(template4: TemplateRef<any>, result) {
    // debugger;
    this.tenantid = result.id;
    this.baynonew = result.bayno;
    this.modalRef = this.modalService.show(template4, { class: 'modal-sm' });

  }

  EditVehicle(result) {
    debugger;
    this.tenantid = result.registerUserId;
    this.gridEditedObject = result;
    this.single = 'block';
    this.bayconfigstyle = 'block';
    this.isshowblock1 = true;
    this.vehiclecountobj = result.maxvehicle.toString();
    // this.showblocks();
    this.vrmno = result.vrm;
    this.parkingvalidfrom = new Date(result.startdate);
    this.parkingvalidfromtime = new Date(result.startdate);
    this.parkingvalidTo = new Date(result.endate);
    this.parkingvalidTotime = new Date(result.endate);
    // this.baynobj.BayName = result.bayno.toString();
    // this.baynobj.bayNo = result.bayno.toString();
    // this.baynobj.endate = result.endate;
    // this.baynobj.startdate = result.startdate;
    // this.getvehicledetails();
    var tempDate = new Date(result.endate);
    tempDate.setDate(tempDate.getDate() - 1);
    this.parkigbaydrp.forEach(element => {
      debugger;
      if (element.bayNo == result.bayno) {
        this.baynobj = element;
        //this.getvehicledetails();
        this.isFromGrid = true;
        var month = pad2(tempDate.getMonth() + 1);//months (0-11)
        var day = pad2(tempDate.getDate());//day (1-31)
        var year = tempDate.getFullYear();
        var time = this.startTime(tempDate)
        var formattedDate = year + "-" + month + "-" + day + 'T' + time;
        this.getvehicledetails(formattedDate);

      }
      function pad2(n) {
        return (n < 10 ? '0' : '') + n;
      }


    });




  }
  startTime(tempDate) {

    var h = checkTime(tempDate.getHours()),
      m = checkTime(tempDate.getMinutes()),
      s = checkTime(tempDate.getSeconds());
    return h + ":" + m + ":" + s;
    function checkTime(i) {
      return (i < 10) ? "0" + i : i;

    }
  }
}
