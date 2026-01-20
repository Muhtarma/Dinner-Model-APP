


//renders first view

import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { createRouter, createWebHashHistory, RouterView, } from "vue-router";


export function VueRoot(props) {

  if (!props.model.ready) {
    return <SuspenseView promise="loading" />;
  }
  
  return (
    <div className="flexParent">
      <div className="sidebar">
        <Sidebar model={props.model} />
      </div>
      <div className="mainContent">
        <RouterView />

      </div>
    </div>
  );
}


//router setup

export function makeRouter(model) {
  return createRouter({
   history: createWebHashHistory(),
  routes: [

     { path: "/", component:<Search model={model}/>,},
     { path: "/search", component:<Search model={model}/>,},
     { path: "/details", component:<Details model={model}/>,},
     { path: "/summary", component:<Summary model={model}/>,}

      ]

    });
  }

//export { VueRoot, makeRouter };