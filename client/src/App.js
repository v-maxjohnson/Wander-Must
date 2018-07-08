import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Items from "./pages/Items";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Suitcase from "./pages/Suitcase";
import NewSuitcaseModal from "./components/NewSuitcaseModal";
import "./App.css";

const client = new ApolloClient();

class App extends Component {

  state = {
    openNewSuitcaseModal: false
  }

  showNewSuitcaseModal = () => {
    this.setState({ openNewSuitcaseModal: true });
  }

  resetNewSuitcaseModal = () => {
    this.setState({ openNewSuitcaseModal: false });
  }

  renderNewSuitcaseModal = () => {
    if (this.state.openNewSuitcaseModal) {
      return <NewSuitcaseModal
        resetNewSuitcaseModal={this.resetNewSuitcaseModal}
      />
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <ScrollToTop>
            <div className="App">
              <Switch>
                <Route exact path="/" render={(props) =>
                  <Home {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/account" render={(props) =>
                  <Account {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                <Route exact path="/items" render={(props) =>
                  <Items {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                <Route exact path="/profile/:id" render={(props) =>
                  <Profile {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                <Route exact path="/search/:city" render={(props) =>
                  <Search {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                <Route exact path="/search/:user" render={(props) =>
                  <Search {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                <Route exact path="/suitcase/:id" render={(props) =>
                  <Suitcase {...props}
                    showNewSuitcaseModal={this.showNewSuitcaseModal}
                    resetNewSuitcaseModal={this.resetNewSuitcaseModal}
                    renderNewSuitcaseModal={this.renderNewSuitcaseModal}
                  />}
                />
                {/* <Route component={NoMatch} /> */}
              </Switch>
            </div>
          </ScrollToTop>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
