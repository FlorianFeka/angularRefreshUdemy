import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPE = '[Recipes] Set Recipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPE;

    constructor(public payload: Recipe[]) {}
}

export type RecipesActions =
    | SetRecipes;
