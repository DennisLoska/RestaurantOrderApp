import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Home from './components/Home';
import Login from './components/Login';
import TableMenu from './components/TableMenu';
import SignUp from './components/SignUp';
import Tables from './components/Tables';
import './App.css';

//initializing the socket connection
import SocketClient from './components/Socket/SocketClient';
const socket = new SocketClient();
socket.connect();

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

const tableCreator = () => {
  const names = ["Affe", "Löwe", "Hund", "Katze", "Maus", "Schlange"];
  console.log(names);
  return <Tables names={names}></Tables>}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/test" exact component={TestRoute} />
          <Route path="/order" component={Order} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/tables" exact component={tableCreator} />
        </Switch>
      </Router>
    );
  }
}

export default App;
