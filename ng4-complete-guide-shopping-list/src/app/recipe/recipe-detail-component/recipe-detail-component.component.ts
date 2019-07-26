import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail-component',
  templateUrl: './recipe-detail-component.component.html',
  styleUrls: ['./recipe-detail-component.component.css']
})
export class RecipeDetailComponentComponent implements OnInit {

  @Input() recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.id = id;
      return this.store.select('recipes');
    }),
    map(recipeState => {
      return recipeState.recipes.find((recipe, index) => {
        return index === this.id;
      });
    }))
    .subscribe(recipe => {
          this.recipe = recipe;
    });
  }

/*     this.route.params.subscribe((params: Params) => {
      if (params) {
        this.id = Number(params['id']);
        this.store.select('recipes')
        .pipe(map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        }))
        .subscribe(recipe => {
          this.recipe = recipe;
        });
      }

    }); */

  onDelete() {
    this.recipeService.deleteRecipeById(this.id);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

}
