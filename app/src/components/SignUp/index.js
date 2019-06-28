import React, { useState } from 'react';
import './SignUp.css';
import history from '../../history';
import Navigation from '../SignIn/Navigation';

const SignUp = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    userName: '',
    lastName: ''
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
    formData.append('firstname', state.firstName);
    formData.append('lastname', state.lastName);
    formData.append('username', state.userName);
    formData.append('email', state.email);
    formData.append('password', state.password);
    fetch('http://localhost:5000/api/register', {
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
    <section id="authentication">
      <Navigation />
      <form className="signup" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            First Name
            <input
              required
              className="form-control"
              type="text"
              name="firstName"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name
            <input
              required
              className="form-control"
              type="text"
              name="lastName"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Username
            <input
              required
              className="form-control"
              type="text"
              name="userName"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email
            <input
              required
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password
            <input
              required
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
