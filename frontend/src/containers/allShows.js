import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class AllShows extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shows: null
        };
    };

    componentDidMount() {
        Axios.get(`http://localhost:3005/show/shows/users`)
            .then((data) => {
                data = data.data.data;
                console.log(data);
                let shows = {};
                for (let i = 0; i < data.length; i++) {
                    if (!shows[data[i].title]) {
                        shows[data[i].title] = [{username:data[i].username, id:data[i].id}]
                    }
                    else {
                        shows[data[i].title] = shows[data[i].title].concat({username:data[i].username, id:data[i].id})
                    }
                }
                this.setState({shows}, () => console.log(this.state))
            })
            .catch(err => console.log(err))
    }

    displayUsers = (show) => {
        return this.state.shows[show].map((e,i) => {
            return (
                <Link key={i} to={`/show/${e.id}`}><div>{e.username}</div></Link>
            )
        })
    }

    displayShows = () => {
        if (this.state.shows) {
            const shows = Object.keys(this.state.shows);
            return shows.map((e, i) => {
                return (
                    <div key={i}>
                        <h3>{e}</h3>
                        {this.displayUsers(e)}
                    </div>
                )
            })
        }
    }

    render() {     
        return (
            !this.state.shows ?
                <div></div>
                :
                <div style={{ paddingLeft: '20px' }}>
                   {
                       this.displayShows()
                   }
                </div>
        );
    };
};