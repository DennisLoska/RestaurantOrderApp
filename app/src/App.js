import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuCard from './components/MenuCard';
import OrderHistory from './components/OrderHistory';
import LiveOrder from './components/LiveOrder';
import './App.css';

//initializing the socket connection
import SocketClient from './components/Socket/SocketClient';
const socket = new SocketClient();
socket.connect();

const Menu = () => {
  // TODO: Replace dummy data
  const menus = [];
  for (let index = 0; index < 5; index++) {
    menus.push({
      label: `Category ${index}`,
      menu: [
        {
          id: index,
          image: 'https://static.thenounproject.com/png/340719-200.png',
          food: 'Lorem Ipsum',
          price: `€ ${index}.00`
        },
        {
          id: index + 1,
          image: 'https://static.thenounproject.com/png/340719-200.png',
          food: 'Lorem Ipsum',
          price: `€ ${index}.00`
        }
      ]
    });
  }
  return <MenuCard menu={menus} />;
};

const History = () => {
  // TODO: Replace dummy data
  const history = [];
  for (let index = 0; index < 5; index++) {
    history.push({ id: index, date: 'dd.mm.yyyy', food: 'Balla Lorem' });
  }
  return <OrderHistory history={history} />;
};

const links = [
  { label: 'Speisekarte', path: '/order' },
  { label: 'Bestellverlauf', path: '/order/history' }
];

const orders = [
  // TODO: Replace dummy data
  {
    id: 1,
    name: 'Tom',
    orders: [
      { id: 1, count: 1, name: 'Salat mit Lachsspießen' },
      { id: 2, count: 1, name: 'Match Latte' }
    ]
  },
  { id: 2, name: 'Lisa', orders: [] },
  { id: 3, name: 'Maria', orders: [] }
];

class App extends Component {
  render() {
    return (
      <div id="layout" className="container">
        <Router history={history}>
          <Navbar links={links} />
          <main>
            <section id="menu">
              <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/order" exact component={Menu} />
                <Route path="/order/history" exact component={History} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
              </Switch>
            </section>
            <LiveOrder users={orders} />
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
