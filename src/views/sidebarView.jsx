

//replace the stub with jsx version that renders the buttons
 //display the number of numberOfGuests, props.number
 // pn == 1, is true then disable, false keep doing 
// HTML: div is container element, span inline element (inside block), text b/w tags. 
//DOM: tree structure in browser, each tag is node, text is also 
//Rendering: using jsx to write html in js, creates DOM nodes 

import { dishType, menuPrice, sortDishes } from "/src/utilities.js";
import "/src/style.css";


export function SidebarView(props) {
  //start with handler for top buttons
  //when brower fore native, vue calls  callbacks, 
function handleClickMinusACB(event) {
  //fire acusutom eevent to parent (presenter)
  props.onNumberChange(props.number - 1);
}

function handleClickPlusACB(event) {
  props.onNumberChange(props.number + 1)
}



 //rendering of Jxs to DOM 
  return (
    <div className="sidebar">
      {/* Top control buttons */}
      <button disabled={props.number === 1} onClick={handleClickMinusACB}>-</button>
      {props.number}
      <button onClick={handleClickPlusACB}>+</button>

      {/* Table of dishes */}
      <table>
        <tbody>
          {sortDishes(props.dishes).map(dishTableRowCB)}

          {/* Total row */}
          <tr>
            <td></td>
            <td>Total:</td>
            <td></td>
            <td className="quantity">
              {(menuPrice(props.dishes) * props.number).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // --- Array rendering callback ---
  //Each dish becomes one table row:
 
  function dishTableRowCB(dish) {
//event handllesrs for dish 
    function handleDishRemovalACB(event) {
      props.onRemovalDish(dish);
    }

    function handleViewDishACB(event) {
      event.preventDefault();
      props.onShowDishDetail(dish);
      window.location.hash = "#/details";
    }

   // Render one table row per dish
    return (
      <tr key={dish.id}>
        <td>
          <button onClick={handleDishRemovalACB}>x</button>
        </td>
        <td>
          <a href="#" onClick={handleViewDishACB}>{dish.title}</a>
        </td>
        <td>{dishType(dish)}</td>
        <td className="quantity">
          {(dish.pricePerServing * props.number).toFixed(2)}
        </td>
      </tr>
    );
  }
}