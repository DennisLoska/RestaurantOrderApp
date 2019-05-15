import React, { useState } from 'react';
import './Tabs.css';

/**
 * General purpose tab component taken from https://alligator.io/react/tabs-component/
 *
 * This component generates a `Tab` for each component with a `label` attribute.
 * Upon clicking on a tab it will set the active tab to the component with the
 * corresponding label. The component that belongs to this tab will be rendered.
 * @param {Object} props Properties
 * @param {JSX.Element[]} props.children Components with label attribute
 */
const Tabs = props => {
  // passed components
  const children = props.children;
  // The first item will be the active tab at initial load
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleTabSelection = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <ul className="tab-header">
        {children.map(child => (
          <Tab
            key={child.props.label}
            activeTab={activeTab}
            label={child.props.label}
            onClick={handleTabSelection}
          />
        ))}
      </ul>
      <div className="tab-content">
        {children.find(child => child.props.label === activeTab)}
      </div>
    </div>
  );
};

/**
 * @param {Object} props Properties
 * @param {string} props.activeTab The label of the currently active tab
 * @param {string} props.label The label of a component
 * @param {function} props.onClick A function to set the label of the active tab
 */
const Tab = props => {
  const { activeTab, label, onClick } = props;

  let className = 'tab-header-item';
  if (activeTab === label) {
    className += ' activeTab';
  }

  // sets the `activeTab` variable in `Tabs` to the component's label
  const handleOnClick = () => {
    onClick(label);
  };

  return (
    <li className={className} onClick={handleOnClick}>
      {label}
    </li>
  );
};

export default Tabs;
