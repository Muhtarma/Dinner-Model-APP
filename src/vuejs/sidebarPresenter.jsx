

//So when a user interacts with the sidebar, the Presenter updates the Model — and because the model is reactive, Vue automatically updates all affected views.

import { SidebarView } from "/src/views/sidebarView.jsx";

export function Sidebar(props) { //These After ACB functions tell the model what to do when the user interacts with the UI.

  //Sidebar Presenter handles the custom event → updates reactive Model.
function changeNumberOfGuestsACB(number) {
  props.model.setNumberOfGuests(number);
}

function removeDishACB(dish) {
  props.model.removeFromMenu(dish);
}

function showDishDetailsACB(dish) {
  props.model.setCurrentDishId(dish.id);

}

 //passing props to the view,  props down 
  return (
    <SidebarView    //expects props like number, dishes, and callback functions for user actions (change number, remove dish, etc.).
      number={props.model.numberOfGuests}
      dishes={props.model.dishes}

      onNumberChange={changeNumberOfGuestsACB}
      onRemovalDish={removeDishACB}
      onShowDishDetail={showDishDetailsACB}
      
    />
  );
}