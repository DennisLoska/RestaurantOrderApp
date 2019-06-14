import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Home from './components/Home';
import TableMenu from './components/TableMenu';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css';

const TestRoute = () => {
  return <h1>Test route</h1>;
};

const Order = () => {
  // dummy data
  const history = [];
  const orders = [];

  // TODO: avoid strings everywhere (i.e. price)
  for (let index = 0; index < 5; index++) {
    orders.push({
      image:
        'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg',
      food: 'Lorem Ipsum',
      price: '€ 1.00'
    });
    history.push({ date: 'dd.mm.yyyy', food: 'Balla Lorem' });
  }
  return <TableMenu orders={orders} history={history} />;
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
              <Route path="/order" exact component={Order} />
              <Route path="/signup" exact component={SignUp}/>
              <Route path="/signin" exact component={SignIn}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
