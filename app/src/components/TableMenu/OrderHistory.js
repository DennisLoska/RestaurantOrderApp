import React from 'react';

/**
 * A list of entries from previous orders displaying the date and name of food
 * @param {Object} props Properties
 * @param {{ date: string, food: string }[]} props.history Previous orders
 */
const OrderHistory = props => {
  return (
    <table className="history">
      <tbody>
        <tr>
          <th>Datum</th>
          <th>Gericht</th>
        </tr>
        {props.history.map(entry => (
          <Entry
            key={`${entry.date}-${entry.food}`}
            date={entry.date}
            food={entry.food}
          />
        ))}
      </tbody>
    </table>
  );
};

/**
 * @param {Object} props Properties
 * @param {string} props.date Date of purchase
 * @param {string} props.food The name of the purchased food
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
