

import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export function Search(props) {
  const promiseState = props.model.searchResultsPromiseState;

  // --- Dish type options ---
  const dishTypeOptions = ["starter", "main course", "dessert"];

  // --- Get search params from the model ---
  const text = props.model.searchParams?.query || "";
  const type = props.model.searchParams?.type || "";



  //custom eventhandles + ACBS for searchFormView
  function handleSearchTextChangeACB(newText) { //Search text
    props.model.setSearchQuery(newText);
  }

  function handleSearchTypeChangeACB(newType) { //sercah dishtype
    props.model.setSearchType(newType);
  }

  function handleSearchButtonClickedACB() { //searchnow
    props.model.doSearch(props.model.searchParams);
  }

  // --- ACB for SearchResultsView ---
  function showDishDetailsACB(dish) { //setcurrentdish, show dishdetail
    props.model.setCurrentDishId(dish.id); // triggers currentDishSideEffect()
  }

  // Suspense logic
  if (promiseState && promiseState.data) {
    return (
      <div>
        <SearchFormView
          dishTypeOptions={dishTypeOptions}
          text={text}
          type={type}
          onSearchTextChange={handleSearchTextChangeACB}
          onSearchTypeChange={handleSearchTypeChangeACB}
          onSearchButtonClicked={handleSearchButtonClickedACB}
        />

        <SearchResultsView
          searchResults={promiseState.data}
          onShowDishDetails={showDishDetailsACB}
        />
      </div>
    );
  }

  // --- Fallback (SuspenseView while loading or no data) ---
  return (
    <div>
      <SearchFormView
        dishTypeOptions={dishTypeOptions}
        text={text}
        type={type}
        onSearchTextChange={handleSearchTextChangeACB}
        onSearchTypeChange={handleSearchTypeChangeACB}
        onSearchButtonClicked={handleSearchButtonClickedACB}
      />

      <SuspenseView
        promise={promiseState ? promiseState.promise : null}
        error={promiseState ? promiseState.error : null}
      />
    </div>
  );
}

