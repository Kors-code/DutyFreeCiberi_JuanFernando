import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarInfoComponent } from './importar-info.component';

describe('ImportarInfoComponent', () => {
  let component: ImportarInfoComponent;
  let fixture: ComponentFixture<ImportarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
