// hero.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  
  dynamicContent = {
    logo: 'LevelUp',
    subtitle: 'Marketing That Makes an Impact',
    services: ['Video Editing', 'Graphic Design', 'Brand Strategy', 'Digital Marketing'],
    descriptions: [
      'Elevate your brand with our cutting-edge video production services',
      'Stunning visual designs that communicate your brand story',
      'Comprehensive strategies for market dominance',
      'Data-driven solutions that maximize your ROI'
    ],
    ctaText: 'Start Your Journey'
  };
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

  
  currentServiceIndex = 0;
  currentDescriptionIndex = 0;
  currentService = this.dynamicContent.services[0];
  private animationIntervals: any[] = [];

  ngAfterViewInit() {
    // Text rotation animation
    this.animationIntervals.push(setInterval(() => {
      this.currentServiceIndex = (this.currentServiceIndex + 1) % this.dynamicContent.services.length;
      this.currentService = this.dynamicContent.services[this.currentServiceIndex];
      this.currentDescriptionIndex = this.currentServiceIndex;
    }, 3000));

    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.animateElements();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.heroSection.nativeElement);
  }

  animateElements() {
    const elements = document.querySelectorAll('.section-header, .dynamic-text, .service-description, .cta-button');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 100);
    });
  }

  ngOnDestroy() {
    this.animationIntervals.forEach(interval => clearInterval(interval));
  }
}