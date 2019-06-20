import React, { useState } from 'react';
import './SignUp.css';
import SignIn from '../SignIn';
import Navigation from '../SignIn/navigation'

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
      [e.target.name]: e.target.value
    });

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
    <main>
      <Navigation></Navigation>
      <form className="signup" onSubmit={handleSubmit}>
        <h2 className="grey-text text-darken-3">Sign Up</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            className="form-control"
            type="text"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            className="form-control"
            type="text"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            required
            className="form-control"
            type="text"
            name="userName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            className="form-control"
            type="email"
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

//         })
//     }
//     handleSubmit = (e) => {
//         //console.log(e)
//         e.preventDefault();
//         console.log(this.state);
//     }
//     render(){
//         return (
//             <main>
//                 <form className="signin" onSubmit={this.handleSubmit}>
//                     <h2 className="grey-text text-darken-3">Sign In</h2>
//                     <div className="form-group">
//                         <label htmlFor="email">SignIn </label>
//                         <input className="form-control" type="email" id="email" onChange={this.handleChange}/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="passpowd">Password </label>
//                         <input className="form-control" type="password" id="email" onChange={this.handleChange}/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="firstName">First Name </label>
//                         <input className="form-control" type="text" id="firstName" onChange={this.handleChange}/>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="lastName">Last Name </label>
//                         <input className="form-control" type="text" id="lastName" onChange={this.handleChange}/>
//                     </div>
//                     <div>
//                         <button className="btn btn-primary">Login</button>
//                     </div>
//                 </form>
//             </main>
//         )
//     }
// }
export default SignUp