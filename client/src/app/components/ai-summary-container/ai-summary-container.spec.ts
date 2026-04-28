import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSummaryContainer } from './ai-summary-container';

describe('AiSummaryContainer', () => {
  let component: AiSummaryContainer;
  let fixture: ComponentFixture<AiSummaryContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSummaryContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(AiSummaryContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
