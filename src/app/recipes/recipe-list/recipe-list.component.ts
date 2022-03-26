import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Sandwich', 'A Vegetarian vegatabe and paneer sandwich', 'https://www.mashed.com/img/gallery/chain-sandwich-shops-ranked-from-worst-to-best/intro-1625663662.webp'),
    new Recipe('Another Sandwich', 'A Vegetarian vegatabe and paneer sandwich', 'https://www.mashed.com/img/gallery/chain-sandwich-shops-ranked-from-worst-to-best/intro-1625663662.webp')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
