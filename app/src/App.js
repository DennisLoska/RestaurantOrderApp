import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Tables from './components/Tables';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuCard from './components/MenuCard';
import OrderHistory from './components/OrderHistory';
import LiveOrder from './components/LiveOrder';
import './App.css';

//socket is the socket client available in every component via import
import socket from './components/Socket/SocketClient';

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

const TableCreator = () => {
  const names = ['Affe', 'Löwe', 'Hund', 'Katze', 'Maus', 'Schlange'];
  console.log(names);
  return <Tables names={names} />;
};

class App extends Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    fetch('http://localhost:5000/api/authStatus', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
        history.push('/');
      })
      .then(data => {
        this.setState({ isLoggedIn: data.logged_in });
        if (data.logged_in) {
          history.push('order');
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
        history.push('/');
      });
  }

  updateIsLoggedIn = status => {
    console.log('test');
    this.setState({ isLoggedIn: status });
  };

  render() {
    console.log(this.state.isLoggedIn);
    return (
      <div id="layout" className="container">
        <Router history={history}>
          <Navbar
            links={links}
            isLoggedIn={this.state.isLoggedIn}
            updateIsLoggedIn={this.updateIsLoggedIn}
          />
          <main>
            <section id="menu">
              <Switch>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <SignIn
                      {...props}
                      updateIsLoggedIn={this.updateIsLoggedIn}
                    />
                  )}
                />
                <Route path="/order" exact component={MenuCard} />
                <Route path="/order/history" exact component={History} />
                <Route
                  path="/signin"
                  exact
                  render={props => (
                    <SignIn
                      {...props}
                      updateIsLoggedIn={this.updateIsLoggedIn}
                    />
                  )}
                />
                <Route
                  path="/signup"
                  exact
                  render={props => (
                    <SignUp
                      {...props}
                      updateIsLoggedIn={this.updateIsLoggedIn}
                    />
                  )}
                />
                <Route path="/tables" exact component={TableCreator} />
              </Switch>
            </section>
            {this.state.isLoggedIn && <LiveOrder users={orders} />}
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
