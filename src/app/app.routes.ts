import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'currency-converter', component: CurrencyConverterComponent },
    { path: '**', component: PageNotFoundComponent }
];
