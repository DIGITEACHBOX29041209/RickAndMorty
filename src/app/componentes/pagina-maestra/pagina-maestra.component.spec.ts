import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMaestraComponent } from './pagina-maestra.component';

describe('PaginaMaestraComponent', () => {
  let component: PaginaMaestraComponent;
  let fixture: ComponentFixture<PaginaMaestraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaMaestraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMaestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
