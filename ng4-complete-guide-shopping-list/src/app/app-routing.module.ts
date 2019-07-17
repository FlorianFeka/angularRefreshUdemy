import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponentComponent } from './shopping-list-component/shopping-list-component.component';
import { MessageComponent } from './message/message.component';
import { RecipeDetailComponentComponent } from './recipe/recipe-detail-component/recipe-detail-component.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', component:RecipeComponent, 
    canActivate: [AuthGuard],
    children:[
      {path:'', component:MessageComponent,pathMatch:'full'},
      {path:'new', component: RecipeEditComponent},
      {path:':id', component: RecipeDetailComponentComponent, resolve: [RecipeResolverService]},
      {path:':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
  ]},
  {path:'shoppingList', component:ShoppingListComponentComponent},
  { path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // ,{useHash:true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
