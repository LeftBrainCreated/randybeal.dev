import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiRoleCheckComponent } from './ai-role-check.component';

describe('AiRoleCheckComponent', () => {
  let component: AiRoleCheckComponent;
  let fixture: ComponentFixture<AiRoleCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiRoleCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiRoleCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
