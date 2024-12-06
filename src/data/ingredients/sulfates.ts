import { Ingredient } from 'haircare-ingredients-analyzer';

export const sulfates: Record<string, Ingredient> = {
  "sodium lauryl sulfate": {
    name: "Sodium Lauryl Sulfate",
    description: "A strong cleansing agent and primary surfactant. Can be harsh and drying on hair.",
    category: ["sulfate", "harsh cleanser"],
    notes: "Generally recommended to avoid in curly hair routines",
    synonyms: [
      "sodium lauryl sulphate",
      "SLS"
    ]
  },
  // ... other sulfates
}; 
