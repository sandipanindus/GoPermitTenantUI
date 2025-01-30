import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PageAddressesListComponent } from './pages/page-addresses-list/page-addresses-list.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { PageVehicleRegistrationComponent } from './pages/page-vehicle-registration/page-vehicle-registration.component';
import{PageVisitorParkingComponent} from './pages/page-visitor-parking/page-visitor-parking.component';
import {PageSupportComponent} from './pages/page-support/page-support.component';
import {PageVisitorParkingAddComponent} from './pages/page-visitor-parking-add/page-visitor-parking-add.component';
import {PageSetpasswordComponent} from './pages/page-setpassword/page-setpassword.component';
import{PageApprovalemailComponent} from './pages/page-approvalemail/page-approvalemail.component';
import{PageThankyouComponent} from './pages/page-thankyou/page-thankyou.component';
import{PageVisitorParkingEditComponent} from './pages/page-visitor-parking-edit/page-visitor-parking-edit.component';
import { PagesForgetpasswordComponent } from './pages/pages-forgetpassword/pages-forgetpassword.component';
import { PagesResetpasswordComponent } from './pages/pages-resetpassword/pages-resetpassword.component';
import { PageVisitorparkingAppointComponent } from './pages/page-visitorparking-appoint/page-visitorparking-appoint.component';
import { PagesVisitorConfirmComponent } from './pages/pages-visitor-confirm/pages-visitor-confirm.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: PageDashboardComponent
            },
            {
                path: 'profile',
                component: PageProfileComponent
            },
            {
                path: 'addresses',
                component: PageAddressesListComponent
            },
            {
                path: 'addresses/:addressId',
                component: PageEditAddressComponent
            },
            {
                path: 'orders',
                component: PageOrdersListComponent
            },
            {
                path: 'orders/:orderId',
                component: PageOrderDetailsComponent
            },
            {
                path: 'password',
                component: PagePasswordComponent
            },
            {
                path: 'VehicleRegistration',
                component: PageVehicleRegistrationComponent
            },
            {
                path: 'VisitorParking',
                component: PageVisitorParkingComponent
            },
            {
                path: 'VisitorParkingAppointment',
                component: PageVisitorparkingAppointComponent
            },
            {
                path:'VisitorParkingAdd',
                component:PageVisitorParkingAddComponent
            }
            ,{
                path:'VisitorParkingEdit',
                component:PageVisitorParkingEditComponent
            },
            {
                path:'setpassword',
                component:PageSetpasswordComponent
            },
            {
                path:'forgetpassword',
                component:PagesForgetpasswordComponent
            }
            ,
            {
                path:'resetpassword',
                component:PagesResetpasswordComponent
            }
            ,
            {
                path:'approval',
                component:PageApprovalemailComponent
            }
            
            ,
            {
                path:'thankyou',
                component:PageThankyouComponent
            }
            ,
            {
                path: 'Support',
                component: PageSupportComponent
            },{
                path:'visitorconfirm',
                component:PagesVisitorConfirmComponent
            }
        ]
    },
    {
        path: 'login',
        component: PageLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
