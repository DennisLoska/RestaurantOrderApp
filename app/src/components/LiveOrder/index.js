import React, { useState, useEffect, useContext } from 'react';
import socket from '../Socket/SocketClient';
import { AppContext } from '../../App';
import history from '../../history';

import './LiveOrder.css';

const LiveOrder = () => {
  const [state, setState] = useContext(AppContext);
  if (!state.isLoggedIn) {
    return null;
  }

  useEffect(() => {
    if (state.isLoggedIn) {
      setState({ ...state, ready: { isReady: false, user: state.user } });
      socket.off('order-broadcast');
      console.log('userSelection', state);

      const data = JSON.stringify({
        order: state.userSelection ? state.userSelection : { user: state.user },
        room: state.room ? state.room : ''
      });
      socket.on('order-broadcast', order => {
        let updatedOrder = JSON.parse(order);
        setState({ ...state, tableOrder: updatedOrder });
        console.log('order', updatedOrder);
      });
      socket.emit('item-selected', data);
    }
  }, [state.userSelection]);

  useEffect(() => {
    socket.off('get-tableorder');
    socket.on('get-tableorder', order => {
      let updatedOrder = JSON.parse(order);
      setState({
        ...state,
        tableOrder: updatedOrder.order,
        ready: updatedOrder.ready
      });
      console.log('ready', state);
    });
  }, []);

  const onReadyToOrder = () => {
    setState({
      ...state,
      ready: { isReady: !state.ready.isReady, user: state.user }
    });
    const data = JSON.stringify({
      order: state.userSelection ? state.userSelection : { user: state.user },
      room: state.room ? state.room : '',
      ready: { isReady: !state.ready.isReady, user: state.user }
    });
    socket.off('get-tableorder');
    socket.on('get-tableorder', order => {
      let updatedOrder = JSON.parse(order);
      setState({
        ...state,
        tableOrder: updatedOrder.order,
        ready: updatedOrder.ready
      });
      console.log('updateOrder', updatedOrder);

      console.log('ready', state);
    });
    socket.emit('get-tableorder', data);
  };

  const sendOrder = () => {
    let data = JSON.stringify({
      room: state.room ? state.room : ''
    });
    fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(data => {
        alert(data.msg);
        history.push('order/history');
      });
  };

  if (!state.room) {
    return null;
  }

  return (
    <section id="live-area">
      <h5 className="header">{state.room} - Bestellung</h5>
      <div>
        <CurrentUserOrder />
        {state.tableOrder && !state.tableOrder.error
          ? state.tableOrder
              .filter(order => order.user !== state.user)
              .map(order => (
                <div key={order.user}>
                  <strong>
                    {order.user}:{' '}
                    {state.ready.isReady &&
                      state.ready.user === order.user &&
                      'bereit!'}
                  </strong>
                  <div className="order-grid">
                    {Object.prototype.toString
                      .call(order.items)
                      .includes('Array') && order.items.length > 0 ? (
                      order.items.map(item => (
                        <OrderItem
                          key={item.name}
                          count={item.count}
                          name={item.name}
                          price={item.price}
                        />
                      ))
                    ) : order.items ? (
                      <OrderItem
                        key={order.items.name}
                        count={order.items.count}
                        name={order.items.name}
                        price={order.items.price}
                      />
                    ) : null}
                  </div>
                  <p className="text-right font-weight-bold pt-1">
                    Total:{' '}
                    {Object.prototype.toString
                      .call(order.items)
                      .includes('Array') && order.items.length > 0
                      ? Math.round(
                          order.items.reduce((accumulator, item) => {
                            return accumulator + item.price * item.count;
                          }, 0) * 100
                        ) / 100
                      : Math.round(
                          order.items.count * order.items.price * 100
                        ) / 100}{' '}
                    €
                  </p>
                </div>
              ))
          : null}
      </div>
      <button
        name="order-now"
        type="button"
        className="btn"
        style={{ display: 'none' }}
        onClick={onReadyToOrder}
      >
        Bereit
      </button>
      <button
        id="order-now"
        name="order-now"
        type="button"
        className="btn"
        onClick={sendOrder}
      >
        Jetzt bestellen
      </button>
    </section>
  );
};

const OrderItem = props => {
  const { count, name, price } = props;

  return (
    <React.Fragment>
      <span className="order-count rounded square">{count}x</span>
      <span>{name}</span>
      <small>{`${Math.round(price * count * 100) / 100} €`}</small>
    </React.Fragment>
  );
};

const CurrentUserOrder = () => {
  const [state, setState] = useContext(AppContext);

  if (!(state.userSelection && state.userSelection.items)) {
    return (
      <div>
        <strong>
          {state.user}:{' '}
          {state.ready.isReady && state.ready.user === state.user && 'Bereit!'}
        </strong>
        <div className="user-order-grid" />
        <p className="text-right font-weight-bold pt-1">Total: 0.00 €</p>
      </div>
    );
  }

  const decreaseCount = index => {
    const count = state.userSelection.items[index].count;
    if (count <= 1) {
      state.userSelection.items.splice(index, 1);
    } else {
      state.userSelection.items[index].count = count - 1;
    }

    setState({
      ...state,
      userSelection: {
        items: [...state.userSelection.items],
        user: state.user
      }
    });
  };

  const increaseCount = index => {
    state.userSelection.items[index].count =
      state.userSelection.items[index].count + 1;
    setState({
      ...state,
      userSelection: {
        items: [...state.userSelection.items],
        user: state.user
      }
    });
  };

  return (
    <div>
      <strong>
        {state.user}:{' '}
        {state.ready.isReady && state.ready.user === state.user && 'Bereit!'}
      </strong>
      <div className="user-order-grid">
        {state.userSelection.items.map((item, index) => {
          const { name, price, count } = item;

          const add = () => {
            increaseCount(index);
          };

          const decrease = () => {
            decreaseCount(index);
          };

          return (
            <React.Fragment>
              <span className="order-count rounded square">{count}x</span>
              <span>{name}</span>
              <small>{`${Math.round(price * count * 100) / 100} €`}</small>
              <div className="orderButton d-flex flex-row">
                <button
                  name="add"
                  type="button"
                  className="btn btn-sm mr-2 square"
                  onClick={decrease}
                >
                  –
                </button>
                <button
                  name="decrease"
                  type="button"
                  className="btn btn-sm square"
                  onClick={add}
                >
                  +
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <p className="text-right font-weight-bold pt-1">
        Total:{' '}
        {Math.round(
          state.userSelection.items.reduce((accumulator, item) => {
            return accumulator + item.price * item.count;
          }, 0) * 100
        ) / 100}{' '}
        €
      </p>
    </div>
  );
};

export default LiveOrder;
