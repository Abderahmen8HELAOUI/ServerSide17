import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismCreateComponent } from './organism-create.component';

describe('OrganismCreateComponent', () => {
  let component: OrganismCreateComponent;
  let fixture: ComponentFixture<OrganismCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganismCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganismCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
