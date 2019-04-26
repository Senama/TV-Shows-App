import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class Profile extends React.Component {

    state = {
        user: null,  // logged in user
        username: null, // profile of clicked user
        shows: []
    };


    componentDidMount() {
        if (this.props.user) this.setState({ user: this.props.user });

        const { id } = this.props.match.params;
        Axios.get(`http://localhost:3005/user/profile/${id}`)
            .then(data => {
                console.log(data)
                this.setState({ username: data.data.userInfo.username, shows: data.data.showInfo }, () => console.log(this.state))
            })
            .catch(err => console.log(err));
    };

    showShows = () => {
        return this.state.shows.map((e, i) => {
            return (
                <div className='show col col-6' key={i} style={{ padding: '20px' }}>
                    <Link to={`/show/${e.show_id}`}>
                        <img src={e.img_url} style={{ height: '300px', width: '200px' }} alt= ''></img>
                        <h4>{e.title}</h4>
                    </Link>
                    <h5>Genre: {e.genre_name}</h5>
                </div>
            );
        });
    };

    render() {
        return (
            <>
                <div className='shows container' style={{ alignContent: 'center', textAlign: 'center' }}>
                    <h2>{this.state.username}'s profile</h2>
                    <div className='container'>
                        <div className='row'>
                            {this.showShows()}
                        </div>
                    </div>
                </div>
            </>
        );
    };
};
