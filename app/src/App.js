import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Home from './components/Home';
import MenuCard from './components/MenuCard';
import MenuOrder from './components/MenuOrder';
import OrderHistory from './components/OrderHistory';
import Tabs from './components/Tabs';
import './App.css';

const TestRoute = () => {
  return <h1>Test route</h1>;
};

const Order = () => {
  // dummy objects
  const history = [
    { date: '13.05.19', food: 'Mochito' },
    { date: '10.04.19', food: 'Chicken Wings' }
  ];

  const orders = [
    {
      image:
        'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg',
      food: 'Bier',
      price: '€ 3.00'
    },
    {
      image:
        'https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg',
      food: 'Pommes',
      price: '€ 3.00'
    }
  ];

  return (
    <Tabs>
      <MenuCard label="Speisekarte" />
      <MenuOrder label="Ausgewählte Gerichte" orders={orders} />
      <OrderHistory label="Bestellverlauf" history={history} />
    </Tabs>
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
              <Route path="/order" exact component={Order} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
