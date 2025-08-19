import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
// import { ItemDetailComponent } from './components/item-detail.component';
import { LandingPage } from './components/landing-page/landing-page';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'items',
        component: ItemList
    },
    // {
    //     path: 'items/:id',
    //     component: ItemDetailComponent
    // },
];
