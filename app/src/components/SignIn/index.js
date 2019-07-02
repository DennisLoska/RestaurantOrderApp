import React, { useState, useContext } from 'react';
import history from '../../history';
import './SignIn.css';
import Navigation from './Navigation';
import { AppContext } from '../../App';

const SignIn = () => {
  const [form, setForm] = useState({
    userName: '',
    password: ''
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
    let formData = new FormData();
    formData.append('username', form.userName);
    formData.append('password', form.password);

    fetch('http://localhost:5000/api/login', {
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
