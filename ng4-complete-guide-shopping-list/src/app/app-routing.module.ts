import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponentComponent } from './shopping-list-component/shopping-list-component.component';
import { MessageComponent } from './message/message.component';
import { RecipeDetailComponentComponent } from './recipe/recipe-detail-component/recipe-detail-component.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';


const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', component:RecipeComponent, children:[
    {path:'', component:MessageComponent,pathMatch:'full'},
    {path:'new', component: RecipeEditComponent},
    {path:':id', component: RecipeDetailComponentComponent},
    {path:':id/edit', component: RecipeEditComponent}
  ]},
  {path:'shoppingList', component:ShoppingListComponentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // ,{useHash:true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
