
// src/views/searchFormView.jsx
import "/src/style.css";

export function SearchFormView(props) { 
 
  //Custom events  and callbacks
function handleTextChangeACB(event) {
  props.onSearchTextChange(event.target.value);
}

function handleTypeChangeACB(event) {
  props.onSearchTypeChange(event.target.value);
}

function handleButtonClickACB(event) {
  props.onSearchButtonClicked();
}

function renderOptionCB(optionString) {
return(
<option key={optionString} value={optionString}> 
{optionString}
</option>
);
}


  return (
    <div className="searchform">

      {/*Text input*/}
      <input 
      type="text" 
      value={props.text || ""} 
      onChange={handleTextChangeACB}
      placeholder="Type here..."
      />

      {/*select box*/}
      <select value={props.type || ""} onChange={handleTypeChangeACB}>
      

        {/*fixed choose option*/}
        <option value="">Choose:</option>

        {/*map over dto prop*/}
        {props.dishTypeOptions.map(renderOptionCB)}
        </select>

        {/* search button*/}

        <button onClick={handleButtonClickACB}>Search!</button>
        {/* TW3.3 new required summary button*/}
        <button onClick={() => window.location.hash = "#/summary"}> 
          Summary 
          </button>  
            </div>
  );
}



