/**
 * Comprehensive food database for Iron & Fury
 * Macros per 100g or standard serving
 */

export interface FoodData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  servingSize?: string;
}

export const FOOD_DATABASE: Record<string, FoodData> = {
  // Proteins
  "chicken breast": { protein: 31, carbs: 0, fat: 3.6, calories: 165 },
  "chicken thigh": { protein: 26, carbs: 0, fat: 11, calories: 209 },
  "ground chicken": { protein: 29, carbs: 0, fat: 5, calories: 165 },
  beef: { protein: 26, carbs: 0, fat: 11, calories: 215 },
  "ground beef": { protein: 17, carbs: 0, fat: 11, calories: 155 },
  steak: { protein: 26, carbs: 0, fat: 15, calories: 271 },
  "lean beef": { protein: 27, carbs: 0, fat: 5, calories: 158 },
  pork: { protein: 27, carbs: 0, fat: 3, calories: 142 },
  "pork chop": { protein: 27, carbs: 0, fat: 3, calories: 142 },
  turkey: { protein: 29, carbs: 0, fat: 1, calories: 135 },
  "ground turkey": { protein: 29, carbs: 0, fat: 1, calories: 135 },
  salmon: { protein: 25, carbs: 0, fat: 13, calories: 208 },
  tuna: { protein: 29, carbs: 0, fat: 1, calories: 132 },
  "canned tuna": { protein: 26, carbs: 0, fat: 0.5, calories: 116 },
  cod: { protein: 20, carbs: 0, fat: 0.7, calories: 82 },
  tilapia: { protein: 26, carbs: 0, fat: 1, calories: 128 },
  shrimp: { protein: 24, carbs: 0, fat: 0.3, calories: 99 },
  egg: { protein: 6, carbs: 0.6, fat: 5, calories: 78 },
  "egg white": { protein: 3.6, carbs: 0.7, fat: 0.2, calories: 17 },
  "whole egg": { protein: 6, carbs: 0.6, fat: 5, calories: 78 },
  tofu: { protein: 15, carbs: 2, fat: 9, calories: 145 },
  tempeh: { protein: 19, carbs: 7, fat: 11, calories: 193 },
  "cottage cheese": { protein: 11, carbs: 3.4, fat: 4.3, calories: 98 },
  greek: { protein: 10, carbs: 3.3, fat: 5, calories: 100 },
  whey: { protein: 24, carbs: 3, fat: 1, calories: 110 },

  // Carbs
  rice: { protein: 2.7, carbs: 28, fat: 0.3, calories: 130 },
  "white rice": { protein: 2.7, carbs: 28, fat: 0.3, calories: 130 },
  "brown rice": { protein: 2.6, carbs: 23, fat: 1, calories: 111 },
  pasta: { protein: 13, carbs: 75, fat: 1.1, calories: 371 },
  oats: { protein: 10, carbs: 54, fat: 5, calories: 389 },
  "oatmeal": { protein: 10, carbs: 54, fat: 5, calories: 389 },
  bread: { protein: 9, carbs: 49, fat: 1.5, calories: 265 },
  "white bread": { protein: 9, carbs: 49, fat: 1.5, calories: 265 },
  "whole wheat bread": { protein: 14, carbs: 41, fat: 2, calories: 247 },
  potato: { protein: 2, carbs: 17, fat: 0.1, calories: 77 },
  "sweet potato": { protein: 1.6, carbs: 20, fat: 0.1, calories: 86 },
  "white potato": { protein: 2, carbs: 17, fat: 0.1, calories: 77 },
  yam: { protein: 1.5, carbs: 27, fat: 0.1, calories: 116 },
  quinoa: { protein: 14, carbs: 57, fat: 4, calories: 368 },
  lentils: { protein: 25, carbs: 63, fat: 0.4, calories: 353 },
  beans: { protein: 8, carbs: 20, fat: 0.3, calories: 127 },
  "black beans": { protein: 8, carbs: 20, fat: 0.3, calories: 127 },
  "pinto beans": { protein: 9, carbs: 24, fat: 0.4, calories: 143 },
  chickpeas: { protein: 19, carbs: 27, fat: 6, calories: 210 },
  banana: { protein: 1.1, carbs: 27, fat: 0.3, calories: 105 },
  apple: { protein: 0.3, carbs: 25, fat: 0.2, calories: 95 },
  orange: { protein: 0.9, carbs: 12, fat: 0.1, calories: 53 },
  berries: { protein: 1.4, carbs: 12, fat: 0.3, calories: 57 },

  // Fats
  "olive oil": { protein: 0, carbs: 0, fat: 100, calories: 884 },
  "coconut oil": { protein: 0, carbs: 0, fat: 100, calories: 884 },
  butter: { protein: 0.7, carbs: 0.1, fat: 81, calories: 717 },
  almonds: { protein: 21, carbs: 22, fat: 50, calories: 579 },
  peanuts: { protein: 26, carbs: 16, fat: 49, calories: 567 },
  walnuts: { protein: 9, carbs: 11, fat: 65, calories: 654 },
  avocado: { protein: 3, carbs: 9, fat: 15, calories: 160 },
  "chia seeds": { protein: 12, carbs: 42, fat: 31, calories: 486 },
  "flax seeds": { protein: 18, carbs: 29, fat: 42, calories: 534 },

  // Vegetables
  broccoli: { protein: 2.8, carbs: 7, fat: 0.4, calories: 34 },
  spinach: { protein: 2.7, carbs: 3.6, fat: 0.4, calories: 23 },
  kale: { protein: 4.3, carbs: 9, fat: 0.9, calories: 49 },
  carrots: { protein: 0.9, carbs: 10, fat: 0.2, calories: 41 },
  asparagus: { protein: 2.2, carbs: 3.7, fat: 0.1, calories: 20 },
  "green beans": { protein: 1.8, carbs: 7, fat: 0.1, calories: 31 },
  zucchini: { protein: 1.2, carbs: 3.5, fat: 0.4, calories: 17 },
  tomato: { protein: 0.9, carbs: 3.9, fat: 0.2, calories: 18 },
  cucumber: { protein: 0.7, carbs: 3.6, fat: 0.1, calories: 16 },
  "bell pepper": { protein: 1, carbs: 6, fat: 0.3, calories: 31 },
  onion: { protein: 1.1, carbs: 9, fat: 0.1, calories: 40 },
  garlic: { protein: 6.4, carbs: 33, fat: 0.5, calories: 149 },
  lettuce: { protein: 1.2, carbs: 2.9, fat: 0.2, calories: 15 },

  // Dairy
  milk: { protein: 3.2, carbs: 4.8, fat: 3.3, calories: 61 },
  "whole milk": { protein: 3.2, carbs: 4.8, fat: 3.3, calories: 61 },
  "skim milk": { protein: 3.4, carbs: 4.8, fat: 0.1, calories: 35 },
  yogurt: { protein: 3.5, carbs: 4.7, fat: 0.4, calories: 59 },
  "greek yogurt": { protein: 10, carbs: 3.3, fat: 5, calories: 100 },
  cheese: { protein: 25, carbs: 1.3, fat: 33, calories: 402 },
  "cheddar cheese": { protein: 25, carbs: 1.3, fat: 33, calories: 402 },
  "mozzarella cheese": { protein: 28, carbs: 3.1, fat: 28, calories: 280 },
  "feta cheese": { protein: 14, carbs: 4.1, fat: 21, calories: 265 },

  // Meats & Processed
  bacon: { protein: 37, carbs: 0, fat: 42, calories: 541 },
  ham: { protein: 27, carbs: 0, fat: 6, calories: 151 },
  sausage: { protein: 28, carbs: 0, fat: 27, calories: 405 },
  "hot dog": { protein: 12, carbs: 2, fat: 17, calories: 216 },
  deli: { protein: 20, carbs: 1, fat: 5, calories: 130 },

  // Beverages
  coffee: { protein: 0.3, carbs: 0, fat: 0, calories: 2 },
  "black coffee": { protein: 0.3, carbs: 0, fat: 0, calories: 2 },
  tea: { protein: 0, carbs: 0, fat: 0, calories: 2 },
  "green tea": { protein: 0, carbs: 0, fat: 0, calories: 2 },
  "orange juice": { protein: 0.7, carbs: 11, fat: 0.1, calories: 47 },
  "apple juice": { protein: 0.1, carbs: 11, fat: 0.1, calories: 46 },
  "protein shake": { protein: 20, carbs: 5, fat: 1, calories: 110 },
  "whey protein": { protein: 24, carbs: 3, fat: 1, calories: 110 },

  // Condiments & Misc
  honey: { protein: 0.3, carbs: 82, fat: 0, calories: 304 },
  "peanut butter": { protein: 25, carbs: 20, fat: 50, calories: 588 },
  "almond butter": { protein: 21, carbs: 20, fat: 50, calories: 579 },
  jam: { protein: 0.3, carbs: 79, fat: 0.1, calories: 278 },
  ketchup: { protein: 0.2, carbs: 26, fat: 0, calories: 112 },
  mustard: { protein: 0.8, carbs: 6, fat: 0.4, calories: 33 },
  mayo: { protein: 0.2, carbs: 0.6, fat: 78, calories: 680 },
};

/**
 * Get food data by name (case-insensitive)
 */
export function getFoodData(foodName: string): FoodData | null {
  const normalized = foodName.toLowerCase().trim();
  return FOOD_DATABASE[normalized] || null;
}

/**
 * Search for foods by partial name
 */
export function searchFoods(query: string): string[] {
  const normalized = query.toLowerCase().trim();
  return Object.keys(FOOD_DATABASE).filter((name) => name.includes(normalized));
}

/**
 * Get all food categories
 */
export function getFoodCategories(): Record<string, string[]> {
  return {
    proteins: [
      "chicken breast",
      "chicken thigh",
      "ground chicken",
      "beef",
      "ground beef",
      "steak",
      "pork",
      "turkey",
      "salmon",
      "tuna",
      "cod",
      "shrimp",
      "egg",
      "tofu",
      "tempeh",
    ],
    carbs: [
      "rice",
      "pasta",
      "oats",
      "bread",
      "potato",
      "sweet potato",
      "yam",
      "quinoa",
      "lentils",
      "beans",
      "banana",
      "apple",
    ],
    vegetables: [
    "broccoli",
    "spinach",
    "kale",
    "carrots",
    "asparagus", "green beans",
      "zucchini",
      "tomato",
      "cucumber",
      "bell pepper",
    ],
    dairy: ["milk", "yogurt", "greek yogurt", "cheese", "cottage cheese"],
    fats: [
      "olive oil",
      "coconut oil",
      "butter",
      "almonds",
      "peanuts",
      "walnuts",
      "peanut butter",
      "avocado",
    ],
  };
}
