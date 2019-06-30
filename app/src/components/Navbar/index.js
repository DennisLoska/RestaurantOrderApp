import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Navbar.css';
import menu from '../../logo.svg';
import history from '../../history';
import { AppContext } from '../../App';

/**
 * Creates navigation from links
 *
 * @param {Object} props Properties
 * @param {Location<any>} props.location Current location
 * @param {{label: string, path: string}} props.links Navigation paths
 */
const Navbar = withRouter(props => {
  const { location, links } = props;
  const [state, setState] = useContext(AppContext);

  const [pathName, setPathName] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(true);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const returnToHomepage = () => {
    setCollapsed(true);
    setPathName('/');
  };

  const selectMenu = path => {
    setCollapsed(true);
    setPathName(path);
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout').then(_response => {
      setState({...state, isLoggedIn: false});
      history.push('/');
    });
  };

  return (
    <nav
      id="navbar"
      className="navbar-light navbar navbar-expand-sm sticky-top bg-white"
    >
      <button
        className="navbar-toggler"
        type="button"
        aria-expanded={!collapsed}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <Link className="navbar-brand" to="/" onClick={returnToHomepage}>
        <img src={menu} alt="Website Logo" width="64px" /> Pocket Menu
      </Link>
      <ul className={collapsed ? 'navbar-nav collapsed' : 'navbar-nav'}>
        {links.map(({ label, path }) => {
          const handleOnClick = () => {
            selectMenu(path);
          };
          return (
            <li
              key={label}
              className={pathName === path ? 'nav-item active' : 'nav-item'}
            >
              <Link className="nav-link" to={path} onClick={handleOnClick}>
                {label}
              </Link>
            </li>
          );
        })}
        {state.isLoggedIn && (
          <li>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
