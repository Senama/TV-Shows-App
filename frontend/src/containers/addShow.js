import React from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

export default class AddShow extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
            user: null,
            user_id: null,
            genres: [],
            title: null,
            genre: null,
            genre_id: null,
            img_url: null,
            dropdownOpen: false
        };
    }

    componentDidMount = async () => {
        if (!this.props.user) {
            const user = localStorage.getItem('user');
            let id = localStorage.getItem('id');
            if (user) this.setState({user, id});
        }
        else {
            this.setState({ user: this.props.user, user_id: this.props.id });

        }
        let genres = await Axios.get(`http://localhost:3005/genre/allgenres`)
        genres = genres.data.data;
        this.setState({ genres }, () => console.log(this.state))
    };

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    showGenres = () => {
        return this.state.genres.map((e, i) => {
            return (
                <DropdownItem key={i} id={e.id} onClick={(e) => this.setState({ genre: e.target.innerText, genre_id: e.target.id }, () => console.log(this.state.genre, this.state.genre_id))}>{e.genre_name}</DropdownItem>
            )
        })
    }

    handleSubmit = () => {
        if (!this.state.img_url || !this.state.genre || !this.state.title || !this.state.user) {
            alert('You must sign in!! / missing fields');
            return;
        }
        const { genre_id, title, user_id, img_url } = this.state;
        Axios.post(`http://localhost:3005/show/post`, { genre_id, title, user_id, img_url })
            .then(data => console.log(data))
            .then(() => alert('added show'))
            .catch(err => console.log(err));


    }

    render() {

        return (
            this.state.user ?
                <div>
                    <h1>Add a show, {this.state.user}</h1>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Show Title</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => this.setState({ title: e.target.value }, () => console.log(this.state.title))} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Poster Url</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e) => this.setState({ img_url: e.target.value }, () => console.log(this.state.img_url))} />
                    </div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Select Genre
                    </DropdownToggle>
                        <DropdownMenu>
                            {
                                this.showGenres()
                            }
                        </DropdownMenu>
                    </Dropdown>
                    <h4>{this.state.genre}</h4>
                    <br></br>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </div>
                :
                <h2>You are not logged in</h2>
        );
    };
};