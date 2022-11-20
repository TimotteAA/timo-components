import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import React from "react";
import Radio from "./components/Radio";

library.add(fas);
function App() {


    return (<div>
        <Radio >Radio</Radio>
    </div>)
}

export default App;
