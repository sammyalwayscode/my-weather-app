import React from "react";
import Main from "./Components/Main/Main";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignUp} />
          <Route path="/main" exact component={Main} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
