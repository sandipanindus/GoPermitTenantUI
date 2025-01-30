import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
@Component({
  selector: 'app-pages-forgetpassword',
  templateUrl: './pages-forgetpassword.component.html',
  styleUrls: ['./pages-forgetpassword.component.scss']
})
export class PagesForgetpasswordComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm: NgForm;
  forgetpasswordForm: FormGroup;
  forgetpasswordsubmitted = false;
  SignInEmail:string;
  constructor(private router: Router, private toaster: ToastrService, private service: TenantserviceService,private formBuilder:FormBuilder) { 
    this.forgetpasswordForm = this.formBuilder.group({
      Lemail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]]
    });
  }
  get f() { return this.forgetpasswordForm.controls; }
  ngOnInit(): void {
    document.getElementById('ulmenu').style.display='none' ;
    document.getElementById('logodiv').style.display='none' ;
    document.getElementById('epsdiv').style.display='none' ;
    document.getElementById('mobilediv').style.display='none' ;
  }
  onSubmit() {
    this.forgetpasswordsubmitted = true;
    if (this.forgetpasswordForm.invalid) {
      return;
    }
    this.service.ForgetPassword(this.SignInEmail).subscribe((data: any) => {
      if (data.status == "200") {
        this.router.navigateByUrl('account/thankyou?status=forget');
      }
      else {
        this.toaster.warning(data.message);
      }
    }, (error) => {
      this.toaster.warning(error.message);
    });


  }
}
