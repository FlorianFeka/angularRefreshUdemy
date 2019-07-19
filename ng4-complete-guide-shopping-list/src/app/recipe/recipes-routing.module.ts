
import { RecipeComponent } from './recipe.component';
import { AuthGuard } from '../auth/auth.guard';
import { MessageComponent } from '../message/message.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponentComponent } from './recipe-detail-component/recipe-detail-component.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const ROUTES = [
    {path:'', component:RecipeComponent, 
      canActivate: [AuthGuard],
      children:[
        {path:'', component:MessageComponent,pathMatch:'full'},
        {path:'new', component: RecipeEditComponent},
        {path:':id', component: RecipeDetailComponentComponent, resolve: [RecipeResolverService]},
        {path:':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}