import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './Tabs.css';

/**
 * General purpose tab component based on https://reacttraining.com/react-router/web/example/custom-link
 *
 * @param {Object} props Properties
 * @param {JSX.Element[]} props.children Components for tab navigation and content
 */
const Tabs = props => {
  const components = props.children;

  return (
    <BrowserRouter>
      <TabNavigation components={components} />
      <TabContent components={components} />
    </BrowserRouter>
  );
};

/**
 * Creates links for navigating through tabs
 *
 * @param {Object} props Properties
 * @param {JSX.Element[]} props.components Components for tab navigation
 */
const TabNavigation = props => {
  const { components } = props;

  return (
    <nav className="tab-navbar">
      <ul className="tab-nav">
        {components.map(component => {
          const { to, label } = component.props;
          return (
            <Route
              key={label}
              exact
              path={to}
              children={({ match }) => (
                <li className={match ? 'active tab-nav-item' : 'tab-nav-item'}>
                  <Link className="tab-nav-link" to={to}>
                    {label}
                  </Link>
                </li>
              )}
            />
          );
        })}
      </ul>
    </nav>
  );
};

/**
 * Renders selected tab based on path
 *
 * @param {Object} props Properties
 * @param {JSX.Element[]} props.components Components for tab navigation
 */
const TabContent = props => {
  const { components } = props;

  return (
    <div className="tab-content">
      <Switch>
        {components.map(component => {
          const { to, label } = component.props;
          return <Route key={label} exact path={to} render={() => component} />;
        })}
      </Switch>
    </div>
  );
};

export default Tabs;
