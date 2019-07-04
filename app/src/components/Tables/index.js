import React, { useEffect, useState, useContext } from 'react';
import socket from '../Socket/SocketClient';
import { AppContext } from '../../App';
import history from '../../history';
import './Tables.css';

const Tables = () => {
  const [tables, setTables] = useState({});
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/tables', {
      method: 'get'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(tables => setTables({ tables }))
      .catch(err => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <h2> An welchem Tisch sitzt du?</h2>
      <div className="d-sm-flex flex-row justify-content-center align-content-stretch flex-wrap">
        {tables.tables &&
          tables.tables.map(table => {
            const { id, name, free } = table;
            const handleOnClick = () => {
              let data = {
                username: state.user,
                room: name
              };
              socket.off('in-room');
              socket.emit('join', JSON.stringify(data));
              socket.on('in-room', response => {
                let data = JSON.parse(response);
                console.log(data.msg);
                setState({ ...state, room: data.room });
                history.push('order');
              });
            };
            return (
              <div key={id} className="tableSelection" onClick={handleOnClick}>
                <p className="tableNames">{name}</p>
                {free ? <p>Tisch ist frei!</p> : <p>Tisch ist schon besetzt.</p>}
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Tables;
