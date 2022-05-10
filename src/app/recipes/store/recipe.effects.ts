import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";

import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                'https://cook-like-a-pro-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
            );
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, 
                        ingredients: recipe.ingredients? recipe.ingredients : []};
                }
            );
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}