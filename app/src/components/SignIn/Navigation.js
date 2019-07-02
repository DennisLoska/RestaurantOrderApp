import React from 'react';

const Navigation = () => {
  return (
    <div>
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
        <a className="nav-item nav-link" href="/SignIn">
          Sign In
        </a>
        |
        <a className="nav-item nav-link" href="/SignUp">
          Sign Up
        </a>
      </nav>
    </div>
  );
};

export default Navigation;
