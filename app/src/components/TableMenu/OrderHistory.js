import React from 'react';

/**
 * A list of entries from previous orders displaying the date and name of food
 *
 * @param {Object} props Properties
 * @param {{ id: string, date: string, food: string }[]} props.history Previous orders
 */
const OrderHistory = props => {
  return (
    <table id="history" className="table table-borderless table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Date</th>
          <th>Order</th>
        </tr>
      </thead>
      <tbody>
        {props.history.map(entry => (
          <Entry key={entry.id} date={entry.date} food={entry.food} />
        ))}
      </tbody>
    </table>
  );
};

/**
 * @param {Object} props Properties
 * @param {string} props.date Date of purchase
 * @param {string} props.food The name of the purchased menu option
 */
const Entry = props => {
  const { date, food } = props;
  return (
    <tr>
      <td>{date}</td>
      <td>{food}</td>
    </tr>
  );
};

export default OrderHistory;
