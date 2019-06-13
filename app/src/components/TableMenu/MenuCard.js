import React from 'react';
import './TableMenu.css';

/**
 * List of available menu options
 *
 * @param {Object} props Properties
 * @param {{ id: string, image: string, food: string, price: string }[]} props.menus List of food options
 */
const MenuCard = props => {
  return (
    <div id="menu">
      {props.menus.map(menu => {
        const { id, image, food, price } = menu;
        return <MenuItem key={id} image={image} food={food} price={price} />;
      })}
    </div>
  );
};

/**
 * @param {Object} props Properties
 * @param {string} props.image Path to the image
 * @param {string} props.food Name of menu option
 * @param {string} props.price Price of menu option
 */
const MenuItem = props => {
  const { image, food, price } = props;
  return (
    <div>
      <img
        width="100px"
        height="100px"
        src={image}
        alt={food}
        style={{ float: 'left' }}
      />
      <p>{food}</p>
      <p>{price}</p>
    </div>
  );
};

export default MenuCard;
