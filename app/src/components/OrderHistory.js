import React from 'react';

const OrderHistory = ({ history }) => {
  return (
    <table id="history">
      <tbody>
        <tr>
          <th>Datum</th>
          <th>Gericht</th>
        </tr>
        {history.map(entry => (
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

const Entry = ({ date, food }) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{food}</td>
    </tr>
  );
};

export default OrderHistory;
