import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
    const formData = new FormData();
    formData.append('email', state.email);
    formData.append('password', state.password);

    fetch('http://localhost:5000', {
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post'
    });
  };

  return (
    <form className="signin" onSubmit={handleSubmit}>
      <h2 className="grey-text text-darken-3">Sign In</h2>
      <div className="form-group">
        <label htmlFor="email">Email </label>
        <input
          className="form-control"
          type="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password </label>
        <input
          className="form-control"
          type="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="btn btn-primary">Sign In</button>
      </div>
    </form>
  );
};

export default SignIn;
