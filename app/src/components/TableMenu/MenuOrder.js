import React from 'react';
import List from '../List';

/**
 * List of ordered food
 * @param {Object} props Properties
 * @param {{ image: string, food: string, price: string }[]} props.orders List of currently selected orders
 */
const MenuOrder = props => {
  return <List items={props.orders} renderComponent={OrderedItem} />;
};

/**
 * @param {Object} props Properties
 * @param {string} props.image Path to the image
 * @param {string} props.food Name of food
 * @param {string} props.price Price of food
 */
const OrderedItem = props => {
  const { image, food, price } = props;
  return (
    <div>
      <img
        width="100px"
        height="auto"
        src={image}
        alt={food}
        style={{ float: 'left' }}
      />
      <p>{food}</p>
      <p>{price}</p>
    </div>
  );
};

export default MenuOrder;
