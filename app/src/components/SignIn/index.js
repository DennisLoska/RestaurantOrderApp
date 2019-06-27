import React, { useState } from 'react';
import history from '../../history';
import './SignIn.css';
import Navigation from './Navigation';

const SignIn = () => {
  const [state, setState] = useState({
    userName: '',
    password: ''
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
    let formData = new FormData();
    formData.append('username', state.userName);
    formData.append('password', state.password);
    fetch('http://localhost:5000/api/login', {
      mode: 'no-cors',
      body: formData,
      method: 'post'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data.logged_in) history.push('order');
        else alert(data.error);
      })
      .catch(err => console.log(err));
  };

  return (
    <section>
      <Navigation />
      <form className="signin" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username
            <input
              className="form-control"
              type="text"
              name="userName"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
