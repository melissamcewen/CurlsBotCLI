import { Analyzer } from 'haircare-ingredients-analyzer';
import { ingredients } from './data/ingredients';
import { categories } from './data/categories';

// Create an analyzer instance with our ingredient database
const analyzer = new Analyzer({
  database: {
    ingredients,
    categories
  }
});

// Example usage
const ingredientList = "Water, Cetyl Alcohol, Isopropyl Alcohol";
const results = analyzer.analyzeIngredients(ingredientList);

console.log('Analysis Results:', results);

// Find ingredients by category
const fattyAlcohols = analyzer.findIngredientsByCategory('fatty alcohol');
console.log('Fatty Alcohols:', fattyAlcohols);
