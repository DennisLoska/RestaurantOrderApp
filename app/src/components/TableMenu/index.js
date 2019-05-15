import React from 'react';
import './TableMenu.css';

import MenuCard from './MenuCard';
import MenuOrder from './MenuOrder';
import OrderHistory from './OrderHistory';
import Tabs from '../Tabs';

/**
 * Displays the orders of this table and the menu options of the customer
 * @param {Object} props Properties
 * @param {{image: string, food: string, price: string}[]} props.orders Current orders for this table
 * @param {{date: string, food: string}} props.history Previous orders
 */
const TableMenu = props => {
  return (
    <React.Fragment>
      <header>
        <h1>Table Order</h1>
      </header>
      <main>
        <MenuOptions orders={props.orders} history={props.history} />
      </main>
    </React.Fragment>
  );
};

/**
 * @param {Object} props Properties
 * @param {{image: string, food: string, price: string}[]} props.orders Current orders for this table
 * @param {{date: string, food: string}} props.history Previous orders
 */
const MenuOptions = props => {
  return (
    <Tabs>
      <MenuCard label="Speisekarte" />
      <MenuOrder label="Ausgewählte Gerichte" orders={props.orders} />
      <OrderHistory label="Bestellverlauf" history={props.history} />
    </Tabs>
  );
};

export default TableMenu;
