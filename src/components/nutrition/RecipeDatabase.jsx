// src/components/nutrition/RecipeDatabase.jsx
import { useState } from 'react';

const RecipeDatabase = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Grilled Salmon',
      ingredients: ['Salmon fillet', 'Lemon', 'Dill', 'Olive oil'],
      prepTime: '15 mins',
      cookTime: '10 mins'
    },
    {
      id: 2, 
      name: 'Vegetable Stir Fry',
      ingredients: ['Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce'],
      prepTime: '10 mins',
      cookTime: '8 mins'
    }
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Recipe Database</h3>
      <div className="space-y-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="border-b pb-4">
            <h4 className="font-medium">{recipe.name}</h4>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Prep Time</p>
                <p>{recipe.prepTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cook Time</p>
                <p>{recipe.cookTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ingredients</p>
                <p>{recipe.ingredients.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDatabase;