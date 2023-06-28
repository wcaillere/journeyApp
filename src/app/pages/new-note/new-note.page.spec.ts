import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewNotePage } from './new-note.page';

describe('NewNotePage', () => {
  let component: NewNotePage;
  let fixture: ComponentFixture<NewNotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
