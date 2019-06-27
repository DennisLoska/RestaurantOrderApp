import React, { useState, useEffect } from 'react';
import './MenuCard.css';

/**
 * List of available menu options
 *
 * @param {Object} props Properties
 * @param {{ _id: object, img_url: string, name: string, price: string, description: string, category: string }[]} props.menus List of food options
 */
const MenuCard = () => {
  const [menu, setMenu] = useState(new Map());
  const [category, setCategory] = useState('');

  const handleOnClick = category => {
    setCategory(category);
  };

  const generateMenu = menuItems => {
    const tempMenu = new Map();
    menuItems.forEach(item => {
      const { _id, name, description, price, category, img_url } = item;
      const elements = tempMenu.get(category) || [];
      elements.push({
        _id: _id,
        name: name,
        description: description,
        price: price,
        img_url: img_url
      });
      tempMenu.set(category, elements);
    });
    setMenu(tempMenu);
    setCategory(tempMenu.keys().next().value || 'Loading...');
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(items => {
        console.log(items);
        generateMenu(items);
      })
      .catch(err => console.log(err));
  }, [menu === null]);

  return (
    <React.Fragment>
      <h5 className="header">Speisekarte</h5>
      <MenuNavigation
        labels={Array.from(menu.keys())}
        activeLabel={category}
        onClick={handleOnClick}
      />
      <MenuCategory menu={menu.get(category) || []} />
    </React.Fragment>
  );
};

const MenuCategory = props => {
  return (
    <div className="d-sm-flex flex-sm-column">
      {props.menu.map(category => {
        const { _id, name, description, price, img_url } = category;
        return (
          <MenuItem
            key={_id.$oid}
            image={img_url}
            name={name}
            price={price}
            description={description}
          />
        );
      })}
    </div>
  );
};

const MenuNavigation = props => {
  const { labels, activeLabel, onClick } = props;
  return (
    <nav id="menu-card" className="navbar navbar-expand-sm">
      <ul className="navbar-nav">
        {labels.map(label => {
          const handleOnClick = () => {
            onClick(label);
          };

          return (
            <li
              key={label}
              className={
                activeLabel === label
                  ? 'nav-item nav-link active'
                  : 'nav-item nav-link'
              }
              onClick={handleOnClick}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/**
 * @param {Object} props Properties
 * @param {string} props.image Path to the image
 * @param {string} props.name Name of menu option
 * @param {string} props.price Price of menu option
 * @param {string} props.description Description of menu option
 */
const MenuItem = props => {
  const { image, name, price, description } = props;
  return (
    <div className="card d-sm-flex flex-sm-row flex-grow-1 mb-2">
      <img className="card-img-left" src={image} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small>{price} €</small>
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
