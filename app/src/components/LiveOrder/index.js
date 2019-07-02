import React, { useState, useEffect, useContext } from 'react';
import socket from '../Socket/SocketClient';
import { AppContext } from '../../App';

import './LiveOrder.css';

const LiveOrder = () => {
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/tableorder', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(tableOrder => {
        console.log(tableOrder);

        let userItems = tableOrder.map(order =>
          order.user === state.user ? order.items : null
        );
        console.log(userItems);
        setState({
          ...state
          //TODO: update state correctly with data from the server
          //tableOrder: tableOrder,
          // userSelection: {
          //   items: state.userSelection
          //     ? [...state.userSelection.items, userItems]
          //     : userItems,
          //   user: state.user
          // }
        });
      })
      .catch(err => console.log(err));
  }, [state.tableOrder === undefined]);

  useEffect(() => {
    if (state.isLoggedIn) {
      socket.connect();
      socket.off('order-broadcast');
      const data = JSON.stringify(state.userSelection);
      socket.emit('item-selected', data);
      socket.on('order-broadcast', order => {
        let updatedOrder = JSON.parse(order);
        setState({ ...state, tableOrder: updatedOrder });
        console.log('order', updatedOrder);
      });
    }
    return () => socket.disconnect();
  }, [state.userSelection]);

  return (
    <section id="live-area">
      <h5 className="header">Bestellung</h5>
      <div>
        {state.tableOrder && !state.tableOrder.error
          ? state.tableOrder.map(order => (
              <div key={order.user}>
                <strong>{order.user}:</strong>
                <div className="order-grid">
                  {Object.prototype.toString
                    .call(order.items)
                    .includes('Array') && order.items.length > 0 ? (
                    order.items.map(item => (
                      <OrderItem
                        key={item.name}
                        itemCount={null}
                        name={item.name}
                      />
                    ))
                  ) : order.items ? (
                    <OrderItem
                      key={order.items.name}
                      itemCount={null}
                      name={order.items.name}
                    />
                  ) : null}
                </div>
              </div>
            ))
          : null}
      </div>
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
