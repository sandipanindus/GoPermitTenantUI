import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// modules (angular)
import { CommonModule } from '@angular/common';

// modules
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/shared.module';

// components
import { LayoutComponent } from './components/layout/layout.component';

// pages
import { PageAddressesListComponent } from './pages/page-addresses-list/page-addresses-list.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import{PageVehicleRegistrationComponent} from './pages/page-vehicle-registration/page-vehicle-registration.component'
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { TimepickerModule, } from 'ngx-bootstrap/timepicker'

//import {  } from 'ngx-bootstrap/timepicker'
import { DateTimePickerModule} from 'ngx-datetime-picker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
    import { from } from 'rxjs';
import { PageVisitorParkingComponent } from './pages/page-visitor-parking/page-visitor-parking.component';
import { PageChangePasswordComponent } from './pages/page-change-password/page-change-password.component';
import { PageSupportComponent } from './pages/page-support/page-support.component';
import { PageVisitorParkingAddComponent } from './pages/page-visitor-parking-add/page-visitor-parking-add.component';
import { PageSetpasswordComponent } from './pages/page-setpassword/page-setpassword.component';
import { PageApprovalemailComponent } from './pages/page-approvalemail/page-approvalemail.component';
import { PageThankyouComponent } from './pages/page-thankyou/page-thankyou.component';
import { PageVisitorParkingEditComponent } from './pages/page-visitor-parking-edit/page-visitor-parking-edit.component';
import { PagesForgetpasswordComponent } from './pages/pages-forgetpassword/pages-forgetpassword.component';
import { PagesResetpasswordComponent } from './pages/pages-resetpassword/pages-resetpassword.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { PageVisitorparkingAppointComponent } from './pages/page-visitorparking-appoint/page-visitorparking-appoint.component';
import { PagesVisitorConfirmComponent } from './pages/pages-visitor-confirm/pages-visitor-confirm.component';

import { TooltipModule } from 'ng2-tooltip-directive';

import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
    declarations: [
        // components
        LayoutComponent,
        // pages
        PageAddressesListComponent,
        PageDashboardComponent,
        PageLoginComponent,
        PageOrdersListComponent,
        PagePasswordComponent,
        PageProfileComponent,
        PageOrderDetailsComponent,
        PageEditAddressComponent,
        PageVehicleRegistrationComponent,
        PageVisitorParkingComponent,
        PageChangePasswordComponent,
        PageSupportComponent,
        PageVisitorParkingAddComponent,
        PageSetpasswordComponent,
        PageApprovalemailComponent,
        PageThankyouComponent,
        PageVisitorParkingEditComponent,
        PagesForgetpasswordComponent,
        PagesResetpasswordComponent,
        PageVisitorparkingAppointComponent,
        PagesVisitorConfirmComponent
    ],
    imports: [
        DatepickerModule,
        // modules (angular)
        CommonModule,
        // modules
        AccountRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot() ,
        TimepickerModule.forRoot(),
        ModalModule.forRoot(),
       // BrowserModule, BrowserAnimationsModule,
       // DateInputsModule,
       
       DateTimePickerModule,
       DlDateTimeDateModule,  // <--- Determines the data type of the model
       DlDateTimePickerModule,
       TooltipModule ,
       CarouselModule
    ],
    providers:[BsModalService],
    bootstrap: [PageVehicleRegistrationComponent]
})
export class AccountModule { }
