
 //suspense logic foor good Ui while fetch Ad 
import "/src/style.css"

// TW 2.4.1 RENDEER THREE THINGS, 
export function SuspenseView(props) {

  if (!props.promise) { //no promise means no data
 return <span>no data</span>;
  }

  if (props.promise && props.error) { //has promise with error, return err mess
   return <span>{props.error.toString()}</span>;
    }

    //promise w/o data, error
  if (props.promise && !props.error){
  return  <img src="https://brfenergi.se/iprog/loading.gif" />;
 }  

}