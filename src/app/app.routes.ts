import { Routes } from '@angular/router';
import { CountryPage } from './pages/country-page/country-page';
import { Home } from './pages/home-page/home-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'country/:code/:name', component: CountryPage }
];
