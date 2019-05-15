import React from 'react';
import './List.css';

/**
 * Very generic WIP List Component
 * @param {Object} props Properties
 * @param {Object[]} props.items An array of items to render
 * @param {(element) => JSX.Element} props.renderComponent A function
 * (or function component) that takes as input an element from the `props.items`
 * and returns a component to render.
 */
const List = props => {
  return (
    <div className="list">
      {props.items.map(item => props.renderComponent(item))}
    </div>
  );
};

export default List;
