// initialize Firebase app
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

// uncomment the following lines when you have your firebaseConfig. Understand what the lines are doing!
import { firebaseConfig } from "/src/firebaseConfig.js";
const app= initializeApp(firebaseConfig);
const db= getFirestore(app);
window.db= db

// make doc and setDoc available at the Console for testing
window.doc= doc;   //database connection
window.setDoc= setDoc;


/* Replace NN with your TW2_TW3 group number! */
const COLLECTION="dinnerModel222";

// TODO: read the code above
// TODO: export the function connectToPersistence, it can be empty for starters

export function connectToPersistence(model, watchFunction) {
     model.ready = false;

    // ACB1: follow the three important properties that need to be persisted
    function followModelChangesACB() {
        return [model.numberOfGuests, model.dishes, model.currentDishId];
    }
     const docRef = doc(db, COLLECTION, "dinnerModelApp");
    //saves the model to Firestore when followed  properties change


    function saveModelToFirestoreACB() {
    
        if (!model.ready) {
            return;
        }

        setDoc(docRef,    
            {    // Create the data object to persist
            numberOfGuests: model.numberOfGuests,
            dishes: model.dishes,
            currentDish: model.currentDishId
        },
             {merge: true}
    
        );

    }

    // Installing the side effect using the watchFunction
    watchFunction(followModelChangesACB, saveModelToFirestoreACB);

         getDoc(docRef)
         .then(function readFromPersistenceACB(docSnapshot) { //check if doc exixts
            //if (docSnapshot.exists) {
                const data = docSnapshot.data() || {};

            // Set model properties from persisted data
            model.numberOfGuests = data.numberOfGuests || 2;
            model.dishes = data.dishes || [];
            model.currentDishId = data.currentDish || null;
             model.ready = true;
        
  })

         .catch(function handleErrorACB(error) {
                 console.error("Error reading from persistence:", error);

           model.numberOfGuests = 2;
            model.dishes = [];
            model.currentDishId = null;

             model.ready = true;
         });

}













