import React from 'react';

const Navigation = () => {
  return (
    <div id="authentication">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">
            Herzlich Willkommen in unserem Restaurant!
          </h5>
          <p className="card-text">
            Sie können bei uns leckere Gerichte finden.
          </p>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm justify-content-center">
        <ul className="navbar-nav  align-items-center">
          <li className="nav-item  active">
            <a className="nav-link" href="/SignIn">
              Sign In
            </a>
          </li>
          <li>|</li>
          <li className="nav-item">
            <a className="nav-link" href="/SignUp">
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
