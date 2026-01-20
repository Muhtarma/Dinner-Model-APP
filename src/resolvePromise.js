 //manage promise state

function resolvePromise(prms, promiseState) {

    //reset previous data
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;


  //if prom is undeined, stop 
    if (prms == null) return;

    // handle fulfilled promise 
function storeFulfilledDataACB(result) {
    if (promiseState.promise !== prms) //avoiding race cond, Only update the data if this is still the most recent API request.
        return ;

    promiseState.data = result;
}
 // handel rejection (error)
 function storeRejectionErrorACB(rejected) {
    if (promiseState.promise !== prms)
        return ;
    promiseState.error = rejected;

 }

 prms.then(storeFulfilledDataACB)
 .catch(storeRejectionErrorACB);
}


export { resolvePromise };

