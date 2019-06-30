import React, { useEffect, useState } from 'react';
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

export const AppContext = React.createContext([{}, () => {}]);

const App = () => {
  const [state, setState] = useState({ isLoggedIn: false });

  useEffect(() => {
    async function fetchData() {
      await fetch('http://localhost:5000/api/authStatus', {
        method: 'get'
      })
        .then(response => response.json())
        .catch(err => {
          console.log(err);
          setState({ ...state, isLoggedIn: false });
          history.push('/');
        })
        .then(data => {
          setState({ ...state, isLoggedIn: data.logged_in });
          if (data.logged_in) {
            history.push('order');
          }
        })
        .catch(err => {
          console.log(err);
          setState({ ...state, isLoggedIn: false });
          history.push('/');
        });
    }
    fetchData();
  }, [state.isLoggedIn]);

  return (
    <AppContext.Provider value={[state, setState]}>
      <div id="layout" className="container">
        <Router history={history}>
          <Navbar links={links} />
          <main>
            <section id="menu">
              <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/order" exact component={MenuCard} />
                <Route path="/order/history" exact component={History} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/tables" exact component={TableCreator} />
              </Switch>
            </section>
            {state.isLoggedIn && <LiveOrder users={orders} />}
          </main>
          <Footer />
        </Router>
      </div>
    </AppContext.Provider>
  );
};

export default App;
