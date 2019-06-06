import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        //console.log(e)
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault();
        console.log(state);
    };

    return (
        <main>
            <form className="signup" onSubmit={handleSubmit}>
                <h2 className="grey-text text-darken-3">Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="firstName">First Name </label>
                    <input className="form-control" type="text" id="firstName" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name </label>
                    <input className="form-control" type="text" id="lastName" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input className="form-control" type="email" id="email" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password </label>
                    <input className="form-control" type="password" id="password" onChange={handleChange} />
                </div>
                <div>
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </main>
    );
}

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
export default SignUp