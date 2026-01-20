

import { SummaryView } from "/src/views/summaryView.jsx";
import { shoppingList } from "/src/utilities.js";

export function Summary(props){
    return <SummaryView    //The View receives two props:
           people={props.model.numberOfGuests}
         ingredients={shoppingList(props.model.dishes)}
                        />;

}
//The shoppingList() function takes the model’s list of dishes and calculates all needed ingredients (quantities multiplied by number of guests).
