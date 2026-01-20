
// src/views/searchResultsView.jsx

import "/src/style.css";

export function SearchResultsView(props) {
  function displayDishesCB(dish) {
    function showDishDetailsACB() {
      if (props.onShowDishDetails) {
        props.onShowDishDetails(dish);
      }
      window.location.hash = "#/details";
    }

    return (
      <span
        key={dish.id}
        data-key={dish.id}                
        className="dishItem"
        onClick={showDishDetailsACB}
        style={{ display: "inline-block" }} 
      >
        <img 
          src={dish.image} 
          alt={dish.title} 
          height={100} 
        />
        <div>{dish.title}</div>
      </span>
    );
  }

  return <div className="dishGrid">{props.searchResults.map(displayDishesCB)}</div>;
  
} 


