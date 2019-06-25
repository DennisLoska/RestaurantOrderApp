import React, { useState } from 'react';
import './MenuCard.css';

const MenuCategory = props => {
  return (
    <div className="d-sm-flex flex-sm-column">
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
    <div className="card d-sm-flex flex-sm-row flex-grow-1 mb-2">
      <img className="card-img-left" src={image} alt={food} />
      <div className="card-body">
        <h5 className="card-title">{food}</h5>
        <p className="card-text">{price}</p>
      </div>
    </div>
  );
};

const MenuNavigation = props => {
  const { children } = props;
  const [category, setCategory] = useState(children[0].props.label);

  const handleOnClick = category => {
    setCategory(category);
  };

  return (
    <React.Fragment>
      <nav id="menu-card" className="navbar navbar-expand-sm">
        <ul className="navbar-nav">
          {children.map(child => (
            <CategoryLink
              key={child.props.label}
              isActive={category === child.props.label}
              label={child.props.label}
              onClick={handleOnClick}
            />
          ))}
        </ul>
      </nav>
      {children.find(child => child.props.label === category)}
    </React.Fragment>
  );
};

const CategoryLink = props => {
  const { isActive, label, onClick } = props;

  const handleOnClick = () => {
    console.log(label);

    onClick(label);
  };

  return (
    <li
      className={isActive ? 'nav-item nav-link active' : 'nav-item nav-link'}
      onClick={handleOnClick}
    >
      {label}
    </li>
  );
};

const Menu = props => {
  return (
    <React.Fragment>
      <h5 className="header">Speisekarte</h5>
      <MenuNavigation>
        {props.menu.map(category => (
          <MenuCategory
            key={category.label}
            label={category.label}
            menus={category.menu}
          />
        ))}
      </MenuNavigation>
    </React.Fragment>
  );
};

export default Menu;
