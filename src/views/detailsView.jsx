import "/src/style.css";

export function DetailsView(props) {
  const dish = props.dishData;

  if (!dish) return <div>No dish selected</div>;

  // render each ingredient row
  function renderIngredientCB(ingredient) {
    return (
      <tr key={ingredient.id}>
        <td>{ingredient.name}</td>
        <td className="quantity">{ingredient.amount.toFixed(2)}</td>
        <td>{ingredient.unit}</td>
      </tr>
    );
  }

  // 🔹 Fire custom event when user clicks "Add to menu" and navigate to search
  function handleAddToMenuACB() {
    if (props.onAddToMenu) {
      props.onAddToMenu();   // no parameters
    }
    window.location.has = "#/search";
  }

  function handleButtonCancelACB(){
    window.location.hash ="#/search";
  }

  return (
    <div className="details">
      <h2>{dish.title}</h2>

      <img src={dish.image} alt={dish.title} height={200} />

      <p>Price per serving: {dish.pricePerServing.toFixed(2)} SEK</p>
      <p>
        Price for {props.guests} guests:{" "}
        {(dish.pricePerServing * props.guests).toFixed(2)} SEK
      </p>

      <h3>Ingredients (per person)</h3>
      <table>
        <tbody>{dish.extendedIngredients.map(renderIngredientCB)}</tbody>
      </table>

      <h3>Instructions</h3>
      <p>{dish.instructions}</p>

      <p>
        <a href={dish.sourceUrl} target="_blank" rel="noreferrer">
          View full recipe
        </a>
      </p>

      {/*  Custom event on click  + navigation */}
      <button
        disabled={props.isDishInMenu}
        onClick={handleAddToMenuACB}
      >
        Add to menu
      </button>

      {/* Cancel button (no event) */}
      <button onClick={handleButtonCancelACB}>Cancel</button>
    </div>
  );
}