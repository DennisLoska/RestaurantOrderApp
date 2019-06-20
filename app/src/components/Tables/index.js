import React from 'react';
import './Tables.css';

const Tables = (props) => {
  return (
    <React.Fragment>
      <h1> An welchem Tisch sitzt du?</h1>
      <div className="tables" >
        {props.names.map(name =>
          <div key={name}>{name}</div>
        )}
      </div>
    </React.Fragment>);
};



export default Tables;
