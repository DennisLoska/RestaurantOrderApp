import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Home from './components/Home';
import Login from './components/Login';
import TableMenu from './components/TableMenu';
import SignUp from './components/SignUp';
import './App.css';

const TestRoute = () => {
  return <h1>Test route</h1>;
};

const Order = ({ match }) => {
  // dummy data
  const history = [];
  const menus = [];

  // TODO: avoid strings everywhere (i.e. price)
  for (let index = 0; index < 5; index++) {
    menus.push({
      id: index,
      image: 'https://static.thenounproject.com/png/340719-200.png',
      food: 'Lorem Ipsum',
      price: '€ 1.00'
    });
    history.push({ id: index, date: 'dd.mm.yyyy', food: 'Balla Lorem' });
  }
  return (
    <main>
      <h1>Table Order</h1>
      <TableMenu match={match} menus={menus} history={history} />
    </main>
  );
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
              <Route path="/order" component={Order} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
