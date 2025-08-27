import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header";
import { HeroComponent } from "./hero/hero";
import {  ContactComponent } from "./contact/contact";
import { Footer } from './footer/footer';
import { ServicesComponent } from './servises/servises';
import { TeamComponent } from './team/team';



@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent,ServicesComponent, TeamComponent,ContactComponent, Footer, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'First-App';
}
// app.module.ts


 