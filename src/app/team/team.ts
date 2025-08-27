import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrls: ['./team.css']
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('teamSection') teamSection!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.animateElements();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.teamSection.nativeElement);
  }

  animateElements() {
    const elements = document.querySelectorAll('.member-card, .section-header');
    elements.forEach((el, index) => {
      el.classList.add('animate');
      (el as HTMLElement).style.setProperty('--delay', `${index * 0.1}s`);
    });
  }
}