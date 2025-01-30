import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    links: {label: string; url: string}[] = [
        {label: 'Dashboard', url: './dashboard'},
        // {label: 'Edit Profile', url: './profile'},
        // {label: 'Order History', url: './orders'},
        // {label: 'Order Details', url: './orders/5'},
        // {label: 'Addresses', url: './addresses'},
        // {label: 'Edit Address', url: './addresses/5'},
       
        // {label: 'Login', url: './login'},
        {label: 'Vehicle Registration', url: './VehicleRegistration'},
        {label: 'Visitor Parking', url: './VisitorParking'},
        {label: 'Support Page', url: './Support'},
        {label: 'Change Password', url: './password'},
        {label: 'Logout', url: './login'}
    ];

    constructor() { }
}
