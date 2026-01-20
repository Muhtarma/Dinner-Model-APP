/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/



import { searchDishes, getDishDetails } from "./dishSource.js";
import { resolvePromise } from "./resolvePromise.js";




//abstract model 
export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    searchParams: {}, // store query and type of searches
    searchResultsPromiseState: {}, //hold promise state
    currentDishPromiseState: {}, //seleected dish 
    



    setCurrentDishId(dishId){  //set curentto pass dish,id
        this.currentDishId= dishId;       // this.someProperty= someValue
    },
    
    setNumberOfGuests(number){
        if (Number.isInteger(number) == false || number <= 0) {
            throw new Error("number of guests not a positive integer");
        }
         this.numberOfGuests = number;
    },
    
    addToMenu(dishToAdd){      // array spread syntax exercise
       
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){     // removes any dish whose id equals dishToRemove.id.
        function shouldWeKeepDishCB(dish){
            return dish.id != dishToRemove.id; 
        }
           // filter keeps only dishes that should stay
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);
    },
    
    //shouldWeKeepDishCB is passed to Array.prototype.filter. filter will call this callback synchronously for each dish.
 
    // more methods will be added here, don't forget to separate them with comma!

 //2.2.2
  // 
   setSearchQuery(query){
    this.searchParams.query = query; 
   },

 setSearchType(type) {
    this.searchParams.type = type;
 
   },

 doSearch(params){
    const searchParams = params || this.searchParams;

    resolvePromise(searchDishes(searchParams), this.searchResultsPromiseState);

},
  //2.2.3

currentDishEffect() {
  // If falsy: reset the promise state (no API call)
  if (!this.currentDishId) {
    this.currentDishPromiseState.promise = null;
    this.currentDishPromiseState.data = null;
    this.currentDishPromiseState.error = null;
    return;
  }

  // If truthy: fetch the dish details and store in state
  resolvePromise(
    getDishDetails(this.currentDishId),
    this.currentDishPromiseState
  );
},

 


};

