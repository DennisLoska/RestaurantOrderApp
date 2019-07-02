import React from 'react';
import './OrderHistory.css';

/**
 * A list of entries from previous orders displaying the date and name of food
 *
 * @param {Object} props Properties
 * @param {{ id: string, date: string, food: string }[]} props.history Previous orders
 */
const OrderHistory = props => {
  return (
    <React.Fragment>
      <h5 className="header">Bestellverlauf</h5>
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
    </React.Fragment>
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
      <td>
        <strong>{date}</strong>
      </td>
      <td>{food}</td>
    </tr>
  );
};

export default OrderHistory;
