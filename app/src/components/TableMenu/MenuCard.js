import React from 'react';
import './TableMenu.css';

/**
 * List of available menu options
 *
 * @param {Object} props Properties
 * @param {{ _id: object, img_url: string, name: string, price: string, description: string, category: string }[]} props.menus List of food options
 */
const MenuCard = props => {
  return props.menus.length > 0 ? (
    <div id="menu">
      {props.menus.map(menu => {
        const { _id, name, description, price, category, img_url } = menu;
        return (
          <MenuItem
            key={_id.$oid}
            image={img_url}
            name={name}
            price={price}
            description={description}
            category={category}
          />
        );
      })}
    </div>
  ) : (
    'Loading items...'
  );
};

/**
 * @param {Object} props Properties
 * @param {string} props.image Path to the image
 * @param {string} props.food Name of menu option
 * @param {string} props.price Price of menu option
 */
const MenuItem = props => {
  const { image, name, price, description, category } = props;
  return (
    <div>
      <img
        width="100px"
        height="100px"
        src={image}
        alt={name}
        style={{ float: 'left' }}
      />
      <p>{name}</p>
      <p>{price}€</p>
      <p>{description}</p>
    </div>
  );
};

export default MenuCard;
