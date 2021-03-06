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

const links = [
  { label: 'Speisekarte', path: '/order' },
  { label: 'Bestellverlauf', path: '/order/history' },
  { label: '', path: '/settings' }
];

export const AppContext = React.createContext([{}, () => {}]);

const App = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    ready: { isReady: false, user: null }
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/authStatus', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
        setState({ ...state, isLoggedIn: false });
        history.push('/');
      })
      .then(data => {
        setState({
          ...state,
          isLoggedIn: data.logged_in,
          user: data.user
        });
        if (data.logged_in) {
          history.push();
        }
      })
      .catch(err => {
        console.log(err);
        setState({ ...state, isLoggedIn: false });
        history.push('/');
      });
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
                <Route path="/order/history" exact component={OrderHistory} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/tables" exact component={Tables} />
              </Switch>
            </section>
            <LiveOrder />
          </main>
          <Footer />
        </Router>
      </div>
    </AppContext.Provider>
  );
};

export default App;
