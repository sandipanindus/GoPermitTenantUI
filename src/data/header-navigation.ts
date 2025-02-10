import { Menu } from 'src/app/shared/interfaces/menu';
import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    { label: 'Home',  url: '/account/dashboard', nav: 'dashboard', icon: 'fa-home' },
    { 
        label: 'Manage Parking', 
        url: '', 
        nav: 'VehicleRegistration',
        icon: 'fa-parking',
        menu: {
            type: 'menu', // Ensure 'type' matches the expected values
            items: [
                { label: 'Create Session', url: '/account/AddVehicleRegistration', nav: 'CreateSession', icon: 'fa-plus-circle' },
                { label: 'Manage Session', url: '/account/VehicleRegistration', nav: 'ManageParking', icon: 'fa-list' }
            ]
        } as unknown as Menu  // Explicitly cast to Menu type if necessary
    },
    { 
        label: 'Visitor Parking', 
        url: '/account/VisitorParking', 
        nav: 'VisitorParking',
        icon: 'fa-car',
        menu: {
            type: 'menu', // Ensure 'type' matches the expected values
            items: [
                { label: 'Create Visitor Session', url: '/account/AddVisitorRegistration', nav: 'CreateSession', icon: 'fa-user-plus' },
                { label: 'Manage Visitor Session', url: '/account/VisitorParking', nav: 'VisitorParking', icon: 'fa-list'  }
            ]
        } as unknown as Menu  // Explicitly cast to Menu type if necessary
    },
    // { label: 'Visitor Parking', url: '/account/VisitorParking', nav: 'VisitorParking' },
   // { label: 'Support', url: '/account/Support', nav: 'Support' },
];
