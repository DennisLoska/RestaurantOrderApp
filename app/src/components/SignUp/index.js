import React, { useState, useContext } from 'react';
import './SignUp.css';
import history from '../../history';
import Navigation from '../SignIn/Navigation';
import { AppContext } from '../../App';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    userName: '',
    lastName: ''
  });

  const [state, setState] = useContext(AppContext);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
    let formData = new FormData();
    formData.append('firstname', form.firstName);
    formData.append('lastname', form.lastName);
    formData.append('username', form.userName);
    formData.append('email', form.email);
    formData.append('password', form.password);

    fetch('http://localhost:5000/api/register', {
      body: formData,
      method: 'post'
    })
      .then(response => response.json())
      .catch(err => console.log(err))
      .then(data => {
        if (data.logged_in) {
          setState({ ...state, isLoggedIn: true, user: data.user });
          history.push('order');
        } else alert(data.error);
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
