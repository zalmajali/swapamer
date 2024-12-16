import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestupimPage } from './testupim.page';

describe('TestupimPage', () => {
  let component: TestupimPage;
  let fixture: ComponentFixture<TestupimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestupimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
