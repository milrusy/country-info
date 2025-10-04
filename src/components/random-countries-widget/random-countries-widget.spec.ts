import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCountriesWidget } from './random-countries-widget';

describe('RandomCountriesWidget', () => {
  let component: RandomCountriesWidget;
  let fixture: ComponentFixture<RandomCountriesWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomCountriesWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomCountriesWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
