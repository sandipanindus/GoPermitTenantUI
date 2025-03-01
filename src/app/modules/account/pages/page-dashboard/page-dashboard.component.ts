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

    emailCode: string | null = null;
    profile: any;

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
        const userInfo = localStorage.getItem('userinfo');
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          this.emailCode = parsedUserInfo.address ?? null; // Set emailCode safely
          this.GetProfile(parsedUserInfo.id); // Fetch profile using user id

          this.fetchAndStoreApprovalStatus(parsedUserInfo.id);
      
          const residencyProofId = localStorage.getItem('residencyProofId');
      
          // Check residencyProofId and open the appropriate modal
          if (residencyProofId && residencyProofId.trim() !== '') {
            this.isConfirmationModalOpen = true; // Open third modal directly
          } else {
            this.isDialogOpen = true; // Show terms modal if no residencyProofId
          }
        } else {
          console.warn('User info not found in localStorage.');
        }
      
        // Load necessary UI elements
        this.getlist();
        document.getElementById('ulmenu')?.style.setProperty('display', 'block');
        document.getElementById('logodiv')?.style.setProperty('display', 'block');
        document.getElementById('epsdiv')?.style.setProperty('display', 'block');
        document.getElementById('mobilediv')?.style.setProperty('display', 'block');
      }


      fetchAndStoreApprovalStatus(tenantId: number): void {
        this.service.GetProfileById(tenantId).subscribe({
          next: (response: any) => {
            if (response?.status === "200" && response?.result) {
              const isApproved = response.result.isApproved;
      
              // Store isApproved in localStorage
              localStorage.setItem('isApproved', isApproved.toString());
      
              // Conditionally show the confirmation modal
              const residencyProofId = localStorage.getItem('residencyProofId');
              if (!isApproved && residencyProofId && residencyProofId.trim() !== '') {
                this.isConfirmationModalOpen = true; // Open confirmation modal only if not approved
              } else {
                this.isConfirmationModalOpen = false; // Hide modal if approved
              }
            }
          },
          error: (error) => {
            console.error("Failed to fetch approval status:", error);
          }
        });
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







isDialogOpen = false;
isUploadModalOpen = false;
isConfirmationModalOpen = false;
residencyProofFile: File | null = null;
identityProofFile: File | null = null;

// Open first modal
openDialog() {
  this.isDialogOpen = true;
  document.body.style.overflow = 'hidden';
}

// Close first modal
closeDialog() {
  this.isDialogOpen = false;
  document.body.style.overflow = 'auto';
}

// Agree and open document upload modal
agreeAndOpenUploadModal() {
  this.closeDialog();
  this.openUploadModal();
}

// Open second modal
openUploadModal() {
  this.isUploadModalOpen = true;
  document.body.style.overflow = 'hidden';
}

// Close second modal
closeUploadModal() {
  this.isUploadModalOpen = false;
  document.body.style.overflow = 'auto';
}

// Open third modal
openConfirmationModal() {
  this.isConfirmationModalOpen = true;
  document.body.style.overflow = 'hidden';
}

// Close third modal
closeConfirmationModal() {
  this.isConfirmationModalOpen = false;
  document.body.style.overflow = 'auto';
}

// Handle file selection
onFileSelected(event: Event, type: 'residency' | 'identity') {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    type === 'residency'
      ? (this.residencyProofFile = target.files[0])
      : (this.identityProofFile = target.files[0]);
  }
}





// Submit documents and show confirmation
submitDocuments(residencyProof: HTMLInputElement, ownershipProof: HTMLInputElement) {
    const residencyFile = residencyProof.files?.[0];
    const ownershipFile = ownershipProof.files?.[0];
  
    if (!residencyFile || !ownershipFile) {
      alert("Please upload both documents.");
      return;
    }
  
    if (!this.tenantid) {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    // Call the API to upload documents
    this.service.uploadTenantDocuments(this.tenantid, residencyFile, ownershipFile).subscribe({
      next: (response) => {
        console.log("Upload successful:", response);
  
        // Fetch updated profile after successful upload
        this.service.GetProfileById(this.tenantid).subscribe({
          next: (profileResponse: any) => {
            console.log("Updated Profile:", profileResponse);
  
            // Extract residencyProofId from the response
            const residencyProofId = profileResponse?.result?.residencyProofId;
            
            if (residencyProofId) {
              localStorage.setItem('residencyProofId', residencyProofId);
              console.log("Residency Proof ID stored in localStorage:", residencyProofId);
            }
  
            this.closeUploadModal();        // Close the upload modal
            this.openConfirmationModal();   // Open the confirmation modal
  
            // Optionally update local profile data if needed:
            this.profile = profileResponse?.result;
          },
          error: (profileError) => {
            console.error("Failed to fetch updated profile:", profileError);
            alert("Documents uploaded, but failed to fetch updated profile.");
          }
        });
      },
      error: (error) => {
        console.error("Upload failed:", error);
        alert("Document upload failed. Please try again.");
      }
    });
  }
  
}
