import React, {useState} from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from "./App";
import { DataProvider } from './Context'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

     <DataProvider>
        <App /> 
     </DataProvider>,
     
     document.getElementById('root')
     
     );

registerServiceWorker();