import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service';
@Component({
    selector: 'app-page-setpassword',
    templateUrl: './page-setpassword.component.html',
    styleUrls: ['./page-setpassword.component.scss'],
})
export class PageSetpasswordComponent implements OnInit {
    @ViewChild('setForm') setForm: NgForm;
    emailModel = '';
    passwordModel = '';
    constructor(
        private router: Router,
        private toaster: ToastrService,
        private service: TenantserviceService
    ) { }

    ngOnInit(): void {
        document.getElementById('ulmenu').style.display = 'none';
        document.getElementById('logodiv').style.display = 'none';
        document.getElementById('epsdiv').style.display = 'none';
        document.getElementById('mobilediv').style.display = 'none';
    }
    ConfirmPasswordMet() {
        var re = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}');

        if (

            this.setForm.value.newPassword != this.setForm.value.confirmPassword
        ) {
            this.toaster.warning('Password and ConfirmPassword must match');
            return;
        }
        else if (!re.test(this.setForm.value.newPassword)) {
            this.toaster.warning('Password must have 1 Special Charecter,1 Small,1 Capital,1 Numaric,Password must be min 6 Charecters');
            return false;
        }
    }
    onSubmit() {
        debugger;

        var re = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}');
        if (
            this.setForm.value.newPassword != this.setForm.value.confirmPassword
        ) {
            this.toaster.warning('Password and ConfirmPassword must match');
            return false;
        }
        else if (!re.test(this.setForm.value.newPassword)) {
            this.toaster.warning('Password must have 1 Special Charecter,1 Small,1 Capital,1 Numaric,Password must be min 8 Charecters');
            return false;
        }
        else if (this.setForm.value.newPassword.length < 8) {
            this.toaster.warning('Password must be min 8 Charecters');
            return false;
        }
        if (!this.setForm.valid) {
            return false;
        }

        var code = localStorage.getItem('EmailCode');
        this.service
            .setPassword(code, this.setForm.value.newPassword)
            .subscribe((data: any) => {
                if (data.status == '200') {
                    this.router.navigateByUrl('account/thankyou?status=set');
                } else {
                    this.toaster.warning(data.message);
                }
            });
    }
}
