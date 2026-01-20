// un-comment when needed:
import { sortIngredients } from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
// rendering in UI
//array rendeing and callback
export function SummaryView(props){

  function handleButtonBackToSearchACB() {
   window.location.hash = "#/search";
  }

    return (
            <div className="summaryView">

              {"Summary for "}  
              <span title="nr guests">{props.people}</span>
              {props.people == 1 ? " person:" : " persons:"} 

              {/* back to serach button func*/}
              <button
              style={{ float: "right", marginLeft: "10px" }}
              onClick={handleButtonBackToSearchACB}
              >
                Back to Search 
              </button>

              {/*ingredientstabl*/}

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>unit</th>
                  </tr>
                </thead>
                <tbody>
                  {sortIngredients(props.ingredients)?.map(ingredientTableRowCB)}
                    
                
                </tbody>
              </table>
            </div>
    );
    
    /* callback for Array Rendering in TW 1.3 */
    //const totalAmount = (ingr.amount * props.people). toFixed(2); This aligns all numbers to the right and adds spacing consistency — just like price lists or receipts.
// with key, vue know which item changed, update, add , remove
    function ingredientTableRowCB(ingr){
      
        return (
        <tr key={ ingr.id } >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td className="quantity">{(ingr.amount * props.people).toFixed(2)}</td>
                 <td> {ingr.unit}</td>
               </tr> 
               );
    }
}

