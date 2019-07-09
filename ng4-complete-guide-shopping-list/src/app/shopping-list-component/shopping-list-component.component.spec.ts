import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListComponentComponent } from './shopping-list-component.component';

describe('ShoppingListComponentComponent', () => {
  let component: ShoppingListComponentComponent;
  let fixture: ComponentFixture<ShoppingListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
