import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
@Component({
  selector: 'app-pages-resetpassword',
  templateUrl: './pages-resetpassword.component.html',
  styleUrls: ['./pages-resetpassword.component.scss']
})
export class PagesResetpasswordComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  emailModel = '';
  passwordModel = '';
  constructor(private router: Router, private toaster: ToastrService, private service: TenantserviceService) { }

  ngOnInit(): void {
    document.getElementById('ulmenu').style.display = 'none';
    document.getElementById('logodiv').style.display = 'none';
    document.getElementById('epsdiv').style.display = 'none';
    document.getElementById('mobilediv').style.display = 'none';
  }
  ConfirmPasswordMet() {
    var re = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}');
    if (this.resetForm.value.newPassword != this.resetForm.value.confirmPassword) {
      this.toaster.warning("Password and ConfirmPassword must match");
      return false;
    }
    else if (!re.test(this.resetForm.value.newPassword)) {
      this.toaster.warning('Password must have 1 Special Charecter,1 Small,1 Capital,1 Numaric,Password must be min 8 Charecters');
      return false;
    }
    else if (this.resetForm.value.newPassword.length < 8) {
      this.toaster.warning('Password must be min 8 Charecters');
      return false;
    }
  }
  onSubmit() {
    var re = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}');
    if (this.resetForm.value.newPassword != this.resetForm.value.confirmPassword) {
      this.toaster.warning("Password and ConfirmPassword must match");
      return false;
    } else if (!re.test(this.resetForm.value.newPassword)) {
      this.toaster.warning('Password must have 1 Special Charecter,1 Small,1 Capital,1 Numaric,Password must be min 8 Charecters');
      return false;
    }
    else if (this.resetForm.value.newPassword.length < 8) {
      this.toaster.warning('Password must be min 8 Charecters');
      return false;
    }
    if (!this.resetForm.valid) {
      return false;
    }
    var code = localStorage.getItem("EmailCode");
    this.service.ResetPassword(code, this.resetForm.value.newPassword).subscribe((data: any) => {
      if (data.status == "200") {
        this.router.navigateByUrl('account/thankyou?status=reset');
      }
      else {
        this.toaster.warning(data.message);
      }


    }, (error) => {
      this.toaster.error(error.message);
    });
  }

}
