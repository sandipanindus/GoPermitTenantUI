import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { RootComponent } from './components/root/root.component';
import { PageOffcanvasCartComponent } from './pages/page-offcanvas-cart/page-offcanvas-cart.component';
import { PageLoginComponent } from '../app/modules/account/pages/page-login/page-login.component';


const routes: Routes = [
    // START / ONLY_FOR_DEMO_YOU_CAN_DELETE_IT
    {
        path: 'home-two',
        component: RootComponent,
        data: {
            headerLayout: 'compact',
            dropcartType: 'dropdown'
        },
        children: [
            {
                path: '',
                component: PageLoginComponent
            }
        ],
    },
    {
        path: 'offcanvas-cart',
        component: RootComponent,
        data: {
            headerLayout: 'classic',
            dropcartType: 'offcanvas'
        },
        children: [
            {
                path: '',
                component: PageOffcanvasCartComponent
            }
        ],
    },
    // END / ONLY_FOR_DEMO_YOU_CAN_DELETE_IT
    {
        path: '',
        component: RootComponent,
        data: {
            // Header layout. Choose one of ['classic', 'compact'].
            headerLayout: 'classic',
            // Dropcart type. Choose one of ['dropdown', 'offcanvas'].
            dropcartType: 'dropdown'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: PageLoginComponent
            },
            {
                path: 'shop',
                loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'blog',
                loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
            },
            {
                path: 'account',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
            },
            {
                path: 'site',
                loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ],
    },
];

@NgModule({

    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        initialNavigation: 'enabled',
        useHash:true,
        enableTracing:true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
