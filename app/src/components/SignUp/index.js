import React, { useState } from 'react';
import history from '../../history';
import './SignUp.css';

const SignUp = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    userName: '',
    lastName: ''
  });

  const handleChange = e => {
    //console.log(e)
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    //history.push('/');
    //console.log(e)
    //e.preventDefault();
    // console.log(state);
    // var formData = new FormData();
    // formData.append('email', state.email);
    // formData.append('password', state.password);
    // fetch('http://localhost:3000/api/register', {
    //   body: formData,
    //   method: 'post'
    // });
  };

  //TODO refactor to use fetch instead of form
  return (
    <main>
      <form
        action="http://localhost:5000/api/register"
        method="post"
        className="signup"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="grey-text text-darken-3">Sign Up</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            className="form-control"
            type="text"
            id="firstName"
            name="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            className="form-control"
            type="text"
            id="lastName"
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            required
            className="form-control"
            type="text"
            id="userName"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            className="form-control"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            required
            className="form-control"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
