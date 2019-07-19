import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingListComponentComponent } from './shopping-list-component.component';

const ROUTES = [
  {path:'', component:ShoppingListComponentComponent}
]

@NgModule({
    imports:[RouterModule.forChild(ROUTES)],
    exports:[RouterModule]
})
export class ShoppingListRoutingModule {

}