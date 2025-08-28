import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header';
import { HeroComponent } from './hero/hero';
import { ContactComponent } from './contact/contact';
import { Footer } from './footer/footer';
import { ServicesComponent } from './servises/servises';
import { TeamComponent } from './team/team';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'footer', component: Footer },
  { path: '**', redirectTo: '' }
];