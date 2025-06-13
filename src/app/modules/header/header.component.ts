import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
    @Input() layout: 'classic'|'compact' = 'classic';

    constructor(public store: StoreService,private router:Router) {     
    debugger
    //   var data=  localStorage.getItem('userinfo');
    //   if(data==null)
    //   {
    //     setTimeout(()=>{                           //<<<---using ()=> syntax
    //         this.router.navigateByUrl('/');

    //    }, 3000);
    //   }

    var data = localStorage.getItem('userinfo');
const allowedRoutes = ['/account/forgetpassword', '/account/resetpassword', '/account/setpassword', '/account/approval',
    '/account/visitorconfirm'
];

if (data == null) {
    const currentRoute = this.router.url.split('?')[0];
    
    // Redirect only if NOT on an allowed public route
    if (!allowedRoutes.includes(currentRoute)) {
        setTimeout(() => {
            this.router.navigateByUrl('/');
        }, 3000);
    }
}
    }

    movetohome()
    {
        this.router.navigateByUrl('/account/dashboard');
    }
}
