import React, { useState, useEffect, useContext } from 'react';
import socket from '../Socket/SocketClient';
import { AppContext } from '../../App';

import './LiveOrder.css';

const LiveOrder = () => {
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    if (state.isLoggedIn) {
      socket.connect();
      socket.off('order-broadcast');
      const data = JSON.stringify(state.userSelection);
      socket.emit('item-selected', data);
      socket.on('order-broadcast', order => {
        let updatedOrder = JSON.parse(order);
        setState({ ...state, updatedOrder });
        console.log('order', updatedOrder);
      });
    }
    return () => socket.disconnect();
  }, [state.userSelection]);

  return (
    <section id="live-area">
      <h5 className="header">Bestellung</h5>
      {state.updatedOrder
        ? state.updatedOrder.map(order => (
            <div key={order.user}>
              <strong>{order.user}:</strong>
              <div className="order-grid">
                {order.items.map(item => (
                  <OrderItem
                    key={item.name}
                    itemCount={null}
                    name={item.name}
                  />
                ))}
              </div>
            </div>
          ))
        : null}
      <button id="order-now" name="order-now" type="button" className="btn">
        Jetzt bestellen
      </button>
    </section>
  );
};

const OrderItem = props => {
  const { itemCount, name } = props;
  const [count, setCount] = useState(itemCount);

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  return (
    <React.Fragment>
      <span className="order-count rounded square">{count}x</span>
      <span>{name}</span>
      <div className="orderButton d-flex flex-row">
        <button
          name="add"
          type="button"
          className="btn btn-sm mr-2 square"
          onClick={decreaseCount}
        >
          –
        </button>
        <button
          name="decrease"
          type="button"
          className="btn btn-sm square"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </React.Fragment>
  );
};

export default LiveOrder;
