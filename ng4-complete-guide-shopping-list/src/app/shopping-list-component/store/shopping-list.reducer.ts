import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { StateObservable } from '@ngrx/store';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples',5),
        new Ingredient('Tomatos',10)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions){
        console.log(action.type);
        
    switch(action.type){        
        case ShoppingListActions.ADD_INGREDIENT: 
            return {
                ...state, ingredients: [...state.ingredients, action.payload] 
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [ ...state.ingredients ];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        
        case ShoppingListActions.DELETE_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    
                    if(igIndex !== state.editedIngredientIndex){
                        return true;
                    }else{
                        return false;
                    }
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        
        case ShoppingListActions.START_EDIT:

            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}