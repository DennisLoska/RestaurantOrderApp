import React, { useState } from 'react';
import './Tabs.css';

// General purpose tab component taken from https://alligator.io/react/tabs-component/
const Tabs = ({ children }) => {
  // The first item will be the active tab at initialization
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

const Tab = ({ activeTab, label, onClick }) => {
  let className = 'tab-header-item';
  if (activeTab === label) {
    className += ' activeTab';
  }

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
