import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import TableMenu from './components/TableMenu';
import Tables from './components/Tables';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css';

//socket is the socket client available in every component via import
import socket from './components/Socket/SocketClient';

const Order = ({ match }) => {
  // dummy data
  const history = [];
  const orders = [
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

  // TODO: avoid strings everywhere (i.e. price)
  for (let index = 0; index < 5; index++) {
    history.push({ id: index, date: 'dd.mm.yyyy', food: 'Balla Lorem' });
  }
  return (
    <main>
      <h1>Table Order</h1>
      <TableMenu match={match} history={history} orders={orders} />
    </main>
  );
};

const TableCreator = () => {
  const names = ['Affe', 'Löwe', 'Hund', 'Katze', 'Maus', 'Schlange'];
  console.log(names);
  return <Tables names={names} />;
};

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" exact component={SignIn} />
              <Route path="/order" component={Order} />
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/tables" exact component={TableCreator} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
