import React, { useState } from 'react';
import './LiveOrder.css';

const LiveOrder = props => {
  return (
    <section id="live-area">
      <h5 className="header">Bestellung</h5>
      {props.users.map(user => (
        <div key={user.id}>
          <strong>{user.name}:</strong>
          <div className="order-grid">
            {user.orders.map(order => (
              <OrderItem
                key={order.id}
                itemCount={order.count}
                name={order.name}
              />
            ))}
          </div>
        </div>
      ))}
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
