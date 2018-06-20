import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Items from "./pages/Items";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Suitcase from "./pages/Suitcase";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App profile-page sidebar-collapse">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/account/:id" component={Account} />
            <Route exact path="/items" component={Items} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/search/:city" component={Search} />
            <Route exact path="/search/:user" component={Search} />
            <Route exact path="/suitcase/:id" component={Suitcase} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
