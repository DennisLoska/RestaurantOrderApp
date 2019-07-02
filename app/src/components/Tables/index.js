import React, { useEffect, useState } from 'react';
import './Tables.css';

const Tables = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    console.log('test');
    fetch('http://localhost:5000/api/tables', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(tables => setState({ ...state, tables }))
      .catch(err => console.log(err));
  }, []);

  console.log(state);
  return (
    <React.Fragment>
      <h2> An welchem Tisch sitzt du?</h2>
      <div className="d-sm-flex flex-row justify-content-center align-content-stretch flex-wrap">
        {state.tables &&
          state.tables.map(table => {
            const { id, name, free } = table;
            const handleOnClick = () => {
              alert(name);
            };
            return (
              <div key={id} className="tableSelection" onClick={handleOnClick}>
                <p className="tableNames">{name}</p>
                {free ? <p>Table is free!</p> : <p>Table is not available</p>}
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Tables;
