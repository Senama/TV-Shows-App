import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class User extends React.Component {
    state = {
        user: null,
        id: null,
        users: [],
        loggedIn: null
    };

    componentDidMount() {
        if (this.props.user) this.setState({ user: this.props.user, id: this.props.id });
        console.log(this.props)
        Axios.get('http://localhost:3005/user/allusers')
            .then(data => this.setState({ users: data.data.data }))
            .catch(err => console.log(err))
    };

    componentDidUpdate() {
        if (this.state.user === this.props.user) console.log('fefaw');
        else this.setState({ user: this.props.user, id: this.props.id });
    };

    showUsers = () => {
        return this.state.users.map((e, i) => {
            return (
                <div key={i} style={{ padding: '10px' }}>
                    <Link to={`/user/${e.id}`} key={i}><li className="list-group-item" value={e.id}>{e.username}</li></Link>
                    <button type="button" className="btn btn-dark" value={e.username} id={e.id} onClick={this.pressedLogin} style={{ margin: '10px' }}>Login</button>
                </div>
            );
        });
    };

    pressedLogin = (e) => {
        localStorage.setItem('user', e.target.value);
        localStorage.setItem('id', e.target.id);
        this.props.selectUser(e.target.value, e.target.id)
    };

    checkUser = () => {
        if (this.state.user) return <h4>{this.state.user} is now logged in. ID # {this.state.id} </h4>
    };

    render() {
        return (
            <div style={{ padding: '20px' }}>
                {this.checkUser()}
                <h3>All Users</h3>
                <ul className="list-group">
                    {
                        this.showUsers()
                    }
                </ul>
            </div>
        );
    };
};
