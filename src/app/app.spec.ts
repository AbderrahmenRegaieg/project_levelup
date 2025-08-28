import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app'; // Assuming app.ts defines AppComponent
import { Footer } from './footer/footer';
import { HeaderComponent } from './header/header'; // Added missing import

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, Footer], // Fixed 'Headers' to 'HeaderComponent'
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; // Renamed to avoid conflict
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, First-AppComponent');
  });
});