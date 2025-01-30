import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.scss'],
})
export class PageDashboardComponent implements OnInit {
    Address = [];
    address: Address;

    dateSelected = [];
    selectedClass = [];

    // carousel settings

    customOptions: OwlOptions = {
        loop: true,
        autoplay: true,
        center: true,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        navText: ['<', '>'],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            740: {
                items: 1,
            },
            940: {
                items: 3,
            },
        },
        nav: true,
    };

    // orders: Partial<Order>[] = orders.slice(0, 3);

    Name: string;
    EMail: string;
    baseurl: string;
    tenantid;
    vehicles: any;
    profilepath: string;
    constructor(private service: TenantserviceService) {
        var details = JSON.parse(localStorage.getItem('userinfo'));
        this.Name = details.firstName + ' ' + details.lastName;
        this.EMail = details.email;
        this.tenantid = details.id.toString();
        this.GetManageParkings();
        // this.profilepath=details.profilePath;

        //if(this.profilepath==null){
        //   this.profilepath="assets/images/avatars/person-48-primary.png";
        // }
        this.Address = [
            {
                default: true,
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                phone: details.mobileNumber,
                country: '',
                city: details.city,
                postcode: details.zipCode,
                address: details.address,
                State: details.state,
            },
        ];
        // this.address.default = true;
        // this.address.firstName = details.firstName;
        // this.address.lastName = details.lastName;
        // this.address.email = details.email;
        // this.address.phone = details.mobileNumber;
        // this.address.postcode = details.zipCode;
        // this.address.State = details.state;
        this.address = this.Address[0];
        console.log(details);
    }

    getlist() {
        debugger;

        this.service.getvehicles(this.tenantid).subscribe((data: any) => {
            this.vehicles = data.result;
            data.result.map((i) => {
                return this.datechnage(i.startDate);
            });
            data.result.map((i) => {
                return this.datechnage(i.endDate);
            });

            console.log(this.vehicles);
        });
    }
    ngOnInit(): void {
        this.getlist();
        document.getElementById('ulmenu').style.display = 'block';
        document.getElementById('logodiv').style.display = 'block';
        document.getElementById('epsdiv').style.display = 'block';
        document.getElementById('mobilediv').style.display = 'block';
        var userinfo = localStorage.getItem('userinfo');
        var user = JSON.parse(userinfo);
        this.GetProfile(user.id);
    }
    GetProfile(Id) {
        //var element = document.getElementById("loader") as HTMLDivElement;
        //  element.style.display = 'block';
        this.service.GetProfileById(Id).subscribe((data: any) => {
            debugger;
            if (data.status == '200') {
                //element.style.display = 'none';
                this.baseurl = 'https://api.gopermit.co.uk';
                this.profilepath = this.baseurl + data.result.profilePath;

                if (data.result.profilePath == null) {
                    this.profilepath =
                        'assets/images/avatars/person-48-primary.png';
                }
            } else {
                // element.style.display = 'none';
            }
        });
    }
    datechnage(date) {
        var datet = new Date(date).toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        });
        //var returndate = datet.toDateString().replace("T"," ")
        return datet;
    }

    _parkingdatebindings(event) {
        if (event.length === undefined) {
            const date = this.getDateItem(event);

            const index = this.dateSelected.findIndex((item) => {
                const testDate = this.getDateItem(item);
                return testDate === date;
            });

            console.log('Date', date, index);

            if (index < 0) {
                this.dateSelected.push(event);
            } else {
                this.dateSelected.splice(index, 1);
            }
        }

        //$('.spanc span:contains('+"3"+')').css('color', 'red');

        if (this.dateSelected.length > 0) {
            this.selectedClass = this.dateSelected.map((date) => {
                return {
                    date,
                    classes: ['custom-selected-date'],
                };
            });
        }
    }

    getDateItem(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    GetManageParkings() {
        var id = +this.tenantid;
        this.service._getManageParkings(id).subscribe((data: any) => {
            debugger;

            if (data.status == '200') {
                data.result;
                data.result.forEach((element) => {
                    this._parkingdatebindings(new Date(element.startdate));
                });
            }
        });
    }

    GetVisitorParkings() {
        this.service
            .GetVisitorParkings(this.tenantid)
            .subscribe((data: any) => {
                debugger;

                if (data.status == '200') {
                    data.result;
                    data.result.forEach((element) => {
                        this.visitordatebindings(new Date(element.date));
                    });
                }
            });
    }
    visitordateSelected = [];
    visitorselectedClass = []
    visitordatebindings(event) {
        if (event.length === undefined) {
            const date = this.getDateItem(event);

            const index = this.visitordateSelected.findIndex((item) => {
                const testDate = this.getDateItem(item);
                return testDate === date;
            });

            console.log('Date', date, index);

            if (index < 0) {
                this.visitordateSelected.push(event);
            } else {
                this.visitordateSelected.splice(index, 1);
            }
        }

        //$('.spanc span:contains('+"3"+')').css('color', 'red');

        if (this.visitordateSelected.length > 0) {
            this.visitorselectedClass = this.visitordateSelected.map((date) => {
                return {
                    date,
                    classes: ['custom-selected-date'],
                };
            });
        }
    }
}
