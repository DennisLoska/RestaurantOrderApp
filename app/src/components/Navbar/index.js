import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Navbar.css';
import menu from '../../logo.svg';
import history from '../../history';
import socket from '../Socket/SocketClient';
import { AppContext } from '../../App';

/**
 * Creates navigation from links
 *
 * @param {Object} props Properties
 * @param {Location<any>} props.location Current location
 * @param {{label: string, path: string}} props.links Navigation paths
 */
const Navbar = withRouter(props => {
  const [state, setState] = useContext(AppContext);

  const { location, links } = {
    ...props,
    links: !state.isLoggedIn
      ? props.links.filter(({ label, _ }) => label !== 'Bestellverlauf' && label !== '')
      : props.links
  };

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
    let data = {
      username: state.user,
      room: state.room ? state.room : ''
    };
    socket.off('out-room');
    socket.on('out-room', response => {
      let data = JSON.parse(response);
      console.log(data.msg);
      setState({ ...state, room: '' });
      fetch('http://localhost:5000/api/logout').then(_response => {
        setState({ ...state, isLoggedIn: false });
        socket.disconnect();
        history.push('/');
      });
    });
    socket.emit('leave', JSON.stringify(data));
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
          const _label = label.length > 0 ? label : state.user;

          return (
            <li
              key={_label}
              className={pathName === path ? 'nav-item active' : 'nav-item'}
            >
              <Link className="nav-link" to={path} onClick={handleOnClick}>
                {_label}
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
