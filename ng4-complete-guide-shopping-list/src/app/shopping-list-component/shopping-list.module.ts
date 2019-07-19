import { NgModule } from '@angular/core';
import { ShoppingListComponentComponent } from './shopping-list-component.component';
import { ShoppingListEditComponentComponent } from './shopping-list-edit-component/shopping-list-edit-component.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        ShoppingListComponentComponent,
        ShoppingListEditComponentComponent,
    ],
    imports: [ShoppingListRoutingModule, SharedModule, FormsModule],
    // providers: [LoggingService]
})
export class ShoppingListModule{

}