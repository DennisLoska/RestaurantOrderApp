import React from 'react';

const LiveOrder = props => {
  return (
    <React.Fragment>
      <h2>Aktuelle Bestellungen</h2>
      {props.users.map(user => (
        <div key={user.id}>
          <h3>{user.name}:</h3>
          {user.orders.map(order => (
            <div key={order.id} className="orderLine">
              {order.name}
              <button name="add" type="button" className="btn btn-sm">
                –
              </button>
              {order.count}
              <button name="decrease" type="button" className="btn btn-sm">
                +
              </button>
            </div>
          ))}
        </div>
      ))}
      <button id="orderNow" name="orderNow" type="button" className="btn">
        Jetzt bestellen
      </button>
    </React.Fragment>
  );
};

export default LiveOrder;
