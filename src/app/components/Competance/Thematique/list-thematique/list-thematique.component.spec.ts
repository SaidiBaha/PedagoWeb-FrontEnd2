import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThematiqueComponent } from './list-thematique.component';

describe('ListThematiqueComponent', () => {
  let component: ListThematiqueComponent;
  let fixture: ComponentFixture<ListThematiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListThematiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
