import { Ingredient } from '../shared/ingredient.model';
export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    setValues(obj){
        for (var prop in obj) this[prop] = obj[prop];
    }

    constructor(name?: string, description?: string, imagePath?: string, ingredients?: Ingredient[], obj?:Object) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.setValues(obj);
    }
}