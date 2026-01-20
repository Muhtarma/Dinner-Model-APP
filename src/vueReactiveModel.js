
//The Reactive Model makes the model reactive (so the UI auto-updates when data changes).

import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { reactive, watch } from "vue";
import { model as Model } from "/src/DinnerModel.js";
import { connectToPersistence } from "./firestoreModel.js";

// connectToPersistence();

export const reactiveModel= reactive(Model); //make a reactive object out of the model exported from DinnerModel

window.myModel = reactiveModel;
 //2.2.2
reactiveModel.doSearch({});


//2.2.3 curent dish side effect. 
export function firstACB() {   //tracks currentDishId in the reactive model
    return myModel.currentDishId;
}

export function secondACB() { //fetches data for that dish and updates currentDishPromiseState
     return myModel.currentDishEffect();
}

 watch (firstACB, secondACB);

 connectToPersistence(reactiveModel, watch);



// making some example dishes available 
import {dishesConst} from "/src/dishesConst.js";
window.dishesConst= dishesConst;



