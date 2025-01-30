import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{TenantserviceService} from './../../../../shared/api/tenantservice.service'
    import { from } from 'rxjs';
@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  @ViewChild('paswrd', { static: true }) paswrd: ElementRef

   //login
   Loginfrom: FormGroup;
   loginsubmitted = false;
   SignInPassword: string;
   SignInEmail: string;


    constructor(private approute: ActivatedRoute, private toast: ToastrService,  private route: Router,  private formBuilder: FormBuilder,private service:TenantserviceService) {

        this.Loginfrom = this.formBuilder.group({
            Lemail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
            Lpass: ['', Validators.required],
          });


     }
     ngOnInit(): void {
       debugger;
      document.getElementById('ulmenu').style.display='none' ;
      document.getElementById('logodiv').style.display='none' ;
      document.getElementById('epsdiv').style.display='none' ;
      document.getElementById('mobilediv').style.display='none' ;

     }
     get f() { return this.Loginfrom.controls; }


    login()
    {
        this.loginsubmitted = true;
        if (this.Loginfrom.invalid) {
          return;
        }
        debugger

// var credentials={
//   UserName:this.SignInEmail,
//   Password:this.SignInPassword
// }
// this.service.getToken(credentials).subscribe((data: any) => {
// debugger
// console.log(data);
// localStorage.setItem('token',data )

// this.service.tokenchecking().subscribe((data: any) => {

  
//   console.log(data);
//   })
// })




        this.service.Login(this.SignInEmail,this.SignInPassword).subscribe((data: any) => {
            if(data.status=="200")
            {
                this.toast.success("Login sucessfully")
               localStorage.setItem('userinfo',JSON.stringify(data.result) )
              localStorage.setItem('token',data.token )
 
            this.route.navigateByUrl('/account/dashboard');

            }
            else{
                this.toast.warning(data.message);
            }

            
        })

          //  var details=JSON.parse(localStorage.getItem('userinfo')) ;


    }

    ShowPassword() {
        ;
        var data = this.paswrd
        if (this.paswrd.nativeElement.type == "password") {
          this.paswrd.nativeElement.type = "text";
          var eye = document.getElementById("spneye");
          eye.classList.remove("fa-eye-slash")
          eye.classList.add("fa-eye");
        }
        else {
          this.paswrd.nativeElement.type = "password";
          var eye = document.getElementById("spneye");
          eye.classList.remove("fa-eye");
          eye.classList.add("fa-eye-slash")
    
    
        }
      }
}
