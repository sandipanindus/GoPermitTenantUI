import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
   
    {label: 'Home', url: '/account/dashboard',nav:'dashboard'},
    {label: 'Manage Parking', url: '/account/VehicleRegistration',nav:'VehicleRegistration'},
    {label: 'Visitor Parking', url: '/account/VisitorParking',nav:'VisitorParking'},
    {label: 'Support Page', url: '/account/Support',nav:'Support'},
    // {label: 'Change Password', url: '/account/password',nav:'password'},
    {label:'Edit Profile', url:'/account/profile',nav:'profile'},
    // {label: 'Logout', url: '/account/login',nav:'login'},
   
   ];
