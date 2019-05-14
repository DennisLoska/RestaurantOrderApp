import React from 'react';
import List from './List';

const MenuOrder = ({ orders }) => {
  console.log(orders);
  return (
    <List>
      {orders.map(element => (
        <OrderedItem
          key={element.food}
          image={element.image}
          food={element.food}
          price={element.price}
        />
      ))}
    </List>
  );
};

const OrderedItem = ({ image, food, price }) => {
  return (
    <div>
      <img width="100px" height="auto" src={image} alt={food} />
      <span>{food}</span>
      <span>{price}</span>
    </div>
  );
};

export default MenuOrder;
