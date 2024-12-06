import { Ingredient } from 'haircare-ingredients-analyzer';
import { alcohols } from './alcohols';
import { sulfates } from './sulfates';
import { silicones } from './silicones';

export const ingredients: Record<string, Ingredient> = {
  ...alcohols,
  ...sulfates,
  ...silicones,
  // ... import and spread other ingredient categories
};

export default ingredients; 
