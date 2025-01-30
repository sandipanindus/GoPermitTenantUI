import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
    profileform: FormGroup;
    profilesubmitted = false;
    firstname: string;
    lastname: string;
    address: string;
    state: string;
    city: string;
    zipcode: string;
    mobileno: string;
    email: string;
    sitename:string;
    fileToUpload: File = null;
    files: Array<any> = new Array<any>();
    constructor(private approute: ActivatedRoute, private toast: ToastrService, private router: Router, private formBuilder: FormBuilder, private service: TenantserviceService) {
        this.profileform = this.formBuilder.group({           
            Pmobileno: ['', Validators.required],
            Pprofile:['', Validators.required]
        });
    }
    get p() { return this.profileform.controls; }
    ngOnInit(): void {
        var userinfo = localStorage.getItem("userinfo");
        var user = JSON.parse(userinfo);
        this.GetSite(user.siteId);
        this.GetProfile(user.id);
    }
    GetSite(Id){
        this.service.GetSite(Id).subscribe((data: any) => {
            debugger;
            if (data.status == "200") {
                this.sitename=data.result.siteName;
              
                
            }
            else {
               
                this.toast.warning(data.message)
            }

        })
    }
    GetProfile(Id){
        var element = document.getElementById("loader") as HTMLDivElement;
        element.style.display = 'block';
        this.service.GetProfileById(Id).subscribe((data: any) => {
            debugger;
            if (data.status == "200") {
                element.style.display = 'none';
                this.firstname=data.result.firstName;
                this.lastname=data.result.lastName;
                this.address=data.result.address;
                this.city=data.result.city;
                this.state=data.result.state;
                this.zipcode=data.result.zipCode;
                this.mobileno=data.result.mobileNumber;
                this.email=data.result.email;

                
            }
            else {
                element.style.display = 'none';
                this.toast.warning(data.message)
            }

        })
    }
    onSelectFile(files: FileList) {
        if (files.length === 0)
            return;
        if (files.length > 0) {
            this.files = [];
            for (var i = 0; i < files.length; i++) {
                this.fileToUpload = files.item(i);
                const fileReader: FileReader = new FileReader();
                fileReader.readAsDataURL(this.fileToUpload);
                this.files.push({ data: this.fileToUpload, fileName: this.fileToUpload.name });
            }

        }

    }
    UpdateProfile() {
        debugger;
        var element = document.getElementById("loader") as HTMLDivElement;
        element.style.display = 'block';
        this.profilesubmitted = true;
        if (this.profileform.invalid) {
            element.style.display = 'none';
            return;
        }
        const formData: FormData = new FormData();
        if (this.files.length == 1) {
            formData.append("fileupload", this.fileToUpload, this.fileToUpload.name);
        }
        else if(this.files.length==0){
            element.style.display = 'none';
            this.toast.error("profile is required");
            return;
        }
        var userinfo = localStorage.getItem("userinfo");
        var user = JSON.parse(userinfo);
        formData.append("FirstName",this.firstname);
        formData.append("LastName",this.lastname);
        formData.append("Address",this.address);
        formData.append("State",this.state);
        formData.append("City",this.city);
        formData.append("Zipcode",this.zipcode);
        formData.append("MobileNumber",this.mobileno);
        formData.append("Email",this.email);
        formData.append("Id",user.id);
        // var data = ({
        //     FirstName: this.firstname,
        //     LastName: this.lastname,
        //     Address: this.address,
        //     City: this.city,
        //     State: this.state,
        //     Zipcode: this.zipcode,
        //     MobileNumber: this.mobileno,
        //     Email: this.email,
        //     Id: user.id
        // });
        this.service.UpdateProfile(formData).subscribe((data: any) => {
            if (data.status == "200") {
                element.style.display = 'none';
                this.toast.success("updated successfully")

                this.router.navigateByUrl('account/dashboard');
            }
            else {
                element.style.display = 'none';
                this.toast.warning(data.message)
            }

        })
    }
}
