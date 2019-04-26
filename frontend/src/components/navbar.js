import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">TV Show Watchlist</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/' className="nav-item nav-link">Home</Link>
                        <Link to='/users' className="nav-item nav-link">Users</Link>
                        <Link to='/allshows' className="nav-item nav-link">TV Shows</Link>
                        <Link to='/user/post' className="nav-item nav-link">Create</Link>
                    </div>
                </div>
            </nav>
        );
    };
};
