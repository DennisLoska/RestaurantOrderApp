import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
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

  const generateMenu = (menuItems, categories) => {
    //we use the position attribute to sort the categories in the correct order
    categories.sort((cat1, cat2) => cat1.position - cat2.position);
    console.log('items:', menuItems);
    console.log('categories:', categories);

    // init map with categories as keys
    const tempMenu = new Map();
    categories.forEach(category => {
      tempMenu.set(category.name, []);
    });

    menuItems.forEach(item => {
      const { _id, name, description, price, category, img_url } = item;
      // on foreign category it will create a new entry
      const elements = tempMenu.get(category) || [];
      elements.push({
        _id,
        name,
        description,
        price,
        img_url
      });
      tempMenu.set(category, elements);
    });
    console.log('menu:', tempMenu);
    setMenu(tempMenu);
    setCategory(tempMenu.keys().next().value || 'Loading...');
  };

  const fetchCategories = items => {
    fetch('http://localhost:5000/api/categories', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(categories => generateMenu(items, categories))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/items', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(items => fetchCategories(items))
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
    <div id="menu-card" className="d-sm-flex flex-sm-column">
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
  const [collapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav id="menu-card-nav" className="navbar navbar-expand-sm">
      <button
        className="navbar-toggler"
        type="button"
        aria-expanded={!collapsed}
        aria-label="Toggle Menu Category"
        onClick={toggleMenu}
      >
        <span
          className={
            collapsed ? 'navbar-toggler-icon collapsed' : 'navbar-toggler-icon'
          }
        >
          >
        </span>
        {activeLabel}
      </button>
      <ul className={collapsed ? 'navbar-nav collapsed' : 'navbar-nav'}>
        {labels.map(label => {
          const handleOnClick = () => {
            onClick(label);
            setCollapsed(true);
          };

          return (
            <li
              key={label}
              className={activeLabel === label ? 'nav-item active' : 'nav-item'}
            >
              <Link className="nav-link" to="#" onClick={handleOnClick}>
                {label}
              </Link>
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
  const [state, setState] = useContext(AppContext);

  const selectItem = item => {
    console.log('selected', item);
    console.log('state', state);
    setState({
      ...state,
      userSelection: {
        items:
          state.userSelection && state.userSelection.items
            ? [...state.userSelection.items, item]
            : [item],
        user: state.user
      }
    });
  };

  const { image, name, price, description } = props;
  return (
    <div className="card d-sm-flex flex-sm-row flex-grow-1 mb-2">
      <img className="card-img-left p-2" src={image} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small>{price} €</small>
        </p>
        {state.isLoggedIn && (
          <button type="button" class="btn" onClick={() => selectItem(props)}>
            Auswählen
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
