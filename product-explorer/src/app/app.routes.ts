import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
import { ItemDetail } from './components/item-detail/item-detail';
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
    {
        path: 'item/:id',
        component: ItemDetail
    },
];
