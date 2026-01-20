/* uncomment the export below to enable the 1.1.2 test suite! */

 //comparator callback for Array.prototype.sort.
 //sort calls this callback synchronously many times.

export function compareIngredientsCB(ingredientA, ingredientB){
       if (ingredientA.aisle < ingredientB.aisle ) {
        return -1;
       } else if (ingredientA.aisle > ingredientB.aisle) {
        return 1;
       } else {
        if (ingredientA.name < ingredientB.name) {
            return -1;
        } else if (ingredientA.name > ingredientB.name) {
            return 1;
        } else {
        return 0;
    }
  }
}


 // returns a sorted copy of the ingredients array.

export function sortIngredients(ingredients){
    return ingredients.slice(0).sort(compareIngredientsCB);
}

 export function isKnownTypeCB(type){
    if(type == "starter" || type == "main course" || type == "dessert") {
        return true;
    } 
       return  false;
    }

 //filter(isKnownTypeCB) calls the predicate synchronously on each string in dish.dishTypes.
export function dishType(dish){
    if (!dish.dishTypes) 
        return "";
    return dish.dishTypes.filter(isKnownTypeCB)[0] || "" ;  //	If dish.dishTypes is undefined or falsy — return "".
}

// comparator to sort dishes in the order: strings 
export function compareDishesCB(dishA, dishB){
    let typeA = dishType(dishA);
    let typeB = dishType(dishB);

    const orderOfDishes = {
        "" : 0,
        "starter" : 1,
        "main course" : 2,
        "dessert" : 3,

    };
    let valueA = orderOfDishes[typeA] ?? 0;   // default unknown type to 0 if not found
    let valueB = orderOfDishes[typeB] ?? 0;

    return valueA - valueB;
}

 //passes compareDishesCB to .sort.
export function sortDishes(dishes){
    return [...dishes].sort(compareDishesCB);
}

//reduce calls this callback synchronously for each element with arguments (accumulator, currentValue, index, array

export function menuPrice(dishesArray) {
   function menuPriceReducerCB(total, dish) {
    return total + dish.pricePerServing;
}
    return dishesArray.reduce(menuPriceReducerCB, 0);
    
}


/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    //kJICB is a mapper used by map — transforms each dish into its ingredient array.
    //ICB is a accumulator used by forEach — performs side effects by updating result.
    
    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB/*TODO pass the callback that transforms a dish to its ingredients */);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB/* TODO: pass the callback that treats an ingredient */);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}

