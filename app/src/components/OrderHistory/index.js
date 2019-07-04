import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

/**
 * A list of entries from previous orders displaying the date and name of food
 *
 * @param {Object} props Properties
 * @param {{ id: string, date: string, food: string }[]} props.history Previous orders
 */
const OrderHistory = props => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(data => {
        let orderHistory = data;
        setHistory(orderHistory);
        console.log(orderHistory);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(history);

  return (
    <React.Fragment>
      <h5 className="header">Bestellverlauf</h5>
      <table id="history" className="table table-borderless table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Tisch</th>
            <th>Bestellung</th>
          </tr>
        </thead>
        <tbody>
          {history
            ? history.map(entry => (
                <Entry key={entry._id} table={entry.table} food={entry.items} />
              ))
            : null}
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
  const { table, food } = props;
  return (
    <tr>
      <td>
        <strong>{table}</strong>
      </td>

      <td>{food.map(food => food.name + ', ')}</td>
    </tr>
  );
};

export default OrderHistory;
