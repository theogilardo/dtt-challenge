import Recipe from "../interface/recipe";

export const $helper = {
  reformatIngredients: function(recipe: Recipe) {
    recipe.ingredients = [];
    let numberOfIngredients = 0;

    for (const [key, value] of Object.entries(recipe)) {
      const formattedKey = key.replace(/[0-9]/g, "");
      if (formattedKey === "strIngredient" && value) {
        numberOfIngredients++;
      }
    }

    // A for loop is used here because we want to iterate a specific time to reformat the ingredients
    for (let j = 1; j <= numberOfIngredients; j++) {
      if (recipe[`strIngredient${j}`]) {
        recipe.ingredients.push(
          `${recipe[`strIngredient${j}`]} <strong> ${
            recipe[`strMeasure${j}`]
          }</strong>`
        );
      }
    }
  },
  resetLocalStorage: function(nameStorage: string, payload: Recipe) {
    localStorage.removeItem(nameStorage);
    localStorage.setItem(nameStorage, JSON.stringify(payload));
  },
};
