
 // ----- t w 2.1 fetching daat from web API promises via proxy -------

 import { PROXY_URL, PROXY_KEY } from "./apiConfig.js";

// Callbacks functions for http resp -->json, array of dishes, 
function gotResponseACB(response) {
  return response.json();
}

function getDishesACB(apiResult) {
  return apiResult.results;
}

function gotResponseOfMenuACB(response) {
  if (response.status !== 200) {
    throw new Error(`API returned status ${response.status}`);
  }
  return response.json();
}

// searchDishes based on text and type 
function searchDishes(searchParams) {   
  const queryString = new URLSearchParams(searchParams).toString();
  const url = PROXY_URL + "/recipes/complexSearch?" + queryString;

  const options = {
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": "222"
    }
  };
 //two stage promise + promise chaining
  return fetch(url, options) //returns a Promise to a Response object,
    .then(gotResponseACB)   //convert response to JSON , data 
    .then(getDishesACB);    //extract results array, use it 
}

// fetch details for several dishes at once 
function getMenuDetails(ids_array) {
  const queryString = new URLSearchParams({ ids: ids_array }).toString();
  const url = PROXY_URL + "/recipes/informationBulk?" + queryString;

  const options = {
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": "222"
    }
  };

  return fetch(url, options)
    .then(gotResponseOfMenuACB);
}

// fetch one single dish 
function getDishDetails(id) {
    function arrayToObjectACB(arrayOfDishes) {
     return arrayOfDishes[0];   //if array empty, undefined
    }
    return getMenuDetails([id])
    .then(arrayToObjectACB);
}

// --- Export functions ---
export { searchDishes, getMenuDetails, getDishDetails };  





