import React, { useState } from 'react';
import history from '../../history';
import './SignIn.css';

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
    <main>
      <form className="signin" onSubmit={handleSubmit}>
        <h2 className="grey-text text-darken-3">Sign In</h2>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            className="form-control"
            type="text"
            name="userName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
};

// class SignIn extends Component{
//     state = {
//         email: '',
//         passpowd: '',
//         firstName: '',
//         lastName: ''
//     }
//     handleChange = (e) => {
//         //console.log(e)
//         this.setState({
//             [e.target.id]: e.target.value

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
export default SignIn;
