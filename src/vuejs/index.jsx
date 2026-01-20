
//h stands for hyperscript — it’s Vue’s low-level function to create virtual DOM elements (like React’s createElement).

// bootstraps everything: it imports the reactive model, creates the app, and mounts it into the <div id="root"> in the HTML file.

/* import { dishesConst } from "../dishesConst.js";*/
import "/src/vueReactiveModel.js";  
 import { createApp, h } from "vue";
import { reactiveModel } from "../vueReactiveModel.js";
import { VueRoot,makeRouter } from "./VueRoot.jsx";



window.React= {createElement:h};  // needed in the lab because it works with both React and Vue

/* reactiveModel.addToMenu(dishesConst[0]);
reactiveModel.addToMenu(dishesConst[1]);
reactiveModel.addToMenu(dishesConst[2]);
reactiveModel.addToMenu(dishesConst[3]);*/


// mount the app in the browser page. Test at http://localhost:8080/vue.html
const app= createApp(function render() { 
    return h(VueRoot, { model: reactiveModel });
}
);


app.use(makeRouter(reactiveModel));
app.mount("#root");


