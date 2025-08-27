// services.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './servises.html',
  styleUrls: ['./servises.css']
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('servicesSection') servicesSection!: ElementRef;
  clickedCard: number | null = null;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.animateElements();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.servicesSection.nativeElement);
  }
  openEmail() {
  try {
    const companyEmail = 'contact@yourcompany.com';
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(companyEmail)}`;
    window.open(mailtoLink, '_blank');
  } catch (error) {
    console.error('Failed to open email:', error);
    alert('Unable to open Gmail. Please try again.');
  }
}

  onCardClick(index: number) {
    this.clickedCard = this.clickedCard === index ? null : index;
  }

  animateElements() {
    const elements = document.querySelectorAll('.service-card, .section-header, .cta-button');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 100);
    });
  }
}