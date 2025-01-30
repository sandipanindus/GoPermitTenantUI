import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import{MustMatch} from '../../../../../app/helpers/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TenantserviceService } from './../../../../shared/api/tenantservice.service'
import { from } from 'rxjs';
@Component({
    selector: 'app-page-password',
    templateUrl: './page-password.component.html',
    styleUrls: ['./page-password.component.sass']
})
export class PagePasswordComponent {
    changepasswordform: FormGroup;
    changepasswordsubmitted = false;
    currentpassword: string;
    newpassword: string;
    reenterpassword: string;
    expression:boolean=true;
    constructor(private approute: ActivatedRoute, private toast: ToastrService, private route: Router, private formBuilder: FormBuilder, private service: TenantserviceService) {

        this.changepasswordform = this.formBuilder.group({
            Lcurrentpassword: ['', Validators.required],
            Lnewpassword: ['', [Validators.required,
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')],
                
            ],
            Lreenterpassword: ['', Validators.required],
        },
        {
          validator: MustMatch('Lnewpassword', 'Lreenterpassword')
        });
    }

    get f() { return this.changepasswordform.controls; }
    changepassword() {
        this.changepasswordsubmitted = true;
        if (this.changepasswordform.invalid) {
            return;
        }
     
        debugger
        var loginId='';
        var userinfo=localStorage.getItem("userinfo");
        var user=JSON.parse(userinfo);
        if(userinfo!=null || userinfo!=undefined){
            loginId=user.id;
        }
        this.service.ChangePassword(this.newpassword,loginId).subscribe((data: any) => {
            if (data.status == "200") {
                // this.toast.success("Password changed sucessfully")
              this.expression=false;
                // setTimeout(() => {
                //     location.reload();
                // }, 1000);

            }
            else {
                this.toast.warning(data.message)
            }
           
        })

    }
}
