import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AdviserPage } from './adviser.page';

describe('AdviserPage', () => {
  let component: AdviserPage;
  let fixture: ComponentFixture<AdviserPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(AdviserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
