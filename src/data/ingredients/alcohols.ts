import { Ingredient } from 'haircare-ingredients-analyzer';

export const alcohols: Record<string, Ingredient> = {
  // Drying Alcohols
  "alcohol denat": {
    name: "Alcohol Denat.",
    description: "A type of denatured alcohol commonly used as a solvent. Can be drying and potentially damaging to hair.",
    category: ["drying alcohol"],
    notes: "Avoid in leave-in products and frequent-use products",
    synonyms: [
      "alcohol 40-b",
      "alcohol 40b",
      "alcohol-40b",
      "denatured alcohol",
      "sd alcohol",
      "sd alcohol 40",
      "ethyl alcohol",
      "ethanol"
    ]
  },

  // Fatty Alcohols
  "cetyl alcohol": {
    name: "Cetyl Alcohol",
    description: "A fatty alcohol that acts as an emollient and emulsifier. It's considered safe for curly hair routines.",
    category: ["fatty alcohol", "emollient"],
    notes: "Common in conditioners and styling products",
    synonyms: ["hexadecan-1-ol", "1-hexadecanol", "palmityl alcohol"]
  },
  // ... other alcohols
}; 
