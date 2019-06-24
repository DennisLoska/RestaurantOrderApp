import React, { useState, useEffect } from 'react';

import MenuCard from './MenuCard';
import OrderHistory from './OrderHistory';
import LiveOrder from './LiveOrder';
import Tabs from '../Tabs';

/**
 * Displays the orders of this table and the menu options of the customer
 *
 * @param {Object} props Properties
 * @param {{path: string}} props.match The path pattern used to match
 * @param {{id: string, image: string, food: string, price: string}[]} props.orders Current orders for this table
 * @param {{ _id: object, img_url: string, name: string, price: string, description: string, category: string }[]} props.menus List of food options
 * @param {{id: string, date: string, food: string}} props.history Previous orders
 */
const TableMenu = props => {
  const {
    match: { path },
    history,
    orders
  } = props;

  const [items, setItems] = useState({ items: null });

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(items => {
        setItems(items);
        console.log(items);
      })
      .catch(err => console.log(err));
  }, [items === null]);

  return (
    <div id="container">
      <section id="menuOptions">
        <Tabs>
          <MenuCard to={path} label="Menu Card" menus={items} />
          <OrderHistory
            to={`${path}/history`}
            label="Order History"
            history={history}
          />
        </Tabs>
      </section>
      <section id="liveOrder">
        <LiveOrder users={orders} />
      </section>
    </div>
  );
};

export default TableMenu;
