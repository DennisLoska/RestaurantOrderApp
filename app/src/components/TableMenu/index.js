import React from 'react';

import MenuCard from './MenuCard';
import OrderHistory from './OrderHistory';
import LiveOrder from './LiveOrder';
import Tabs from '../Tabs';

/**
 * Displays the orders of this table and the menu options of the customer
 *
 * @param {Object} props Properties
 * @param {{path: string}} props.match The path pattern used to match
 * @param {{id: string, image: string, food: string, price: string}[]} props.menus Current orders for this table
 * @param {{id: string, date: string, food: string}} props.history Previous orders
 */
const TableMenu = props => {
  const {
    match: { path },
    menus,
    history,
    orders
  } = props;

  return (
    <div id="container">
      <section id="menuOptions">
        <Tabs>
          <MenuCard to={path} label="Menu Card" menus={menus} />
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
