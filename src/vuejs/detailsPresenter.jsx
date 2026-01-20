


import { DetailsView } from "../views/detailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export function Details(props) {
  const promiseState = props.model.currentDishPromiseState;

  // No promise state → show SuspenseView during loading
  if (!promiseState || !promiseState.data) {
    return (
    <SuspenseView 
    promise={promiseState ? promiseState.promise : null}
    error={promiseState ? promiseState.error : null}
    
    />
    );
  }

  //2.3.2 rendeer with corect pops

  // These are the 3 props the test checks
  const dishData = promiseState.data;
  const guests = props.model.numberOfGuests;

  // Boolean: true if the current dish is in the menu
  //checkin if already present
 function  checkDishInMenuCB (dish) {
   return dish.id === dishData.id;
 }
  
 const dishPresent= (props.model.dishes || []). find(checkDishInMenuCB);
 const isDishInMenu = dishPresent !== undefined;

 // tw. 2.5.1 Handle the custom event from DetailsView
  function addToMenuACB() {
  if (!isDishInMenu) {
    props.model.addToMenu(props.model.currentDishPromiseState.data);
  }
}
 //swap to detail when ready
   return (
    <DetailsView 
    dishData={dishData}
      guests={guests}
      isDishInMenu={isDishInMenu}
      onAddToMenu={addToMenuACB}  
    
    
    />
);

} 







