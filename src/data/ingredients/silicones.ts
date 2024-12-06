import { Ingredient } from 'haircare-ingredients-analyzer';

export const silicones: Record<string, Ingredient> = {
  "dimethicone": {
    name: "Dimethicone",
    description: "A silicone that forms a barrier on hair. Can build up without proper cleansing.",
    category: ["non-soluble silicone"],
    notes: "May require sulfates for complete removal",
    synonyms: [
      "polydimethylsiloxane",
      "PDMS"
    ]
  },
  // ... other silicones
}; 
