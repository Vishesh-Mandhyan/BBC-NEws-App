// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <LoadingBar height={3} color="orange" progress={progress} />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} category="general" country="in" />
          </Route>
          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              key="1"
              category="entertainment"
              country="in"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setProgress}
              key="2"
              category="business"
              country="in"
            />
          </Route>
          <Route exact path="/science">
            <News
              setProgress={setProgress}
              key="3"
              category="science"
              country="in"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProgress}
              key="4"
              category="health"
              country="in"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              key="5"
              category="sports"
              country="in"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
