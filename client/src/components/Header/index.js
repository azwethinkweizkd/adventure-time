import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="Header text-dark mb-5 py5 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem', color: '#212121' }}>
            Adventure Time
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700', color:'#fff9c4' }}>
          Start your Adventure today
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                New Adventure
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/">
                All Adventurers
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
