import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactSection') contactSection!: ElementRef;
  isSending = false;
  notificationMessage = '';
  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  private notificationTimeout: any;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.animateElements();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.contactSection.nativeElement);
  }

  animateElements() {
    const elements = document.querySelectorAll('.section-header, .form-input, .form-textarea, .cta-button');
    elements.forEach(el => el.classList.add('animate'));
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    if (this.isSending || !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.isSending = true;
    
    try {
      const formData = new FormData(form);
      const response = await fetch('https://formsubmit.co/ajax/habib@levelupagencies.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          social: formData.get('social'),
          message: formData.get('message')
        })
      });

      if (response.ok) {
        this.showNotificationMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.showNotificationMessage('Failed to send message. Please try again later.', 'error');
    } finally {
      this.isSending = false;
    }
  }

  private showNotificationMessage(message: string, type: 'success' | 'error') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    this.notificationTimeout = setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }
}