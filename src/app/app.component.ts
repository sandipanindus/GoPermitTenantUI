import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './shared/services/cart.service';
import { CompareService } from './shared/services/compare.service';
import { WishlistService } from './shared/services/wishlist.service';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { CurrencyService } from './shared/services/currency.service';
import { filter, first } from 'rxjs/operators';

import { ModalService } from '../app/modules/footer/modal.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    showTermsModal = false;
    showPolicyModal = false;


    constructor( private router:Router,private modalService: ModalService) {
        this.modalService.isTermsModalOpen$.subscribe(state => {
            this.showTermsModal = state;
          });
      
          this.modalService.isPolicyModalOpen$.subscribe(state => {
            this.showPolicyModal = state;
          });
 }

    ngOnInit(): void {
        debugger
        // var data=  localStorage.getItem('userinfo');
        // if(data==null)
        // {
        //   setTimeout(()=>{                           //<<<---using ()=> syntax
        //       this.router.navigateByUrl('/');
  
        //  }, 3000);
        // }
        setTimeout(() => {
            var data = localStorage.getItem('userinfo');
            const allowedRoutes = ['/account/forgetpassword', '/account/resetpassword', '/account/setpassword', '/account/approval',
                 '/account/visitorconfirm'
            ];
           
            if (data == null) {
                const currentRoute = this.router.url.split('?')[0]; // Remove query params
                
                // Redirect only if NOT on an allowed public route
                if (!allowedRoutes.includes(currentRoute)) {
                    setTimeout(() => {
                        this.router.navigateByUrl('/');
                    }, 3000);
                }
            }
        }, 2000);
       
    }


    closeTermsModal() {
        this.modalService.closeTermsModal();
      }
    
      closePolicyModal() {
        this.modalService.closePolicyModal();
      }
}
