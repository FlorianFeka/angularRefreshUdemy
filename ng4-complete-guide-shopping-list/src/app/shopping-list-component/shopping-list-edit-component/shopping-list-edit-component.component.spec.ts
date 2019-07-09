import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListEditComponentComponent } from './shopping-list-edit-component.component';

describe('ShoppingListEditComponentComponent', () => {
  let component: ShoppingListEditComponentComponent;
  let fixture: ComponentFixture<ShoppingListEditComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListEditComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
