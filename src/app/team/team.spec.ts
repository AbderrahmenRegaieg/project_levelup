import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from './team';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TeamComponent (Standalone)', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
