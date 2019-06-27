import React from 'react';
import './Tables.css';

const Tables = props => {
  return (
    <React.Fragment>
      <h2>An welchem Tisch sitzt du?</h2>
      <div className="d-sm-flex flex-row justify-content-center align-content-stretch flex-wrap">
        {props.names.map(name => (
          <div key={name} className="tableSelection">
            <p className="tableNames">{name}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Tables;
