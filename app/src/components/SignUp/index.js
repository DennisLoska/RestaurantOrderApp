import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
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

    fetch('http://localhost:5000/api/register', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post'
    });
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2 className="grey-text text-darken-3">Sign Up</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name </label>
        <input
          className="form-control"
          type="text"
          id="firstName"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name </label>
        <input
          className="form-control"
          type="text"
          id="lastName"
          onChange={handleChange}
        />
      </div>
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
        <button className="btn btn-primary">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;
