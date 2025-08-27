import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header') header!: ElementRef;
  isScrolled = false;
  lastScrollPosition = 0;
  isHidden = false;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.header.nativeElement);
  }

  scrollTo(section: string) {
    // First navigate to home to ensure we're on the right page
    this.router.navigate(['/']).then(() => {
      // Then scroll to the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  openEmail() {
    try {
      const companyEmail = 'habib@levelupagencies.com';
      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(companyEmail)}`;
      window.open(mailtoLink, '_blank');
    } catch (error) {
      console.error('Failed to open email:', error);
      alert('Unable to open Gmail. Please try again.');
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Hide/show based on scroll direction
    if (currentScroll > this.lastScrollPosition && currentScroll > 100) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    
    this.lastScrollPosition = currentScroll;
    this.isScrolled = currentScroll > 50;

    // Parallax effect
    if (this.header) {
      const logo = this.header.nativeElement.querySelector('.logo');
      const navMenu = this.header.nativeElement.querySelector('.nav-menu');
      const contactButton = this.header.nativeElement.querySelector('.contact-button');
      
      if (logo) logo.style.transform = `translateY(${Math.min(currentScroll * 0.2, 10)}px)`;
      if (navMenu) navMenu.style.transform = `translateY(${Math.min(currentScroll * 0.15, 8)}px)`;
      if (contactButton) contactButton.style.transform = `translateY(${Math.min(currentScroll * 0.1, 5)}px)`;
    }
  }
  isActive(section: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const element = document.getElementById(section);
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight / 2) && 
    rect.bottom >= (window.innerHeight / 2)
  );
}
}
