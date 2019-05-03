import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Home from './components/Home';
import './App.css';

const TestRoute = () => {
  return <h1>Test route</h1>;
};
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/test" exact component={TestRoute} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
